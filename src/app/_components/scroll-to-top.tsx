'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
          p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out
          bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 hover:scale-110
          dark:bg-[#0a0e27] dark:text-cyan-400 dark:border-cyan-500/30 dark:hover:bg-cyan-900/20 dark:hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-6 h-6" />
            </button>
        </div>
    );
}
