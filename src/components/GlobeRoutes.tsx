
import { useEffect, useRef } from "react";

const GlobeRoutes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        drawGlobe();
      }
    };
    
    const drawGlobe = () => {
      if (!canvasRef.current) return;
      
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      
      const { width, height } = canvasRef.current;
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.4;
      
      // Draw globe
      const gradient = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
      gradient.addColorStop(0, '#185ADB');
      gradient.addColorStop(1, '#0A1931');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw latitude/longitude lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Longitudes
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, angle, angle);
        ctx.stroke();
      }
      
      // Latitudes
      for (let i = 1; i < 6; i++) {
        const latRadius = (radius / 6) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, latRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw route dots
      const cities = [
        { name: "New York", x: 0.3, y: 0.3 },
        { name: "London", x: 0.5, y: 0.2 },
        { name: "Dubai", x: 0.7, y: 0.4 },
        { name: "Tokyo", x: 0.8, y: 0.3 },
        { name: "Los Angeles", x: 0.2, y: 0.4 },
        { name: "Singapore", x: 0.7, y: 0.6 },
      ];
      
      cities.forEach(city => {
        const x = centerX + (radius * Math.cos(city.x * Math.PI * 2));
        const y = centerY + (radius * Math.sin(city.y * Math.PI * 2));
        
        // Draw glow
        const gradientDot = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradientDot.addColorStop(0, 'rgba(198, 166, 98, 0.8)');
        gradientDot.addColorStop(1, 'rgba(198, 166, 98, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = gradientDot;
        ctx.fill();
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#C6A662';
        ctx.fill();
      });
      
      // Draw routes between cities
      ctx.strokeStyle = 'rgba(198, 166, 98, 0.6)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < cities.length; i++) {
        const city1 = cities[i];
        const city2 = cities[(i + 1) % cities.length];
        
        const x1 = centerX + (radius * Math.cos(city1.x * Math.PI * 2));
        const y1 = centerY + (radius * Math.sin(city1.y * Math.PI * 2));
        const x2 = centerX + (radius * Math.cos(city2.x * Math.PI * 2));
        const y2 = centerY + (radius * Math.sin(city2.y * Math.PI * 2));
        
        // Draw curved route
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        
        // Calculate control point for curve
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const distToCenter = Math.sqrt(Math.pow(midX - centerX, 2) + Math.pow(midY - centerY, 2));
        const normFactor = 1 + (radius * 0.2) / distToCenter;
        
        const ctrlX = centerX + (midX - centerX) * normFactor;
        const ctrlY = centerY + (midY - centerY) * normFactor;
        
        ctx.quadraticCurveTo(ctrlX, ctrlY, x2, y2);
        ctx.stroke();
      }
    };
    
    // Initial draw
    window.addEventListener('resize', handleResize);
    handleResize();
    
    const interval = setInterval(() => {
      drawGlobe();
    }, 40); // Redraw for animation
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="section-container" id="routes">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">
          <span className="gold-gradient-text">Global</span> Flight Network
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Access over 5,000 airports worldwide with our expanding fleet of luxury private jets.
        </p>
      </div>
      
      <div className="relative mx-auto max-w-3xl aspect-square">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full animate-globe"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-jet-navy/0 via-jet-navy/0 to-jet-navy/90 rounded-full"></div>
      </div>
    </div>
  );
};

export default GlobeRoutes;
