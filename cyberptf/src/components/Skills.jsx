import React from 'react';
import { Terminal, Bug, Wifi, Lock, Shield, Code } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: 'Penetration Testing', level: 95, icon: Bug },
    { name: 'Network Security', level: 90, icon: Wifi },
    { name: 'Ethical Hacking', level: 88, icon: Terminal },
    { name: 'Cryptography', level: 85, icon: Lock },
    { name: 'Incident Response', level: 82, icon: Shield },
    { name: 'Secure Coding', level: 80, icon: Code }
  ];

  const SkillBar = ({ skill }) => (
    <div className="skill-item">
      <div className="skill-header">
        <div className="skill-name-group">
          <skill.icon className="skill-icon" />
          <span className="skill-name">{skill.name}</span>
        </div>
        <span className="skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-header">
        <Terminal className="section-icon" />
        <h2 className="section-title">Technical Skills</h2>
      </div>
      
      <div>
        {skills.map((skill, index) => (
          <SkillBar key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;