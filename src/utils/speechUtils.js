// Audio Speech Utility with Web Speech API and Synthetic Audio Fallbacks

class AudioSynthesizer {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.audioCtx = null;
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    return this.audioCtx;
  }

  // Play pleasant acoustic tones if browser lacks Santhali voice engine
  playAcousticChime(frequency = 440, duration = 0.3) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Acoustic chime fallback failed", e);
    }
  }

  speak(text, { lang = 'hi-IN', rate = 0.9, pitch = 1.0, onStart, onEnd } = {}) {
    if (!this.synth) {
      if (onStart) onStart();
      this.playAcousticChime(520, 0.4);
      setTimeout(() => { if (onEnd) onEnd(); }, 1200);
      return;
    }

    // Cancel existing
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Pick best matching voice
    const voices = this.synth.getVoices();
    const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    if (lang.includes('hi')) {
      utterance.lang = 'hi-IN';
    } else {
      // For tribal languages, fallback to standard or phonetics
      utterance.lang = 'hi-IN';
      utterance.rate = 0.82; // slightly slower for instructional clarity
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.warn("Speech synthesis notice:", e);
      this.playAcousticChime(480, 0.5);
      if (onEnd) onEnd();
    };

    // Trigger acoustic chime before starting speech for clear cue
    this.playAcousticChime(660, 0.15);
    setTimeout(() => {
      try {
        this.synth.speak(utterance);
      } catch (err) {
        if (onEnd) onEnd();
      }
    }, 150);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechSynthesizer = new AudioSynthesizer();
