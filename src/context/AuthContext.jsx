import React, { createContext, useContext, useState, useEffect } from 'react';
import { TEACHER_PROFILE } from '../data/mockData';

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
    // Default demo user is logged in for smooth exploration, but can logout
    return TEACHER_PROFILE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('vernacular_is_authenticated');
    return savedAuth !== null ? JSON.parse(savedAuth) : true;
  });

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem('vernacular_auth_user', JSON.stringify(user));
      localStorage.setItem('vernacular_is_authenticated', JSON.stringify(true));
    } else {
      localStorage.setItem('vernacular_is_authenticated', JSON.stringify(false));
    }
  }, [user, isAuthenticated]);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error("Please enter both email/phone and password"));
          return;
        }
        if (password.length < 8) {
          reject(new Error("Password must be at least 8 characters"));
          return;
        }

        const authenticatedUser = {
          ...TEACHER_PROFILE,
          email: email.includes('@') ? email : TEACHER_PROFILE.email,
          lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setUser(authenticatedUser);
        setIsAuthenticated(true);
        resolve(authenticatedUser);
      }, 500);
    });
  };

  const register = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(newUser);
      }, 600);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vernacular_is_authenticated');
  };

  const updateProfile = (updatedFields) => {
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
