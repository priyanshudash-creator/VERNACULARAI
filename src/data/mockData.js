// VernacularAI Comprehensive Realistic Demo Data
// School: Government Primary School, Jharkhand
// Teacher: Sunita Kumari | Grade 2 | 28 Students | Santhali, Ho, Mundari

export const TEACHER_PROFILE = {
  name: "Sunita Kumari",
  role: "Primary School Teacher (Grade 2)",
  school: "Government Primary School, Kendua",
  cluster: "Dumka Sadar Block",
  district: "Dumka",
  state: "Jharkhand",
  grade: "Grade 2",
  primaryLanguage: "Santhali",
  mediumOfInstruction: "Hindi",
  studentsCount: 28,
  totalLessonsCompleted: 18,
  averageAttendance: "91.4%",
  averageScore: 82,
  translationSessionsCount: 146,
  offlineStatus: "Offline AI Ready",
  storageUsed: "2.4 GB",
  storageTotal: "8.0 GB",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256",
  email: "sunita.kumari@jharkhand.edu.in",
  phone: "+91 98351 44210"
};

export const SUPPORTED_LANGUAGES = [
  {
    id: "santhali",
    name: "Santhali",
    nativeName: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)",
    script: "Ol Chiki / Devanagari",
    speakersCount: "7.6 Million",
    region: "Jharkhand, Odisha, West Bengal",
    vocabularyCount: "12,840",
    audioCount: "3,240",
    lessonsCount: 184,
    status: "Available",
    capabilities: {
      textTranslation: { level: "Excellent", status: "ready", label: "Excellent" },
      speechRecognition: { level: "Available", status: "ready", label: "Available" },
      textToSpeech: { level: "Available", status: "ready", label: "Available" },
      offlineSupport: { level: "Available", status: "ready", label: "Available" },
      confidenceScore: "94%"
    },
    samplePhraseHindi: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
    samplePhraseTarget: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱒᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾",
    transliteration: "Gidra ko, teheñ do abo 1 khon 20 habić lekha bon chedo'a."
  },
  {
    id: "ho",
    name: "Ho",
    nativeName: "ᱦᱳ (Ho)",
    script: "Warang Chiti / Devanagari",
    speakersCount: "1.4 Million",
    region: "West Singhbhum, Jharkhand & Mayurbhanj, Odisha",
    vocabularyCount: "8,920",
    audioCount: "1,980",
    lessonsCount: 96,
    status: "Beta Support",
    capabilities: {
      textTranslation: { level: "Available", status: "ready", label: "Available" },
      speechRecognition: { level: "Beta", status: "beta", label: "Beta (88%)" },
      textToSpeech: { level: "Beta", status: "beta", label: "Beta (85%)" },
      offlineSupport: { level: "Available", status: "ready", label: "Available" },
      confidenceScore: "87%"
    },
    samplePhraseHindi: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
    samplePhraseTarget: "ᱦᱚᱯᱚᱱ ᱠᱚ, ᱛᱤᱥᱤᱝ ᱟᱵᱩ ᱑ ᱠᱷᱚᱱ ᱒᱐ ᱡᱟᱠᱮᱫ ᱞᱮᱠᱷᱟ ᱵᱩ ᱤᱛᱩᱱᱟ᱾",
    transliteration: "Hopon ko, tising abu 1 khon 20 jaked lekha bu ituna."
  },
  {
    id: "mundari",
    name: "Mundari",
    nativeName: "ᱢᱩᱱᱰᱟᱨᱤ (Mundari)",
    script: "Bani Hisir / Devanagari",
    speakersCount: "1.1 Million",
    region: "Ranchi, Khunti, Jharkhand",
    vocabularyCount: "7,450",
    audioCount: "1,420",
    lessonsCount: 78,
    status: "Beta Support",
    capabilities: {
      textTranslation: { level: "Available", status: "ready", label: "Available" },
      speechRecognition: { level: "Beta", status: "beta", label: "Beta (84%)" },
      textToSpeech: { level: "Beta", status: "beta", label: "Beta (82%)" },
      offlineSupport: { level: "Available", status: "ready", label: "Available" },
      confidenceScore: "84%"
    },
    samplePhraseHindi: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
    samplePhraseTarget: "ᱦᱚᱱ ᱠᱚ, ᱛᱤᱥᱤᱝ ᱟᱵᱩ ᱑ ᱮᱛᱮ ᱒᱐ ᱡᱟᱠᱮᱫ ᱞᱮᱠᱷᱟ ᱵᱩ ᱪᱮᱫᱚᱜᱼᱟ᱾",
    transliteration: "Hon ko, tising abu 1 ete 20 jaked lekha bu chedo'a."
  },
  {
    id: "hindi",
    name: "Hindi (Standard)",
    nativeName: "हिन्दी",
    script: "Devanagari",
    speakersCount: "500+ Million",
    region: "Pan-India",
    vocabularyCount: "50,000+",
    audioCount: "15,000+",
    lessonsCount: 320,
    status: "Core Language",
    capabilities: {
      textTranslation: { level: "Core", status: "ready", label: "Master" },
      speechRecognition: { level: "Core", status: "ready", label: "Native ASR" },
      textToSpeech: { level: "Core", status: "ready", label: "Natural TTS" },
      offlineSupport: { level: "Core", status: "ready", label: "Installed" },
      confidenceScore: "99%"
    },
    samplePhraseHindi: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
    samplePhraseTarget: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
    transliteration: "Bachhon, aaj hum 1 se 20 tak ki ginti seekhenge."
  }
];

