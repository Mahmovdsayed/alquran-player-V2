'use client'

import { surah } from "@/static/surah";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen, Play, Info } from "lucide-react";
import Search from "./Search";
import Bread from "../ui/Bread";

interface IProps {
    url: string
}

const SectionBanner = ({ url }: IProps) => {
    const { slug } = useParams();
    const router = useRouter();

    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id + 1)
        : null;

    if (!selectedSurah) {
        return (
            <div className="w-full pt-10 pb-8 bg-linear-to-b from-secondary dark:from-card to-background flex items-center justify-center">
                <p className="text-muted-foreground">Surah not found</p>
            </div>
        );
    }

    return (
        <div className="w-full pt-10 pb-8 bg-linear-to-b from-secondary dark:from-card to-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center">
                        <Bread name={`Surah ${selectedSurah.name_complex}`} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                Surah {selectedSurah.name_complex}
                            </h1>
                            <Badge variant="outline" className="text-xs">
                                #{selectedSurah.id}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm">
                            <Badge variant="secondary">
                                {selectedSurah.revelation_place === 'makkah' ? 'Makkan' : 'Medinan'}
                            </Badge>
                            <Badge variant="secondary">
                                {selectedSurah.verses_count} Verses
                            </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            Discover Surah {selectedSurah.name_simple} (سوره {selectedSurah.name_arabic}),
                            the {selectedSurah.id}th chapter of the Quran, revealed in {selectedSurah.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}.
                            Listen to the beautiful recitation of Surah {selectedSurah.name_simple} and explore its profound meanings and messages.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 items-center">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto rounded-full"
                            size="sm"
                            disabled={!previousSurah}
                            onClick={() => {
                                if (previousSurah) {
                                    router.push(`/${url}/${previousSurah.id}`);
                                }
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full sm:w-auto rounded-full"
                            disabled={!nextSurah}
                            size="sm"
                            onClick={() => {
                                if (nextSurah) {
                                    router.push(`/${url}/${nextSurah.id}`);
                                }
                            }}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="my-6">
                        <Search />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button
                            onClick={() => router.push(`/read/${slug}`)}
                            size="lg"
                            className="rounded-full"
                            variant="secondary"
                        >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Read
                        </Button>
                        <Button
                            onClick={() => router.push(`/play/${slug}`)}
                            variant="secondary"
                            size="lg"
                            className="rounded-full"
                        >
                            <Play className="h-4 w-4 mr-2" />
                            Play
                        </Button>
                        <Button
                            onClick={() => router.push(`/info/${slug}`)}
                            variant="secondary"
                            size="lg"
                            className="rounded-full"
                        >
                            <Info className="h-4 w-4 mr-2" />
                            Info
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionBanner;