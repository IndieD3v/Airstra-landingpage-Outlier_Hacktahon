
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-container py-24 bg-primary">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/80"></div>
          <img
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Private jet interior"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div ref={contentRef} className="relative z-10 px-6 py-12 md:py-24 md:px-12 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight text-gray-800">
            Elevate Your <span className="luxury-text">Travel Experience</span> Today
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-xl">
            Join our exclusive network of discerning travelers and experience the future of private aviation. Limited memberships available.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="btn-primary text-lg">
              Apply for Membership
            </Button>
            <Button size="lg" variant="outline" className="btn-outline text-lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
