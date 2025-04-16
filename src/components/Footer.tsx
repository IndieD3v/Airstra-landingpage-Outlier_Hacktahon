
import { Plane, Instagram, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-jet-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img width={24} src="/logo.png" alt="Airstra Logo" className="" />
              <span className="text-xl font-serif font-bold text-white">Airstra</span>
            </div>
            <p className="text-gray-300 mb-6">
              Redefining private aviation through innovative co-ownership, making luxury travel more accessible than ever.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-jet-gold transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#fleet" className="text-gray-300 hover:text-jet-gold transition-colors">Our Fleet</a>
              </li>
              <li>
                <a href="#benefits" className="text-gray-300 hover:text-jet-gold transition-colors">Membership Plans</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-jet-gold transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">About Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-jet-gold transition-colors">Accessibility</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-jet-gold mr-3 mt-1 shrink-0" />
                <span className="text-gray-300">info@airstra.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-jet-gold mr-3 mt-1 shrink-0" />
                <span className="text-gray-300">+1 (888) 555-JETS</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-jet-gold mr-3 mt-1 shrink-0" />
                <span className="text-gray-300">
                  Airstra Headquarters<br />
                  100 Aviation Way<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Airstra Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
