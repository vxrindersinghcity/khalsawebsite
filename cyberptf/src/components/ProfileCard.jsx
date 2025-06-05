import React, { useState, useEffect } from 'react';
import pfp from '../pfp.png';
import { Shield, Terminal, Mail, Github, Linkedin, Download } from 'lucide-react';

const ProfileCard = () => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="profile-card">
      
      {/* Profile Image */}
      <div className="profile-image">
        <img 
          src={pfp}
          alt="Varinder Singh Profile" 
          style={{ 
            width: '100%', 
            height: '100%', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '3px solid #00ffff'
          }} 
        />
      </div>

      {/* Name & Title */}
      <div className="profile-info">
        <h1 className="profile-name">Varinder Singh</h1>
        <div className="profile-title">
          <Terminal className="contact-icon" />
          <span className="title-text">
            {isTyping ? 'Cybersecurity Specialist_' : 'Cybersecurity Specialist'}
          </span>
        </div>
        <p className="profile-subtitle">Ethical Hacker & Security Architect</p>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number cyan">50+</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-number green">5+</div>
          <div className="stat-label">Years Exp</div>
        </div>
      </div>

      {/* Contact Links */}
      <div className="contact-links">
        <a href="mailto:vxrindersingh@gmail.com" className="contact-link">
          <Mail className="contact-icon" />
          <span className="contact-text">vxrindersingh@gmail.com</span>
        </a>
        <a href="https://github.com/vxrindersinghcity" className="contact-link">
          <Github className="contact-icon" />
          <span className="contact-text">GitHub Profile</span>
        </a>
        <a href="https://www.linkedin.com/in/varinder-singh-uk13/" className="contact-link">
          <Linkedin className="contact-icon" />
          <span className="contact-text">LinkedIn Profile</span>
        </a>
      </div>

      {/* Download CV Button */}
      <button className="download-btn" onClick={() => window.open('/CV.pdf', '_blank')}>
  <Download className="download-icon" />
  Download Resume
</button>
    </div>
  );
};

export default ProfileCard;