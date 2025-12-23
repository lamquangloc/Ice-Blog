import Container from "@/app/_components/container";
import { PostPreview } from "@/app/_components/post-preview";
import { getAllCategories, getPostsByCategory } from "@/lib/api";
import { notFound } from "next/navigation";

type Params = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Category({ params }: Params) {
    const { slug } = await params;
    // Decode slug in case it contains URI encoded characters (though usually slugs are simple)
    // Logic to find category name that matches case-insensitive could be here,
    // but let's assume the slug passed matches somewhat or we capitalized it for display.
    // The getPostsByCategory is case insensitive.

    const posts = getPostsByCategory(slug);

    if (posts.length === 0) {
        // If no posts found, it might be an invalid category or just empty. 
        // For this simple blog, we can show "No posts found" or 404.
        // Let's show the page with empty state to be safe.
    }

    // Find the original capitalisation if possible, otherwise capitalize first letter
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <main>
            <Container>
                <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                        {categoryName}
                    </h1>
                </section>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
                        {posts.map((post) => (
                            <PostPreview
                                key={post.slug}
                                title={post.title}
                                coverImage={post.coverImage}
                                date={post.date}
                                author={post.author}
                                slug={post.slug}
                                excerpt={post.excerpt}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-lg mb-32">No posts found in this category.</p>
                )}
            </Container>
        </main>
    );
}

export async function generateStaticParams() {
    const categories = getAllCategories();

    return categories.map((category) => ({
        slug: category.name.toLowerCase(),
    }));
}
