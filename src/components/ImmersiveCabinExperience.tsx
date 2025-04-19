
import { useState, useEffect, useRef, useLayoutEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArrowRight, Star, Bed, Headphones, Utensils, Users, Eye } from "lucide-react";


const ImmersiveCabinExperience = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const interiorRef = useRef<HTMLDivElement>(null);
  

  const cabinFeatures = [
    {
      id: 1,
      name: "Executive Seating",
      position: { x: 28, y: 50 },
      description: "Hand-crafted recliners with full-grain leather upholstery, lumbar support, massage functions, and adjustable positions for maximum comfort.",
      icon: <Star className="w-5 h-5" />
    },
    {
      id: 2,
      name: "Master Suite",
      position: { x: 78, y: 45 },
      description: "Private bedroom with queen-sized bed, Egyptian cotton linens, ambient lighting, and sound insulation for restful sleep during long flights.",
      icon: <Bed className="w-5 h-5" />
    },
    {
      id: 3,
      name: "Conference Area",
      position: { x: 55, y: 35 },
      description: "4K display with video conferencing capabilities, satellite connectivity, and a custom conference table for productive meetings at 40,000 feet.",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 4,
      name: "Gourmet Galley",
      position: { x: 40, y: 65 },
      description: "State-of-the-art kitchen with convection oven, premium wine selection, and custom catering by world-renowned chefs tailored to your preferences.",
      icon: <Utensils className="w-5 h-5" />
    },
    {
      id: 5,
      name: "Entertainment System",
      position: { x: 15, y: 30 },
      description: "Audiophile-grade sound system, 4K displays, and global streaming services with unlimited high-speed satellite Wi-Fi to stay connected anywhere.",
      icon: <Headphones className="w-5 h-5" />
    }
  ];

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".text-container", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
        },
      });

      gsap.from(".cabin", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".container",
          start: "top 80%",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Track cursor position for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interiorRef.current) return;
    
    const rect = interiorRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setCursorPosition({ x, y });
  };
  
  // Intersection observer for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (interiorRef.current) {
      observer.observe(interiorRef.current);
    }
    
    return () => {
      if (interiorRef.current) {
        observer.unobserve(interiorRef.current);
      }
    };
  }, []);

  // Auto-cycle through features if not interacting
  useEffect(() => {
    if (hoveredFeature !== null) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => 
        prev === cabinFeatures.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [hoveredFeature, cabinFeatures.length]);

  return (
    <section className="py-24 bg-gray-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="absolute w-full h-full">
        {/* Decorative light streaks */}
        <div className="absolute w-1/3 h-full right-0 top-0 bg-gradient-to-l from-amber-500 to-transparent opacity-5 transform rotate-45 translate-x-1/2"></div>
        <div className="absolute w-1/4 h-full left-0 bottom-0 bg-gradient-to-r from-amber-500 to-transparent opacity-5 transform -rotate-45 -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-container text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-1000" style={isRevealed ? { opacity: 1, transform: 'translateY(0)' } : {}}>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-gray-800">
            UNPARALLELED <span className="font-bold">COMFORT</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Step inside our meticulously designed cabins where luxury meets functionality. 
            Experience private aviation at its finest with customizable interiors and premium amenities.
          </p>
        </div>
        
        {/* Interactive Cabin Experience */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interior Image with Interactive Hotspots */}
          <div 
            ref={interiorRef}
            className="cabin relative rounded-lg overflow-hidden aspect-video opacity-0 transform translate-y-8 transition-all duration-1000 delay-300"
            style={isRevealed ? { opacity: 1, transform: 'translateY(0)' } : {}}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {/* Interior image with spotlight effect */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 blur-[4px]"
              style={{
                backgroundImage: `url('/jet_interior.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            {/* Spotlight effect */}
            <div 
              className="absolute inset-0 bg-black opacity-60 transition-opacity duration-300"
              style={{
                background: hoveredFeature !== null ? 
                  `radial-gradient(circle at ${cursorPosition.x}% ${cursorPosition.y}%, transparent 100px, rgba(0,0,0,0.3) 150px)` :
                  'none',
                opacity: hoveredFeature !== null ? 1 : 0
              }}
            ></div>
            
            {/* Feature hotspots */}
            {cabinFeatures.map((feature, index) => (
              <button
                key={feature.id}
                className={`absolute z-20 transition-all duration-300 transform ${
                  activeFeature === index || hoveredFeature === index
                    ? 'scale-125' 
                    : 'scale-100'
                }`}
                style={{ 
                  left: `${feature.position.x}%`, 
                  top: `${feature.position.y}%`,
                }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`relative rounded-full p-2 transition-all duration-500 ${
                  activeFeature === index || hoveredFeature === index
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 bg-opacity-80 text-gray-800'
                }`}>
                  {feature.icon}
                  
                  {/* Pulsing animation */}
                  <div className={`absolute inset-0 rounded-full animate-ping ${
                    activeFeature === index
                      ? 'bg-primary opacity-30'
                      : 'bg-white opacity-0'
                  }`}></div>
                  
                  {/* Feature label on hover */}
                  <div className={`absolute whitespace-nowrap text-xs font-medium py-1 px-2 bg-white bg-opacity-90 text-gray-800 rounded-sm transform -translate-y-full left-1/2 -translate-x-1/2 -mt-2 transition-opacity duration-300 pointer-events-none ${
                    activeFeature === index || hoveredFeature === index
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}>
                    {feature.name}
                  </div>
                </div>
              </button>
            ))}
            
            {/* Image overlay with radial gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
          </div>
          
          {/* Feature Details */}
          <div className="h-96 relative opacity-0 transform translate-y-8 transition-all duration-1000 delay-500" 
               style={isRevealed ? { opacity: 1, transform: 'translateY(0)' } : {}}>
            {/* Feature selector tabs */}
            <div className="flex flex-wrap mb-8 border-b border-gray-200">
              {cabinFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  className={`pb-4 px-4 text-center relative ${
                    activeFeature === index
                      ? 'text-amber-600'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <span className="text-sm md:text-base">{feature.name}</span>
                  {activeFeature === index && (
                    <div className="absolute bottom-1 left-0 w-full h-0.5 bg-primary"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Feature details cards with transition */}
            <div className="relative h-full">
              {cabinFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`absolute inset-0 transition-all duration-500 flex flex-col ${
                    activeFeature === index
                      ? 'opacity-100 transform translate-x-0'
                      : index < activeFeature
                        ? 'opacity-0 transform translate-x-full'
                        : 'opacity-0 transform translate-x-full'
                  }`}
                >
                  <div className="bg-white bg-opacity-90 shadow-lg p-8 border-l-2 border-amber-600 h-full rounded-r-lg">
                    <div className="flex items-center mb-6">
                      <div className="bg-primary text-white p-3 rounded-sm mr-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-serif font-light text-gray-800">{feature.name}</h3>
                    </div>
                    
                    <p className="text-gray-700 mb-8 text-lg">
                      {feature.description}
                    </p>
                    
                    {/* Feature specific call-to-action */}
                    <div className="mt-auto">
                      <button className="group inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors">
                        <span className="mr-2">EXPLORE THIS FEATURE</span>
                        <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Virtual Tour Button */}
        <div className="text-center mt-16 opacity-0 transform translate-y-8 transition-all duration-1000 delay-700"
             style={isRevealed ? { opacity: 1, transform: 'translateY(0)' } : {}}>
          <button className="inline-flex items-center bg-gray-800 hover:bg-gray-700 px-8 py-4 transition-colors group text-white">
            <span className="mr-3">EXPERIENCE VIRTUAL CABIN TOUR</span>
            <div className="bg-primary text-white p-2 rounded-full group-hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImmersiveCabinExperience;
