import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Input email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('sunita.kumari@jharkhand.edu.in');
  const [otp, setOtp] = useState(['5', '2', '8', '1', '9', '4']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your registered email or mobile number.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 700);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 600);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Forgot Password
              </h3>
              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                Enter your registered email or phone to receive a 6-digit recovery OTP
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                  Email / Mobile Number
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-navy-400 absolute left-3" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@school.edu.in"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Sending OTP..." : "Send Verification OTP"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Enter 6-Digit OTP
              </h3>
              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                We sent a verification code to <strong>{email}</strong>
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Verifying..." : "Verify Code"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-navy-500">
                Didn't receive code?{' '}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                Create New Password
              </h3>
              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                Choose a strong password with at least 8 characters
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-navy-400 absolute left-3" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-navy-400 absolute left-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Updating Password..." : "Update Password"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-4 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-navy-950 dark:text-white">
              Password Reset Successfully!
            </h3>
            <p className="text-xs text-navy-600 dark:text-navy-300">
              Your classroom login credentials have been securely updated.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-all"
            >
              Back to Teacher Login
            </button>
          </div>
        )}

        <div className="pt-2 text-center">
          <Link to="/login" className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            ← Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
