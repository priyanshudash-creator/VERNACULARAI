import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.js';
import Lesson from '../models/Lesson.js';
import Student from '../models/Student.js';
import Translation from '../models/Translation.js';
import { connectDB, disconnectDB } from '../config/db.js';

async function seedDatabase() {
  console.log('[Seed] Connecting to database...');
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error('[Seed Error] Could not connect to MongoDB. Please ensure MONGODB_URI is valid and MongoDB is running.');
    process.exit(1);
  }

  console.log('[Seed] Clearing existing collections...');
  await User.deleteMany({});
  await Lesson.deleteMany({});
  await Student.deleteMany({});
  await Translation.deleteMany({});

  console.log('[Seed] Seeding Demo Primary School Teacher...');
  const teacher = await User.create({
    name: 'Sunita Kumari',
    email: 'sunita.kumari@jharkhand.edu.in',
    password: 'Password123!',
    phone: '+91 98351 44210',
    school: 'Government Primary School, Kendua',
    cluster: 'Dumka Sadar Block',
    district: 'Dumka',
    state: 'Jharkhand',
    grade: 'Grade 2',
    primaryLanguage: 'Santhali',
    mediumOfInstruction: 'Hindi',
    role: 'Primary School Teacher (Grade 2)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
  });

  console.log(`[Seed] Created teacher: ${teacher.name} (${teacher.email})`);

  console.log('[Seed] Seeding sample FLN lessons...');
  await Lesson.create([
    {
      user: teacher._id,
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
      user: teacher._id,
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
      classroomActivity: "ବିହନ ମିଶାଣ ଖେଳ: ପିଲାମାନେ ନିଜ ସାଙ୍ᱜ ସହିତ ମିଶି ମଞ୍ଜି ଗଣିବେ।",
      practiceQuestions: [
        { q: "୫ + ୩ କେତେ ହେବ?", options: ["୭", "୮", "୯"], ans: "୮" }
      ],
      isCustom: false
    }
  ]);

  console.log('[Seed] Seeding sample Grade 2 student roster...');
  await Student.create([
    {
      teacher: teacher._id,
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
      teacher: teacher._id,
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
      teacher: teacher._id,
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
      teacher: teacher._id,
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
      teacher: teacher._id,
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
  ]);

  console.log('[Seed] Seeding sample Translation records...');
  await Translation.create([
    {
      user: teacher._id,
      sourceText: 'बच्चों, आज हम 1 से 20 तक की गिनती सीखेंगे।',
      translatedText: 'ପିଲାମାନେ, ଆଜି ଆମେ ୧ ରୁ ୨୦ ପର୍ଯ୍ୟନ୍ତ ଗଣିବା ଶିଖିବା।',
      transliteration: 'Pilamane, aji ame 1 ru 20 parjyanta ganiba sikhiba.',
      sourceLang: 'hindi',
      targetLang: 'odia',
      mode: 'text',
      confidenceScore: '96%',
      provider: 'VernacularAI Cloud Gateway'
    },
    {
      user: teacher._id,
      sourceText: 'अपनी-अपनी किताबों में पृष्ठ संख्या 14 खोलिए और चित्रों को देखिए।',
      translatedText: 'ଆପଣଙ୍କ ବହିରେ ପୃଷ୍ଠା ସଂଖ୍ୟା ୧୪ ଖୋଲନ୍ତୁ ଏବଂ ଚିତ୍ରଗୁଡ଼ିକୁ ଦେଖନ୍ତୁ।',
      transliteration: 'Aapananka bahire prushtha sankhya 14 kholantu ebam chitragudiku dekhantu.',
      sourceLang: 'hindi',
      targetLang: 'odia',
      mode: 'text',
      confidenceScore: '95%',
      provider: 'VernacularAI Cloud Gateway'
    }
  ]);

  console.log('✅ [Seed Completed] Database successfully populated with initial data!');
  await disconnectDB();
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error('[Seed Error]', err);
  process.exit(1);
});
