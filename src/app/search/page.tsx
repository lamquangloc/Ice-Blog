import { getAllPosts } from "@/lib/api";
import SearchClient from "./search-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Search | IceBlog',
    description: 'Search for articles, tutorials, and insights.',
};

export default function SearchPage() {
    const allPosts = getAllPosts();

    return <SearchClient posts={allPosts} />;
}
