import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      default: 'Mathematics'
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
      default: 'Grade 2'
    },
    language: {
      type: String,
      required: [true, 'Target language is required'],
      default: 'Santhali'
    },
    difficulty: {
      type: String,
      default: 'Beginner'
    },
    duration: {
      type: String,
      default: '45 mins'
    },
    learningOutcome: {
      type: String,
      required: true
    },
    flnCode: {
      type: String,
      default: 'FLN-GEN-01'
    },
    teacherExplanationHindi: {
      type: String,
      required: true
    },
    motherTongueExplanation: {
      type: String,
      required: true
    },
    latinTransliteration: {
      type: String,
      default: ''
    },
    localExample: {
      type: String,
      default: ''
    },
    classroomActivity: {
      type: String,
      default: ''
    },
    practiceQuestions: [
      {
        q: String,
        options: [String],
        ans: String
      }
    ],
    isCustom: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);
export default Lesson;
