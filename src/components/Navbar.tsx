
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-3xl py-3 shadow-md" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img width={24} src="/logo.png" alt="Airstra Logo" className="" />
            <span className="text-xl font-serif font-bold text-gray-800">Airstra</span>
          </div>

          <div className="hidden text-sm md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-800 hover:text-amber-600 transition-colors">How It Works</a>
            <a href="#benefits" className="text-gray-800 hover:text-amber-600 transition-colors">Benefits</a>
            <a href="#fleet" className="text-gray-800 hover:text-amber-600 transition-colors">Our Fleet</a>
            <a href="#testimonials" className="text-gray-800 hover:text-amber-600 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-5">
            <Button className="btn-primary">Join Waitlist</Button>

            {/* MOBILE NAV LINKS */}
            <Sheet>
              <SheetTrigger className="md:hidden"><Menu size={22} className="" /></SheetTrigger>
              <SheetContent side="top" className="bg-white/50 backdrop-blur-xl shadow-xl shadow-black/10">
                <SheetHeader>
                  <a href="#how-it-works" className="text-gray-800 hover:text-amber-600 transition-colors">How It Works</a>
                  <a href="#benefits" className="text-gray-800 hover:text-amber-600 transition-colors">Benefits</a>
                  <a href="#fleet" className="text-gray-800 hover:text-amber-600 transition-colors">Our Fleet</a>
                  <a href="#testimonials" className="text-gray-800 hover:text-amber-600 transition-colors">Testimonials</a>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
