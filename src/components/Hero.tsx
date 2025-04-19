import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    tl.from(textRef.current, {
      y: -40,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    // Plane image fly-in from right
    tl.from(".plane", {
      y: 10,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8"); // Overlap with text animation


    // Flying plane animation
    gsap.to('.plane', {
      x: "random([-10, 10])",
      y: "random([-10, 10])",
      rotation: "random([-2, 2])",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // move the plane up while scroll
    tl.to('.plane-wrapper', {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });


    // Parallax effect on scroll
    gsap.utils.toArray('.parallax-layer').forEach((layer: any, i) => {
      const depth = i * 0.1;
      gsap.to(layer, {
        y: () => ScrollTrigger.maxScroll(window) * depth,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
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
    <div ref={heroRef} className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-90"></div>
        <img
          src="/sky_bg.webp"
          alt="Private jet flying through clouds"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="parallax-layer absolute top-[10%] left-[15%] w-32 h-32 md:w-64 md:h-64 rounded-full bg-white/30 blur-3xl"></div>
        <div className="parallax-layer absolute top-[30%] right-[5%] md:right-[20%] w-40 h-40 md:w-80 md:h-80 rounded-full bg-white/30 blur-3xl"></div>
        <div className="parallax-layer absolute bottom-[5%] left-[10%] md:left-[30%] w-36 h-36 md:w-72 md:h-72 rounded-full bg-white/30 blur-3xl"></div>
      </div>


      <div ref={textRef} className="section-container gap-4 relative z-10 -mt-[150px] md:-mt-[200px] flex w-full md:w-1/2 flex-col items-center text-center px-4 sm:px-6">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-3xl lg:text-[2.45rem] text-center font-serif font-bold leading-tight">
            <span className="text-primary">Elevate</span> Your Travel Experience Through Co-Ownership
          </h1>
          <p className="text-md md:text-md text-gray-700">
            Experience the luxury and convenience of private jet travel without the full cost of ownership. Join our exclusive network of entrepreneurs and business leaders.
          </p>
        </div>
        <div className="flex  sm:flex-row gap-3 pt-4">
          <a href="#benefits" >
            <Button className="btn-primary text-xs md:text-sm flex items-center gap-2">
              Explore Memberships <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </a>
          <Button variant="outline" className="btn-outline text-xs md:text-sm">
            Learn More
          </Button>
        </div>
      </div>
      <div className="plane-wrapper absolute z-5 bottom-24 right-1/2 transform translate-x-1/2 md:-right-10 md:top-[20rem] lg:top-[10rem] md:translate-x-0">
        <img src="/jet.webp" alt="Jet" className="scale-[3] plane md:scale-75 rotate-[7deg] brightness-150" />
      </div>
    </div>
  );
};

export default Hero;