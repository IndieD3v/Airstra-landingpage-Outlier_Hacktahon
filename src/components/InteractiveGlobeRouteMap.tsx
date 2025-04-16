import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import GlobeMap from "./GlobeMap";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const InteractiveGlobeRouteMap = () => {
  const [activeDestination, setActiveDestination] = useState(0);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const tl = gsap.timeline();

    // move the plane up while scroll
    tl.to('.globe-wrapper', {
      y: 100,
      scrollTrigger: {
        trigger: contentRef.current,
        start: "center center",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }
    );
  }, [activeDestination]);

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { opacity: 0 },
      { opacity: 0.3, duration: 0.7, ease: "power2.out" }
    );
  }, [activeDestination]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".scroll-fade", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".scroll-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

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
      image: "https://cdn.moanavoyages.com/img/hotels/4732.jpg"
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
    <section className="scroll-section relative py-12 md:py-24 bg-gradient-to-bl from-white from-[-100%] to-30% bg-gray-900 overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16 scroll-fade">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-3 md:mb-4 text-white">
            ELEVATE YOUR <span className="font-bold">DESTINATIONS</span>
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-amber-600 mx-auto"></div>
          <p className="text-gray-400 max-w-md md:max-w-2xl mx-auto mt-4 md:mt-6 text-sm md:text-base">
            Airstra connects you to the world's most exclusive destinations.
            Discover premium locations accessible only via private aviation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center scroll-fade">
          {/* Destination Carousel */}
          <div className="z-20 relative rounded-lg glass-dark backdrop-blur-md">
            {/* Navigation arrows */}
            <div className="absolute -translate-y-10 top-2 left-2 sm:-top-[50px] sm:right-0 space-x-3 sm:space-x-5">
              <button
                className="z-20 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-all"
                onClick={() => {
                  goToPrevDestination();
                  stopAutoplay();
                  restartAutoplay();
                }}
              >
                <ChevronLeft size={20}  />
              </button>
              <button
                className=" z-20 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-all"
                onClick={() => {
                  goToNextDestination();
                  stopAutoplay();
                  restartAutoplay();
                }}
              >
                <ChevronRight size={20}  />
              </button>
            </div>

            {/* Background image with overlay */}
            <div
              ref={bgRef}
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{
                backgroundImage: `url(${destinations[activeDestination].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 w-full">
              {destinations.map((destination, index) => (
                activeDestination === index ? (
                  <div
                    key={destination.id}
                    ref={contentRef}
                    className="relative z-10 w-full">
                    <h3 className="text-2xl md:text-3xl font-serif font-light mb-1 md:mb-2 text-white">{destination.name}</h3>
                    <p className="text-amber-500 mb-3 md:mb-6 text-sm">{destination.country}</p>

                    <p className="text-gray-300 mb-3 md:mb-6 max-w-lg text-sm">
                      {destination.description}
                    </p>

                    <div className="bg-gray-900/50 inline-block px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-8 border-l-2 border-amber-600 backdrop-blur-sm">
                      <span className="text-xs md:text-sm text-gray-400">Average Flight Time:</span>
                      <p className="text-white text-sm">{destination.flight_time}</p>
                    </div>

                    <div className="mt-5 md:mt-10 mb-3 md:mb-5 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <button className="text-xs md:text-sm bg-primary backdrop-blur-sm text-white px-4 py-2 md:px-6 md:py-3 flex items-center group rounded-md">
                        <span>PLAN YOUR JOURNEY</span>
                        <ArrowRight className="w-3 h-3 ml-0 transform transition-transform group-hover:translate-x-1" />
                      </button>
                      <button className="border border-white/20 px-4 py-2 md:px-6 md:py-3 text-white hover:bg-white/10 transition-colors rounded-md backdrop-blur-sm text-xs md:text-sm">
                        EXPLORE DESTINATION
                      </button>
                    </div>
                  </div>
                ) : null
              ))}
            </div>

            {/* Destination indicator dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1 md:space-x-2">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveDestination(index);
                    stopAutoplay();
                    restartAutoplay();
                  }}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${activeDestination === index ? 'bg-amber-600 w-4 md:w-6' : 'bg-gray-600 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Globe */}
          <div className="globe-wrapper max-w-md md:max-w-xl mx-auto w-full">
            <div className="absolute w-full h-full z-20 lg:hidden"></div>
            <GlobeMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveGlobeRouteMap;