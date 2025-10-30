'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2, Play, Pause } from 'lucide-react';
import { surah } from '@/static/surah';
import { useState } from 'react';
import { getSurahVerses } from '@/sdk/surah';
import AyahCard from '../ui/AyahCard';

interface IProps {
    surahID: string;
    url: string;
}

const SurahSection = ({ surahID, url }: IProps) => {
    const { slug } = useParams();
    const router = useRouter();
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);

    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find(surahItem => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find(surahItem => surahItem.id === selectedSurah.id + 1)
        : null;

    const { data: surahDataa, isLoading: surahLoading, isError: surahError } = useQuery({
        queryFn: async () => await getSurahVerses(surahID),
        queryKey: ['surah', surahID],
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });


    const parsedNum = Number(surahID);

    if (parsedNum <= 0 || parsedNum > 114) {
        return null;
    }

    if (surahLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (surahError) {
        return (
            <div className="flex items-center justify-center py-16">
                <p className="text-destructive">Error fetching surah data</p>
            </div>
        );
    }

    const handleAyahEnd = (index: number) => {
        const nextIndex = index + 1;
        if (nextIndex < surahDataa.verses.length && isAutoPlayEnabled) {
            setCurrentPlayingIndex(nextIndex);
        } else if (nextIndex >= surahDataa.verses.length && nextSurah) {
            // End of surah, move to next surah if auto-play is enabled
            if (isAutoPlayEnabled) {
                router.push(`/${url}/${nextSurah.id}`);
            } else {
                setCurrentPlayingIndex(null);
            }
        } else {
            setCurrentPlayingIndex(null);
            setIsAutoPlayEnabled(false);
        }
    };

    const handlePlayStateChange = (isPlaying: boolean, verseKey: string) => {
        if (isPlaying) {
            setIsAutoPlayEnabled(true);
        }
    };

    const toggleAutoPlay = () => {
        if (isAutoPlayEnabled) {
            setIsAutoPlayEnabled(false);
            setCurrentPlayingIndex(null);
        } else {
            setIsAutoPlayEnabled(true);
            setCurrentPlayingIndex(0);
        }
    };

    return (
        <div className='mx-auto max-w-6xl py-8'>
            <div className="space-y-5">
                <div className="flex justify-center">
                    <Button
                        onClick={toggleAutoPlay}
                        variant={isAutoPlayEnabled ? "secondary" : "outline"}
                        className="gap-2 mb-3"
                        size={"sm"}
                        aria-label={isAutoPlayEnabled ? "Stop Auto-Play" : "Start Auto-Play"}
                    >
                        {isAutoPlayEnabled ? (
                            <>
                                <Pause className="h-4 w-4" />
                                Stop Auto-Play
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4" />
                                Start Auto-Play
                            </>
                        )}
                    </Button>
                </div>

                {surahDataa.verses?.map((verse: any, index: number) => (
                    <AyahCard
                        key={verse.id}
                        ayah={verse.text_imlaei}
                        sound={verse.id}
                        surahId={surahID}
                        onAyahEnd={() => handleAyahEnd(index)}
                        isAutoPlaying={currentPlayingIndex === index}
                        onPlayStateChange={handlePlayStateChange}
                        verse_key={verse.verse_key}
                    />
                ))}

                <div className="flex justify-center gap-3 pt-8">
                    <Button
                        variant="outline"
                        disabled={!previousSurah}
                        onClick={() => {
                            if (previousSurah) {
                                router.push(`/${url}/${previousSurah.id}`);
                            }
                        }}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous Surah
                    </Button>
                    <Button
                        variant="outline"
                        disabled={!nextSurah}
                        onClick={() => {
                            if (nextSurah) {
                                router.push(`/${url}/${nextSurah.id}`);
                            }
                        }}
                    >
                        Next Surah
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SurahSection;