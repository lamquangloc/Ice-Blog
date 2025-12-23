'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';
import { Post } from '@/interfaces/post';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Partial<Post>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [allPosts, setAllPosts] = useState<Partial<Post>[]>([]);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Fetch posts for autocomplete
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/posts');
                const data = await res.json();
                setAllPosts(data);
            } catch (error) {
                console.error('Failed to fetch posts for search:', error);
            }
        };
        fetchPosts();
    }, []);

    // Filter posts based on query
    useEffect(() => {
        if (query.trim().length > 0) {
            const filtered = allPosts.filter((post) =>
                post.title?.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5); // Limit to 5 suggestions
            setResults(filtered);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query, allPosts]);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsOpen(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div ref={wrapperRef} className="relative mr-4 hidden md:block">
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search posts..."
                    className="w-48 lg:w-64 bg-slate-100 dark:bg-white/10 border border-transparent dark:border-white/10 text-slate-900 dark:text-slate-100 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-cyan-500/50 transition-all font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 dark:group-focus-within:text-cyan-400 transition-colors" />
            </div>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0a0e27] border border-slate-200 dark:border-cyan-500/30 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                            Suggestions
                        </div>
                        {results.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/post/${post.slug}`}
                                className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <p className="text-sm font-medium text-slate-700 dark:text-cyan-300 line-clamp-1 font-mono">
                                    {post.title}
                                </p>
                            </Link>
                        ))}
                        <div className="border-t border-slate-100 dark:border-white/10 mt-2 pt-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push(`/search?q=${encodeURIComponent(query)}`);
                                }}
                                className="w-full text-left px-4 py-2 text-xs text-blue-600 dark:text-pink-400 font-mono hover:underline"
                            >
                                View all results for "{query}" &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