export const CLASSROOM_PRESETS = [
  {
    id: "c1",
    teacherHindi: "बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।",
    santhaliOlChiki: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱟᱵᱚ ᱑ ᱠᱷᱚᱱ ᱒᱐ ᱦᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾",
    santhaliLatin: "Gidra ko, teheñ do abo 1 khon 20 habić lekha bon chedo'a.",
    learningOutcome: "LO-M201: Student can identify, sequence, and verbally count objects from 1 to 20.",
    domain: "Foundational Numeracy (FLN)",
    topic: "Numbers 1–20",
    context: "Counting sal fruit / tamarind seeds",
    studentReplySanthali: "ᱢᱟᱹᱭ, ᱤᱧ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱫᱟᱲᱮᱭᱟᱜᱼᱟ, ᱢᱮᱱᱠᱷᱟᱱ ᱑᱕ ᱨᱮ ᱵᱟᱹᱧ ᱵᱟᱰᱟᱭᱟ᱾",
    studentReplyLatin: "Ma'i, iñ 10 dhabi'ć lekha daṛeya'a, menkhan 15 re ba'iñ baḍaya.",
    studentReplyHindi: "मैडम, मैं 10 तक गिन सकता हूँ, लेकिन 15 पर अटक जाता हूँ।",
    studentName: "Rahul Soren",
    processingTime: "1.6s",
    remedialHint: "Rahul needs concrete visual counters for numbers 11 to 20."
  },
  {
    id: "c2",
    teacherHindi: "अपनी-अपनी किताबों में पृष्ठ संख्या 14 खोलिए और चित्रों को देखिए।",
    santhaliOlChiki: "ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱨᱮ ᱥᱟᱠᱟᱢ ᱮᱞ ᱑᱔ ᱚᱰᱚᱠ ᱯᱮ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱧᱮᱞ ᱯᱮ᱾",
    santhaliLatin: "Apnarag puthi re sakam el 14 odok pe ar chitar ko ñel pe.",
    learningOutcome: "LO-E204: Connect visual illustrations with printed numbers and objects.",
    domain: "Visual Reading & Comprehension",
    topic: "Page Exploration",
    context: "Village pond and duck illustration",
    studentReplySanthali: "ᱤᱧ ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱯᱮᱭᱟ ᱜᱮᱰᱮ ᱧᱮᱞ ᱮᱫ ᱠᱚᱣᱟ, ᱟᱨ ᱢᱤᱫᱴᱟᱹᱝ ᱦᱟᱹᱠᱩ! ",
    studentReplyLatin: "Iñ chitar re peya gede ñel ed kowa, ar midtang haku!",
    studentReplyHindi: "मुझे चित्र में तीन बत्तखें और एक मछली दिखाई दे रही हैं!",
    studentName: "Asha Marandi",
    processingTime: "1.4s",
    remedialHint: "High visual engagement. Encourage group counting."
  },
  {
    id: "c3",
    teacherHindi: "यदि आपके पास 5 आम हैं और 2 आम अपने मित्र को दे दिए, तो कितने बचे?",
    santhaliOlChiki: "ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱜᱟᱛᱮ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱟᱨᱮᱡ ᱮᱱᱟ?",
    santhaliLatin: "Judi am then 5 gotań ul mena'a ar 2 gotań gate em emadeya, tobe tina' sarêj ena?",
    learningOutcome: "LO-M208: Understand basic single-digit subtraction as 'taking away'.",
    domain: "Basic Operations (Subtraction)",
    topic: "Subtraction with Mangoes",
    context: "Village harvest scenario",
    studentReplySanthali: "ᱯᱮᱭᱟ ᱩᱞ ᱥᱟᱨᱮᱡ ᱮᱱᱟ, ᱢᱟᱹᱭ!",
    studentReplyLatin: "Peya ul sarej ena, Ma'i!",
    studentReplyHindi: "तीन आम बचे, मैडम!",
    studentName: "Birsa Hembram",
    processingTime: "1.8s",
    remedialHint: "Concept clear. Ready for 2-digit word problem."
  }
];

