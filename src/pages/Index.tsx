
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyCoOwnership from "@/components/WhyCoOwnership";
import GlobeRoutes from "@/components/GlobeRoutes";
import AircraftFleet from "@/components/AircraftFleet";
import MembershipPlans from "@/components/MembershipPlans";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { Plane } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create flying planes that appear at different scroll positions
    const createFlyingPlane = (startPosition: string, endPosition: string, direction: 'ltr' | 'rtl') => {
      const plane = document.createElement('div');
      plane.className = 'flying-plane-scroll absolute z-50';
      
      const planeIcon = document.createElement('div');
      planeIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 transform ${direction === 'ltr' ? '-rotate-12' : 'rotate-12 scale-x-[-1]'}"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`;
      plane.appendChild(planeIcon);
      
      document.body.appendChild(plane);
      
      gsap.fromTo(plane,
        { 
          x: direction === 'ltr' ? '-10vw' : '110vw', 
          y: '20vh', 
          opacity: 0 
        },
        {
          x: direction === 'ltr' ? '110vw' : '-10vw',
          y: '30vh',
          opacity: 1,
          duration: 10,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: pageRef.current,
            start: startPosition,
            end: endPosition,
            scrub: 2,
            onLeave: () => {
              gsap.to(plane, { opacity: 0, duration: 0.5 });
            },
            onEnterBack: () => {
              gsap.to(plane, { opacity: 1, duration: 0.5 });
            }
          }
        }
      );
      
      return plane;
    };
    
    const planes = [
      createFlyingPlane("top 10%", "top -50%", 'ltr'),
      createFlyingPlane("center 60%", "bottom 20%", 'rtl'),
      createFlyingPlane("bottom 80%", "bottom -10%", 'ltr')
    ];
    
    // Clean up planes on unmount
    return () => {
      planes.forEach(plane => {
        if (plane && plane.parentNode) {
          plane.parentNode.removeChild(plane);
        }
      });
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={pageRef} className="min-h-screen bg-white relative overflow-hidden">
      {/* Cloud layers for parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="parallax-layer absolute top-[5%] left-[10%] w-64 h-64 rounded-full bg-blue-50/40 blur-3xl"></div>
        <div className="parallax-layer absolute top-[30%] right-[15%] w-80 h-80 rounded-full bg-amber-50/30 blur-3xl"></div>
        <div className="parallax-layer absolute bottom-[10%] left-[25%] w-96 h-96 rounded-full bg-blue-50/30 blur-3xl"></div>
      </div>
      
      <style>
        {`
        @keyframes flyingPlane {
          0% {
            transform: translateX(-100px) translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-100px) rotate(15deg);
            opacity: 0;
          }
        }
        
        .flying-plane-scroll {
          position: fixed;
          pointer-events: none;
          z-index: 50;
        }
        `}
      </style>
      
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyCoOwnership />
      <GlobeRoutes />
      <AircraftFleet />
      <MembershipPlans />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
