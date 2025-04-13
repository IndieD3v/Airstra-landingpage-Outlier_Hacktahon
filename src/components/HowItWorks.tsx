
import { Users, CreditCard, CalendarClock, Plane } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Users className="h-8 w-8 text-jet-gold" />,
    title: "Join Our Network",
    description: "Apply for membership to our exclusive community of private jet owners and gain access to our fleet."
  },
  {
    id: 2,
    icon: <CreditCard className="h-8 w-8 text-jet-gold" />,
    title: "Choose Your Plan",
    description: "Select the ownership plan that aligns with your travel needs, whether occasional use or frequent flying."
  },
  {
    id: 3,
    icon: <CalendarClock className="h-8 w-8 text-jet-gold" />,
    title: "Book Your Flights",
    description: "Use our intuitive app to schedule flights with as little as 24 hours notice."
  },
  {
    id: 4,
    icon: <Plane className="h-8 w-8 text-jet-gold" />,
    title: "Enjoy Seamless Travel",
    description: "Arrive 15 minutes before your flight and experience luxury travel without any of the hassles."
  }
];

const HowItWorks = () => {
  return (
    <div className="section-container" id="how-it-works">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">
          How <span className="gold-gradient-text">SkyBound</span> Works
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Our co-ownership model makes private aviation accessible, flexible, and cost-effective.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className="glass-card p-6 hover:shadow-lg transition-all duration-300 group"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="mb-4 flex justify-between items-center">
              <div className="p-3 bg-jet-navy/50 rounded-lg group-hover:bg-jet-gold/20 transition-colors">
                {step.icon}
              </div>
              <span className="text-4xl font-serif font-bold text-jet-gold/20 group-hover:text-jet-gold/30 transition-colors">
                {step.id}
              </span>
            </div>
            <h3 className="text-xl font-medium mb-2 text-white">{step.title}</h3>
            <p className="text-gray-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
