
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline();
    
    // Animate hero elements
    tl.fromTo(
      textRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo(
      imageRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    );
    
    // Parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const elements = heroRef.current.querySelectorAll('.parallax-layer');
      
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
    <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="parallax-layer absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-amber-100/40 blur-3xl"></div>
          <div className="parallax-layer absolute top-[30%] right-[20%] w-80 h-80 rounded-full bg-blue-50/30 blur-3xl"></div>
          <div className="parallax-layer absolute bottom-[10%] left-[30%] w-72 h-72 rounded-full bg-amber-50/30 blur-3xl"></div>
        </div>
      </div>
      
      <div className="section-container relative z-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="luxury-text">Elevate</span> Your Travel Experience Through Co-Ownership
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
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
          
          <div ref={imageRef} className="lg:pl-10">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-luxury-gradient rounded-2xl blur opacity-30"></div>
              <div className="glass-card relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Luxury private jet interior" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-gray-800 font-medium text-lg">G650 Flagship</h3>
                      <p className="text-gray-600 text-sm">Ultra-long range luxury</p>
                    </div>
                    <div className="bg-amber-600/90 rounded-full px-4 py-1">
                      <span className="text-white font-medium">New</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 animate-float">
                <div className="bg-amber-600/90 text-white font-medium rounded-full px-5 py-2 shadow-xl">
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
