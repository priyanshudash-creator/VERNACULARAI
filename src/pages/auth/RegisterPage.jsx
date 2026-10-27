import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import {
  User,
  Mail,
  Phone,
  School,
  MapPin,
  GraduationCap,
  Languages,
  Lock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    school: '',
    state: 'Jharkhand',
    district: '',
    teachingGrade: 'Grade 2',
    preferredLanguage: 'Santhali',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const states = ['Jharkhand', 'Odisha', 'West Bengal', 'Chhattisgarh', 'Other'];
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
  const languages = SUPPORTED_LANGUAGES.map(l => l.name);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.school || !formData.district) {
      setError('Please fill in all required profile fields.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        school: formData.school,
        state: formData.state,
        district: formData.district,
        grade: formData.teachingGrade,
        preferredLanguage: formData.preferredLanguage,
        password: formData.password
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed.');
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder text-center space-y-4 shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white">
            Registration Successful!
          </h2>
          <p className="text-xs text-navy-600 dark:text-navy-300 leading-relaxed">
            Welcome to VernacularAI, <strong>{formData.fullName}</strong>. Initializing offline language packs for {formData.preferredLanguage}...
          </p>
          <div className="pt-2 text-[11px] text-brand-600 font-semibold animate-pulse">
            Redirecting to teacher classroom dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6">
        <div className="border-b border-navy-100 dark:border-darkborder pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
                Register Primary School Teacher
              </h2>
              <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">
                Configure your school and mother-tongue classroom environment
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-200 dark:border-brand-800">
              Government School Onboarding
            </span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Full Name *
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Sunita Kumari"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Email Address *
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="teacher@school.edu.in"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 98351 XXXXX"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                School Name *
              </label>
              <div className="relative flex items-center">
                <School className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="school"
                  required
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="e.g. GPS Kendua, Sadar Block"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                District *
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="e.g. Dumka / Ranchi / West Singhbhum"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Teaching Grade
              </label>
              <select
                name="teachingGrade"
                value={formData.teachingGrade}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {grades.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Classroom Mother Tongue
              </label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Password *
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                Confirm Password *
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-navy-400 absolute left-3 pointer-events-none" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Registering Teacher Profile..." : "Complete Registration & Launch"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-navy-600 dark:text-navy-400">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
