import { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "CEO, Quantum Ventures",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    quote: "Airstra has completely transformed my business travel. The co-ownership model gives me all the benefits of having my own jet at a fraction of the cost and hassle."
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Founder, Nova Technologies",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    quote: "As someone who values both luxury and efficiency, Airstra delivers on all fronts. The booking process is seamless, and the experience is consistently outstanding."
  },
  {
    id: 3,
    name: "Michael Thompson",
    role: "Managing Partner, Elevate Capital",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    quote: "The flexibility and access to diverse aircraft in the Airstra fleet allow me to choose the perfect jet for each journey, whether it's a quick domestic trip or a transatlantic flight."
  }
];



gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".title-container", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".title-container",
          start: "top 80%",
        },
      });

      gsap.from(".testimonial-container", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonial-container",
          start: "top 85%",
        },
      });
    });
    return () => ctx.revert();
  }, []);


  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="section-container" id="testimonials">
      <div className="title-container text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">
          What Our <span className="text-primary">Members</span> Say
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover how Airstra is transforming the private aviation experience for entrepreneurs and executives.
        </p>
      </div>

      <div className="testimonial-container relative max-w-4xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-gold rounded-2xl blur opacity-20"></div>
        <div className="glass-card p-6 md:p-8 relative">
          <div className="flex items-start space-x-1 text-jet-gold mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 fill-jet-gold" />
            ))}
          </div>

          <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ height: '200px' }}
          >
            <div
              className="absolute transition-all duration-500 w-full flex"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="space-y-6">
                    <p className="text-xl italic text-black leading-relaxed">"{testimonial.quote}"</p>

                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-black font-medium">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-jet-navy hover:bg-jet-gold/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-jet-gold' : 'bg-gray-500'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-jet-navy hover:bg-jet-gold/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
