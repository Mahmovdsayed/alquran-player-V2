'use client'

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <div className="space-y-2">
                        <h3 className="font-bold text-xl">AL-Quran Player</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Read, listen, and explore the Holy Quran with beautiful recitations and translations.
                        </p>
                    </div>

                    <Separator className="max-w-md" />

                    <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/read/1"
                            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                        >
                            Read
                        </Link>
                        <Link
                            href="/play/1"
                            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                        >
                            Listen
                        </Link>
                    </nav>

                    <div className="my-2">
                        <a
                            href="https://www.producthunt.com/posts/al-quran-player?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-al-quran-player"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="AL-Quran Player on Product Hunt"
                        >
                            <Image
                                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1033156&theme=neutral"
                                alt="AL-Quran Player - Quran player - read, listen & explore the holy quran online | Product Hunt"
                                width={200}
                                height={54}
                                className="hover:opacity-80 transition-opacity"
                            />
                        </a>
                    </div>

                    <p className="text-xs text-muted-foreground pt-2">
                        © {currentYear} AL-Quran Player. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;