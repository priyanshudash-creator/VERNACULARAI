import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TEACHER_PROFILE } from '../data/mockData';
import authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vernacular_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return TEACHER_PROFILE;
      }
    }
    return TEACHER_PROFILE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('vernacular_is_authenticated');
    const token = localStorage.getItem('vernacular_token');
    if (token) return true;
    return savedAuth !== null ? JSON.parse(savedAuth) : true;
  });

  const [loading, setLoading] = useState(true);

  // Sync session on mount with backend if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('vernacular_token');
      if (token) {
        try {
          const res = await authService.getMe();
          if (res?.user) {
            setUser(res.user);
            setIsAuthenticated(true);
            localStorage.setItem('vernacular_auth_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('[Auth] Token validation error:', err.message);
        }
      }
      setLoading(false);
    };

    initAuth();

    // Listen for session expiry event
    const handleAuthExpired = () => {
      setIsAuthenticated(false);
      localStorage.setItem('vernacular_is_authenticated', JSON.stringify(false));
    };

    window.addEventListener('vernacular:auth-expired', handleAuthExpired);
    return () => window.removeEventListener('vernacular:auth-expired', handleAuthExpired);
  }, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem('vernacular_auth_user', JSON.stringify(user));
      localStorage.setItem('vernacular_is_authenticated', JSON.stringify(true));
    } else {
      localStorage.setItem('vernacular_is_authenticated', JSON.stringify(false));
    }
  }, [user, isAuthenticated]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const authenticatedUser = response.user || {
        ...TEACHER_PROFILE,
        email: email.includes('@') ? email : TEACHER_PROFILE.email,
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setUser(authenticatedUser);
      setIsAuthenticated(true);
      return authenticatedUser;
    } catch (error) {
      // If backend is unreachable, provide smooth fallback with validation
      if (error.status === 0) {
        if (!email || !password) throw new Error("Please enter both email/phone and password");
        if (password.length < 8) throw new Error("Password must be at least 8 characters");

        const fallbackUser = {
          ...TEACHER_PROFILE,
          email: email.includes('@') ? email : TEACHER_PROFILE.email,
          lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setUser(fallbackUser);
        setIsAuthenticated(true);
        return fallbackUser;
      }
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const payload = {
        fullName: data.fullName || data.name,
        email: data.email,
        password: data.password || 'Password123!',
        mobile: data.mobile || data.phone,
        school: data.school,
        state: data.state,
        district: data.district,
        teachingGrade: data.grade || data.teachingGrade,
        preferredLanguage: data.preferredLanguage || data.primaryLanguage
      };

      const response = await authService.register(payload);
      const newUser = response.user || {
        ...TEACHER_PROFILE,
        name: data.fullName || "Sunita Kumari",
        email: data.email,
        phone: data.mobile,
        school: data.school,
        state: data.state,
        district: data.district,
        grade: data.grade,
        primaryLanguage: data.preferredLanguage
      };

      setUser(newUser);
      setIsAuthenticated(true);
      return newUser;
    } catch (error) {
      if (error.status === 0) {
        // Offline fallback
        const newUser = {
          ...TEACHER_PROFILE,
          name: data.fullName || "Sunita Kumari",
          email: data.email || "sunita.kumari@jharkhand.edu.in",
          phone: data.mobile || "+91 98351 44210",
          school: data.school || "Government Primary School, Kendua",
          state: data.state || "Jharkhand",
          district: data.district || "Dumka",
          grade: data.grade || "Grade 2",
          primaryLanguage: data.preferredLanguage || "Santhali"
        };
        setUser(newUser);
        setIsAuthenticated(true);
        return newUser;
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore
    } finally {
      setIsAuthenticated(false);
      localStorage.removeItem('vernacular_is_authenticated');
      localStorage.removeItem('vernacular_token');
    }
  };

  const updateProfile = async (updatedFields) => {
    try {
      const res = await authService.updateProfile(updatedFields);
      if (res?.user) {
        setUser(res.user);
        return res.user;
      }
    } catch (e) {
      console.warn('[Auth] Update profile remote sync warning:', e.message);
    }

    setUser(prev => {
      const next = { ...prev, ...updatedFields };
      localStorage.setItem('vernacular_auth_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
