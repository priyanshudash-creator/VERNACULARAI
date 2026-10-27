import Student from '../models/Student.js';
import { isDatabaseConnected } from '../config/db.js';

const SEED_STUDENTS = [
  {
    _id: 'std_01',
    rollNo: '01',
    name: 'Anjali Marandi',
    grade: 'Grade 2',
    motherTongue: 'Santhali',
    gender: 'Female',
    attendance: '96%',
    score: 88,
    progressStatus: 'Mastered',
    learningGaps: []
  },
  {
    _id: 'std_02',
    rollNo: '02',
    name: 'Babulal Hembram',
    grade: 'Grade 2',
    motherTongue: 'Santhali',
    gender: 'Male',
    attendance: '92%',
    score: 84,
    progressStatus: 'On Track',
    learningGaps: ['Numbers 15-20 pronunciation']
  },
  {
    _id: 'std_03',
    rollNo: '03',
    name: 'Champa Murmu',
    grade: 'Grade 2',
    motherTongue: 'Santhali',
    gender: 'Female',
    attendance: '94%',
    score: 91,
    progressStatus: 'Mastered',
    learningGaps: []
  },
  {
    _id: 'std_04',
    rollNo: '04',
    name: 'Debashis Soren',
    grade: 'Grade 2',
    motherTongue: 'Santhali',
    gender: 'Male',
    attendance: '82%',
    score: 68,
    progressStatus: 'Needs Remedial Support',
    learningGaps: ['Teen numbers bundling (11-19)', 'Single-digit addition']
  },
  {
    _id: 'std_05',
    rollNo: '05',
    name: 'Falguni Tudu',
    grade: 'Grade 2',
    motherTongue: 'Ho',
    gender: 'Female',
    attendance: '90%',
    score: 79,
    progressStatus: 'On Track',
    learningGaps: ['Hindi to Ho oral translation']
  }
];

export const getStudents = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    if (isDatabaseConnected()) {
      const query = {};
      if (status && status !== 'All') {
        query.progressStatus = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { rollNo: { $regex: search, $options: 'i' } }
        ];
      }

      let students = await Student.find(query).sort({ rollNo: 1 });
      if (students.length > 0) {
        return res.status(200).json({ success: true, count: students.length, data: students });
      }
    }

    let list = SEED_STUDENTS;
    if (status && status !== 'All') {
      list = list.filter(s => s.progressStatus === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.rollNo.includes(q));
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

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isDatabaseConnected()) {
      const student = await Student.findById(id);
      if (student) {
        return res.status(200).json({ success: true, data: student });
      }
    }

    const found = SEED_STUDENTS.find(s => s._id === id || s.rollNo === id);
    if (found) {
      return res.status(200).json({ success: true, data: found });
    }

    return res.status(404).json({
      success: false,
      message: 'Student record not found'
    });
  } catch (error) {
    next(error);
  }
};
