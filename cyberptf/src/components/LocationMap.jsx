import React, { useEffect, useRef } from 'react';

const LocationMap = ({ className = "" }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Only initialize if map hasn't been created yet
    if (!mapInstanceRef.current && mapRef.current) {
      // Create the map centered on London
      const L = window.L;
      if (!L) {
        console.error('Leaflet library not loaded');
        return;
      }

      const map = L.map(mapRef.current, {
        center: [51.5074, -0.1278], // London coordinates
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: false,
        dragging: true,
        touchZoom: true
      });

      // Add dark theme tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Custom marker icon with cyber theme
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #00ff00, #008000);
            border: 2px solid #00ffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.6);
            animation: pulse 2s infinite;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
            "></div>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.7; }
            }
          </style>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      // Add marker for London
      const marker = L.marker([51.5074, -0.1278], { icon: customIcon }).addTo(map);
      
      // Add popup with cyber-themed styling
      marker.bindPopup(`
        <div style="
          background: rgba(0, 0, 0, 0.9);
          color: #00ff00;
          border: 1px solid #00ff00;
          border-radius: 8px;
          padding: 12px;
          font-family: 'Courier New', monospace;
          text-align: center;
          box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
        ">
          <strong style="color: #00ffff;">📍 Current Location</strong><br/>
          <span style="color: #ffffff;">London, United Kingdom</span><br/>
          <small style="color: #9ca3af;">Available for cybersecurity projects</small>
        </div>
      `);

      // Add a subtle glow effect around London area
      const circle = L.circle([51.5074, -0.1278], {
        color: '#00ff00',
        fillColor: '#00ff00',
        fillOpacity: 0.1,
        radius: 5000,
        weight: 1
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup map on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Leaflet CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
        integrity="sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw=="
        crossOrigin=""
      />
      
      {/* Leaflet JS */}
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"
        integrity="sha512-BwHfrr4c9kmRkLw6iXFdzcdWV/PGkVgiIyIWLLlTSXzWQzxuSg4DiQUCpauz/EWjgk5TYQqX/kvn9pG1NpYfqg=="
        crossOrigin=""
      ></script>

      <div 
        ref={mapRef} 
        className={`${className}`}
        style={{
          height: '300px',
          width: '100%',
          borderRadius: '12px',
          border: '2px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
          overflow: 'hidden'
        }}
      />
    </>
  );
};

export default LocationMap;