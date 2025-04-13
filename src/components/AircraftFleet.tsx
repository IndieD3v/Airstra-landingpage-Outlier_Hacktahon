
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AircraftCarousel from "./AircraftCarousel";

gsap.registerPlugin(ScrollTrigger);

const aircraft = [
  {
    id: 1,
    name: "Gulfstream G650",
    category: "Ultra Long Range",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    specs: {
      range: "7,000 nm",
      passengers: "19",
      speed: "Mach 0.925",
      height: "6'3\""
    },
    description: "The pinnacle of business aviation, offering unmatched comfort and range for transatlantic journeys."
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    category: "Ultra Long Range",
    image: "https://images.unsplash.com/photo-1605256686032-7c3e65a87eb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    specs: {
      range: "7,700 nm",
      passengers: "17",
      speed: "Mach 0.925",
      height: "6'2\""
    },
    description: "Featuring the largest cabin in its class with four distinct living spaces for utmost comfort."
  },
  {
    id: 3,
    name: "Dassault Falcon 8X",
    category: "Ultra Long Range",
    image: "https://images.unsplash.com/photo-1579274398043-7617aca7a955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    specs: {
      range: "6,450 nm",
      passengers: "16",
      speed: "Mach 0.9",
      height: "6'2\""
    },
    description: "Exceptional versatility with access to challenging airports while providing a whisper-quiet cabin."
  },
  {
    id: 4,
    name: "Embraer Praetor 600",
    category: "Super-Midsize",
    image: "https://images.unsplash.com/photo-1581260645580-33e12ec85514?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    specs: {
      range: "4,018 nm",
      passengers: "12",
      speed: "Mach 0.83",
      height: "6'0\""
    },
    description: "Redefining the super-midsize category with intercontinental range and cutting-edge technology."
  }
];

const AircraftFleet = () => {
  const [viewMode, setViewMode] = useState("gallery");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const planeIconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate plane icon when scrolling to the section
    gsap.from(planeIconRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: 1
      }
    });
    
    // Animate aircraft cards when they come into view
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1
        }
      });
    }
    
    // Flying plane animation across the screen
    const flyingPlane = document.createElement("div");
    flyingPlane.innerHTML = `<div class="plane-path"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg></div>`;
    document.body.appendChild(flyingPlane.firstChild as Node);
    
    // Flying plane animation when scrolling to the section
    const planePath = document.querySelector('.plane-path') as HTMLElement;
    if (planePath) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.fromTo(planePath, 
            { left: "-5%", top: "50%", rotate: 0 },
            { left: "105%", top: "30%", rotate: 15, duration: 5, ease: "power1.inOut" }
          );
        },
        onEnterBack: () => {
          gsap.fromTo(planePath, 
            { left: "105%", top: "30%", rotate: -15 },
            { left: "-5%", top: "50%", rotate: 0, duration: 5, ease: "power1.inOut" }
          );
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (document.querySelector('.plane-path')) {
        document.body.removeChild(document.querySelector('.plane-path') as Node);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div ref={planeIconRef} className="inline-block mb-4">
            <PlaneTakeoff className="h-12 w-12 text-amber-600 mb-2 mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
            Our <span className="gradient-text">Luxury</span> Fleet
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Experience unparalleled comfort with our collection of ultra-modern private jets, each offering exceptional range and premium amenities.
          </p>
          
          <div className="flex justify-center gap-4 pt-6">
            <Button 
              variant={viewMode === "gallery" ? "default" : "outline"} 
              className={viewMode === "gallery" ? "btn-primary glass-panel" : "btn-outline bg-white/20 backdrop-blur-sm"}
              onClick={() => setViewMode("gallery")}
            >
              Gallery View
            </Button>
            <Button 
              variant={viewMode === "details" ? "default" : "outline"} 
              className={viewMode === "details" ? "btn-primary glass-panel" : "btn-outline bg-white/20 backdrop-blur-sm"}
              onClick={() => setViewMode("details")}
            >
              Detailed View
            </Button>
          </div>
        </div>
        
        {viewMode === "gallery" ? (
          <div ref={cardsRef} className="fleet-grid">
            {aircraft.map((craft) => (
              <div 
                key={craft.id} 
                className="fleet-card hover:shadow-lg transition-all glass-card"
                onClick={() => {
                  setViewMode("details");
                }}
              >
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <img 
                    src={craft.image} 
                    alt={craft.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="fleet-info bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-1">{craft.name}</h3>
                  <p className="text-amber-300 text-sm mb-4">{craft.category}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-300">Range</p>
                      <p className="font-medium">{craft.specs.range}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Passengers</p>
                      <p className="font-medium">{craft.specs.passengers}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AircraftCarousel 
            aircraft={aircraft} 
            onBackToGallery={() => setViewMode("gallery")} 
          />
        )}
      </div>
    </div>
  );
};

export default AircraftFleet;
