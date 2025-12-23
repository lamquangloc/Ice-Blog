'use client';

import { useEffect, useRef } from 'react';

interface CodeStream {
    x: number;
    y: number;
    speed: number;
    opacity: number;
    text: string;
}

export default function CyberpunkBackground({ language }: { language: 'java' | 'js' | 'neutral' }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const javaSnippets = [
        'public class Developer {',
        '  private String name;',
        '  public void code() {',
        '    System.out.println("Building");',
        '  }',
        '}',
        'import java.util.*;',
        '@Override',
        'implements Runnable',
        'extends Thread',
    ];

    const jsSnippets = [
        'const developer = {',
        '  name: "Coder",',
        '  skills: ["JS", "React"],',
        '  code: () => {',
        '    console.log("Creating");',
        '  }',
        '};',
        'import React from "react";',
        'export default function',
        'async/await',
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const snippets = language === 'java' ? javaSnippets : jsSnippets;
        const streams: CodeStream[] = [];

        // Create three layers of streams
        const layers = [
            { count: 8, speed: 20, opacity: 0.15 }, // Background
            { count: 6, speed: 40, opacity: 0.25 }, // Midground
            { count: 4, speed: 60, opacity: 0.35 }, // Foreground
        ];

        layers.forEach((layer) => {
            for (let i = 0; i < layer.count; i++) {
                streams.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height - canvas.height,
                    speed: layer.speed,
                    opacity: layer.opacity,
                    text: snippets[Math.floor(Math.random() * snippets.length)],
                });
            }
        });

        let animationId: number;
        let lastTime = 0;

        const animate = (currentTime: number) => {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            const isDark = document.documentElement.classList.contains('dark');

            if (isDark) {
                // Dark mode styles
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            } else {
                // Light mode styles - fade with white
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            }

            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '14px "JetBrains Mono", monospace';

            streams.forEach((stream) => {
                let color;
                if (isDark) {
                    color = language === 'java'
                        ? `rgba(0, 240, 255, ${stream.opacity})`
                        : language === 'js'
                            ? `rgba(255, 190, 11, ${stream.opacity})`
                            : `rgba(100, 200, 255, ${stream.opacity})`;
                } else {
                    // Light mode text colors (darker versions)
                    color = language === 'java'
                        ? `rgba(0, 100, 150, ${stream.opacity + 0.2})`
                        : language === 'js'
                            ? `rgba(200, 140, 0, ${stream.opacity + 0.2})`
                            : `rgba(50, 50, 50, ${stream.opacity + 0.2})`;
                }

                ctx.fillStyle = color;
                ctx.fillText(stream.text, stream.x, stream.y);

                stream.y += stream.speed * deltaTime;

                if (stream.y > canvas.height + 50) {
                    stream.y = -50;
                    stream.x = Math.random() * canvas.width;
                    stream.text = snippets[Math.floor(Math.random() * snippets.length)];
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [language]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ imageRendering: 'crisp-edges' }}
        />
    );
}
