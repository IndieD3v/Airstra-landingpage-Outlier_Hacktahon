import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import AircraftCarousel from "./AircraftCarousel";

gsap.registerPlugin(ScrollTrigger);

const aircraft = [
  {
    id: 1,
    name: "Bombardier Global 7500",
    category: "World's Longest Range",
    image: "https://www.claylacy.com/wp-content/uploads/2024/11/Global-7500-01.jpg",
    specs: {
      range: "7,700 nm",
      passengers: "17",
      speed: "Mach 0.925",
      height: "6'2\""
    },
    description: "Featuring the largest cabin in its class with four distinct living spaces for utmost comfort."
  },
  {
    id: 2,
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
    id: 3,
    name: "Dassault Falcon 8X",
    category: "Ultra Comfortable",
    image: "https://www.dassaultfalcon.com/app/uploads/2022/09/19.Falcon8X_Technology_Desktop.jpg",
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
    image: "https://cdn.privatejetcardcomparisons.com/uploads/Flexjet-Praetor-600-Aircraft.jpg?auto=format&q=35&h=1",
    specs: {
      range: "4,018 nm",
      passengers: "12",
      speed: "Mach 0.83",
      height: "6'0\""
    },
    description: "Redefining the super-midsize category with intercontinental range and cutting-edge technology."
  },
  {
    id: 5,
    name: "Cessna Citation Longitude",
    category: "Transcontinental Value",
    image: "https://www.ainonline.com/cdn-cgi/image/width=1200,format=webp,quality=95/https://backend.ainonline.com/sites/default/files/uploads/2021/04/longitude-exterior_ain2.jpg",
    specs: {
      range: "3,500 nm",
      passengers: "12",
      speed: "Mach 0.84",
      height: "6'0\""
    },
    description: "A perfect blend of performance and luxury, ideal for coast-to-coast missions with minimal compromise."
  },
  {
    id: 6,
    name: "HondaJet Elite II",
    category: "Light Jet Innovation",
    image: "https://assets.skiesmag.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-08-at-10.38.22-AM.jpg",
    specs: {
      range: "1,547 nm",
      passengers: "6",
      speed: "Mach 0.72",
      height: "4'10\""
    },
    description: "Innovative over-the-wing engine design for quieter, more efficient travel in the light jet category."
  }
];

const AircraftFleet = () => {
  const [viewMode, setViewMode] = useState("detailed");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const planeIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate plane icon when scrolling to the section
    gsap.from(planeIconRef.current, {
      y: 50,
      opacity: 0,
      duration: .8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 20%",
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


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (document.querySelector('.plane-path')) {
        document.body.removeChild(document.querySelector('.plane-path') as Node);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-16 md:py-24 bg-white" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={planeIconRef} className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <div className="inline-block mb-1">
            <PlaneTakeoff className="h-10 w-10 md:h-12 md:w-12 text-primary mb-2 mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
            Our <span className="text-primary">Luxury</span> Fleet
          </h2>
          <p className="text-gray-700 max-w-md md:max-w-2xl mx-auto text-sm md:text-base">
            Experience unparalleled comfort with our collection of ultra-modern private jets, each offering exceptional range and premium amenities.
          </p>

          <div className="flex justify-center gap-3 pt-2 pb-8 md:pb-14">
            <Button
              variant={viewMode === "gallery" ? "default" : "outline"}
              className={viewMode === "gallery" ? "btn-primary glass-panel text-sm md:text-base" : "btn-outline bg-white/20 backdrop-blur-sm text-sm md:text-base"}
              onClick={() => setViewMode("gallery")}
            >
              Gallery View
            </Button>
            <Button
              variant={viewMode === "details" ? "default" : "outline"}
              className={viewMode === "details" ? "btn-primary glass-panel text-sm md:text-base" : "btn-outline bg-white/20 backdrop-blur-sm text-sm md:text-base"}
              onClick={() => setViewMode("details")}
            >
              Detailed View
            </Button>
          </div>
        </div>

        {viewMode === "gallery" ? (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aircraft.map((craft) => (
              <div
                key={craft.id}
                className="fleet-card group relative rounded-xl overflow-hidden transition-all duration-500 shadow-md hover:shadow-lg glass-card cursor-pointer"
                onClick={() => {
                  setViewMode("details");
                }}
              >
                <div className="relative h-64 md:h-[20rem] lg:h-[24rem] overflow-hidden rounded-t-xl">
                  <img
                    src={craft.image}
                    alt={craft.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="fleet-info bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm p-4">
                  <h3 className="text-lg font-bold mb-1">{craft.name}</h3>
                  <p className="text-amber-300 text-sm mb-2">{craft.category}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
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