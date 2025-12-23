import Container from "@/app/_components/container";
import { getAllCategories } from "@/lib/api";
import Link from "next/link";

export default function Categories() {
    const categories = getAllCategories();

    return (
        <main>
            <Container>
                <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                        Categories.
                    </h1>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <Link
                                href={`/categories/${category.name.toLowerCase()}`}
                                key={category.name}
                                className="group flex flex-col justify-center p-8 bg-neutral-50 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {category.name} ({category.count})
                                </h3>
                            </Link>
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
                </div>
            </Container>
        </main>
    );
}
