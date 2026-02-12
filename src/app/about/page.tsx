import Image from "next/image";
import Link from "next/link";

export default function About() {
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

            <main className="max-w-2xl mx-auto flex flex-col items-center sm:items-start gap-8">
                {/* Hero Section */}
                <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0">
                        {/* Placeholder for profile image - using a simple div for now */}
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-4xl text-white font-bold shadow-lg">
                            RD
                        </div>
                    </div>

                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Rowan Dauria</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Full Stack Developer
                        </p>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="prose dark:prose-invert mt-8 w-full">
                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        Hi, I'm Rowan. I build accessible, pixel-perfect, and performant web experiences.
                        I love exploring new technologies and have a passion for creating intuitive user interfaces.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
                        Currently, I'm focused on building full-stack applications with Next.js and React.
                        When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new recipes.
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 mt-8">
                    <SocialLink href="https://github.com" label="GitHub" icon="github" />
                    <SocialLink href="https://linkedin.com" label="LinkedIn" icon="linkedin" />
                    <SocialLink href="https://twitter.com" label="Twitter" icon="twitter" />
                    <SocialLink href="mailto:hello@example.com" label="Email" icon="email" />
                </div>
            </main>
        </div>
    );
}

function SocialLink({ href, label, icon }: { href: string, label: string, icon: string }) {
    // Simple SVG icons (placeholders or simple paths)
    const icons: Record<string, React.ReactNode> = {
        github: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>,
        linkedin: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>,
        twitter: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>,
        email: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>

    };

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-foreground transition-colors" aria-label={label}>
            {icons[icon] || label}
        </a>
    )
}
