
import { useEffect, useRef } from 'react';
import { DollarSign, Clock, Shield, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Clock className="h-12 w-12 text-amber-600" />,
    title: "Flexible Access",
    description: "No fixed schedules or black-out dates."
  },
  {
    icon: <DollarSign className="h-12 w-12 text-amber-600" />,
    title: "Shared Costs",
    description: "Pay only for the hours you fly."
  },
  {
    icon: <Shield className="h-12 w-12 text-amber-600" />,
    title: "Zero Maintenance",
    description: "We handle operations, insurance, and storage."
  },
  {
    icon: <Smartphone className="h-12 w-12 text-amber-600" />,
    title: "Exclusive App",
    description: "Book, track, and manage flights at your fingertips."
  }
];

const WhyCoOwnership = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
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

    // Animate each card with stagger
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
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
    <div ref={sectionRef} className="section-container bg-gray-50 py-20" id="benefits">
      <div className="text-center mb-16 space-y-4">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-serif font-bold"
        >
          Full Luxury, <span className="luxury-text">Fraction of the Cost</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            ref={el => {
              if (el) cardsRef.current[index] = el;
            }}
            className="glass-card p-6 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-amber-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyCoOwnership;
