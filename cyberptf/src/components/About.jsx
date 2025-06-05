import React from 'react';
import { Eye, Globe, Shield, MapPin } from 'lucide-react';

// Simple map component using Leaflet
const LocationMap = () => {
  const mapRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);

  React.useEffect(() => {
    // Load Leaflet if not already loaded
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapInstanceRef.current && mapRef.current && window.L) {
        const L = window.L;
        
        const map = L.map(mapRef.current, {
          center: [51.5074, -0.1278], // London coordinates (central)
          zoom: 11, // Slightly zoomed out for city view
          zoomControl: true,
          scrollWheelZoom: false,
          doubleClickZoom: true,
          dragging: true,
          touchZoom: true
        });

        // Dark theme tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        // Custom marker
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 24px;
              height: 24px;
              background: linear-gradient(135deg, #00ff00, #008000);
              border: 2px solid #00ffff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
              animation: mapPulse 2s infinite;
            ">
              <div style="
                width: 6px;
                height: 6px;
                background: white;
                border-radius: 50%;
              "></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        // Add marker
        const marker = L.marker([51.5074, -0.1278], { icon: customIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="
            background: rgba(0, 0, 0, 0.95);
            color: #00ff00;
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 10px;
            font-family: 'Courier New', monospace;
            text-align: center;
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
            min-width: 150px;
          ">
            <strong style="color: #00ffff;">📍 Base Location</strong><br/>
            <span style="color: #ffffff; font-size: 14px;">London, UK</span><br/>
            <small style="color: #9ca3af;">Available for projects</small>
          </div>
        `);

        // Glow circle around London
        L.circle([51.5074, -0.1278], {
          color: '#00ff00',
          fillColor: '#00ff00',
          fillOpacity: 0.05,
          radius: 12000, // Larger radius for city-wide coverage
          weight: 1,
          opacity: 0.3
        }).addTo(map);

        mapInstanceRef.current = map;
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <style>{`
        @keyframes mapPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
      `}</style>
      <div 
        ref={mapRef} 
        style={{
          height: '180px', // Optimized for info card
          width: '100%',
          borderRadius: '8px',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
          overflow: 'hidden',
          background: '#000'
        }}
      />
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div className="section-header">
        <Eye className="section-icon" />
        <h2 className="section-title">About Me</h2>
      </div>
      
      <div>
        <p className="about-text">
          I'm a passionate cybersecurity professional with over 5 years of experience in ethical hacking, 
          penetration testing, and security architecture. My expertise spans across network security, 
          vulnerability assessment, and incident response.
        </p>
        <p className="about-text">
          I specialize in identifying security vulnerabilities, implementing robust defense mechanisms, 
          and ensuring compliance with industry standards. My approach combines technical expertise 
          with strategic thinking to protect organizations from evolving cyber threats.
        </p>
        
        <div className="info-grid">
          <div className="info-card" style={{ gridColumn: 'span 2' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(0, 255, 0, 0.2)'
            }}>
              <MapPin style={{
                width: '18px',
                height: '18px',
                color: '#00ff00',
                marginRight: '8px',
                filter: 'drop-shadow(0 0 5px #00ff00)'
              }} />
              <h3 style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                margin: '0',
                textShadow: '0 0 10px rgba(0, 255, 0, 0.3)'
              }}>
                Current Location
              </h3>
            </div>
            <LocationMap />
            <p style={{
              color: '#9ca3af',
              fontSize: '12px',
              marginTop: '8px',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              📍 Based in London, UK • Available for remote and on-site consultations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;