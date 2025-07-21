import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
    photo: null,
    summary: '',
    education: [{ institution: '', degree: '', year: '' }],
    skills: [''],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    projects: [{ title: '', description: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayChange = (field, index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...form[field]];
    updatedItems[index][name] = value;
    setForm({ ...form, [field]: updatedItems });
  };

  const addNewEntry = (field) => {
    const defaultEntry = {
      education: { institution: '', degree: '', year: '' },
      experience: { company: '', role: '', duration: '', description: '' },
      projects: { title: '', description: '' },
      skills: '',
    }[field];
    setForm({ ...form, [field]: [...form[field], defaultEntry] });
  };

  const removeEntry = (field, index) => {
    const updatedItems = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updatedItems });
  };

  const componentRef = useRef();

  return (
    <div className="container">
      <h1>📝 Advanced Resume Builder</h1>
      <div className="main">
        <form className="form">
          <h2>Personal Details</h2>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" onChange={handleChange} />
          <input type="text" name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
          <input type="text" name="github" placeholder="GitHub URL" onChange={handleChange} />
          
          <div className="photo-upload">
            <label>Upload Photo:</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>

          <h2>Professional Summary</h2>
          <textarea name="summary" placeholder="Brief summary about yourself" onChange={handleChange}></textarea>

          <h2>Education</h2>
          {form.education.map((edu, index) => (
            <div key={index} className="entry">
              <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange('education', index, e)} />
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, e)} />
              <input type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange('education', index, e)} />
              {form.education.length > 1 && (
                <button type="button" onClick={() => removeEntry('education', index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry('education')}>Add Education</button>

          <h2>Skills</h2>
          {form.skills.map((skill, index) => (
            <div key={index} className="entry">
              <input type="text" placeholder="Skill" value={skill} onChange={(e) => {
                const updatedSkills = [...form.skills];
                updatedSkills[index] = e.target.value;
                setForm({ ...form, skills: updatedSkills });
              }} />
              {form.skills.length > 1 && (
                <button type="button" onClick={() => removeEntry('skills', index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry('skills')}>Add Skill</button>

          <h2>Work Experience</h2>
          {form.experience.map((exp, index) => (
            <div key={index} className="entry">
              <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange('experience', index, e)} />
              <input type="text" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', index, e)} />
              <input type="text" name="duration" placeholder="Duration (e.g., 2020-2022)" value={exp.duration} onChange={(e) => handleArrayChange('experience', index, e)} />
              <textarea name="description" placeholder="Job Description" value={exp.description} onChange={(e) => handleArrayChange('experience', index, e)}></textarea>
              {form.experience.length > 1 && (
                <button type="button" onClick={() => removeEntry('experience', index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry('experience')}>Add Experience</button>

          <h2>Projects</h2>
          {form.projects.map((project, index) => (
            <div key={index} className="entry">
              <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={(e) => handleArrayChange('projects', index, e)} />
              <textarea name="description" placeholder="Project Description" value={project.description} onChange={(e) => handleArrayChange('projects', index, e)}></textarea>
              {form.projects.length > 1 && (
                <button type="button" onClick={() => removeEntry('projects', index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addNewEntry('projects')}>Add Project</button>
        </form>

        {/* Resume Preview */}
        <div className="preview" ref={componentRef}>
          <h2>📄 Resume Preview</h2>
          <div className="header">
            {form.photo && <img src={form.photo} alt="Profile" className="photo" />}
            <div>
              <h1>{form.name}</h1>
              <p>{form.email} | {form.phone}</p>
              <p>{form.address}</p>
              <p>
                {form.linkedin && <a href={form.linkedin}>LinkedIn</a>}
                {form.github && <span> | <a href={form.github}>GitHub</a></span>}
              </p>
            </div>
          </div>

          <div className="section">
            <h3>SUMMARY</h3>
            <p>{form.summary}</p>
          </div>

          <div className="section">
            <h3>EDUCATION</h3>
            {form.education.map((edu, index) => (
              <div key={index}>
                <p><strong>{edu.institution}</strong> - {edu.degree} ({edu.year})</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h3>SKILLS</h3>
            <ul>
              {form.skills.map((skill, index) => (
                skill && <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h3>EXPERIENCE</h3>
            {form.experience.map((exp, index) => (
              <div key={index}>
                <p><strong>{exp.company}</strong> - {exp.role} ({exp.duration})</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="section">
            <h3>PROJECTS</h3>
            {form.projects.map((project, index) => (
              <div key={index}>
                <p><strong>{project.title}</strong></p>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