export const STUDENTS_DATA = [
  {
    id: "s1",
    name: "Rahul Soren",
    rollNo: "01",
    grade: "Grade 2",
    attendance: "92%",
    lessonsCompleted: "18/20",
    score: 84,
    motherTongue: "Santhali",
    progressStatus: "Excellent",
    level: "Competent",
    avatarColor: "bg-emerald-600",
    parentName: "Sunil Soren",
    village: "Kendua Tola",
    strongTopics: ["Visual Recognition", "Shapes", "Oral Storytelling"],
    weakTopics: ["Number Recognition (11-20)", "Written Addition"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 85 },
      { date: "Sep 28", topic: "Addition Basics", score: 78 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 90 }
    ],
    remarks: "Rahul is sharp and active in mother-tongue activities. Needs physical counters for teen numbers."
  },
  {
    id: "s2",
    name: "Asha Marandi",
    rollNo: "02",
    grade: "Grade 2",
    attendance: "96%",
    lessonsCompleted: "19/20",
    score: 89,
    motherTongue: "Santhali",
    progressStatus: "Excellent",
    level: "Advanced",
    avatarColor: "bg-blue-600",
    parentName: "Hopna Marandi",
    village: "Bariarpur",
    strongTopics: ["Counting 1-50", "Pronunciation", "Word Problems"],
    weakTopics: ["Hindi reading speed"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 92 },
      { date: "Sep 28", topic: "Addition Basics", score: 88 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 95 }
    ],
    remarks: "Top performer in class. Often helps peers translate Hindi teacher questions into Santhali."
  },
  {
    id: "s3",
    name: "Suman Tudu",
    rollNo: "03",
    grade: "Grade 2",
    attendance: "86%",
    lessonsCompleted: "15/20",
    score: 71,
    motherTongue: "Santhali",
    progressStatus: "Needs Support",
    level: "Developing",
    avatarColor: "bg-amber-600",
    parentName: "Budhan Tudu",
    village: "Kendua Tola",
    strongTopics: ["Oral Hindi", "Environmental Identification"],
    weakTopics: ["Number Recognition (1-10)", "Symbol Writing"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 68 },
      { date: "Sep 28", topic: "Addition Basics", score: 65 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 75 }
    ],
    remarks: "Target for FLN remedial intervention. AI-adapted simplified counting worksheets recommended."
  },
  {
    id: "s4",
    name: "Birsa Hembram",
    rollNo: "04",
    grade: "Grade 2",
    attendance: "94%",
    lessonsCompleted: "18/20",
    score: 86,
    motherTongue: "Santhali",
    progressStatus: "Excellent",
    level: "Competent",
    avatarColor: "bg-indigo-600",
    parentName: "Karan Hembram",
    village: "Kendua",
    strongTopics: ["Subtraction", "Oral Narration"],
    weakTopics: ["Hindi spelling"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 88 },
      { date: "Sep 28", topic: "Addition Basics", score: 84 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 86 }
    ],
    remarks: "Very responsive during audio playback sessions."
  },
  {
    id: "s5",
    name: "Mangal Murmu",
    rollNo: "05",
    grade: "Grade 2",
    attendance: "89%",
    lessonsCompleted: "16/20",
    score: 79,
    motherTongue: "Santhali",
    progressStatus: "Average",
    level: "Developing",
    avatarColor: "bg-teal-600",
    parentName: "Raju Murmu",
    village: "Shikarpur",
    strongTopics: ["Art & Shapes", "Group Play"],
    weakTopics: ["Addition with Carry", "Reading"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 76 },
      { date: "Sep 28", topic: "Addition Basics", score: 74 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 82 }
    ],
    remarks: "Requires more tactile exercises."
  },
  {
    id: "s6",
    name: "Anita Baskey",
    rollNo: "06",
    grade: "Grade 2",
    attendance: "95%",
    lessonsCompleted: "19/20",
    score: 91,
    motherTongue: "Santhali",
    progressStatus: "Excellent",
    level: "Advanced",
    avatarColor: "bg-pink-600",
    parentName: "Babulal Baskey",
    village: "Kendua",
    strongTopics: ["Counting 1-100", "Story Retelling", "Drawing"],
    weakTopics: ["Speed writing"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 94 },
      { date: "Sep 28", topic: "Addition Basics", score: 90 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 96 }
    ],
    remarks: "Consistently excels in bilingual worksheets."
  },
  {
    id: "s7",
    name: "Chhotu Hansda",
    rollNo: "07",
    grade: "Grade 2",
    attendance: "82%",
    lessonsCompleted: "13/20",
    score: 64,
    motherTongue: "Santhali",
    progressStatus: "Needs Support",
    level: "Emerging",
    avatarColor: "bg-rose-600",
    parentName: "Dasrath Hansda",
    village: "Bariarpur",
    strongTopics: ["Speaking Santhali", "Playground Games"],
    weakTopics: ["Number Recognition", "Hindi Words", "Attendance"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 62 },
      { date: "Sep 28", topic: "Addition Basics", score: 58 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 70 }
    ],
    remarks: "Regular home visit suggested. High translation assistance needed during Hindi instruction."
  },
  {
    id: "s8",
    name: "Pooja Besra",
    rollNo: "08",
    grade: "Grade 2",
    attendance: "91%",
    lessonsCompleted: "17/20",
    score: 83,
    motherTongue: "Ho",
    progressStatus: "Excellent",
    level: "Competent",
    avatarColor: "bg-purple-600",
    parentName: "Munda Besra",
    village: "Kolhan Tola",
    strongTopics: ["Memory Games", "Oral Rhymes"],
    weakTopics: ["Devanagari script"],
    recentAssessments: [
      { date: "Oct 04", topic: "Numbers 1-20", score: 82 },
      { date: "Sep 28", topic: "Addition Basics", score: 80 },
      { date: "Sep 20", topic: "Animal Vocabulary", score: 88 }
    ],
    remarks: "Ho-speaking background, adapts well with dual-language audio aids."
  }
];

export const LEARNING_GAPS_DATA = {
  summary: [
    {
      topic: "Number Recognition (11–20)",
      subject: "Mathematics",
      studentsNeedingSupportCount: 11,
      totalStudents: 28,
      percentage: 38,
      urgency: "High",
      rootCause: "Confusion between Hindi number names (ग्यारह, बारह) and mother-tongue positional counting.",
      students: ["Rahul Soren", "Suman Tudu", "Chhotu Hansda", "Mangal Murmu", "Rani Kisku"]
    },
    {
      topic: "Hindi Reading Fluency",
      subject: "Language (Hindi)",
      studentsNeedingSupportCount: 9,
      totalStudents: 28,
      percentage: 31,
      urgency: "High",
      rootCause: "Transition gap between oral tribal home language and Devanagari text reading.",
      students: ["Suman Tudu", "Chhotu Hansda", "Karan Marandi", "Sunita Tudu"]
    },
    {
      topic: "Single-Digit Addition with Symbols",
      subject: "Mathematics",
      studentsNeedingSupportCount: 7,
      totalStudents: 28,
      percentage: 24,
      urgency: "Medium",
      rootCause: "Understands physical grouping of seeds/marbles, struggles with the mathematical '+' symbol.",
      students: ["Chhotu Hansda", "Mangal Murmu", "Laxmi Hembram"]
    },
    {
      topic: "School & Academic Vocabulary",
      subject: "Environmental Studies",
      studentsNeedingSupportCount: 5,
      totalStudents: 28,
      percentage: 17,
      urgency: "Low",
      rootCause: "Classroom instructional words like 'परीक्षण', 'अभ्यास' unfamiliar in rural homes.",
      students: ["Chhotu Hansda", "Suman Tudu"]
    }
  ],
  sampleRemedialPlan: {
    targetTopic: "Number Recognition (11–20)",
    grade: "Grade 2",
    targetLanguage: "Santhali",
    recommendedActivity: "Seed Counting & Village Market Bundle (Gela / ᱑᱐ ᱨᱮᱱᱟᱜ ᱵᱤᱸᱰᱟᱹ)",
    difficultyLevel: "FLN Foundation Step 1",
    motherTongueExplanation: "ᱢᱤᱫ ᱜᱮᱞ ᱢᱤᱫ (11), ᱢᱤᱫ ᱜᱮᱞ ᱵᱟᱨ (12) — ᱑᱐ ᱨᱮᱱᱟᱜ ᱢᱤᱫ ᱵᱤᱸᱰᱟᱹ ᱟᱨ ᱢᱤᱫᱴᱟᱹᱝ ᱥᱟᱨᱮᱡ ᱡᱟᱝ᱾ (१० का एक बंडल और १ खुला बीज = ११)",
    practiceQuestions: [
      { qHindi: "10 और 3 मिलकर कितने होते हैं?", qSanthali: "᱑᱐ ᱟᱨ ᱓ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ?", ans: "13 (ᱜᱮᱞ ᱯᱮ)" },
      { qHindi: "चित्र में 15 पत्तियां गिनिए।", qSanthali: "ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱑᱕ ᱜᱚᱴᱟᱝ ᱥᱟᱠᱟᱢ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾", ans: "15 (ᱜᱮᱞ ᱢᱚᱬᱮ)" }
    ]
  }
};

