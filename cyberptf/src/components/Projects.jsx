import React from 'react';
import { Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Advanced Penetration Testing Suite',
      description: 'Comprehensive toolkit for network vulnerability assessment with automated reporting and compliance checking.',
      tech: ['Python', 'Nmap', 'Metasploit', 'Burp Suite'],
      status: 'Production'
    },
    {
      title: 'Zero-Trust Security Framework',
      description: 'Enterprise-grade security architecture implementation with multi-factor authentication and continuous monitoring.',
      tech: ['Docker', 'Kubernetes', 'OAuth 2.0', 'SIEM'],
      status: 'Active'
    },
    {
      title: 'Cryptographic Hash Analyzer',
      description: 'Real-time encryption/decryption tool with support for modern algorithms and quantum-resistant protocols.',
      tech: ['C++', 'OpenSSL', 'AES', 'RSA'],
      status: 'Research'
    }
  ];

  const ProjectCard = ({ project }) => (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className={`project-status ${project.status.toLowerCase()}`}>
          {project.status}
        </span>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="tech-tags">
        {project.tech.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="section-header">
        <Code className="section-icon" />
        <h2 className="section-title">Featured Projects</h2>
      </div>
      
      <div>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;