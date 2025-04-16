import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
    {
        id: 1,
        title: "Private Jet Charters",
        description:
            "Experience the pinnacle of luxury travel with our premium fleet of private jets available for charter to destinations worldwide.",
        image:
            "https://plus.unsplash.com/premium_photo-1678727128629-72543d1c2268?q=80&w=2749&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        title: "Personalized Travel Itineraries",
        description:
            "Customized itineraries based on your specific requirements—departure and arrival times, destinations, and in-flight experiences.",
        image:
            "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    },
    {
        id: 3,
        title: "Amenities and In-Flight Services",
        description:
            "Indulge in gourmet dining, entertainment systems, and private sleeping quarters—luxury at 40,000 feet.",
        image: "/services2.webp",
    },
];

const ServicesSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    gsap.registerPlugin(ScrollTrigger);

    const prevService = () => {
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    };

    const nextService = () => {
        setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.from(card, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%", // Adjust start trigger for better mobile reveal
                },
            });
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-white">
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 px-4 md:px-6">
                    <h2 className="font-serif text-3xl md:text-[2.5rem] font-semibold text-gray-800 mb-4 md:mb-0">
                        Explore our <span className="text-primary">Services</span>
                    </h2>

                    {/* Responsive Navigation Buttons (if you uncomment them) */}
                    {/* <div className="flex space-x-4">
                        <button
                            onClick={prevService}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all hover:bg-gray-100 group"
                        >
                            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-500 group-hover:text-gray-800" />
                        </button>
                        <button
                            onClick={nextService}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all hover:bg-gray-100 group"
                        >
                            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-gray-500 group-hover:text-gray-800" />
                        </button>
                    </div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6">
                    {services.map((service, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={service.id}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`group relative rounded-xl h-[250px] overflow-hidden transition-all duration-500 ${isActive ? "shadow-lg" : "shadow-md"}`}
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                </div>

                                <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-6 text-white">
                                    <h3 className="text-lg md:text-xl w-[80%] font-medium mb-1 md:mb-2">{service.title}</h3>

                                    <div
                                        className={`overflow-hidden max-h-0 opacity-0 transition-all duration-500
                      ${isActive ? "md:group-hover:max-h-60 md:group-hover:opacity-100" : "md:group-hover:max-h-60 md:group-hover:opacity-100"}`}
                                    >
                                        <p className="text-gray-200 mb-2 md:mb-4 text-sm">{service.description}</p>

                                        <button className="inline-flex items-center text-primary hover:text-white transition-colors text-sm">
                                            Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;