'use client'

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background mt-16">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div>
                        <h3 className="font-bold text-lg mb-2">AL-Quran Player</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Read, listen, and explore the Holy Quran with beautiful recitations and translations.
                        </p>
                    </div>

                    <Separator className="max-w-md" />

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                        <Link href="/read/1" className="text-muted-foreground hover:text-foreground transition-colors">
                            Read
                        </Link>
                        <Link href="/play/1" className="text-muted-foreground hover:text-foreground transition-colors">
                            Listen
                        </Link>                   
                    </div>

                    <p className="text-xs text-muted-foreground">
                        © {currentYear} AL-Quran Player. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;