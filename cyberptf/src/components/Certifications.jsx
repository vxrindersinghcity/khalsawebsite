import React from 'react';
import { Database, Shield, ChevronRight, Lock } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    'Certified Ethical Hacker (CEH)',
    'CISSP - Information Security',
    'CompTIA Security+',
    'OSCP - Offensive Security'
  ];

  return (
    <div>
      <div className="section-header">
        <Database className="section-icon" />
        <h2 className="section-title">Certifications</h2>
      </div>
      
      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-item">
            <Shield className="cert-icon" />
            <span className="cert-text">{cert}</span>
            <ChevronRight className="cert-arrow" />
          </div>
        ))}
      </div>
      
      <div className="cert-note">
        <p className="cert-note-text">
          <Lock className="cert-note-icon" />
          Continuously updating skills and pursuing advanced certifications in emerging cybersecurity domains.
        </p>
      </div>
    </div>
  );
};

export default Certifications;