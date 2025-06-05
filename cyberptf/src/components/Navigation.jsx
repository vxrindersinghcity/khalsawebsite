import React from 'react';

const Navigation = ({ activeSection, setActiveSection }) => {
  const sections = ['about', 'skills', 'projects', 'certifications'];

  return (
    <div className="nav-buttons">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`nav-button ${activeSection === section ? 'active' : ''}`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Navigation;