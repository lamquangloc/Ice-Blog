'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Post } from '@/interfaces/post';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Tag, FolderOpen, Calendar, ArrowRight } from 'lucide-react';
import Container from '@/app/_components/container';
import DateFormatter from '@/app/_components/date-formatter';

type Props = {
    posts: Post[];
};

export default function SearchClient({ posts }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Extract all unique categories and tags
    const allCategories = Array.from(new Set(posts.flatMap(p => p.categories || [])));
    const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));

    // Update query state if URL param changes
    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    // Handle Search Submit
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    // Filter Logic
    const filteredPosts = posts.filter(post => {
        // 1. Search Query (Title)
        const matchesQuery = query === '' || post.title.toLowerCase().includes(query.toLowerCase());

        // 2. Category Filter
        const matchesCategory = selectedCategories.length === 0 ||
            (post.categories && post.categories.some(c => selectedCategories.includes(c)));

        // 3. Tag Filter
        const matchesTag = selectedTags.length === 0 ||
            (post.tags && post.tags.some(t => selectedTags.includes(t)));

        return matchesQuery && matchesCategory && matchesTag;
    });

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <main className="bg-white dark:bg-black min-h-screen pt-32 pb-20">
            <Container>
                {/* Search Header */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold font-mono text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                        <Search className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
                        Search Results
                    </h1>
                    <form onSubmit={handleSearch} className="relative max-w-2xl">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search articles by title..."
                            className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 pl-14 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all text-slate-800 dark:text-slate-100"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                    </form>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Results */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                            <span className="font-mono text-slate-500 dark:text-slate-400">
                                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                            </span>
                            {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                                <button
                                    onClick={() => { setSelectedCategories([]); setSelectedTags([]); }}
                                    className="text-sm text-red-500 hover:underline font-mono"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        {filteredPosts.length > 0 ? (
                            <div className="grid gap-8">
                                {filteredPosts.map(post => (
                                    <article key={post.slug} className="group relative flex flex-col md:flex-row gap-6 bg-white dark:bg-[#0a0e27]/40 p-6 rounded-2xl border border-slate-200 dark:border-cyan-500/20 hover:border-blue-400 dark:hover:border-cyan-400/50 transition-all shadow-sm hover:shadow-md">
                                        <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <DateFormatter dateString={post.date} />
                                                </span>
                                                {post.categories && post.categories.length > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-blue-600 dark:text-cyan-400 uppercase">{post.categories[0]}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h2 className="text-xl md:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                                                <Link href={`/post/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400 line-clamp-2 md:line-clamp-3 mb-4 text-sm leading-relaxed">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {post.tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-mono">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                                <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No posts found</h3>
                                <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                    {/* Right: Filters */}
                    <div className="w-full lg:w-80 space-y-8">
                        {/* Categories */}
                        <div className="bg-slate-50 dark:bg-[#0a0e27]/40 p-6 rounded-2xl border border-slate-200 dark:border-cyan-500/20">
                            <h3 className="text-lg font-bold font-mono text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-pink-500" />
                                Filter by Categories
                            </h3>
                            <div className="space-y-2">
                                {allCategories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-blue-600 border-blue-600 dark:bg-cyan-500 dark:border-cyan-500' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-black group-hover:border-blue-400'}`}>
                                            {selectedCategories.includes(cat) && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                            className="hidden"
                                        />
                                        <span className={`text-sm font-mono ${selectedCategories.includes(cat) ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-slate-50 dark:bg-[#0a0e27]/40 p-6 rounded-2xl border border-slate-200 dark:border-cyan-500/20">
                            <h3 className="text-lg font-bold font-mono text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-purple-500" />
                                Filter by Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`text-xs px-3 py-1.5 rounded-full font-mono border transition-all ${selectedTags.includes(tag)
                                            ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-pink-500/20 dark:text-pink-300 dark:border-pink-500/50'
                                            : 'bg-white dark:bg-black border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 dark:hover:border-pink-500/50'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