export const LESSONS_CATALOG = [
  {
    id: "lesson-1",
    title: "Numbers 1 to 20: Visual Counting & Quantities",
    subject: "Mathematics",
    grade: "Grade 2",
    language: "Santhali",
    difficulty: "Beginner",
    duration: "45 mins",
    learningOutcome: "LO-M201: Students identify and count objects up to 20 using local counters.",
    flnCode: "FLN-NUM-G2-01",
    isOfflineReady: true,
    aiVerified: true,
    objectives: [
      "Recognize spoken number names in Hindi and Santhali (1 to 20)",
      "Form ten-bundles (बंडल) using sticks or tamarind seeds",
      "Write Arabic numbers 1 to 20 alongside Ol Chiki numerals"
    ],
    teacherExplanationHindi: "बच्चों, जब हम 10 से आगे बढ़ते हैं, तो 10 में 1 जोड़ने पर 11 बनता है। इसे दस और एक कहते हैं।",
    motherTongueExplanationSanthali: "ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱚᱠᱷᱚᱱ ᱟᱵᱚ ᱑᱐ ᱠᱷᱚᱱ ᱞᱟᱦᱟ ᱵᱚᱱ ᱥᱮᱱᱚᱜᱼᱟ, ᱑᱐ ᱥᱟᱶ ᱑ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱑᱑ (ᱜᱮᱞ ᱢᱤᱫ) ᱦᱩᱭᱩᱜᱼᱟ᱾",
    localExample: "गांव के हाट (बाजार) में महुआ या जामुन के 10-10 के ढेर लगाना।",
    classroomActivity: "टिका-टिका गिनो खेल: 5-5 बच्चों का समूह बनाकर 20 पत्तों को गिनना और स्थानीय भाषा में नाम बोलना।",
    practiceQuestions: [
      { q: "गिनती में 14 के बाद कौन सी संख्या आती है?", options: ["13", "15", "16"], answer: "15" },
      { q: "Santhali में '10' को क्या कहते हैं?", options: ["ᱢᱤᱫ (1)", "ᱜᱮᱞ (10)", "ᱵᱟᱨ (2)"], answer: "ᱜᱮᱞ (10)" }
    ],
    audioDuration: "3:42 min"
  },
  {
    id: "lesson-2",
    title: "Animals Around Us: Domestic & Wild",
    subject: "Environmental Studies",
    grade: "Grade 2",
    language: "Santhali",
    difficulty: "Beginner",
    duration: "40 mins",
    learningOutcome: "LO-E202: Identify and classify domestic vs wild animals in local habitats.",
    flnCode: "FLN-EVS-G2-04",
    isOfflineReady: true,
    aiVerified: true,
    objectives: [
      "Distinguish between village animals and forest animals",
      "Pronounce animal names in Hindi and mother tongue",
      "Understand the sounds and habits of livestock"
    ],
    teacherExplanationHindi: "गाय, बकरी और मुर्गी हमारे घर के पास रहते हैं। इन्हें घरेलू पशु कहते हैं।",
    motherTongueExplanationSanthali: "ᱜᱟᱹᱭ, ᱢᱮᱨᱚᱢ ᱟᱨ ᱥᱤᱢ ᱫᱚ ᱟᱵᱚᱣᱟᱜ ᱚᱲᱟᱜ ᱟᱲᱮ ᱨᱮᱠᱚ ᱛᱟᱦᱮᱸᱱᱟ᱾ ᱱᱩᱠᱩ ᱫᱚ ᱚᱲᱟᱜ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱟᱱᱟ ᱠᱚ᱾",
    localExample: "खलिहान में बंधने वाली गाय (ᱜᱟᱹᱭ) और जंगल का सियार (ᱛᱩᱭᱩ) का अंतर।",
    classroomActivity: "पशु आवाज अभिनय: एक बच्चा आवाज निकालेगा, बाकी बच्चे हिंदी और संथाली दोनों में नाम बताएंगे।",
    practiceQuestions: [
      { q: "बकरी को संथाली में क्या कहते हैं?", options: ["ᱢᱮᱨᱚᱢ (Merom)", "ᱥᱮᱛᱟ (Seta)", "ᱜᱟᱹᱭ (Gai)"], answer: "ᱢᱮᱨᱚᱢ (Merom)" },
      { q: "इनमें से कौन जंगल में रहता है?", options: ["कुत्ता", "हाथी / ᱦᱟᱹᱛᱤ", "मुर्गी"], answer: "हाथी / ᱦᱟᱹᱛᱤ" }
    ],
    audioDuration: "2:55 min"
  },
  {
    id: "lesson-3",
    title: "Simple Single-Digit Addition",
    subject: "Mathematics",
    grade: "Grade 2",
    language: "Ho",
    difficulty: "Intermediate",
    duration: "45 mins",
    learningOutcome: "LO-M205: Combine two single-digit quantities up to sum 18.",
    flnCode: "FLN-NUM-G2-08",
    isOfflineReady: true,
    aiVerified: true,
    objectives: [
      "Understand addition as joining two groups together",
      "Use stone counters to sum quantities under 20",
      "Solve verbal word problems in Ho and Hindi"
    ],
    teacherExplanationHindi: "जोड़ का अर्थ है दो चीजों को एक साथ मिलाना। यदि 3 फूल और 2 फूल मिले, तो 5 फूल बने।",
    motherTongueExplanationSanthali: "ᱢᱮᱥᱟ ᱨᱮᱱᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ ᱵᱟᱨᱭᱟ ᱡᱤᱱᱤᱥ ᱢᱤᱫ ᱥᱟᱶ ᱡᱚᱲᱟᱣ᱾ ᱓ ᱵᱟᱦᱟ ᱟᱨ ᱒ ᱵᱟᱦᱟ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱕ ᱵᱟᱦᱟ ᱦᱩᱭᱩᱜᱼᱟ᱾",
    localExample: "पेड़ से गिरे महुआ के 4 फूल और टोकरी के 5 फूल मिलाना।",
    classroomActivity: "मित्र हाथ मिलाओ: 3 लड़के और 4 लड़कियां मिलकर वृत्त बनाएंगे और कुल संख्या गिनेंगे।",
    practiceQuestions: [
      { q: "4 + 5 कितना होता है?", options: ["8", "9", "10"], answer: "9" },
      { q: "यदि तुम्हारे पास 6 बेर हैं और माँ ने 3 और दिए, कुल कितने?", options: ["7", "8", "9"], answer: "9" }
    ],
    audioDuration: "3:10 min"
  }
];

