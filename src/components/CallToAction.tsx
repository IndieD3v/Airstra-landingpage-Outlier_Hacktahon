
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="section-container py-24">
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-jet-navy/95 to-jet-navy/80"></div>
          <img
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Private jet interior"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 px-6 py-12 md:py-24 md:px-12 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Elevate Your <span className="gold-gradient-text">Travel Experience</span> Today
          </h2>
          <p className="text-white text-lg md:text-xl mb-8 max-w-xl">
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
