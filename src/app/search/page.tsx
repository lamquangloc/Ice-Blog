import { getAllPosts } from "@/lib/api";
import SearchClient from "./search-client";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Search | IceBlog',
    description: 'Search for articles, tutorials, and insights.',
};

export default function SearchPage() {
    const allPosts = getAllPosts();

    return (
        <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading search...</div>}>
            <SearchClient posts={allPosts} />
        </Suspense>
    );
}
