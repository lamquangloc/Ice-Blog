'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroTerminal() {
    const [displayText, setDisplayText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);

    const messages = [
        '> Initializing developer environment...',
        '> Loading Java modules...',
        '> Loading JavaScript frameworks...',
        '> Welcome to the Ice workspace',
    ];

    useEffect(() => {
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout: NodeJS.Timeout;

        const type = () => {
            const currentMessage = messages[messageIndex];

            if (!isDeleting) {
                setDisplayText(currentMessage.substring(0, charIndex + 1));
                charIndex++;

                if (charIndex === currentMessage.length) {
                    timeout = setTimeout(() => {
                        if (messageIndex < messages.length - 1) {
                            isDeleting = true;
                            type();
                        }
                    }, 2000);
                    return;
                }
            } else {
                setDisplayText(currentMessage.substring(0, charIndex));
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    messageIndex = (messageIndex + 1) % messages.length;
                }
            }

            timeout = setTimeout(type, isDeleting ? 30 : 80);
        };

        timeout = setTimeout(type, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full max-w-4xl mx-auto"
        >
            {/* Glassmorphic terminal window */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
                {/* Terminal header */}
                <div className="bg-[#0a0e27] border-b border-cyan-500/30 px-6 py-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                    <span className="ml-4 text-cyan-400 text-sm font-mono">iceblog@workspace:~</span>
                </div>

                {/* Terminal body */}
                <div
                    className="relative bg-[#0a0e27] border border-cyan-500/30 rounded-b-lg p-8 min-h-[300px] shadow-[0_0_60px_rgba(0,240,255,0.15),inset_0_0_60px_rgba(255,0,110,0.05)]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,240,255,0.03) 0px, transparent 1px, transparent 2px, rgba(0,240,255,0.03) 3px)',
                    }}
                >
                    {/* Scanline effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                        <div className="w-full h-full animate-[scanline_8s_linear_infinite]"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px, transparent 4px)',
                            }}
                        />
                    </div>

                    <div className="relative z-10">
                        <h1 className="font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 mb-6"
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 4rem)',
                                textShadow: '0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(255,0,110,0.3)',
                            }}
                        >
                            ICE_WORKSPACE
                        </h1>

                        <div className="font-mono text-lg md:text-xl text-cyan-300 min-h-[60px] flex items-center">
                            <span className="mr-2 text-pink-500">&gt;</span>
                            <span style={{ textShadow: '0 0 10px rgba(0,240,255,0.8)' }}>
                                {displayText}
                            </span>
                            <span
                                className={`inline-block w-2 h-5 ml-1 bg-cyan-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ boxShadow: '0 0 10px rgba(0,240,255,0.8)' }}
                            />
                        </div>

                        <div className="mt-8 space-y-2 text-sm font-mono text-cyan-300/60">
                            <p>// Mastering Java & JavaScript</p>
                            <p>// Building the future, one line at a time</p>
                            <p className="text-pink-400/60">// Scroll to explore</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
