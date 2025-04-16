import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AircraftProps {
  id: number;
  name: string;
  category: string;
  image: string;
  specs: {
    range: string;
    passengers: string;
    speed: string;
    height: string;
  };
  description: string;
}

interface AircraftCarouselProps {
  aircraft: AircraftProps[];
  onBackToGallery: () => void;
}

const AircraftCarousel = ({ aircraft, onBackToGallery }: AircraftCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeAircraft = aircraft[activeIndex];

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".aircraft-img",
      { opacity: 0, scale: 1.05, x: 20 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out" }
    );
    tl.fromTo(
      ".aircraft-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".aircraft-img-bg",
      { opacity: 0, scale: 1.05, x: -20 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.6"
    );


    return () => {
      tl.kill(); // optional cleanup
    };
  }, [activeIndex]);

  return (
    <div className="relative w-full h-auto md:h-full grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-64 md:h-full w-full">
        <img
          src={activeAircraft.image}
          alt={activeAircraft.name}
          className="z-10 shadow-xl aircraft-img absolute inset-0 w-full h-full object-cover md:object-left"
        />
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-amber-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium z-10">
          {activeAircraft.category}
        </div>
      </div>


      {/* Left Content Section */}
      <div ref={containerRef} className="relative z-20 p-6 md:p-10 bg-white/60 backdrop-blur-lg md:border-r md:border-white/20 flex flex-col justify-center">
        {/* Top Info */}
        <div className="aircraft-content space-y-4 md:space-y-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-1 md:mb-2">
              {activeAircraft.name}
            </h3>
            <p className="text-gray-700 text-sm md:text-base">{activeAircraft.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(activeAircraft.specs).map(([label, value]) => (
              <div className="bg-white border border-white/30 backdrop-blur-sm p-3 rounded-lg" key={label}>
                <p className="text-xs text-gray-700 mb-0.5 capitalize">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 md:space-y-4">
            <Button className="btn-primary w-full glass-panel text-sm md:text-base">Schedule a Tour</Button>
            <Button
              variant="outline"
              className="btn-outline w-full flex items-center justify-center gap-2 bg-white backdrop-blur-sm text-sm md:text-base"
              onClick={onBackToGallery}
            >
              <Plane className="h-4 w-4" /> View All Aircraft
            </Button>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-between mt-6 md:mt-10">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + aircraft.length) % aircraft.length)}
            className="bg-white/60 hover:bg-white text-gray-800 rounded-full p-2 border border-white/30 backdrop-blur"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % aircraft.length)}
            className="bg-white/60 hover:bg-white text-gray-800 rounded-full p-2 border border-white/30 backdrop-blur"
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-4 md:mt-6">
          {aircraft.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full mx-0.5 md:mx-1 transition-all duration-300 ${activeIndex === index ? "bg-amber-600 w-4 md:w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block relative h-64 md:h-full w-full">
        <img
          src={activeAircraft.image}
          alt={activeAircraft.name}
          className="z-10 shadow-xl aircraft-img absolute inset-0 w-full h-full object-cover md:object-left"
        />
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-amber-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium z-10">
          {activeAircraft.category}
        </div>
      </div>

      <img
        src={activeAircraft.image}
        alt={activeAircraft.name}
        className="hidden md:block scale-90 aircraft-img-bg opacity-30 blur-3xl z-5 -translate-x-[50px] md:-translate-x-[100px] absolute inset-0 w-full h-full object-cover md:object-left"
      />
    </div>
  );
};

export default AircraftCarousel;