'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CyberpunkBackground from '@/app/_components/cyberpunk-background';
import HeroTerminal from '@/app/_components/hero-terminal';
import CodeShowcase from '@/app/_components/code-showcase';
import { Post } from '@/interfaces/post';
import Link from 'next/link';
import DateFormatter from './_components/date-formatter';


type Props = {
    allPosts: Post[];
};

export default function HomeClient({ allPosts }: Props) {
    const [language, setLanguage] = useState<'java' | 'js' | 'neutral'>('neutral');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showGlitch, setShowGlitch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;

            setScrollProgress(progress);

            // Trigger glitch effect at 30% intervals
            if (Math.floor(progress) % 30 === 0 && Math.floor(progress) > 0) {
                setShowGlitch(true);
                setTimeout(() => setShowGlitch(false), 150);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX } = e;
            const width = window.innerWidth;

            if (clientX < width / 2) {
                setLanguage('java');
            } else {
                setLanguage('js');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const javaCode = `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
    
    Developer dev = new Developer("Java");
    dev.code();
  }
}

class Developer {
  private String language;
  
  public Developer(String lang) {
    this.language = lang;
  }
  
  public void code() {
    System.out.println("Coding in " + language);
  }
}`;

    const jsCode = `const greet = async () => {
  console.log("Hello, World!");
  
  const developer = {
    language: "JavaScript",
    skills: ["React", "Node.js", "TypeScript"],
    
    code: function() {
      console.log(\`Coding in \${this.language}\`);
      return this.skills;
    }
  };
  
  const result = await developer.code();
  return result;
};

greet();`;

    return (
        <div className="relative min-h-screen bg-white dark:bg-black overflow-x-hidden text-foreground">
            {/* Glitch overlay */}
            {showGlitch && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50 pointer-events-none hidden dark:block"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 10%, rgba(0,0,255,0.1) 20%, transparent 30%)',
                            animation: 'glitch 0.15s ease-in-out',
                        }}
                    />
                </motion.div>
            )}



            {/* Animated background */}
            <CyberpunkBackground language={language} />

            {/* Noise grain overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] hidden dark:block"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                }}
            />

            {/* Scanline overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-[2] opacity-[0.05] hidden dark:block"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px, transparent 4px)',
                    animation: 'scanline 8s linear infinite',
                }}
            />

            {/* Main content */}
            <div className="relative z-10">
                {/* Navigation placeholder if needed */}

                {/* Hero section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center px-4 pt-32 pb-12"
                >
                    <div className="w-full max-w-6xl">
                        <HeroTerminal />
                    </div>
                </motion.section>

                {/* Code showcases */}
                <section className="py-12 px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2
                                className="font-mono font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 dark:from-cyan-400 dark:via-pink-400 dark:to-amber-400 mb-4"
                                style={{ textShadow: '0 0 20px rgba(0,240,255,0.5)' }}
                            >
                                CODE_SAMPLES
                            </h2>
                            <p className="text-slate-600 dark:text-cyan-300/60 font-mono text-lg">
                // Hover to interact • Click to copy
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <CodeShowcase
                                title="HelloWorld.java"
                                code={javaCode}
                                language="java"
                            />
                            <CodeShowcase
                                title="app.js"
                                code={jsCode}
                                language="javascript"
                            />
                        </div>
                    </div>
                </section>

                {/* New Posts Section */}
                <section className="py-20 px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2
                                className="font-mono font-extrabold text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 dark:from-cyan-400 dark:via-pink-400 dark:to-amber-400 mb-4"
                                style={{ textShadow: '0 0 20px rgba(0,240,255,0.5)' }}
                            >
                                LATEST_POSTS
                            </h2>
                            <p className="text-slate-600 dark:text-cyan-300/60 font-mono text-lg">
                // Fresh insights from the dev terminal
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {allPosts.map((post, i) => (
                                <Link href={`/post/${post.slug}`} key={post.slug} className="block h-full">
                                    <motion.article
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative h-full bg-white/80 dark:bg-[#0a0e27]/70 backdrop-blur-[20px] border border-slate-200 dark:border-cyan-500/30 hover:border-blue-400/60 dark:hover:border-cyan-400/60 rounded-lg p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md dark:shadow-none"
                                        style={process.env.NODE_ENV === 'development' ? {} : {
                                            boxShadow: '0 0 20px rgba(0,240,255,0.0)',
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                    >
                                        <div className="mb-4">
                                            <div className="flex items-center gap-2 text-slate-500 dark:text-cyan-400/60 text-xs font-mono mb-2">
                                                <span><DateFormatter dateString={post.date} /></span>
                                                {post.categories?.[0] && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="uppercase tracking-wider">{post.categories[0]}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold font-mono text-slate-900 group-hover:text-blue-600 dark:text-cyan-300 dark:group-hover:text-cyan-400 transition-colors mb-3">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-cyan-300/70 text-sm leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {post.categories?.map((category) => (
                                                <span
                                                    key={category}
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 border-blue-200 dark:bg-cyan-500/10 dark:border-cyan-500/30 border rounded text-xs font-mono dark:text-cyan-400"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                            {post.tags?.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-500/10 dark:border-pink-500/30 border rounded text-xs font-mono dark:text-pink-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Hover indicator */}
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-blue-500 dark:text-pink-400 font-mono text-sm">&gt;&gt;</span>
                                        </div>
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
}