export const LOCAL_STORIES = [
  {
    id: "story-1",
    title: "The Dumka Village Market (ᱫᱩᱢᱠᱟᱹ ᱦᱟᱴ ᱨᱮᱭᱟᱜ ᱠᱟᱛᱷᱟ)",
    topic: "Numbers & Counting in Daily Life",
    grade: "Grade 2",
    language: "Santhali",
    context: "Weekly Haat / Village Bazaar in Santhal Pargana",
    difficulty: "Beginner",
    summaryHindi: "समीर और उसकी दादी हाट में ताजे अमरूद और मिट्टी के दीये बेचने जाते हैं। समीर 1 से 20 तक गिनती कर के ग्राहकों को अमरूद देता है।",
    storyHindi: `शनिवार का दिन था। दुमका के पास गांव में साप्ताहिक हाट लगा था। 
सात साल का समीर अपनी दादी के साथ बाजार गया। दादी की टोकरी में 20 ताजे हरे अमरूद थे।
समीर ने पूछा, "दादी, क्या मैं अमरूद गिनने में मदद करूँ?"
दादी मुस्कुराई, "हाँ समीर, ज़रा गिनकर बताओ कितने हैं।"
समीर ने एक-एक कर गिने: एक, दो, तीन... पूरे बीस!
एक पड़ोसी चाचा आए और बोले, "मुझे पाँच अमरूद चाहिए।"
समीर ने पाँच अमरूद अलग किए। फिर एक दीदी आईं और सात अमरूद ले गईं।
समीर ने शाम तक हिसाब लगाया और खुशी से नाच उठा, क्योंकि उसने बिना गलती के सब अमरूद सही गिने थे!`,
    storySanthali: `ᱥᱟᱹᱱᱤᱵᱟᱨ ᱦᱤᱞᱚᱜ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾ ᱫᱩᱢᱠᱟᱹ ᱥᱩᱨ ᱟᱹᱛᱩ ᱨᱮ ᱦᱟᱯᱛᱟᱠᱤᱭᱟᱹ ᱦᱟᱴ ᱞᱟᱜᱟᱣ ᱞᱮᱱᱟ᱾ 
ᱮᱭᱟᱭ ᱥᱮᱨᱢᱟ ᱨᱤᱱᱤᱡ ᱥᱚᱢᱤᱨ ᱟᱡ ᱵᱩᱰᱷᱤ ᱜᱳ ᱥᱟᱶ ᱦᱟᱴ ᱛᱮ ᱥᱮᱱ ᱞᱮᱱᱟᱭ᱾ ᱵᱩᱰᱷᱤ ᱜᱳᱣᱟᱜ ᱴᱩᱠᱨᱤ ᱨᱮ ᱒᱐ ᱜᱚᱴᱟᱝ ᱵᱮᱨᱮᱞ ᱟᱢᱨᱩᱫᱽ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾
ᱥᱚᱢᱤᱨ ᱮ ᱠᱩᱞᱤ ᱠᱮᱫᱮᱭᱟ, "ᱵᱩᱰᱷᱤ ᱜᱳ, ᱪᱮᱫ ᱤᱧ ᱟᱢᱨᱩᱫᱽ ᱞᱮᱠᱷᱟ ᱨᱮ ᱜᱚᱲᱚᱢᱟ?"
ᱵᱩᱰᱷᱤ ᱜᱳ ᱞᱟᱸᱫᱟ ᱠᱟᱛᱮ ᱢᱮᱱ ᱠᱮᱫᱟᱭ, "ᱦᱮᱸ ᱥᱚᱢᱤᱨ, ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ ᱛᱤᱱᱟᱹᱜ ᱢᱮᱱᱟᱜᱼᱟ᱾"
ᱥᱚᱢᱤᱨ ᱢᱤᱫ-ᱢᱤᱫ ᱛᱮ ᱞᱮᱠᱷᱟ ᱠᱮᱫᱟ: ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ... ᱯᱩᱨᱟᱹ ᱠᱩᱲᱤ (᱒᱐)!`,
    vocabulary: [
      { hindi: "बाजार / हाट", santhali: "ᱦᱟᱴ (Haat)", transliteration: "Haat" },
      { hindi: "दादी", santhali: "ᱵᱩᱰᱷᱤ ᱜᱳ (Budhi Go)", transliteration: "Budhi Go" },
      { hindi: "बीस (20)", santhali: "ᱤᱥᱤ / ᱠᱩᱲᱤ (Isi / Kudi)", transliteration: "Isi" },
      { hindi: "टोकरी", santhali: "ᱴᱩᱠᱨᱤ (Tukri)", transliteration: "Tukri" }
    ],
    questions: [
      "समीर की दादी की टोकरी में कितने अमरूद थे?",
      "पड़ोसी चाचा ने समीर से कितने अमरूद माँगे?",
      "समीर को अमरूद गिनने में क्यों आनंद आया?"
    ],
    audioDuration: "2:40 min"
  },
  {
    id: "story-2",
    title: "Champa and the Little Sparrow (ᱪᱟᱢᱯᱟ ᱟᱨ ᱦᱩᱰᱤᱧ ᱪᱮᱬᱮ)",
    topic: "Kindness & Living Creatures",
    grade: "Grade 1",
    language: "Ho",
    context: "Forest Edge Village in Singhbhum",
    difficulty: "Beginner",
    summaryHindi: "चंपा को आंगन में एक नन्ही घायल गौरैया मिलती है। वह उसे पानी और दाना देती है, और जब वह ठीक हो जाती है तो वह चहचहाने लगती है।",
    storyHindi: `चंपा सुबह उठी तो आंगन के महुआ पेड़ के नीचे एक छोटी गौरैया पंख फड़फड़ा रही थी। 
चंपा ने पास जाकर देखा कि चिड़िया प्यासी और थकी हुई थी।
चंपा ने एक मिट्टी के कटोरे में ठंडा पानी रखा और कुछ चावल के दाने बिखेरे।
चिड़िया ने धीरे से पानी पिया और चंपा की तरफ कृतज्ञता से देखा।
दोपहर तक चिड़िया में ताकत आ गई और वह 'चीं-चीं' गाती हुई पेड़ की डाल पर उड़ गई।`,
    storySanthali: `ᱪᱟᱢᱯᱟ ᱥᱮᱛᱟᱜ ᱨᱮ ᱵᱮᱨᱮᱫ ᱮᱱᱟ ᱟᱨ ᱧᱮᱞ ᱠᱮᱫᱟᱭ ᱢᱤᱫᱴᱟᱹᱝ ᱦᱩᱰᱤᱧ ᱪᱮᱬᱮ ᱫᱟᱜ ᱛᱮᱛᱟᱝ ᱟᱠᱟᱱᱟᱭ᱾ 
ᱪᱟᱢᱯᱟ ᱫᱟᱜ ᱟᱨ ᱪᱟᱣᱞᱮ ᱮᱢᱟᱫᱮᱭᱟ᱾ ᱪᱮᱬᱮ ᱫᱟᱲᱮ ᱧᱟᱢ ᱠᱟᱛᱮ ᱪᱮᱛᱟᱱ ᱛᱮ ᱩᱰᱟᱹᱣ ᱮᱱᱟ᱾`,
    vocabulary: [
      { hindi: "चिड़िया", santhali: "ᱪᱮᱬᱮ (Cheñe)", transliteration: "Cheñe" },
      { hindi: "पानी", santhali: "ᱫᱟᱜ (Dag)", transliteration: "Dag" },
      { hindi: "पेड़", santhali: "ᱫᱟᱨᱮ (Dare)", transliteration: "Dare" }
    ],
    questions: [
      "चंपा को आंगन में कौन सा जीव मिला?",
      "चंपा ने चिड़िया की कैसे मदद की?"
    ],
    audioDuration: "2:15 min"
  }
];

