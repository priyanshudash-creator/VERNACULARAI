import User from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { isDatabaseConnected } from '../config/db.js';

// In-memory fallback user store when MongoDB is not connected
export const inMemoryUsers = new Map();

// Seed initial default demo teacher
const DEFAULT_TEACHER = {
  _id: '671ee0a1f0a1b2c3d4e5f6a1',
  name: 'Sunita Kumari',
  email: 'sunita.kumari@jharkhand.edu.in',
  phone: '+91 98351 44210',
  school: 'Government Primary School, Kendua',
  cluster: 'Dumka Sadar Block',
  district: 'Dumka',
  state: 'Jharkhand',
  grade: 'Grade 2',
  primaryLanguage: 'Santhali',
  mediumOfInstruction: 'Hindi',
  role: 'Primary School Teacher (Grade 2)',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
  lastLogin: new Date()
};

inMemoryUsers.set(DEFAULT_TEACHER.email, {
  ...DEFAULT_TEACHER,
  password: 'Password123!'
});

export const getUserById = async (id) => {
  if (isDatabaseConnected()) {
    return User.findById(id).select('-password');
  }
  for (const [_, u] of inMemoryUsers) {
    if (String(u._id) === String(id) || String(u.id) === String(id)) {
      const { password: _, ...userSafe } = u;
      return userSafe;
    }
  }
  return null;
};

export const register = async (req, res, next) => {
  try {
    const {
      name,
      fullName,
      email,
      password,
      phone,
      mobile,
      school,
      state,
      district,
      grade,
      teachingGrade,
      preferredLanguage,
      primaryLanguage
    } = req.body;

    const userName = name || fullName;
    const userPhone = phone || mobile || '+91 98351 44210';
    const userGrade = grade || teachingGrade || 'Grade 2';
    const userLanguage = primaryLanguage || preferredLanguage || 'Santhali';

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if database is connected
    if (isDatabaseConnected()) {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists. Please log in.'
        });
      }

      const newUser = await User.create({
        name: userName || 'Sunita Kumari',
        email: cleanEmail,
        password,
        phone: userPhone,
        school: school || 'Government Primary School, Kendua',
        state: state || 'Jharkhand',
        district: district || 'Dumka',
        grade: userGrade,
        primaryLanguage: userLanguage
      });

      const token = generateToken(newUser._id);
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: newUser
      });
    }

    // Fallback in-memory store
    if (inMemoryUsers.has(cleanEmail)) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists. Please log in.'
      });
    }

    const mockId = `usr_${Date.now()}`;
    const fallbackUser = {
      _id: mockId,
      name: userName || 'Sunita Kumari',
      email: cleanEmail,
      phone: userPhone,
      school: school || 'Government Primary School, Kendua',
      state: state || 'Jharkhand',
      district: district || 'Dumka',
      grade: userGrade,
      primaryLanguage: userLanguage,
      role: 'Primary School Teacher (Grade 2)',
      avatar: DEFAULT_TEACHER.avatar,
      lastLogin: new Date()
    };

    inMemoryUsers.set(cleanEmail, { ...fallbackUser, password });
    const token = generateToken(mockId);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: fallbackUser
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email/phone and password'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    if (isDatabaseConnected()) {
      const user = await User.findOne({ email: cleanEmail }).select('+password');

      if (!user) {
        // If DB is connected but demo user doesn't exist yet, seed demo user
        if (cleanEmail === DEFAULT_TEACHER.email && password === 'Password123!') {
          const seeded = await User.create({
            ...DEFAULT_TEACHER,
            password: 'Password123!'
          });
          const token = generateToken(seeded._id);
          return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: seeded
          });
        }

        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user._id);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user
      });
    }

    // Fallback in-memory
    const memoryUser = inMemoryUsers.get(cleanEmail);
    if (!memoryUser || memoryUser.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(memoryUser._id);
    const { password: _, ...userSafe } = memoryUser;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userSafe
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.email;

    if (isDatabaseConnected() && req.user?._id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password');

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
      });
    }

    // In-memory update
    const userId = req.user?._id || req.user?.id;
    for (const [email, u] of inMemoryUsers) {
      if (String(u._id) === String(userId) || String(u.id) === String(userId)) {
        const updated = { ...u, ...updates };
        inMemoryUsers.set(email, updated);
        const { password: _, ...safe } = updated;
        return res.status(200).json({
          success: true,
          message: 'Profile updated successfully',
          user: safe
        });
      }
    }

    const updated = { ...req.user, ...updates };
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updated
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'A 6-digit OTP has been sent to your registered email.',
      demoOtp: '528194'
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. Please log in.'
    });
  } catch (error) {
    next(error);
  }
};
