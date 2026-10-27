/**
 * AI Teaching Copilot Service
 * Generates pedagogical guidance, local tribal analogies, mother tongue explanations,
 * classroom activities, and practice questions.
 */

export async function generateCopilotAdvice({ message, grade = 'Grade 2', language = 'Santhali', subject = 'Mathematics' }) {
  if (!message || !message.trim()) {
    throw { statusCode: 400, message: 'Message query is required' };
  }

  const query = message.trim();
  const apiKey = process.env.GEMINI_API_KEY || process.env.TRANSLATION_API_KEY || process.env.AI_API_KEY;

  if (apiKey && apiKey !== 'your_provider_api_key' && apiKey.length > 10) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `You are an expert bilingual primary school pedagogical mentor trained in the Indian NIPUN Bharat and SCERT framework.
User Query: "${query}"
Context: Grade: ${grade}, Target Vernacular Language: ${language}, Subject: ${subject}.

Return a JSON object in this exact schema without markdown backticks:
{
  "content": "A warm, helpful paragraph addressing the teacher.",
  "breakdown": {
    "simpleExplanation": "Clear conceptual explanation in simple terms.",
    "localExample": "Culturally relevant rural/tribal village analogy (e.g., Dumka Haat, tamarind seeds, forest fruits).",
    "motherTongue": "Translation and explanation in ${language}.",
    "activity": "A 10-minute active classroom pair/group game.",
    "practiceQuestion": "Formative assessment check question with answer."
  }
}`;

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.3 }
        }),
        signal: AbortSignal.timeout(10000)
      });

      if (resp.ok) {
        const data = await resp.json();
        const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw.replace(/```json/g, '').replace(/```/g, '').trim());
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`[Copilot Service] Gemini failed: ${err.message}. Using built-in pedagogical engine.`);
    }
  }

  // Built-in intelligent pedagogical engine
  const qLower = query.toLowerCase();

  let simpleExplanation = "Break down the core concept using tangible objects before introducing written symbols or formal calculations.";
  let localExample = "Using weekly Haat (bazaar) exchanges or counting sal leaves and tamarind seeds.";
  let motherTongue = "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱢᱟᱬᱟᱝ ᱫᱚ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ ᱟᱠᱚ ᱯᱮ ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱦᱤᱱᱫᱤ ᱛᱮ ᱥᱚᱫᱚᱨ ᱯᱮ᱾ (Explain in mother tongue first).";
  let activity = "Pair and Share: Have children work in pairs of two with 10 seeds each to visualize combinations.";
  let practiceQuestion = "What is 10 + 4 in Santhali? (Answer: ᱜᱮᱞ ᱯᱩᱱ / Gel Pone)";

  if (qLower.includes('subtract') || qLower.includes('घटाव') || qLower.includes('minus')) {
    simpleExplanation = "Explain subtraction as physically 'taking away' items from a basket. If you have 5 items and remove 2, 3 remain.";
    localExample = "Harvesting mangoes: If a basket has 5 fresh mangoes and you gift 2 to your friend, 3 remain.";
    motherTongue = "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱕ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱒ ᱜᱚᱴᱟᱝ ᱮᱢ ᱮᱢᱟᱫᱮᱭᱟ, ᱛᱚᱵᱮ ᱓ ᱜᱚᱴᱟᱝ ᱥᱟᱨᱮᱡ ᱮᱱᱟ᱾";
    activity = "Tamarind Seed Takeaway Game: Put 8 seeds in a circle, student removes 3 and counts rest.";
    practiceQuestion = "8 seeds - 3 seeds = ? (Answer: 5 seeds / ᱢᱚᱬᱮ ᱡᱟᱝ)";
  } else if (qLower.includes('count') || qLower.includes('गिनती') || qLower.includes('number') || qLower.includes('1-20')) {
    simpleExplanation = "Group numbers in units of 10s. Show that 11 is 'ten and one', 12 is 'ten and two'.";
    localExample = "Bundling mahua flowers or twigs in bundles of 10 at the local Dumka Haat.";
    motherTongue = "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱑᱐ (ᱜᱮᱞ) ᱥᱟᱶ ᱑ (ᱢᱤᱫ) ᱢᱮᱥᱟ ᱞᱮᱠᱷᱟᱱ ᱑᱑ (ᱜᱮᱞ ᱢᱤᱫ) ᱦᱩᱭᱩᱜᱼᱟ᱾";
    activity = "Tika-Tika Counting: 5-5 students form bundles of 10 tamarind seeds and count up to 20.";
    practiceQuestion = "What comes after 15? (Answer: 16 / ᱜᱮᱞ ᱛᱩᱨᱩᱭ)";
  } else if (qLower.includes('shape') || qLower.includes('geometry') || qLower.includes('आकार')) {
    simpleExplanation = "Relate 2D shapes to everyday household and agricultural tools seen in the village.";
    localExample = "Round roti or bullock cart wheel (circle), earthen roof tiles (triangle), mud house doorway (rectangle).";
    motherTongue = "ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ: ᱜᱩᱞᱟᱹᱴ (Circle), ᱯᱮ ᱠᱩᱬᱟᱹ (Triangle), ᱯᱩᱱ ᱠᱩᱬᱟᱹ (Rectangle).";
    activity = "Nature Shape Hunt: Collect pebbles, leaves, and twigs outside classroom and categorize by shape.";
    practiceQuestion = "Which shape looks like a full moon? (Answer: Circle / ᱜᱩᱞᱟᱹᱴ)";
  }

  return {
    content: `Pedagogy recommendation for: "${query}":`,
    breakdown: {
      simpleExplanation,
      localExample,
      motherTongue,
      activity,
      practiceQuestion
    }
  };
}