export const PRONUNCIATION_WORDS = [
  {
    id: "p1",
    wordHindi: "गिनती",
    wordSanthali: "ᱞᱮᱠᱷᱟ",
    transliteration: "Lekha",
    phoneticGuide: "lay-khaa",
    meaning: "Counting / Numbers",
    difficulty: "Easy",
    expectedAudio: "lekha",
    simulatedScore: 86,
    feedback: "Good attempt! Try speaking the final 'khaa' sound slightly longer and clearer.",
    points: { accuracy: 88, fluency: 84, completeness: 90 }
  },
  {
    id: "p2",
    wordHindi: "पानी",
    wordSanthali: "ᱫᱟᱜ",
    transliteration: "Daag",
    phoneticGuide: "dahg (soft g)",
    meaning: "Water",
    difficulty: "Easy",
    expectedAudio: "daag",
    simulatedScore: 92,
    feedback: "Excellent clear pronunciation! Perfect regional inflection.",
    points: { accuracy: 94, fluency: 90, completeness: 95 }
  },
  {
    id: "p3",
    wordHindi: "पहाड़",
    wordSanthali: "ᱵᱩᱨᱩ",
    transliteration: "Buru",
    phoneticGuide: "boo-roo",
    meaning: "Hill / Mountain",
    difficulty: "Medium",
    expectedAudio: "buru",
    simulatedScore: 82,
    feedback: "Fair attempt. Roll the 'r' sound lightly on the second syllable.",
    points: { accuracy: 80, fluency: 83, completeness: 85 }
  },
  {
    id: "p4",
    wordHindi: "किताब",
    wordSanthali: "ᱯᱩᱛᱷᱤ",
    transliteration: "Puthi",
    phoneticGuide: "poo-thee",
    meaning: "Book",
    difficulty: "Easy",
    expectedAudio: "puthi",
    simulatedScore: 89,
    feedback: "Very good! Clear aspiration on the 'thi' syllable.",
    points: { accuracy: 90, fluency: 87, completeness: 91 }
  },
  {
    id: "p5",
    wordHindi: "पेड़",
    wordSanthali: "ᱫᱟᱨᱮ",
    transliteration: "Dare",
    phoneticGuide: "dah-ray",
    meaning: "Tree",
    difficulty: "Medium",
    expectedAudio: "dare",
    simulatedScore: 94,
    feedback: "Outstanding natural intonation! Teacher-grade clarity.",
    points: { accuracy: 95, fluency: 93, completeness: 96 }
  }
];

