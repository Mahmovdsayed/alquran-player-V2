'use client'

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useRef } from "react";

const Navigation = () => {
    const { theme, setTheme } = useTheme();
    const buttonRef = useRef(null);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

    return (
        <nav className="bg-secondary dark:bg-card">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <span className="font-bold text-base tracking-wide">
                            AL-Quran Player
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => handleThemeChange("light")}
                            ref={buttonRef}
                            aria-label="light-mode"
                            size="icon-sm"
                            variant="outline"
                        >
                            <Sun className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={() => handleThemeChange("dark")}
                            ref={buttonRef}
                            size="icon-sm"
                            aria-label="dark-mode"
                            variant="outline"
                        >
                            <Moon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;