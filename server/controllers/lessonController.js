import Lesson from '../models/Lesson.js';
import { generateLessonPlan } from '../services/lessonService.js';
import { isDatabaseConnected } from '../config/db.js';

const SEED_LESSONS = [
  {
    _id: 'lesson_num_01',
    id: 'lesson_num_01',
    title: "Numbers 1 to 20: Ten-Grouping & Bundling",
    subject: "Mathematics",
    grade: "Grade 2",
    language: "Santhali",
    difficulty: "Beginner",
    duration: "45 mins",
    flnCode: "FLN-NUM-G2-01",
    learningOutcome: "Student can group objects in sets of 10 and count from 11 to 20 using local counters.",
    teacherExplanationHindi: "बच्चों, जब हमारे पास 10 वस्तुएं होती हैं, तो हम उसका एक बंडल बनाते हैं। 10 में 1 मिलाने पर 11 बनता है, जिसे संथाली में 'गेल मिद' कहते हैं।",
    motherTongueExplanation: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱚᱠᱷᱚᱱ ᱟᱵᱚ ᱴᱷᱮᱱ ᱑᱐ ᱜᱚᱴᱟᱝ ᱡᱤᱱᱤᱥ ᱛᱟᱦᱮᱸᱱᱟ, ᱩᱱ ᱡᱚᱦᱚᱜ ᱟᱵᱚ ᱢᱤᱫᱴᱟᱝ ᱵᱤᱸᱰᱟᱹ ᱵᱚᱱ ᱵᱮᱱᱟᱣᱟ᱾ ᱑᱐ ᱨᱮ ᱑ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱑᱑ (ᱜᱮᱞ ᱢᱤᱫ) ᱦᱩᱭᱩᱜᱼᱟ᱾",
    latinTransliteration: "Gidra ko, jokhon abo then 10 gotang jinis tahena, un johog abo midtang binda bon benawa. 10 re 1 mesa lekhan 11 (Gel Mid) huyuga.",
    localExample: "दुमका के साप्ताहिक हाट में महुआ या जामुन के 10-10 के बंडल बनाकर गिनना।",
    classroomActivity: "टिका-टिका गिनो खेल: 5-5 बच्चों का समूह बनाकर 20 इमली के बीजों को गिनना और संथाली में नाम बोलना।",
    practiceQuestions: [
      { q: "10 और 4 मिलकर कितने होते हैं?", options: ["13", "14 (ᱜᱮᱞ ᱯᱩᱱ)", "15"], ans: "14" },
      { q: "Santhali में '20' को क्या कहते हैं?", options: ["ᱠᱩᱲᱤ / ᱤᱥᱤ", "ᱜᱮᱞ", "ᱯᱮ"], ans: "ᱠᱩᱲᱤ / ᱤᱥᱤ" }
    ],
    isCustom: false
  },
  {
    _id: 'lesson_add_01',
    id: 'lesson_add_01',
    title: "Single-Digit Addition with Forest Seeds",
    subject: "Mathematics",
    grade: "Grade 2",
    language: "Odia",
    difficulty: "Beginner",
    duration: "40 mins",
    flnCode: "FLN-NUM-G2-03",
    learningOutcome: "Combine two sets of local tamarind seeds up to total 18.",
    teacherExplanationHindi: "बच्चों, जब हम दो समूहों को मिलाते हैं, तो उसे जोड़ना (Addition) कहते हैं। 4 आम और 3 आम मिलकर 7 आम होते हैं।",
    motherTongueExplanation: "ପିଲାମାନେ, ଯେତେବେଳେ ଆମେ ଦୁଇଟି ଦଳକୁ ଏକାଠି କରୁ, ତାହାକୁ ଯୋଗ (Addition) କୁହାଯାଏ। ୪ଟି ଆମ୍ବ ଏବଂ ୩ଟି ଆମ୍ବ ମିଶି ୭ଟି ଆମ୍ବ ହୁଏ।",
    latinTransliteration: "Pilamane, jetebele ame dui-ti dalaku ekathi karu, tahaku joga (Addition) kuhajae. 4-ti amba ebam 3-ti amba misi 7-ti amba hue.",
    localExample: "ଗାଁ ବଜାରରେ କେନ୍ଦୁ ଫଳ ଏକାଠି ଗଣିବା।",
    classroomActivity: "ବିହନ ମିଶାଣ ଖେଳ: ପିଲାମାନେ ନିଜ ସାଙ୍ଗ ସହିତ ମିଶି ମଞ୍ଜି ଗଣିବେ।",
    practiceQuestions: [
      { q: "୫ + ୩ କେତେ ହେବ?", options: ["୭", "୮", "୯"], ans: "୮" }
    ],
    isCustom: false
  }
];

let inMemoryLessons = [...SEED_LESSONS];

export const getLessons = async (req, res, next) => {
  try {
    const { grade, subject, language } = req.query;

    if (isDatabaseConnected()) {
      const query = {};
      if (grade && grade !== 'All') query.grade = grade;
      if (subject && subject !== 'All') query.subject = subject;
      if (language && language !== 'All') query.language = language;

      let dbLessons = await Lesson.find(query).sort({ createdAt: -1 });

      if (dbLessons.length === 0) {
        // Return seed lessons if DB is empty
        return res.status(200).json({
          success: true,
          count: SEED_LESSONS.length,
          data: SEED_LESSONS
        });
      }

      return res.status(200).json({
        success: true,
        count: dbLessons.length,
        data: dbLessons
      });
    }

    let filtered = inMemoryLessons;
    if (grade && grade !== 'All') filtered = filtered.filter(l => l.grade === grade);
    if (subject && subject !== 'All') filtered = filtered.filter(l => l.subject === subject);
    if (language && language !== 'All') filtered = filtered.filter(l => l.language === language);

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDatabaseConnected()) {
      const lesson = await Lesson.findById(id);
      if (lesson) {
        return res.status(200).json({ success: true, data: lesson });
      }
    }

    const found = inMemoryLessons.find(l => l._id === id || l.id === id);
    if (found) {
      return res.status(200).json({ success: true, data: found });
    }

    return res.status(404).json({
      success: false,
      message: 'Lesson not found'
    });
  } catch (error) {
    next(error);
  }
};

export const generateLesson = async (req, res, next) => {
  try {
    const { topic, grade, subject, targetLanguage, difficulty, learningOutcome } = req.body;

    const generated = await generateLessonPlan({
      topic,
      grade,
      subject,
      targetLanguage,
      difficulty,
      learningOutcome
    });

    return res.status(200).json({
      success: true,
      data: generated
    });
  } catch (error) {
    next(error);
  }
};

export const saveLesson = async (req, res, next) => {
  try {
    const lessonData = req.body;

    if (isDatabaseConnected()) {
      const newLesson = await Lesson.create({
        ...lessonData,
        user: req.user?._id,
        isCustom: true
      });
      return res.status(201).json({
        success: true,
        message: 'Lesson saved successfully',
        data: newLesson
      });
    }

    const newLesson = {
      _id: `lesson_${Date.now()}`,
      id: `lesson_${Date.now()}`,
      ...lessonData,
      isCustom: true,
      createdAt: new Date()
    };
    inMemoryLessons.unshift(newLesson);

    return res.status(201).json({
      success: true,
      message: 'Lesson saved successfully',
      data: newLesson
    });
  } catch (error) {
    next(error);
  }
};
