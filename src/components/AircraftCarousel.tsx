
import { useState } from "react";
import { Plane, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const activeAircraft = aircraft[activeIndex];

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-1 border border-white/20">
      <Carousel 
        className="w-full"
        onSelect={(index) => setActiveIndex(index)}
      >
        <CarouselContent>
          {aircraft.map((craft) => (
            <CarouselItem key={craft.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative h-96 lg:h-auto overflow-hidden rounded-xl">
                  <img 
                    src={craft.image} 
                    alt={craft.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-amber-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {craft.category}
                  </div>
                </div>
                
                <div className="p-8 space-y-6 flex flex-col justify-center">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-gray-800 mb-2">{craft.name}</h3>
                    <p className="text-gray-700">{craft.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="glass-card p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">Range</p>
                      <p className="text-lg font-medium text-gray-800">{craft.specs.range}</p>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">Passengers</p>
                      <p className="text-lg font-medium text-gray-800">{craft.specs.passengers}</p>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">Speed</p>
                      <p className="text-lg font-medium text-gray-800">{craft.specs.speed}</p>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">Cabin Height</p>
                      <p className="text-lg font-medium text-gray-800">{craft.specs.height}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="btn-primary w-full glass-panel">Schedule a Tour</Button>
                    <Button variant="outline" className="btn-outline w-full flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm">
                      <Plane className="h-4 w-4" /> View All Aircraft
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="ghost" onClick={onBackToGallery} className="text-amber-600">
                      Back to Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/50 backdrop-blur-md border border-white/30 text-gray-700 hover:bg-white/80" />
        <CarouselNext className="right-4 bg-white/50 backdrop-blur-md border border-white/30 text-gray-700 hover:bg-white/80" />
      </Carousel>

      <div className="flex justify-center mt-4 py-2">
        {aircraft.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
              activeIndex === index 
                ? 'bg-amber-600 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AircraftCarousel;
