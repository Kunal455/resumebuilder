import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  year: String
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String
});

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  linkedin: String,
  github: String,
  photo: String, // Stores base64 encoded image or URL
  summary: String,
  education: [educationSchema],
  skills: [String],
  experience: [experienceSchema],
  projects: [projectSchema],
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;