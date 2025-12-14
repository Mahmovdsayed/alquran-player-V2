
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

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

                    <p className="text-xs text-muted-foreground pt-2">
                        © {currentYear} AL-Quran Player. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;