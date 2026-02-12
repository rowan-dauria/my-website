import { getAllPostIds, getPostData } from '@/lib/posts';
import Link from 'next/link';

export async function generateStaticParams() {
    const paths = getAllPostIds();
    // paths is list of { params: { slug: string } }
    // generateStaticParams expects list of params objects directly
    return paths.map((path) => path.params);
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="mb-12">
                <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:text-foreground transition-colors"
                >
                    ← Back to Blog
                </Link>
            </header>
            <main className="max-w-2xl mx-auto">
                <article>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">{postData.title}</h1>
                    <div className="text-gray-500 mb-8">
                        <time dateTime={postData.date}>{postData.date}</time>
                    </div>
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
                    />
                </article>
            </main>
        </div>
    );
}
