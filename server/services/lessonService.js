/**
 * Lesson Generator Service
 * Generates NIPUN Bharat and SCERT Jharkhand aligned bilingual lesson plans.
 */

export async function generateLessonPlan({
  topic,
  grade = 'Grade 2',
  subject = 'Mathematics',
  targetLanguage = 'Santhali',
  difficulty = 'Beginner',
  learningOutcome = ''
}) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.TRANSLATION_API_KEY || process.env.AI_API_KEY;

  if (apiKey && apiKey !== 'your_provider_api_key' && apiKey.length > 10) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `Generate a culturally contextualized FLN-aligned bilingual primary school lesson plan.
Topic: ${topic}
Grade: ${grade}
Subject: ${subject}
Language: ${targetLanguage}
Difficulty: ${difficulty}
Learning Outcome: ${learningOutcome || 'Develop foundational numeracy and literacy skills'}

Return a JSON object in this exact schema without markdown backticks:
{
  "title": "${topic}: Localized Vernacular Pedagogy",
  "subject": "${subject}",
  "grade": "${grade}",
  "language": "${targetLanguage}",
  "difficulty": "${difficulty}",
  "duration": "45 mins",
  "learningOutcome": "Clear learning outcome description",
  "flnCode": "FLN-NUM-G2-01",
  "teacherExplanationHindi": "Explanation in simple Hindi for the teacher",
  "motherTongueExplanation": "Explanation in ${targetLanguage}",
  "latinTransliteration": "Phonetic pronunciation in roman script",
  "localExample": "Village/rural contextual analogy",
  "classroomActivity": "Hands-on student group activity",
  "practiceQuestions": [
    { "q": "Question 1?", "options": ["Option A", "Option B", "Option C"], "ans": "Correct Answer" },
    { "q": "Question 2?", "options": ["Option A", "Option B", "Option C"], "ans": "Correct Answer" }
  ]
}`;

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
        }),
        signal: AbortSignal.timeout(12000)
      });

      if (resp.ok) {
        const data = await resp.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw.replace(/```json/g, '').replace(/```/g, '').trim());
          return { id: `ai-gen-${Date.now()}`, ...parsed };
        }
      }
    } catch (err) {
      console.warn(`[Lesson Service] Gemini failed: ${err.message}. Using built-in lesson generator.`);
    }
  }

  // Built-in FLN lesson generator
  const isOdia = targetLanguage.toLowerCase().includes('odia');
  const motherTongueExplanation = isOdia
    ? `ପିଲାମାନେ, ଆଜି ଆମେ ${topic} ବିଷୟରେ ବୁଝିବା। ଏହାକୁ ଆମ ଦୈନନ୍ଦିନ ଜୀବନର ଉଦାହରଣ ମାଧ୍ୟମରେ ସହଜରେ ଶିଖିପାରିବା।`
    : `ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱚᱠᱷᱚᱱ ᱟᱵᱚ ᱑᱐ ᱠᱷᱚᱱ ᱞᱟᱦᱟ ᱵᱚᱱ ᱥᱮᱱᱚᱜᱼᱟ, ᱑᱐ ᱥᱟᱶ ᱑ ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱑᱑ (ᱜᱮᱞ ᱢᱤᱫ) ᱦᱩᱭᱩᱜᱼᱟ᱾`;

  const latinTransliteration = isOdia
    ? `Pilamane, aji ame ${topic} bishayare bujhiba. Ehaku ama dainandina jibanara udaharanare sikhiba.`
    : `Gidra ko, jokhon abo 10 khon laha bon senog'a, 10 saw mid mesa lekhan 11 (Gel Mid) huyug'a.`;

  return {
    id: `ai-gen-${Date.now()}`,
    title: `${topic}: Localized Vernacular Pedagogy`,
    subject,
    grade,
    language: targetLanguage,
    difficulty,
    duration: "45 mins",
    learningOutcome: learningOutcome || `Student can identify and apply ${topic} using local materials.`,
    flnCode: "FLN-NUM-G2-01",
    teacherExplanationHindi: `बच्चों, ${topic} को जब हम सीखते हैं, तो स्थानीय परिवेश और ठोस वस्तुओं की मदद से समझना सबसे सरल होता है।`,
    motherTongueExplanation,
    latinTransliteration,
    localExample: "दुमका के साप्ताहिक हाट में महुआ या जामुन के 10-10 के बंडल बनाकर गिनना।",
    classroomActivity: "टिका-टिका गिनो खेल: 5-5 बच्चों का समूह बनाकर 20 इमली के बीजों को गिनना और स्थानीय भाषा में नाम बोलना।",
    practiceQuestions: [
      { q: "10 और 4 मिलकर कितने होते हैं?", options: ["13", "14", "15"], ans: "14" },
      { q: `${targetLanguage} में '10' को क्या कहते हैं?`, options: ["ᱜᱮᱞ / ଦଶ", "ᱢᱤᱫ / ଏକ", "ᱯᱮ / ତିନି"], ans: "ᱜᱮᱞ / ଦଶ" }
    ]
  };
}
