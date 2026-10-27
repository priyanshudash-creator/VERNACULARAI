import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    sourceText: {
      type: String,
      required: [true, 'Source text is required'],
      trim: true
    },
    translatedText: {
      type: String,
      required: [true, 'Translated text is required'],
      trim: true
    },
    transliteration: {
      type: String,
      default: '',
      trim: true
    },
    sourceLang: {
      type: String,
      required: [true, 'Source language is required'],
      trim: true,
      lowercase: true
    },
    targetLang: {
      type: String,
      required: [true, 'Target language is required'],
      trim: true,
      lowercase: true
    },
    mode: {
      type: String,
      enum: ['text', 'voice'],
      default: 'text'
    },
    confidenceScore: {
      type: String,
      default: '95%'
    },
    provider: {
      type: String,
      default: 'VernacularAI'
    }
  },
  {
    timestamps: true
  }
);

// Compound index for querying recent translations for a user
translationSchema.index({ user: 1, createdAt: -1 });

const Translation = mongoose.models.Translation || mongoose.model('Translation', translationSchema);
export default Translation;
