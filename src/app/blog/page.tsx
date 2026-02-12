import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Blog() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-12">
                <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-foreground transition-colors"
                >
                    ← Back
                </Link>
            </header>

            <main className="max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12">Blog</h1>

                <div className="flex flex-col gap-12">
                    {allPostsData.map(({ id, date, title }) => (
                        <article key={id} className="group border-t first:border-t-0 border-gray-100 dark:border-gray-800 pt-12 first:pt-0">
                            <Link href={`/blog/${id}`} className="block">
                                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {title}
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <time dateTime={date}>{date}</time>
                                </div>
                                <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                                    Read more →
                                </div>
                            </Link>
                        </article>
                    ))}
                    {allPostsData.length === 0 && (
                        <p className="text-gray-500">No posts found.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

