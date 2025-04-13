
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const scrollY = window.scrollY;
      const elements = parallaxRef.current.querySelectorAll('.parallax-layer');
      
      elements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        const speed = (index + 1) * 0.1;
        htmlEl.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-jet-dark">
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="parallax-layer absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-jet-accent/20 blur-3xl"></div>
          <div className="parallax-layer absolute top-[30%] right-[20%] w-80 h-80 rounded-full bg-jet-gold/10 blur-3xl"></div>
          <div className="parallax-layer absolute bottom-[10%] left-[30%] w-72 h-72 rounded-full bg-jet-accent/15 blur-3xl"></div>
        </div>
      </div>
      
      <div className="section-container relative z-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-right" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="gold-gradient-text">Elevate</span> Your Travel Experience Through Co-Ownership
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Experience the luxury and convenience of private jet travel without the full cost of ownership. Join our exclusive network of entrepreneurs and business leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn-primary text-lg flex items-center gap-2">
                Explore Memberships <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="btn-outline text-lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="lg:pl-10 animate-fade-left" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-gold rounded-2xl blur opacity-30"></div>
              <div className="glass-card relative overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Luxury private jet interior" 
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-jet-navy/90 to-transparent">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium text-lg">G650 Flagship</h3>
                      <p className="text-gray-300 text-sm">Ultra-long range luxury</p>
                    </div>
                    <div className="bg-jet-gold/80 rounded-full px-4 py-1">
                      <span className="text-jet-navy font-medium">New</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 animate-float">
                <div className="bg-jet-gold/80 text-jet-navy font-medium rounded-full px-5 py-2 shadow-xl">
                  50% Lower Cost
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
