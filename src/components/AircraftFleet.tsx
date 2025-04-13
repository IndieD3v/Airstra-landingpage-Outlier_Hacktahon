
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    }
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
    }
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
    }
  }
];

const AircraftFleet = () => {
  const [activeAircraft, setActiveAircraft] = useState(aircraft[0]);
  
  return (
    <div className="section-container" id="fleet">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">
          Our <span className="gold-gradient-text">Luxury</span> Fleet
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Experience unparalleled comfort with our collection of ultra-modern private jets.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {aircraft.map((craft) => (
              <button
                key={craft.id}
                onClick={() => setActiveAircraft(craft)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeAircraft.id === craft.id 
                    ? "bg-gradient-to-r from-jet-navy/80 to-jet-gold/20 border-l-4 border-jet-gold" 
                    : "bg-jet-navy/30 hover:bg-jet-navy/50"
                }`}
              >
                <h3 className="text-xl font-medium text-white">{craft.name}</h3>
                <p className="text-sm text-gray-300 mt-1">{craft.category}</p>
              </button>
            ))}
            
            <div className="pt-4">
              <Button variant="outline" className="btn-outline text-sm w-full">
                View All Aircraft <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-gold rounded-2xl blur opacity-20"></div>
            <div className="glass-card relative overflow-hidden rounded-2xl p-6">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img 
                  src={activeAircraft.image} 
                  alt={activeAircraft.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-medium text-white">{activeAircraft.name}</h3>
                  <p className="text-jet-gold">{activeAircraft.category}</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-jet-navy/40 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">Range</p>
                    <p className="text-white font-medium">{activeAircraft.specs.range}</p>
                  </div>
                  <div className="bg-jet-navy/40 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">Passengers</p>
                    <p className="text-white font-medium">{activeAircraft.specs.passengers}</p>
                  </div>
                  <div className="bg-jet-navy/40 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">Speed</p>
                    <p className="text-white font-medium">{activeAircraft.specs.speed}</p>
                  </div>
                  <div className="bg-jet-navy/40 p-3 rounded-lg">
                    <p className="text-sm text-gray-300">Cabin Height</p>
                    <p className="text-white font-medium">{activeAircraft.specs.height}</p>
                  </div>
                </div>
                
                <Button className="btn-primary">Schedule a Tour</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftFleet;
