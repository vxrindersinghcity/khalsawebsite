import React, { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import AIChatbot from './components/AIChatbot';
import './CyberPortfolio.css';

const CyberPortfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [matrixColumns, setMatrixColumns] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Matrix rain effect with performance optimization
  useEffect(() => {
    const createMatrixRain = () => {
      const columns = [];
      const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}[]|;:,.<>?';
      
      // Responsive column count based on screen size
      const getColumnCount = () => {
        const width = window.innerWidth;
        if (width < 480) return Math.floor(width / 25); // Fewer columns on mobile
        if (width < 768) return Math.floor(width / 22);
        return Math.floor(width / 20);
      };
      
      const columnCount = getColumnCount();
      
      for (let i = 0; i < columnCount; i++) {
        const column = {
          id: i,
          left: i * (window.innerWidth < 768 ? 25 : 20),
          characters: '',
          animationDuration: Math.random() * 3 + 2, // 2-5 seconds
          delay: Math.random() * 5 // 0-5 seconds delay
        };
        
        // Generate random characters for this column
        const charCount = Math.floor(Math.random() * 15) + 8; // Fewer chars on mobile
        for (let j = 0; j < charCount; j++) {
          column.characters += characters[Math.floor(Math.random() * characters.length)] + '\n';
        }
        
        columns.push(column);
      }
      
      setMatrixColumns(columns);
    };

    // Initial load
    createMatrixRain();
    setIsLoaded(true);
    
    // Recreate columns periodically (less frequent on mobile for performance)
    const isMobile = window.innerWidth < 768;
    const interval = setInterval(createMatrixRain, isMobile ? 12000 : 8000);
    
    // Handle window resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(createMatrixRain, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Smooth section transitions
  useEffect(() => {
    // Add a small delay for smooth transitions
    const timer = setTimeout(() => {
      document.querySelector('.content-area')?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'certifications':
        return <Certifications />;
      default:
        return <About />;
    }
  };

  // Loading state for better UX
  if (!isLoaded) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#00ff00',
        fontFamily: "'Courier New', monospace",
        fontSize: '18px'
      }}>
        <div style={{
          textAlign: 'center',
          animation: 'pulse 2s infinite'
        }}>
          <div style={{ marginBottom: '16px' }}>⚡ INITIALIZING CYBER PORTFOLIO ⚡</div>
          <div style={{ 
            width: '200px',
            height: '4px',
            background: 'rgba(0, 255, 0, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <div style={{
              width: '50%',
              height: '100%',
              background: '#00ff00',
              animation: 'loading 2s ease-in-out infinite'
            }}></div>
          </div>
          <style>{`
            @keyframes loading {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-portfolio">
      {/* Matrix Rain Background */}
      <div className="matrix-rain">
        {matrixColumns.map((column) => (
          <div
            key={column.id}
            className="matrix-column"
            style={{
              left: `${column.left}px`,
              animationDuration: `${column.animationDuration}s`,
              animationDelay: `${column.delay}s`,
            }}
          >
            {column.characters}
          </div>
        ))}
      </div>
      
      {/* Scanlines Effect */}
      <div className="scanlines"></div>
      
      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Left Sidebar - Profile Card */}
        <ProfileCard />

        {/* Right Content Area */}
        <div className="content-container">
          {/* Navigation */}
          <Navigation 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />

          {/* Content Sections with fade-in animation */}
          <div 
            className="content-area"
            key={activeSection} // Force re-render for transition effect
            style={{
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            {renderContent()}
          </div>
        </div>
      </div>

      {/* AI Chatbot - Floating Assistant */}
      <AIChatbot />

      {/* Additional CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* Ensure smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Improve chatbot positioning on different screen sizes */
        @media (max-width: 768px) {
          .ai-chatbot {
            bottom: 10px !important;
            right: 10px !important;
          }
        }

        @media (max-width: 480px) {
          .ai-chatbot {
            bottom: 5px !important;
            right: 5px !important;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .matrix-column,
          .scanlines,
          .content-area {
            animation: none !important;
          }
          
          .content-area {
            transition: none !important;
          }
        }

        /* Performance optimization for low-end devices */
        @media (max-width: 480px) {
          .matrix-rain {
            opacity: 0.7; /* Reduce visual impact on mobile */
          }
          
          .scanlines {
            opacity: 0.5; /* Lighter scanlines on mobile */
          }
        }

        /* Focus management for accessibility */
        .content-area:focus-within {
          outline: 2px solid #00ff00;
          outline-offset: 4px;
        }

        /* Print styles */
        @media print {
          .matrix-rain,
          .scanlines,
          .ai-chatbot {
            display: none !important;
          }
          
          .cyber-portfolio {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CyberPortfolio;