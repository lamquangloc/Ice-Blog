"use client";

import { Post } from "@/interfaces/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
    allPosts: Post[];
    currentSlug: string;
};

export function RelatedPosts({ allPosts, currentSlug }: Props) {
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Filter out current post
        const otherPosts = allPosts.filter((post) => post.slug !== currentSlug);

        // Shuffle array using Fisher-Yates algorithm
        const shuffled = [...otherPosts];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Pick first 3
        setRelatedPosts(shuffled.slice(0, 3));
    }, [allPosts, currentSlug]);

    if (relatedPosts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 mb-12">
            <div className="border-t border-neutral-200 dark:border-neutral-700 mb-8 pt-8">
                <h2 className="text-3xl font-bold tracking-tighter leading-tight mb-8">
                    Related
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-6">
                    {relatedPosts.map((post) => (
                        <div key={post.slug} className="flex flex-col gap-2">
                            <div className="mb-2">
                                <CoverImage
                                    slug={post.slug}
                                    title={post.title}
                                    src={post.coverImage}
                                />
                            </div>
                            <h3 className="text-xl font-bold leading-snug">
                                <Link href={`/post/${post.slug}`} className="hover:underline">
                                    {post.title}
                                </Link>
                            </h3>
                            <div className="text-base text-slate-500">
                                <DateFormatter dateString={post.date} />
                            </div>
                            {post.categories && post.categories.length > 0 && (
                                <div className="text-base text-slate-500">
                                    In "{post.categories[0]}"
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
