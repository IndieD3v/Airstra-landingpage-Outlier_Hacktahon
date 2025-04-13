
import { useEffect, useRef } from "react";
import { Users, CreditCard, CalendarClock, Plane } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: <Users className="h-8 w-8 text-amber-600" />,
    title: "Join Our Network",
    description: "Apply for membership to our exclusive community of private jet owners and gain access to our fleet.",
    image: "https://images.unsplash.com/photo-1522878129833-838a904a0e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    icon: <CreditCard className="h-8 w-8 text-amber-600" />,
    title: "Choose Your Plan",
    description: "Select the ownership plan that aligns with your travel needs, whether occasional use or frequent flying.",
    image: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    icon: <CalendarClock className="h-8 w-8 text-amber-600" />,
    title: "Book Your Flights",
    description: "Use our intuitive app to schedule flights with as little as 24 hours notice.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80"
  },
  {
    id: 4,
    icon: <Plane className="h-8 w-8 text-amber-600" />,
    title: "Enjoy Seamless Travel",
    description: "Arrive 15 minutes before your flight and experience luxury travel without any of the hassles.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      }
    );

    // Cards animation with stagger
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          delay: 0.2 + (index * 0.15),
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-container bg-white" id="how-it-works">
      <div className="text-center mb-16 space-y-4">
        <h2 
          ref={titleRef}
          className="text-3xl md:text-4xl font-serif font-bold"
        >
          How <span className="luxury-text">SkyBound</span> Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our co-ownership model makes private aviation accessible, flexible, and cost-effective.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            ref={el => {
              if (el) cardsRef.current[index] = el;
            }}
            className="glass-card p-0 hover:shadow-lg transition-all duration-300 group overflow-hidden rounded-xl"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={step.image} 
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <div className="p-3 bg-amber-50/70 backdrop-blur-sm rounded-lg group-hover:bg-amber-100 transition-colors">
                  {step.icon}
                </div>
                <span className="text-4xl font-serif font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
                  {step.id}
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
