'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Zap } from 'lucide-react';

export default function LanguageIcons() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const javaRef = useRef<HTMLDivElement>(null);
    const jsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const calculateDistance = (refEl: HTMLDivElement | null) => {
        if (!refEl) return 1000;
        const rect = refEl.getBoundingClientRect();
        const iconX = rect.left + rect.width / 2;
        const iconY = rect.top + rect.height / 2;
        return Math.sqrt(
            Math.pow(mousePos.x - iconX, 2) + Math.pow(mousePos.y - iconY, 2)
        );
    };

    return (
        <>
            {/* Java Icon */}
            <motion.div
                ref={javaRef}
                className="fixed top-1/4 left-1/4 z-20 pointer-events-none"
                animate={{
                    x: Math.cos(Date.now() / 3000) * 100,
                    y: Math.sin(Date.now() / 3000) * 100,
                    scale: calculateDistance(javaRef.current) < 200 ? 1.3 : 1,
                }}
                transition={{ type: 'spring', stiffness: 50 }}
            >
                <motion.div
                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-400/50 flex items-center justify-center"
                    style={{
                        boxShadow: '0 0 40px rgba(0,240,255,0.4), inset 0 0 20px rgba(0,240,255,0.2)',
                    }}
                    animate={{
                        boxShadow: calculateDistance(javaRef.current) < 200
                            ? '0 0 60px rgba(0,240,255,0.8), inset 0 0 30px rgba(0,240,255,0.4)'
                            : '0 0 40px rgba(0,240,255,0.4), inset 0 0 20px rgba(0,240,255,0.2)',
                    }}
                >
                    <Coffee className="w-12 h-12 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.8))' }} />

                    {/* Steam particles */}
                    {calculateDistance(javaRef.current) < 200 && (
                        <div className="absolute -top-8">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                                    initial={{ y: 0, opacity: 0.6 }}
                                    animate={{
                                        y: -40,
                                        opacity: 0,
                                        x: Math.sin(i) * 15,
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                    }}
                                    style={{ left: `${i * 10}px` }}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                <motion.p
                    className="text-center mt-3 font-mono text-cyan-400 font-bold text-sm"
                    style={{ textShadow: '0 0 10px rgba(0,240,255,0.8)' }}
                    animate={{
                        scale: calculateDistance(javaRef.current) < 200 ? 1.1 : 1,
                    }}
                >
                    JAVA
                </motion.p>
            </motion.div>

            {/* JavaScript Icon */}
            <motion.div
                ref={jsRef}
                className="fixed top-1/4 right-1/4 z-20 pointer-events-none"
                animate={{
                    x: Math.cos(Date.now() / 3000 + Math.PI) * 100,
                    y: Math.sin(Date.now() / 3000 + Math.PI) * 100,
                    scale: calculateDistance(jsRef.current) < 200 ? 1.3 : 1,
                }}
                transition={{ type: 'spring', stiffness: 50 }}
            >
                <motion.div
                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border border-amber-400/50 flex items-center justify-center"
                    style={{
                        boxShadow: '0 0 40px rgba(255,190,11,0.4), inset 0 0 20px rgba(255,190,11,0.2)',
                    }}
                    animate={{
                        boxShadow: calculateDistance(jsRef.current) < 200
                            ? '0 0 60px rgba(255,190,11,0.8), inset 0 0 30px rgba(255,190,11,0.4)'
                            : '0 0 40px rgba(255,190,11,0.4), inset 0 0 20px rgba(255,190,11,0.2)',
                    }}
                >
                    <Zap className="w-12 h-12 text-amber-400" style={{ filter: 'drop-shadow(0 0 10px rgba(255,190,11,0.8))' }} />

                    {/* Electric arcs */}
                    {calculateDistance(jsRef.current) < 200 && (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-8 bg-gradient-to-b from-amber-400 to-transparent"
                                    initial={{ opacity: 0, rotate: i * 90 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [1, 1.5, 1],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                    }}
                                    style={{
                                        transformOrigin: 'center',
                                        filter: 'blur(1px)',
                                    }}
                                />
                            ))}
                        </>
                    )}
                </motion.div>

                <motion.p
                    className="text-center mt-3 font-mono text-amber-400 font-bold text-sm"
                    style={{ textShadow: '0 0 10px rgba(255,190,11,0.8)' }}
                    animate={{
                        scale: calculateDistance(jsRef.current) < 200 ? 1.1 : 1,
                    }}
                >
                    JAVASCRIPT
                </motion.p>
            </motion.div>
        </>
    );
}