export const DAILY_TEACHING_PLAN_DEFAULT = {
  grade: "Grade 2",
  subject: "Mathematics",
  topic: "Numbers 1 to 20 & Ten-Grouping",
  targetLanguage: "Santhali",
  availableTime: "45 Minutes",
  learningOutcome: "LO-M201: Count, group, and represent numbers 1 to 20 accurately.",
  schedule: [
    {
      time: "09:00 – 09:10",
      activity: "Introduction & Warm-Up",
      type: "Warm-Up",
      detailsHindi: "कक्षा की शुरुआत स्थानीय गिनती गीत 'ᱢᱤᱫ-ᱵᱟᱨ-ᱯᱮ' से करना। सभी बच्चों को सक्रिय करना।",
      detailsSanthali: "ᱮᱛᱚᱦᱚᱵ ᱥᱮᱨᱮᱧ 'ᱢᱤᱫ-ᱵᱟᱨ-ᱯᱮ' ᱥᱮᱨᱮᱧ ᱠᱟᱛᱮ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱪᱩᱦᱩᱞ ᱦᱚᱪᱚ᱾",
      duration: "10 mins"
    },
    {
      time: "09:10 – 09:15",
      activity: "Hindi Explanation",
      type: "Concept",
      detailsHindi: "शिक्षक द्वारा श्यामपट्ट पर 11 से 20 की संख्याओं का स्पष्ट उच्चारण और इकाई-दहाई समझाना।",
      detailsSanthali: "ᱢᱟᱪᱮᱛ ᱦᱚᱛᱮᱛᱮ ᱵᱚᱨᱰ ᱨᱮ ᱑᱑ ᱠᱷᱚᱱ ᱒᱐ ᱮᱞ ᱚᱞ ᱟᱨ ᱥᱚᱫᱚᱨ᱾",
      duration: "5 mins"
    },
    {
      time: "09:15 – 09:25",
      activity: "Mother Tongue Explanation",
      type: "Vernacular Link",
      detailsHindi: "संथाली में 'ᱜᱮᱞ ᱢᱤᱫ' (11), 'ᱜᱮᱞ ᱵᱟᱨ' (12) की अवधारणा 10 के बंडल बनाकर समझाना।",
      detailsSanthali: "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱑᱐ ᱨᱮᱱᱟᱜ ᱵᱤᱸᱰᱟᱹ ᱟᱨ ᱥᱟᱨᱮᱡ ᱡᱟᱝ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱵᱩझᱟᱹᱣ᱾",
      duration: "10 mins"
    },
    {
      time: "09:25 – 09:35",
      activity: "Hands-on Classroom Activity",
      type: "Hands-On",
      detailsHindi: "इमली के बीजों और तीलियों से 10 का बंडल बनाने का खेल। समूह में सहयोगात्मक कार्य।",
      detailsSanthali: "ᱛᱮᱛᱨᱮ ᱡᱟᱝ ᱟᱨ ᱠᱟᱹᱴᱷᱤ ᱛᱮ ᱑᱐ ᱨᱮᱱᱟᱜ ᱵᱤᱸᱰᱟᱹ ᱵᱮᱱᱟᱣ ᱠᱷᱮᱞᱚᱸᱰ᱾",
      duration: "10 mins"
    },
    {
      time: "09:35 – 09:40",
      activity: "Quick Assessment & Oral Check",
      type: "Formative Check",
      detailsHindi: "3 छात्रों को अचानक संख्या बोलकर संथाली में बीज दिखाने को कहना।",
      detailsSanthali: "᱓ ᱦᱚᱲ ᱜᱤᱫᱽᱨᱟᱹ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱞᱮᱠᱷᱟ ᱟᱸᱡᱚᱢ ᱟᱨ ᱯᱚᱨᱠᱷᱟᱣ᱾",
      duration: "5 mins"
    },
    {
      time: "09:40 – 09:45",
      activity: "Review & Daily Reflection",
      type: "Summary",
      detailsHindi: "आज सीखे गए शब्दों का दोहराव और गृह-कार्य वर्कशीट बांटना।",
      detailsSanthali: "ᱛᱮᱦᱮᱧᱟᱜ ᱥᱮᱪᱮᱫ ᱫᱚᱦᱲᱟ ᱟᱨ ᱚᱲᱟᱜ ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱦᱟᱹᱴᱤᱧ᱾",
      duration: "5 mins"
    }
  ]
};

export const FLASHCARDS_DATA = [
  {
    id: "f1",
    count: 3,
    symbol: "🍎 🍎 🍎",
    numberHindi: "३",
    numberEnglish: "3",
    numberOlChiki: "᱓",
    wordHindi: "तीन",
    wordSanthali: "ᱯᱮ (Peya)",
    category: "Numbers",
    illustration: "Three crisp red apples",
    context: "Fruit harvest"
  },
  {
    id: "f2",
    count: 5,
    symbol: "🌳 🌳 🌳 🌳 🌳",
    numberHindi: "५",
    numberEnglish: "5",
    numberOlChiki: "᱕",
    wordHindi: "पाँच",
    wordSanthali: "ᱢᱚᱬᱮ (More)",
    category: "Nature",
    illustration: "Five green sal trees",
    context: "Sacred grove / Jaherthan"
  },
  {
    id: "f3",
    count: 10,
    symbol: "🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟 🐟",
    numberHindi: "१०",
    numberEnglish: "10",
    numberOlChiki: "᱑᱐",
    wordHindi: "दस",
    wordSanthali: "ᱜᱮᱞ (Gel)",
    category: "Living Beings",
    illustration: "Ten swimming fish",
    context: "Village pond"
  },
  {
    id: "f4",
    count: 7,
    symbol: "🌺 🌺 🌺 🌺 🌺 🌺 🌺",
    numberHindi: "७",
    numberEnglish: "7",
    numberOlChiki: "᱗",
    wordHindi: "सात",
    wordSanthali: "ᱮᱭᱟᱭ (Eyay)",
    category: "Flora",
    illustration: "Seven red hibiscus flowers",
    context: "Sarhul festival flowers"
  }
];

