'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeShowcaseProps {
    title: string;
    code: string;
    language: 'java' | 'javascript';
}

export default function CodeShowcase({ title, code, language }: CodeShowcaseProps) {
    const [copied, setCopied] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const accentColor = language === 'java' ? 'cyan' : 'amber';
    const glowColor = language === 'java'
        ? 'rgba(0,240,255,0.4)'
        : 'rgba(255,190,11,0.4)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group"
            onMouseEnter={() => setIsGlitching(true)}
            onMouseLeave={() => setIsGlitching(false)}
        >
            <div
                className={`relative bg-[#0a0e27] backdrop-blur-[20px] border rounded-lg overflow-hidden transition-all duration-300 ${isGlitching
                    ? `border-${accentColor}-400 scale-[1.02]`
                    : `border-${accentColor}-500/30`
                    }`}
                style={{
                    boxShadow: isGlitching
                        ? `0 0 30px ${glowColor}, inset 0 0 20px ${glowColor}`
                        : 'none',
                }}
            >
                {/* Glitch effect overlay */}
                {isGlitching && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            x: [-4, 4, -2, 2, 0],
                        }}
                        transition={{
                            duration: 0.15,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                        }}
                    >
                        <div className="w-full h-full bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20" />
                    </motion.div>
                )}

                {/* Terminal header */}
                <div className={`bg-gradient-to-r from-${accentColor}-500/20 to-pink-500/20 backdrop-blur-xl border-b border-${accentColor}-500/30 px-4 py-2 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 rounded-full bg-green-500/80" />
                        <span className={`ml-3 text-${accentColor}-400 text-xs font-mono`}>{title}</span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className={`p-1 rounded hover:bg-${accentColor}-500/20 transition-colors`}
                    >
                        {copied ? (
                            <Check className={`w-4 h-4 text-green-400`} />
                        ) : (
                            <Copy className={`w-4 h-4 text-${accentColor}-400`} />
                        )}
                    </button>
                </div>

                {/* Code content */}
                <div className="p-4 overflow-x-auto">
                    <pre className="font-mono text-sm leading-relaxed">
                        {code.split('\n').map((line, i) => (
                            <div key={i} className="flex">
                                <span className="text-white/40 select-none mr-4 text-right" style={{ minWidth: '2rem' }}>
                                    {i + 1}
                                </span>
                                <code className="text-gray-300">
                                    {line.split(/(\/\/.*$|"[^"]*"|'[^']*'|\b(?:class|public|static|void|return|if|else|for|while|import|from|const|let|var|async|await|function|export|default|new|this)\b)/g).map((token, j) => {
                                        if (token.startsWith('//')) return <span key={j} className="text-gray-500">{token}</span>;
                                        if (token.startsWith('"') || token.startsWith("'")) return <span key={j} className="text-green-400">{token}</span>;
                                        if (['class', 'public', 'static', 'void', 'return', 'if', 'else', 'for', 'while', 'import', 'from', 'const', 'let', 'var', 'async', 'await', 'function', 'export', 'default', 'new', 'this'].includes(token)) {
                                            return <span key={j} className="text-pink-400">{token}</span>;
                                        }
                                        return <span key={j}>{token}</span>;
                                    })}
                                </code>
                            </div>
                        ))}
                    </pre>
                </div>

                {/* Scanline effect */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px, transparent 4px)',
                    }}
                />
            </div>

            {/* Copied notification */}
            {copied && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`absolute -top-10 right-0 bg-${accentColor}-500/20 backdrop-blur-xl border border-${accentColor}-400/50 px-3 py-1 rounded text-${accentColor}-400 text-sm font-mono`}
                >
                    Copied to clipboard!
                </motion.div>
            )}
        </motion.div>
    );
}
