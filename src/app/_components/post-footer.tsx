import Link from "next/link";

type Props = {
    categories?: string[];
    tags?: string[];
};

export function PostFooter({ categories, tags }: Props) {
    if ((!categories || categories.length === 0) && (!tags || tags.length === 0)) {
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto mt-12 mb-24">
            {/* Categories */}
            {categories && categories.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="text-base font-bold text-slate-700 dark:text-slate-200">
                        Categories:
                    </span>
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/categories/${category.toLowerCase()}`}
                            className="text-base font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${tag.toLowerCase()}`}
                            className="px-4 py-2 text-sm font-semibold bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-full hover:bg-neutral-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
