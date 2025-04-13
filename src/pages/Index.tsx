
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

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
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
