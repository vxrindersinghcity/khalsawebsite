// Step 1: Create the AIChatbot.jsx component
// Save this as: src/components/AIChatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2 } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm Varinder's AI assistant. I can help you learn about his cybersecurity expertise, projects, and experience. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Enhanced knowledge base with pattern matching
  const knowledgeBase = {
    // Greetings
    greetings: {
      patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
      responses: [
        "Hello! I'm here to help you learn about Varinder's cybersecurity expertise. What interests you most?",
        "Hi there! Feel free to ask me about Varinder's skills, projects, or experience in cybersecurity.",
        "Hey! I'd be happy to tell you about Varinder's work in ethical hacking and security architecture."
      ]
    },

    // About/Experience
    experience: {
      patterns: ['experience', 'background', 'about', 'who is', 'tell me about'],
      responses: [
        "Varinder is a cybersecurity specialist with 5+ years of experience in ethical hacking, penetration testing, and security architecture. He's based in Southall, London and specializes in identifying vulnerabilities and implementing robust defense mechanisms.",
        "Varinder has extensive experience in network security, vulnerability assessment, and incident response. He combines technical expertise with strategic thinking to protect organizations from evolving cyber threats."
      ]
    },

    // Skills
    skills: {
      patterns: ['skills', 'expertise', 'technical', 'what can', 'abilities', 'specialization'],
      responses: [
        "Varinder's top skills include:\n• Penetration Testing (95%)\n• Network Security (90%)\n• Ethical Hacking (88%)\n• Cryptography (85%)\n• Incident Response (82%)\n• Secure Coding (80%)\n\nHe's proficient in Python, C++, Burp Suite, Metasploit, and various SIEM tools.",
        "His expertise spans across multiple cybersecurity domains including vulnerability assessment, security architecture, and compliance with industry standards. He's particularly skilled in identifying security vulnerabilities and implementing defense mechanisms."
      ]
    },

    // Projects
    projects: {
      patterns: ['projects', 'work', 'portfolio', 'what has he built', 'developed'],
      responses: [
        "Varinder has worked on several impressive projects:\n\n🔧 Advanced Penetration Testing Suite (Production)\n- Comprehensive toolkit for network vulnerability assessment\n- Automated reporting and compliance checking\n\n🛡️ Zero-Trust Security Framework (Active)\n- Enterprise-grade security architecture\n- Multi-factor authentication and continuous monitoring\n\n🔐 Cryptographic Hash Analyzer (Research)\n- Real-time encryption/decryption tool\n- Support for modern algorithms and quantum-resistant protocols"
      ]
    },

    // Certifications
    certifications: {
      patterns: ['certifications', 'certified', 'credentials', 'qualifications'],
      responses: [
        "Varinder holds several industry-recognized certifications:\n• Certified Ethical Hacker (CEH)\n• CISSP - Information Security\n• CompTIA Security+\n• OSCP - Offensive Security\n\nHe's continuously updating his skills and pursuing advanced certifications in emerging cybersecurity domains."
      ]
    },

    // Contact
    contact: {
      patterns: ['contact', 'reach', 'email', 'hire', 'available', 'get in touch'],
      responses: [
        "You can reach Varinder through:\n📧 Email: vxrindersingh@gmail.com\n💼 LinkedIn: linkedin.com/in/varinder-singh-uk13\n🔗 GitHub: github.com/vxrindersinghcity\n📍 Location: Southall, London, UK\n\nHe's currently available for cybersecurity projects and consultations!"
      ]
    },

    // Location
    location: {
      patterns: ['where', 'location', 'based', 'live'],
      responses: [
        "Varinder is based in Southall, London, UK. He's available for both remote and on-site cybersecurity consultations throughout the UK and internationally."
      ]
    },

    // Services
    services: {
      patterns: ['services', 'what does he do', 'help with', 'offer'],
      responses: [
        "Varinder offers comprehensive cybersecurity services including:\n• Penetration Testing & Vulnerability Assessment\n• Security Architecture Design\n• Incident Response & Forensics\n• Security Compliance & Auditing\n• Ethical Hacking & Red Team Operations\n• Security Training & Awareness Programs\n• Custom Security Tool Development"
      ]
    },

    // Tools
    tools: {
      patterns: ['tools', 'software', 'technologies', 'use'],
      responses: [
        "Varinder is proficient with industry-standard cybersecurity tools:\n• Penetration Testing: Burp Suite, Metasploit, Nmap\n• Programming: Python, C++, JavaScript\n• Infrastructure: Docker, Kubernetes\n• Security: SIEM tools, OAuth 2.0, OpenSSL\n• Cryptography: AES, RSA encryption algorithms"
      ]
    }
  };

  // Pattern matching function
  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const [category, data] of Object.entries(knowledgeBase)) {
      for (const pattern of data.patterns) {
        if (input.includes(pattern)) {
          const score = pattern.length / input.length;
          if (score > bestScore) {
            bestScore = score;
            bestMatch = data.responses;
          }
        }
      }
    }

    return bestMatch;
  };

  const generateResponse = (userInput) => {
    const responses = findBestMatch(userInput);
    
    if (responses) {
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Fallback responses
    const fallbacks = [
      "I'd be happy to help! You can ask me about Varinder's experience, skills, projects, or how to contact him.",
      "That's a great question! I can tell you about Varinder's cybersecurity expertise, certifications, or current projects. What interests you most?",
      "I'm here to help you learn about Varinder! Try asking about his skills, experience, projects, or contact information.",
      "Feel free to ask me about Varinder's background in cybersecurity, his technical skills, or his recent work!"
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: generateResponse(userMessage.text),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "What certifications do you have?",
    "How can I contact you?",
    "What services do you offer?"
  ];

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #00ff00, #008000)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0, 255, 0, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(0, 255, 0, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(0, 255, 0, 0.4)';
        }}
      >
        <MessageCircle style={{ width: '28px', height: '28px', color: 'white' }} />
        <style>{`
          @keyframes pulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(0, 255, 0, 0.4); }
            50% { box-shadow: 0 4px 30px rgba(0, 255, 0, 0.8); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: isMinimized ? '300px' : '400px',
        height: isMinimized ? '60px' : '600px',
        background: 'rgba(0, 0, 0, 0.95)',
        border: '2px solid #00ff00',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxShadow: '0 8px 40px rgba(0, 255, 0, 0.3)',
        transition: 'all 0.3s ease',
        fontFamily: "'Courier New', monospace"
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: isMinimized ? 'none' : '1px solid rgba(0, 255, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(0, 255, 0, 0.1)',
        borderRadius: '14px 14px 0 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot style={{ width: '20px', height: '20px', color: '#00ff00' }} />
          <span style={{ color: '#00ffff', fontWeight: 'bold', fontSize: '14px' }}>
            AI Assistant
          </span>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#10b981',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: 'none',
              border: 'none',
              color: '#00ffff',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <Minimize2 style={{ width: '16px', height: '16px' }} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff4444',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message) => (
              <div key={message.id} style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                {message.type === 'bot' && (
                  <Bot style={{ width: '16px', height: '16px', color: '#00ff00', marginTop: '4px' }} />
                )}
                <div style={{
                  maxWidth: '80%',
                  padding: '12px',
                  borderRadius: '12px',
                  background: message.type === 'user' 
                    ? 'linear-gradient(135deg, #00ffff, #0080ff)'
                    : 'rgba(0, 255, 0, 0.1)',
                  border: message.type === 'user' 
                    ? '1px solid #00ffff'
                    : '1px solid rgba(0, 255, 0, 0.3)',
                  color: message.type === 'user' ? '#000' : '#ffffff',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-line'
                }}>
                  {message.text}
                </div>
                {message.type === 'user' && (
                  <User style={{ width: '16px', height: '16px', color: '#00ffff', marginTop: '4px' }} />
                )}
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Bot style={{ width: '16px', height: '16px', color: '#00ff00' }} />
                <div style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(0, 255, 0, 0.1)',
                  border: '1px solid rgba(0, 255, 0, 0.3)',
                  color: '#00ff00',
                  fontSize: '13px'
                }}>
                  <span>Thinking</span>
                  <span style={{ animation: 'dots 1.5s infinite' }}>...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '8px'
            }}>
              {quickQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    setTimeout(handleSendMessage, 100);
                  }}
                  style={{
                    background: 'rgba(0, 255, 0, 0.1)',
                    border: '1px solid rgba(0, 255, 0, 0.3)',
                    borderRadius: '12px',
                    padding: '4px 8px',
                    color: '#00ff00',
                    fontSize: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0, 255, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(0, 255, 0, 0.1)';
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(0, 255, 0, 0.3)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about Varinder's expertise..."
              style={{
                flex: 1,
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              style={{
                background: inputValue.trim() 
                  ? 'linear-gradient(135deg, #00ff00, #008000)'
                  : 'rgba(128, 128, 128, 0.3)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                color: 'white',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              <Send style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes dots {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          80%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AIChatbot;