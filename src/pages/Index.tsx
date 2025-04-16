
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyCoOwnership from "@/components/WhyCoOwnership";
import InteractiveGlobeRouteMap from "@/components/InteractiveGlobeRouteMap";
import ImmersiveCabinExperience from "@/components/ImmersiveCabinExperience";
import AircraftFleet from "@/components/AircraftFleet";
import MembershipPlans from "@/components/MembershipPlans";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesSection from "@/components/ServicesSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect for cloud layers
    gsap.utils.toArray('.parallax-layer').forEach((layer: any, i) => {
      const depth = i * 0.1;
      gsap.to(layer, {
        y: () => ScrollTrigger.maxScroll(window) * depth,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });
    
    return () => {
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
      
      <Navbar />
      <Hero />
      <InteractiveGlobeRouteMap />
      <ImmersiveCabinExperience />
      <ServicesSection />
      <AircraftFleet />
      <MembershipPlans />
      <Testimonials />
      <CallToAction />
      <Footer />

      {/* <HowItWorks />
      <WhyCoOwnership /> */}
    </div>
  );
};

export default Index;
