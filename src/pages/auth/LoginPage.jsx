import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/common/Logo';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Radio,
  WifiOff,
  BookOpen
} from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('sunita.kumari@jharkhand.edu.in');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your registered email or mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('sunita.kumari@jharkhand.edu.in');
    setPassword('Password123!');
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column (Brand & Illustrations) */}
        <div className="bg-gradient-to-br from-brand-900 via-brand-850 to-navy-950 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-6 relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                Teach in Hindi. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300">
                  Learn in Your Mother Tongue.
                </span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                Empowering government primary teachers with real-time vernacular translation, NIPUN Bharat pedagogy, and offline AI for tribal classrooms.
              </p>
            </div>

            {/* Feature Badges (Section 21) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-300">
                  <Radio className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Real-Time Voice Translation</h4>
                  <p className="text-[11px] text-slate-300">Two-way Hindi ↔ Santhali audio in under 1.8s</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                  <WifiOff className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Offline AI Edge Engine</h4>
                  <p className="text-[11px] text-slate-300">Runs locally on tablet without active internet</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">FLN Vernacular Pedagogy</h4>
                  <p className="text-[11px] text-slate-300">Santhali • Ho • Mundari tribal language support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span>SCERT Jharkhand Pilot Framework</span>
            <span className="font-mono text-amber-300">v2.4 Prototype</span>
          </div>
        </div>

        {/* Right Column (Login Form) */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-navy-950 dark:text-white">
              Teacher Sign In
            </h3>
            <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
              Enter your credentials to access your classroom dashboard
            </p>
          </div>

          {/* Quick Demo Credentials Fill Button */}
          <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-brand-900 dark:text-brand-300 block">
                Demo Teacher Profile:
              </span>
              <span className="text-[11px] text-brand-700 dark:text-brand-400">
                Sunita Kumari (Grade 2 • GPS Dumka)
              </span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-2.5 py-1 text-[11px] font-bold bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors shadow-xs"
            >
              Autofill
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Email / Mobile Number
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.edu.in or 98XXXXXXXX"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 8+ characters"
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-navy-400 hover:text-navy-700 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-navy-700 dark:text-navy-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-navy-300 text-brand-600 focus:ring-brand-500"
                />
                <span>Remember me on this tablet</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to Classroom</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-200 dark:border-darkborder"></div>
            </div>
            <span className="relative bg-white dark:bg-darkcard px-3 text-[11px] text-navy-400 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2.5 rounded-xl border border-navy-200 dark:border-darkborder text-xs font-semibold text-navy-800 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google / Diksha SSO</span>
          </button>

          <p className="text-center text-xs text-navy-600 dark:text-navy-400">
            Don't have a teacher account?{' '}
            <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
