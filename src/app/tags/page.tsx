import Container from "@/app/_components/container";
import { getAllTags } from "@/lib/api";
import Link from "next/link";

export default function Tags() {
    const tags = getAllTags();

    return (
        <main>
            <Container>
                <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                        Tags.
                    </h1>
                </section>
                <div className="flex flex-wrap gap-4 mb-32">
                    {tags.length > 0 ? (
                        tags.map((tag) => (
                            <Link
                                href={`/tags/${tag.name.toLowerCase()}`}
                                key={tag.name}
                                className="px-6 py-3 bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-colors"
                            >
                                #{tag.name} <span className="text-sm ml-1 opacity-70">({tag.count})</span>
                            </Link>
                        ))
                    ) : (
                        <p>No tags found.</p>
                    )}
                </div>
            </Container>
        </main>
    );
}
