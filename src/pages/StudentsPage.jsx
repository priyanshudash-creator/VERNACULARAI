import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDENTS_DATA } from '../data/mockData';
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredStudents = STUDENTS_DATA.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search);
    const matchFilter = filterStatus === 'All' || s.progressStatus === filterStatus;
    return matchSearch && matchFilter;
  }).sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'attendance') return parseInt(b.attendance) - parseInt(a.attendance);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-brand-500/20 text-brand-600">
              <Users className="w-5 h-5 text-brand-600" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-950 dark:text-white">
              Grade 2 Student Roster
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
              28 Students Enrolled
            </span>
          </div>
          <p className="text-xs text-navy-500 dark:text-navy-400">
            Government Primary School, Kendua • Mother Tongue FLN Tracking & Attendance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            Average Attendance: 91.4%
          </div>
        </div>
      </div>

      {/* Controls Bar (Section 39) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-navy-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name or roll..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-navy-50 dark:bg-navy-950/60 border border-navy-200 dark:border-darkborder rounded-xl text-navy-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-navy-400" />
            <span className="text-navy-500">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1 rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder font-medium"
            >
              <option value="All">All Students</option>
              <option value="Excellent">Excellent</option>
              <option value="Needs Support">Needs Support</option>
              <option value="Average">Average</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-navy-400" />
            <span className="text-navy-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 rounded-lg bg-navy-50 dark:bg-navy-950 border border-navy-200 dark:border-darkborder font-medium"
            >
              <option value="name">Name (A-Z)</option>
              <option value="score">Score (High-Low)</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Table (Section 39) */}
      <div className="bg-white dark:bg-darkcard border border-navy-200 dark:border-darkborder rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-50 dark:bg-navy-950/80 border-b border-navy-200 dark:border-darkborder text-[11px] font-bold uppercase tracking-wider text-navy-600 dark:text-navy-400">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4 text-center">Attendance</th>
                <th className="py-3.5 px-4 text-center">Lessons</th>
                <th className="py-3.5 px-4 text-center">Score</th>
                <th className="py-3.5 px-4">Language</th>
                <th className="py-3.5 px-4">Progress Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 dark:divide-darkborder/60">
              {filteredStudents.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-navy-50/50 dark:hover:bg-navy-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${s.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-xs`}>
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-navy-900 dark:text-white">
                          {s.name}
                        </div>
                        <div className="text-[10px] text-navy-400">
                          Roll No: {s.rollNo} • {s.village}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-semibold text-navy-800 dark:text-navy-200">
                    {s.attendance}
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono text-navy-700 dark:text-navy-300">
                    {s.lessonsCompleted}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-navy-950 dark:text-white">
                      {s.score}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-brand-700 dark:text-brand-300">
                    {s.motherTongue}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      s.progressStatus === 'Excellent'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : s.progressStatus === 'Needs Support'
                        ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                        : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                    }`}>
                      {s.progressStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/students/${s.id}`}
                      className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950 hover:bg-brand-100 text-brand-700 dark:text-brand-300 font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
