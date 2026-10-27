import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false
    },
    phone: {
      type: String,
      default: '+91 98351 44210',
      trim: true
    },
    school: {
      type: String,
      default: 'Government Primary School, Kendua',
      trim: true
    },
    cluster: {
      type: String,
      default: 'Dumka Sadar Block',
      trim: true
    },
    district: {
      type: String,
      default: 'Dumka',
      trim: true
    },
    state: {
      type: String,
      default: 'Jharkhand',
      trim: true
    },
    grade: {
      type: String,
      default: 'Grade 2',
      trim: true
    },
    primaryLanguage: {
      type: String,
      default: 'Santhali',
      trim: true
    },
    mediumOfInstruction: {
      type: String,
      default: 'Hindi',
      trim: true
    },
    role: {
      type: String,
      default: 'Primary School Teacher (Grade 2)'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256'
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    resetPasswordOtp: {
      type: String,
      select: false
    },
    resetPasswordExpires: {
      type: Date,
      select: false
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields from JSON serialization
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordOtp;
  delete obj.resetPasswordExpires;
  delete obj.__v;
  return obj;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
