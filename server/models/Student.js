import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    rollNo: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    grade: {
      type: String,
      default: 'Grade 2'
    },
    motherTongue: {
      type: String,
      default: 'Santhali'
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Female'
    },
    attendance: {
      type: String,
      default: '92%'
    },
    score: {
      type: Number,
      default: 80
    },
    progressStatus: {
      type: String,
      enum: ['Mastered', 'On Track', 'Needs Remedial Support'],
      default: 'On Track'
    },
    learningGaps: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
export default Student;
