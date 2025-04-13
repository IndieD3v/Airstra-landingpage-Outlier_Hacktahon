
import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import gsap from 'gsap';

const fleetLocations = [
    { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
    { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Dubai, UAE', lat: 25.276987, lng: 55.296249 },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { name: 'Los Angeles, USA', lat: 34.0522, lng: -118.2437 }
];

const GlobeMap = () => {
    const globeRef = useRef<HTMLDivElement>(null);
    const globeInstanceRef = useRef<any>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        // Initialize the globe - note the use of 'new' keyword to fix the TS error
        const globe = new Globe()
            .globeImageUrl('https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-day.jpg')
            .backgroundColor('#ffffff00') // Transparent background for glassmorphism
            .showAtmosphere(true)
            .atmosphereColor('#aac')
            .atmosphereAltitude(0.25)
            .pointOfView({ lat: 20, lng: 0, altitude: 1.8 }, 2000)
            .htmlElementsData(fleetLocations)
            .htmlElement(d => {
                const container = document.createElement('div');

                // Location name with glassmorphism effect
                const nameEl = document.createElement('div');
                nameEl.innerHTML = d.name;
                nameEl.style.width = '100px';
                nameEl.style.color = 'black';
                nameEl.style.backdropFilter = 'blur(10px)';
                nameEl.style.fontSize = '12px';
                nameEl.style.fontWeight = 'bold';
                nameEl.style.padding = '5px 10px';
                nameEl.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'; // Semi-transparent background
                nameEl.style.borderRadius = '5px';
                nameEl.style.textAlign = 'center';
                nameEl.style.position = 'absolute';
                nameEl.style.transform = 'translate(-50%, -100%)';
                nameEl.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                nameEl.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

                // Pin element below the name
                const pinEl = document.createElement('div');
                pinEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>';
                pinEl.style.position = 'absolute';
                pinEl.style.transform = 'translate(-50%, 0)';
                pinEl.style.color = '#d97706'; // Amber color to match theme

                container.appendChild(nameEl);
                container.appendChild(pinEl);

                return container;
            });

        // Mount the globe
        globeInstanceRef.current = globe(globeRef.current);

        // Animation for globe appearance using GSAP
        gsap.fromTo(globeRef.current, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power4.out"
        });

        // Auto-rotate the globe
        let currentLng = 0;
        const rotateGlobe = () => {
            currentLng += 0.1;
            globeInstanceRef.current.pointOfView({
                lat: 20,
                lng: currentLng,
                altitude: 1.8
            });
            requestAnimationFrame(rotateGlobe);
        };
        rotateGlobe();

        return () => {
            if (globeInstanceRef.current) {
                // Cleanup if necessary
                globeInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full h-[600px] rounded-2xl shadow-xl overflow-hidden border border-gray-100 glass-card bg-white/10 backdrop-blur-md">
            <div ref={globeRef} className="w-full h-full" />
        </div>
    );
};

export default GlobeMap;
