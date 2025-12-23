import { getAllPosts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = getAllPosts();
    // Return lightweight data for search
    const searchData = posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        date: post.date,
        coverImage: post.coverImage,
        categories: post.categories,
        tags: post.tags,
        excerpt: post.excerpt,
    }));

    return NextResponse.json(searchData);
}
