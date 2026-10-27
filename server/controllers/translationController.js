import Translation from '../models/Translation.js';
import { executeTranslation } from '../services/translationService.js';
import { isDatabaseConnected } from '../config/db.js';

// In-memory fallback history store
const inMemoryHistory = new Map();

// Seed initial realistic classroom translation records
const SEED_HISTORY = [
  {
    _id: 'trans_seed_1',
    user: '671ee0a1f0a1b2c3d4e5f6a1',
    sourceText: 'बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।',
    translatedText: 'ପିଲାମାନେ, ଆଜି ଆମେ ୧ ରୁ ୨୦ ପର୍ଯ୍ୟନ୍ତ ଗଣିବା ଶିଖିବା।',
    transliteration: 'Pilamane, aji ame 1 ru 20 parjyanta ganiba sikhiba.',
    sourceLang: 'hindi',
    targetLang: 'odia',
    confidenceScore: '96%',
    provider: 'VernacularAI Cloud Gateway',
    createdAt: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    _id: 'trans_seed_2',
    user: '671ee0a1f0a1b2c3d4e5f6a1',
    sourceText: 'अपनी-अपनी किताबों में पृष्ठ संख्या 14 खोलिए और चित्रों को देखिए।',
    translatedText: 'ଆପଣଙ୍କ ବହିରେ ପୃଷ୍ଠା ସଂଖ୍ୟା ୧୪ ଖୋଲନ୍ତୁ ଏବଂ ଚିତ୍ରଗୁଡ଼ିକୁ ଦେଖନ୍ତୁ।',
    transliteration: 'Aapananka bahire prushtha sankhya 14 kholantu ebam chitragudiku dekhantu.',
    sourceLang: 'hindi',
    targetLang: 'odia',
    confidenceScore: '95%',
    provider: 'VernacularAI Cloud Gateway',
    createdAt: new Date(Date.now() - 18 * 60 * 1000)
  },
  {
    _id: 'trans_seed_3',
    user: '671ee0a1f0a1b2c3d4e5f6a1',
    sourceText: 'यदि आपके पास 5 आम हैं और 2 आम अपने मित्र को दे दिए, तो कितने बचे?',
    translatedText: 'ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱜᱟᱛᱮ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱓ ᱜᱚᱴᱟᱝ ᱥᱟᱨᱮᱡ ᱮᱱᱟ?',
    transliteration: "Judi am then 5 gotań ul mena'a ar 2 gotań gate em emadeya, tobe 3 gotań sarêj ena?",
    sourceLang: 'hindi',
    targetLang: 'santhali',
    confidenceScore: '94%',
    provider: 'VernacularAI Tribal Linguistic Model',
    createdAt: new Date(Date.now() - 35 * 60 * 1000)
  }
];

inMemoryHistory.set('default', [...SEED_HISTORY]);

export const translateText = async (req, res, next) => {
  try {
    const { text, sourceLang, targetLang, mode, saveHistory = true } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Input text to translate cannot be empty.'
      });
    }

    const result = await executeTranslation({
      text,
      sourceLang,
      targetLang,
      mode
    });

    let savedRecord = null;
    const userId = req.user?._id || 'default';

    // If user is authenticated or requesting save, save record
    if (saveHistory) {
      if (isDatabaseConnected() && req.user) {
        savedRecord = await Translation.create({
          user: req.user._id,
          sourceText: result.sourceText,
          translatedText: result.translatedText,
          transliteration: result.transliteration,
          sourceLang: result.sourceLang,
          targetLang: result.targetLang,
          mode: mode || 'text',
          confidenceScore: result.confidenceScore,
          provider: result.provider
        });
      } else {
        const memRecord = {
          _id: `trans_${Date.now()}`,
          user: userId,
          sourceText: result.sourceText,
          translatedText: result.translatedText,
          transliteration: result.transliteration,
          sourceLang: result.sourceLang,
          targetLang: result.targetLang,
          mode: mode || 'text',
          confidenceScore: result.confidenceScore,
          provider: result.provider,
          createdAt: new Date()
        };
        const list = inMemoryHistory.get(String(userId)) || [];
        list.unshift(memRecord);
        inMemoryHistory.set(String(userId), list);
        savedRecord = memRecord;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...result,
        _id: savedRecord?._id || `trans_${Date.now()}`,
        createdAt: savedRecord?.createdAt || new Date()
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTranslationHistory = async (req, res, next) => {
  try {
    const { search, lang, limit = 50 } = req.query;
    const userId = req.user?._id || 'default';

    if (isDatabaseConnected() && req.user) {
      const query = { user: req.user._id };

      if (lang && lang !== 'all') {
        query.targetLang = lang.toLowerCase();
      }

      if (search) {
        query.$or = [
          { sourceText: { $regex: search, $options: 'i' } },
          { translatedText: { $regex: search, $options: 'i' } }
        ];
      }

      const history = await Translation.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit));

      return res.status(200).json({
        success: true,
        count: history.length,
        data: history
      });
    }

    // Fallback in-memory history
    let list = inMemoryHistory.get(String(userId)) || inMemoryHistory.get('default') || [];

    if (lang && lang !== 'all') {
      list = list.filter(item => item.targetLang.toLowerCase() === lang.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(item =>
        item.sourceText.toLowerCase().includes(q) ||
        item.translatedText.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTranslationRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id || 'default';

    if (isDatabaseConnected() && req.user) {
      const record = await Translation.findOne({ _id: id, user: req.user._id });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Translation record not found or access denied.'
        });
      }

      await Translation.deleteOne({ _id: id });
      return res.status(200).json({
        success: true,
        message: 'Translation record deleted successfully.'
      });
    }

    // In-memory delete
    const list = inMemoryHistory.get(String(userId)) || inMemoryHistory.get('default') || [];
    const filtered = list.filter(item => item._id !== id && String(item.id) !== id);
    inMemoryHistory.set(String(userId), filtered);

    return res.status(200).json({
      success: true,
      message: 'Translation record deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const clearAllTranslations = async (req, res, next) => {
  try {
    const userId = req.user?._id || 'default';

    if (isDatabaseConnected() && req.user) {
      const result = await Translation.deleteMany({ user: req.user._id });
      return res.status(200).json({
        success: true,
        message: 'All translation history cleared successfully.',
        deletedCount: result.deletedCount
      });
    }

    inMemoryHistory.set(String(userId), []);
    inMemoryHistory.set('default', []);

    return res.status(200).json({
      success: true,
      message: 'All translation history cleared successfully.',
      deletedCount: 0
    });
  } catch (error) {
    next(error);
  }
};