export const WORKSHEETS_DATA = [
  {
    id: "ws-1",
    title: "Bilingual Number Counting & Ten-Grouping Worksheet",
    subject: "Mathematics",
    grade: "Grade 2",
    topic: "Numbers 1 to 20",
    languages: "Hindi & Santhali",
    difficulty: "FLN Foundation",
    questionsCount: 5,
    lastGenerated: "Today, 08:30 AM",
    items: [
      {
        id: 1,
        type: "counting",
        promptHindi: "1. चित्रों को गिनिए और सही संख्या पर गोला लगाइए:",
        promptSanthali: "᱑. ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ ᱟᱨ ᱴᱷᱤᱠ ᱮᱞ ᱨᱮ ᱜᱩᱞᱟᱹᱭ ᱪᱤᱱᱦᱟᱹ ᱞᱟᱜᱟᱣ ᱯᱮ:",
        visual: "⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐",
        options: ["6", "8", "10"],
        correct: "8"
      },
      {
        id: 2,
        type: "matching",
        promptHindi: "2. हिंदी संख्या का सही संथाली नाम से मिलान कीजिए:",
        promptSanthali: "᱒. ᱦᱤᱱᱫᱤ ᱮᱞ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱧᱩᱛᱩᱢ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱯᱮ:",
        pairs: [
          { left: "5 (पाँच)", right: "ᱢᱚᱬᱮ (More)" },
          { left: "10 (दस)", right: "ᱜᱮᱞ (Gel)" },
          { left: "2 (दो)", right: "ᱵᱟᱨ (Bar)" }
        ]
      },
      {
        id: 3,
        type: "fill_blank",
        promptHindi: "3. खाली स्थान भरिए: 10 + 3 = ______",
        promptSanthali: "᱓. ᱠᱷᱟᱹᱞᱤ ᱴᱷᱟᱶ ᱯᱮᱨᱮᱡ ᱯᱮ: ᱑᱐ + ᱓ = ______ (ᱜᱮᱞ ᱯᱮ)",
        options: ["12", "13", "14"],
        correct: "13"
      },
      {
        id: 4,
        type: "picture_math",
        promptHindi: "4. यदि टोकरी में 6 आम हैं और 2 आम और रखे, तो कुल कितने?",
        promptSanthali: "᱔. ᱴᱩᱠᱨᱤ ᱨᱮ ᱖ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ, ᱟᱨ ᱒ ᱩᱞ ᱠᱚ ᱫᱚᱦᱚ ᱠᱮᱫᱟ, ᱛᱚᱵᱮ ᱛᱤᱱᱟᱹᱜ?",
        visual: "🥭 🥭 🥭 🥭 🥭 🥭  +  🥭 🥭",
        options: ["7", "8", "9"],
        correct: "8"
      }
    ]
  }
];

export const OFFLINE_MODELS = [
  {
    name: "Hindi-Santhali Translation Model (quantized v2.4)",
    type: "Machine Translation",
    size: "480 MB",
    status: "Installed",
    active: true,
    lastUpdate: "Oct 02, 2026",
    details: "Lightweight quantized transformer optimized for rural low-spec hardware."
  },
  {
    name: "Acoustic Speech-to-Text Engine (Hindi + Tribal Dialects)",
    type: "ASR",
    size: "620 MB",
    status: "Installed",
    active: true,
    lastUpdate: "Sep 25, 2026",
    details: "Trained on rural classroom microphone noise and child voice pitches."
  },
  {
    name: "Vernacular Text-to-Speech Voice Pack (Santhali Natural Audio)",
    type: "TTS",
    size: "340 MB",
    status: "Installed",
    active: true,
    lastUpdate: "Sep 28, 2026",
    details: "Natural rhythm audio synthesizer for Ol Chiki & Roman script text."
  },
  {
    name: "FLN Grade 1-3 Curriculum Knowledge Base (Jharkhand SCERT)",
    type: "Curriculum Pack",
    size: "180 MB",
    status: "Installed",
    active: true,
    lastUpdate: "Oct 01, 2026",
    details: "NIPUN Bharat foundational learning outcomes and local stories."
  },
  {
    name: "Ho & Mundari Linguistic Pack (Beta)",
    type: "Language Pack",
    size: "390 MB",
    status: "Installed",
    active: true,
    lastUpdate: "Oct 05, 2026",
    details: "Vocabulary and basic speech phonetics for Ho and Mundari."
  }
];

export const SYNC_QUEUE = [
  {
    id: "sq-1",
    action: "Upload Student Assessment Batch",
    recordsCount: 28,
    status: "Pending",
    direction: "Upload",
    size: "1.2 MB",
    time: "Today, 10:45 AM"
  },
  {
    id: "sq-2",
    action: "Sync Classroom Voice Translation Logs",
    recordsCount: 14,
    status: "Pending",
    direction: "Upload",
    size: "3.4 MB",
    time: "Today, 10:30 AM"
  },
  {
    id: "sq-3",
    action: "Download SCERT Grade 2 EVS Supplementary Stories",
    recordsCount: 4,
    status: "Pending",
    direction: "Download",
    size: "8.6 MB",
    time: "Today, 09:15 AM"
  }
];

export const NOTIFICATIONS_LIST = [
  {
    id: "n1",
    title: "New FLN Curriculum Alignment Pack Available",
    time: "10 mins ago",
    read: false,
    type: "curriculum",
    description: "SCERT Jharkhand released 6 new bilingual math exercises for Grade 2."
  },
  {
    id: "n2",
    title: "Worksheet Saved to Offline Cache",
    time: "45 mins ago",
    read: false,
    type: "offline",
    description: "Numbers 1–20 bilingual worksheet is ready for classroom printing."
  },
  {
    id: "n3",
    title: "Santhali Voice Pack v2.4 Updated",
    time: "2 hours ago",
    read: true,
    type: "system",
    description: "Improved Ol Chiki phoneme accuracy for classroom audio playback."
  },
  {
    id: "n4",
    title: "Offline Storage Reminder",
    time: "Yesterday",
    read: true,
    type: "storage",
    description: "2.4 GB of 8.0 GB used. 5.6 GB free for offline audio storage."
  }
];
