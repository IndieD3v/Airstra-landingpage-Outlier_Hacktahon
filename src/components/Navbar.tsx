
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-jet-navy/90 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="text-jet-gold h-8 w-8" />
            <span className="text-2xl font-serif font-bold text-white">SkyBound</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-white hover:text-jet-gold transition-colors">How It Works</a>
            <a href="#fleet" className="text-white hover:text-jet-gold transition-colors">Our Fleet</a>
            <a href="#benefits" className="text-white hover:text-jet-gold transition-colors">Benefits</a>
            <a href="#testimonials" className="text-white hover:text-jet-gold transition-colors">Testimonials</a>
          </div>
          
          <div>
            <Button className="btn-primary">Join Waitlist</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
