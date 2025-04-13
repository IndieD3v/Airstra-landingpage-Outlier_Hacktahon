
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import GlobeMap from "./GlobeMap";

const InteractiveGlobeRouteMap = () => {
  const [activeDestination, setActiveDestination] = useState(0);
  
  // Luxury destinations data
  const destinations = [
    {
      id: 1,
      name: "Monte Carlo",
      country: "Monaco",
      coordinates: { x: 68, y: 42 },
      description: "The playground of the elite, Monte Carlo offers unmatched glamour with its famous casino, yacht-filled harbor, and prestigious Grand Prix.",
      flight_time: "6 hours from London",
      image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "St. Barts",
      country: "Caribbean",
      coordinates: { x: 32, y: 52 },
      description: "This exclusive island paradise combines French sophistication with Caribbean relaxation. Pristine beaches and world-class dining await.",
      flight_time: "4 hours from Miami",
      image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      name: "Gstaad",
      country: "Switzerland",
      coordinates: { x: 58, y: 38 },
      description: "A discreet winter playground for the elite, offering world-class skiing, Michelin-starred dining, and luxury chalets.",
      flight_time: "2 hours from Paris",
      image: "https://images.unsplash.com/photo-1548777123-e216912df7d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      name: "Dubai",
      country: "United Arab Emirates",
      coordinates: { x: 75, y: 52 },
      description: "The epitome of modern luxury with architectural marvels, exclusive shopping, and desert adventures just minutes away.",
      flight_time: "7 hours from London",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      name: "Bora Bora",
      country: "French Polynesia",
      coordinates: { x: 12, y: 70 },
      description: "The jewel of the South Pacific offers overwater villas, turquoise lagoons, and unparalleled privacy.",
      flight_time: "8 hours from Los Angeles",
      image: "https://images.unsplash.com/photo-1589197331516-8b1eb5204397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    }
  ];
  
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const goToNextDestination = () => {
    setActiveDestination((prev) => (prev + 1) % destinations.length);
  };
  
  const goToPrevDestination = () => {
    setActiveDestination((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  useEffect(() => {
    // Auto-rotate through destinations
    autoplayRef.current = setInterval(goToNextDestination, 6000);
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const restartAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(goToNextDestination, 6000);
  };

  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => {
          const size = Math.random() * 2 + 1;
          const opacity = Math.random() * 0.5 + 0.2;
          const animationDelay = Math.random() * 10;
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${top}%`,
                left: `${left}%`,
                opacity,
                animationDelay: `${animationDelay}s`,
                animationDuration: '3s'
              }}
            />
          );
        })}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-white">
            ELEVATE YOUR <span className="font-bold">DESTINATIONS</span>
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6">
            SkyBound connects you to the world's most exclusive destinations. 
            Discover premium locations accessible only via private aviation.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Globe */}
          <div className="max-w-xl mx-auto w-full">
            <GlobeMap />
          </div>
          
          {/* Destination Carousel */}
          <div className="relative overflow-hidden rounded-lg glass-dark backdrop-blur-md">
            {/* Navigation arrows */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-all"
              onClick={() => {
                goToPrevDestination();
                stopAutoplay();
                restartAutoplay();
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-all"
              onClick={() => {
                goToNextDestination();
                stopAutoplay();
                restartAutoplay();
              }}
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Background image with overlay */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{
                backgroundImage: `url(${destinations[activeDestination].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8">
              {destinations.map((destination, index) => (
                <div 
                  key={destination.id}
                  className={`transition-all duration-500 ${activeDestination === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute inset-0'}`}
                >
                  <h3 className="text-3xl font-serif font-light mb-2 text-white">{destination.name}</h3>
                  <p className="text-amber-500 mb-6">{destination.country}</p>
                  
                  <p className="text-gray-300 mb-6 max-w-lg">
                    {destination.description}
                  </p>
                  
                  <div className="bg-gray-900/50 inline-block px-4 py-2 mb-8 border-l-2 border-amber-600 backdrop-blur-sm">
                    <span className="text-sm text-gray-400">Average Flight Time:</span>
                    <p className="text-white">{destination.flight_time}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <button className="bg-amber-600/90 backdrop-blur-sm text-white px-6 py-3 flex items-center group rounded-md">
                      <span>PLAN YOUR JOURNEY</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
                    </button>
                    <button className="border border-white/20 px-6 py-3 text-white hover:bg-white/10 transition-colors rounded-md backdrop-blur-sm">
                      EXPLORE DESTINATION
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Destination indicator dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {destinations.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    setActiveDestination(index);
                    stopAutoplay();
                    restartAutoplay();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeDestination === index ? 'bg-amber-600 w-6' : 'bg-gray-600 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom animation for the flight path */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 24;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default InteractiveGlobeRouteMap;
