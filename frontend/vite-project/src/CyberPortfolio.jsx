import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Terminal, Globe, Mail, Github, Linkedin, Download, ChevronRight, Code, Database, Wifi, Bug } from 'lucide-react';
import pfp from './pfp.png';
const CyberPortfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: 'Penetration Testing', level: 95, icon: Bug },
    { name: 'Network Security', level: 90, icon: Wifi },
    { name: 'Ethical Hacking', level: 88, icon: Terminal },
    { name: 'Cryptography', level: 85, icon: Lock },
    { name: 'Incident Response', level: 82, icon: Shield },
    { name: 'Secure Coding', level: 80, icon: Code }
  ];

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

  const certifications = [
    'Certified Ethical Hacker (CEH)',
    'CISSP - Information Security',
    'CompTIA Security+',
    'OSCP - Offensive Security'
  ];

  const SkillBar = ({ skill }) => (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <skill.icon style={{ width: '16px', height: '16px', color: '#00ffff', marginRight: '8px' }} />
          <span style={{ color: '#d1d5db', fontWeight: '500', fontSize: '14px' }}>{skill.name}</span>
        </div>
        <span style={{ color: '#00ffff', fontSize: '14px', fontFamily: 'monospace' }}>{skill.level}%</span>
      </div>
      <div style={{ width: '100%', backgroundColor: '#1f2937', borderRadius: '9999px', height: '8px' }}>
        <div 
          style={{ 
            background: 'linear-gradient(to right, #06b6d4, #3b82f6)', 
            height: '8px', 
            borderRadius: '9999px', 
            transition: 'all 1s ease-out',
            width: `${skill.level}%`
          }}
        ></div>
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div style={{
      backgroundColor: 'rgba(31, 41, 55, 0.5)',
      backdropFilter: 'blur(12px)',
      border: '1px solid #374151',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
      e.target.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.1)';
    }}
    onMouseLeave={(e) => {
      e.target.style.borderColor = '#374151';
      e.target.style.boxShadow = 'none';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>{project.title}</h3>
        <span style={{
          padding: '4px 8px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: project.status === 'Production' ? 'rgba(34, 197, 94, 0.2)' : 
                         project.status === 'Active' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(234, 179, 8, 0.2)',
          color: project.status === 'Production' ? '#4ade80' : 
                 project.status === 'Active' ? '#60a5fa' : '#facc15'
        }}>
          {project.status}
        </span>
      </div>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>{project.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.tech.map((tech, index) => (
          <span key={index} style={{
            padding: '4px 8px',
            backgroundColor: 'rgba(55, 65, 81, 0.5)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#00ffff',
            fontFamily: 'monospace'
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)',
      color: 'white',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 2fr' : '1fr',
      gap: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 16px'
    },
    profileCard: {
      backgroundColor: 'rgba(31, 41, 55, 0.3)',
      backdropFilter: 'blur(24px)',
      border: '1px solid #374151',
      borderRadius: '16px',
      padding: '32px',
      position: window.innerWidth >= 1024 ? 'sticky' : 'static',
      top: '32px',
      height: 'fit-content'
    },
    profileImage: {
      width: '128px',
      height: '128px',
      margin: '0 auto 24px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: '-8px',
      right: '-8px',
      width: '32px',
      height: '32px',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      border: '4px solid #1f2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      textAlign: 'center',
      padding: '12px',
      backgroundColor: 'rgba(55, 65, 81, 0.3)',
      borderRadius: '8px'
    },
    contactLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: 'rgba(55, 65, 81, 0.3)',
      borderRadius: '8px',
      marginBottom: '12px',
      textDecoration: 'none',
      color: 'white',
      transition: 'background-color 0.3s ease'
    },
    downloadBtn: {
      width: '100%',
      background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    navButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginBottom: '32px'
    },
    navButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    contentArea: {
      backgroundColor: 'rgba(31, 41, 55, 0.2)',
      backdropFilter: 'blur(12px)',
      border: '1px solid #374151',
      borderRadius: '16px',
      padding: '32px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainGrid}>
        
        {/* Left Sidebar - Profile Card */}
        <div style={styles.profileCard}>
          
          {/* Profile Image */}
          <div style={styles.profileImage}>
          <img src={pfp} alt="Profile Picture" style={styles.profileImage} />
            <div style={styles.onlineIndicator}>
              <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
            </div>
          </div>

          {/* Name & Title */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Varinder Singh</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <Terminal style={{ width: '16px', height: '16px', color: '#00ffff', marginRight: '8px' }} />
              <span style={{ color: '#00ffff', fontFamily: 'monospace', fontSize: '14px' }}>
                {isTyping ? 'Cybersecurity Specialist_' : 'Cybersecurity Specialist'}
              </span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Ethical Hacker & Security Architect</p>
          </div>

          {/* Quick Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ffff' }}>50+</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Projects</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>5+</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Years Exp</div>
            </div>
          </div>

          {/* Contact Links */}
          <div style={{ marginBottom: '24px' }}>
            <a href="mailto:vxrindersingh@gmail.com" style={styles.contactLink}>
              <Mail style={{ width: '16px', height: '16px', color: '#00ffff', marginRight: '12px' }} />
              <span style={{ fontSize: '14px' }}>vxrindersingh@gmail.com</span>
            </a>
            <a href="https://github.com/vxrindersinghcity" style={styles.contactLink}>
              <Github style={{ width: '16px', height: '16px', color: '#00ffff', marginRight: '12px' }} />
              <span style={{ fontSize: '14px' }}>GitHub Profile</span>
            </a>
            <a href="https://www.linkedin.com/in/varinder-singh-uk13/" style={styles.contactLink}>
              <Linkedin style={{ width: '16px', height: '16px', color: '#00ffff', marginRight: '12px' }} />
              <span style={{ fontSize: '14px' }}>LinkedIn Profile</span>
            </a>
          </div>

          {/* Download CV Button */}
          <button style={styles.downloadBtn}>
            <Download style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Download Resume
          </button>
        </div>

        {/* Right Content Area */}
        <div>
          
          {/* Navigation */}
          <div style={styles.navButtons}>
            {['about', 'skills', 'projects', 'certifications'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                style={{
                  ...styles.navButton,
                  backgroundColor: activeSection === section ? '#06b6d4' : 'rgba(31, 41, 55, 0.5)',
                  color: activeSection === section ? 'white' : '#d1d5db'
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div style={styles.contentArea}>
            
            {/* About Section */}
            {activeSection === 'about' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <Eye style={{ width: '24px', height: '24px', color: '#00ffff', marginRight: '12px' }} />
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>About Me</h2>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '16px' }}>
                    I'm a passionate cybersecurity professional with over 5 years of experience in ethical hacking, 
                    penetration testing, and security architecture. My expertise spans across network security, 
                    vulnerability assessment, and incident response.
                  </p>
                  <p style={{ color: '#d1d5db', lineHeight: '1.6', marginBottom: '16px' }}>
                    I specialize in identifying security vulnerabilities, implementing robust defense mechanisms, 
                    and ensuring compliance with industry standards. My approach combines technical expertise 
                    with strategic thinking to protect organizations from evolving cyber threats.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr', gap: '16px', marginTop: '24px' }}>
                    <div style={{ padding: '16px', backgroundColor: 'rgba(55, 65, 81, 0.3)', borderRadius: '8px' }}>
                      <Globe style={{ width: '24px', height: '24px', color: '#00ffff', marginBottom: '8px' }} />
                      <h3 style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px' }}>Location</h3>
                      <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>United Kingdom</p>
                    </div>
                    <div style={{ padding: '16px', backgroundColor: 'rgba(55, 65, 81, 0.3)', borderRadius: '8px' }}>
                      <Shield style={{ width: '24px', height: '24px', color: '#10b981', marginBottom: '8px' }} />
                      <h3 style={{ fontWeight: '600', marginBottom: '4px', fontSize: '16px' }}>Status</h3>
                      <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Available for Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <Terminal style={{ width: '24px', height: '24px', color: '#00ffff', marginRight: '12px' }} />
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Technical Skills</h2>
                </div>
                <div>
                  {skills.map((skill, index) => (
                    <SkillBar key={index} skill={skill} />
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <Code style={{ width: '24px', height: '24px', color: '#00ffff', marginRight: '12px' }} />
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Featured Projects</h2>
                </div>
                <div>
                  {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Section */}
            {activeSection === 'certifications' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                  <Database style={{ width: '24px', height: '24px', color: '#00ffff', marginRight: '12px' }} />
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Certifications</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1fr' : '1fr', gap: '16px' }}>
                  {certifications.map((cert, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <Shield style={{ width: '20px', height: '20px', color: '#10b981', marginRight: '12px' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', flex: 1 }}>{cert}</span>
                      <ChevronRight style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: 'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontSize: '14px', color: '#67e8f9', margin: 0 }}>
                    <Lock style={{ width: '16px', height: '16px', display: 'inline', marginRight: '8px' }} />
                    Continuously updating skills and pursuing advanced certifications in emerging cybersecurity domains.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberPortfolio;