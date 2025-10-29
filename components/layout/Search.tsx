'use client'

import { surah } from "@/static/surah";
import { Field, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface Surah {
    id: number;
    name_arabic: string;
    name_simple: string;
    [key: string]: any;
}

const Search = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const removeDiacritics = (text: string): string => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const searchSurah = (query: string): Surah[] => {
        if (!query.trim()) return [];

        const normalizedQuery = removeDiacritics(query.toLowerCase());

        if (!isNaN(Number(normalizedQuery))) {
            const surahNumber = Number(normalizedQuery);
            const result = surah.find(s => s.id === surahNumber);
            return result ? [result] : [];
        }

        return surah.filter(s =>
            removeDiacritics(s.name_arabic.toLowerCase()).includes(normalizedQuery) ||
            removeDiacritics(s.name_simple.toLowerCase()).includes(normalizedQuery)
        );
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const handleSurahClick = (surahId: number) => {
        router.push(`/read/${surahId}`);
        setIsFocused(false);
        setSearchQuery("");
    };

    const searchResults = searchSurah(searchQuery);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center justify-center w-full ">
            <div className="relative w-full max-w-[600px]" ref={containerRef}>
                <Field>
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="surah-search"
                            autoComplete="off"
                            placeholder="Search by Surah Number or Name"
                            className="w-full rounded-3xl text-xs pl-12"
                            value={searchQuery}
                            onChange={handleSearchInput}
                            onFocus={() => setIsFocused(true)}
                        />
                    </div>
                    <FieldDescription className="w-full text-center text-xs px-2">
                        Search by Surah Number or Name (Arabic or English). Just type the name directly, no need to prefix with 'Surah'.
                    </FieldDescription>
                </Field>

                {/* {isFocused && searchQuery && (
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setIsFocused(false)}
                    ></div>
                )} */}

                {isFocused && searchQuery && (
                    <div className="absolute top-full left-0 w-full bg-card border border-border mt-1 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                        {searchResults.length === 0 && (
                            <div className="p-4 text-center text-muted-foreground">
                                No Surah found for "{searchQuery}"
                            </div>
                        )}
                        {searchResults.map((surahItem) => (
                            <div
                                key={surahItem.id}
                                className="border-b last:border-b-0 text-start"
                            >
                                <div
                                    onClick={() => handleSurahClick(surahItem.id)}
                                    className="flex items-center justify-between gap-4 p-4 hover:bg-muted cursor-pointer"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">
                                            {surahItem.name_arabic} ({surahItem.name_simple})
                                        </h4>
                                        <p className="text-muted-foreground text-xs mt-1">
                                            Surah {surahItem.id}
                                        </p>
                                    </div>
                                    <div className="text-lg font-arabic">
                                        {surahItem.name_arabic}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;