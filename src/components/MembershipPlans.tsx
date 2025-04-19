import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 1,
    name: "Executive",
    price: "250,000",
    hours: "25",
    benefits: [
      "25 flight hours per year",
      "Access to mid-size jets",
      "2 passengers on all flights",
      "72-hour booking window",
      "No peak day restrictions"
    ]
  },
  {
    id: 2,
    name: "Ambassador",
    price: "500,000",
    hours: "50",
    featured: true,
    benefits: [
      "50 flight hours per year",
      "Access to all aircraft including long-range",
      "Up to 6 passengers on all flights",
      "48-hour booking window",
      "No peak day restrictions",
      "Complimentary catering",
      "Dedicated concierge"
    ]
  },
  {
    id: 3,
    name: "Chairman",
    price: "1,000,000",
    hours: "100",
    benefits: [
      "100 flight hours per year",
      "Priority access to ultra-long range jets",
      "Unlimited passengers",
      "24-hour booking window",
      "Guaranteed availability",
      "Premium catering included",
      "Dedicated flight team",
      "Global airport transfers"
    ]
  }
];

const MembershipPlans = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title + description animation
      gsap.from(".membership-title", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".membership-title",
          start: "top 80%",
        },
      });

      // Cards animation
      gsap.from(".plan-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".plan-card",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-container" id="benefits" ref={sectionRef}>
      <div className="text-center mb-16 space-y-4 membership-title">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">
          <span className="text-primary">Membership</span> Plans
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Choose the perfect ownership level that aligns with your travel schedule and investment comfort.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl overflow-hidden plan-card ${plan.featured ? 'transform md:-translate-y-4 z-10' : ''
              }`}
          >
            {plan.featured && (
              <div className="absolute top-0 left-0 right-0 py-2 bg-jet-gold text-jet-navy text-center font-medium">
                Most Popular
              </div>
            )}

            <div className={`h-full glass-card p-8 ${plan.featured ? 'border-2 border-jet-gold/50 shadow-xl' : ''
              }`}>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-black">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">From</span>
                    <div className="flex items-center justify-center">
                      <span className="text-jet-gold text-lg">$</span>
                      <span className="text-3xl font-bold text-black">{plan.price}</span>
                    </div>
                    <p className="text-gray-500">{plan.hours} hours annually</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="text-jet-gold shrink-0 h-5 w-5 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-500">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={plan.featured ? "btn-primary w-full" : "btn-outline w-full"}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
