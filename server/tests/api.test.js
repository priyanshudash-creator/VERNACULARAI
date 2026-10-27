/**
 * VernacularAI API Test Suite
 * Tests all core backend endpoints directly via HTTP
 */

import http from 'http';
import app from '../app.js';

const TEST_PORT = 5055;
let server;
let baseUrl = `http://127.0.0.1:${TEST_PORT}/api/v1`;
let authToken = '';
let createdTranslationId = '';

const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: []
};

function assert(condition, testName) {
  stats.total++;
  if (condition) {
    stats.passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    stats.failed++;
    stats.failures.push(testName);
    console.error(`  ✗ FAIL: ${testName}`);
  }
}

async function api(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  return { status: response.status, data };
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting VernacularAI Full API Test Suite');
  console.log('======================================================\n');

  // Start temporary test server
  server = app.listen(TEST_PORT);
  await new Promise(r => setTimeout(r, 200));

  try {
    // Test 1: Health Check
    console.log('[Group 1: System Health]');
    const health = await api('/health');
    assert(health.status === 200 && health.data?.status === 'ok', 'GET /api/v1/health returns 200 and status ok');

    // Test 2: Registration
    console.log('\n[Group 2: Authentication & Security]');
    const testEmail = `teacher_${Date.now()}@jharkhand.edu.in`;
    const regRes = await api('/auth/register', {
      method: 'POST',
      body: {
        fullName: 'Meena Hembram',
        email: testEmail,
        password: 'Password123!',
        school: 'GPS Dumka',
        district: 'Dumka',
        teachingGrade: 'Grade 2',
        preferredLanguage: 'Santhali'
      }
    });
    assert(regRes.status === 201 && regRes.data?.success === true, 'POST /api/v1/auth/register creates new user');
    assert(Boolean(regRes.data?.token), 'POST /api/v1/auth/register returns JWT token');

    // Test 3: Duplicate Registration Rejection
    const dupRes = await api('/auth/register', {
      method: 'POST',
      body: {
        fullName: 'Meena Hembram',
        email: testEmail,
        password: 'Password123!'
      }
    });
    assert(dupRes.status === 409 && dupRes.data?.success === false, 'POST /api/v1/auth/register rejects duplicate email with 409');

    // Test 4: Login with valid credentials
    const loginRes = await api('/auth/login', {
      method: 'POST',
      body: {
        email: testEmail,
        password: 'Password123!'
      }
    });
    assert(loginRes.status === 200 && loginRes.data?.success === true, 'POST /api/v1/auth/login succeeds with valid credentials');
    authToken = loginRes.data?.token;

    // Test 5: Login with wrong password
    const badLoginRes = await api('/auth/login', {
      method: 'POST',
      body: {
        email: testEmail,
        password: 'WrongPassword999!'
      }
    });
    assert(badLoginRes.status === 401, 'POST /api/v1/auth/login rejects invalid password with 401');

    // Test 6: Protected route with JWT token
    const meRes = await api('/auth/me');
    assert(meRes.status === 200 && meRes.data?.user?.email === testEmail, 'GET /api/v1/auth/me returns current user profile with valid token');

    // Test 7: Protected route rejection without token
    const unauthRes = await api('/auth/me', { headers: { Authorization: '' } });
    assert(unauthRes.status === 401, 'GET /api/v1/auth/me rejects request without token with 401');

    // Test 8: Profile Update
    const updateRes = await api('/auth/profile', {
      method: 'PUT',
      body: { school: 'Upgraded Model Primary School, Dumka' }
    });
    assert(updateRes.status === 200 && updateRes.data?.user?.school?.includes('Upgraded Model'), 'PUT /api/v1/auth/profile updates profile');

    // Test 9: Translation execution (Hindi -> Odia)
    console.log('\n[Group 3: Real AI Translation]');
    const transRes = await api('/translate', {
      method: 'POST',
      body: {
        text: 'बच्चों आज हम गिनती सीखेंगे',
        sourceLang: 'hindi',
        targetLang: 'odia'
      }
    });
    assert(transRes.status === 200 && transRes.data?.success === true, 'POST /api/v1/translate returns 200 and success');
    assert(Boolean(transRes.data?.data?.translatedText), `POST /api/v1/translate returned translated text: "${transRes.data?.data?.translatedText}"`);
    createdTranslationId = transRes.data?.data?._id;

    // Test 10: Translation rejection on empty text
    const emptyTransRes = await api('/translate', {
      method: 'POST',
      body: { text: '   ', sourceLang: 'hindi', targetLang: 'odia' }
    });
    assert(emptyTransRes.status === 400, 'POST /api/v1/translate rejects empty text with 400');

    // Test 11: Translation History Retrieval
    console.log('\n[Group 4: Translation History & Ownership]');
    const histRes = await api('/translations');
    assert(histRes.status === 200 && Array.isArray(histRes.data?.data), 'GET /api/v1/translations returns user translation array');

    // Test 12: Delete single translation record
    if (createdTranslationId) {
      const delRes = await api(`/translations/${createdTranslationId}`, { method: 'DELETE' });
      assert(delRes.status === 200 && delRes.data?.success === true, 'DELETE /api/v1/translations/:id removes record');
    }

    // Test 13: Lesson Generation
    console.log('\n[Group 5: Lessons & Copilot]');
    const lessonRes = await api('/lessons/generate', {
      method: 'POST',
      body: {
        topic: 'Numbers 1 to 20',
        grade: 'Grade 2',
        subject: 'Mathematics',
        targetLanguage: 'Odia',
        difficulty: 'Beginner'
      }
    });
    assert(lessonRes.status === 200 && Boolean(lessonRes.data?.data?.teacherExplanationHindi), 'POST /api/v1/lessons/generate produces bilingual lesson plan');

    // Test 14: Lessons Catalog Retrieval
    const catalogRes = await api('/lessons');
    assert(catalogRes.status === 200 && catalogRes.data?.data?.length > 0, 'GET /api/v1/lessons returns lessons list');

    // Test 15: AI Copilot Chat
    const copilotRes = await api('/copilot/chat', {
      method: 'POST',
      body: {
        message: 'Explain subtraction to Grade 2 students',
        grade: 'Grade 2',
        language: 'Santhali'
      }
    });
    assert(copilotRes.status === 200 && Boolean(copilotRes.data?.data?.breakdown), 'POST /api/v1/copilot/chat returns structured pedagogy breakdown');

    // Test 16: Students List
    console.log('\n[Group 6: Students Roster]');
    const stdRes = await api('/students');
    assert(stdRes.status === 200 && stdRes.data?.data?.length > 0, 'GET /api/v1/students returns student roster');

    console.log('\n======================================================');
    console.log(`📊 Test Summary: ${stats.passed}/${stats.total} Tests Passed (${stats.failed} failed)`);
    console.log('======================================================\n');
  } catch (err) {
    console.error('[Test Suite Error]', err);
  } finally {
    server.close();
    process.exit(stats.failed > 0 ? 1 : 0);
  }
}

runTests();
