'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";
import { Pause, Play } from "lucide-react";

interface IProps {
    ayah: string;
    sound: number;
    surahId: string;
    verse_key: string;
    onAyahEnd?: () => void;
    isAutoPlaying?: boolean;
    onPlayStateChange?: (isPlaying: boolean, verseKey: string) => void;
}

const AyahCard = ({
    ayah,
    sound,
    surahId,
    verse_key,
    onAyahEnd,
    isAutoPlaying = false,
    onPlayStateChange
}: IProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    useEffect(() => {
        if (isAutoPlaying && !isPlaying) {
            handlePlayPause();
        }
    }, [isAutoPlaying]);

    useEffect(() => {
        if (isPlaying && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioSrc && isPlaying && audioRef.current) {
            setIsLoading(true);
            audioRef.current.play().catch(() => {
                setIsPlaying(false);
                setIsLoading(false);
                onPlayStateChange?.(false, verse_key);
            });
        }
    }, [audioSrc, isPlaying]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            setIsLoading(false);
            onPlayStateChange?.(false, verse_key);
        } else {
            if (!audioSrc) {
                setAudioSrc(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${sound}.mp3`);
            } else {
                audioRef.current?.play().catch(() => {
                    setIsPlaying(false);
                    setIsLoading(false);
                    onPlayStateChange?.(false, verse_key);
                });
            }
            setIsPlaying(true);
            onPlayStateChange?.(true, verse_key);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setIsLoading(false);
        onPlayStateChange?.(false, verse_key);
        onAyahEnd?.();
    };

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    return (
        <Card
            ref={cardRef}
            className={`w-full dark:bg-black rounded-4xl transition-all duration-300 ${isPlaying ? 'ring-2 ring-accent shadow-lg' : ''
                }`}
        >
            <CardHeader>
                <div className="flex items-center justify-between w-full">
                    <Badge variant="secondary" className="font-semibold">
                        {verse_key}
                    </Badge>

                    <div className="flex items-center gap-2">
                        <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={handlePlayPause}
                            disabled={isLoading}
                            className="h-9 w-9"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isLoading ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : isPlaying ? (
                                <Pause className="h-4 w-4" />
                            ) : (
                                <Play className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="text-right">
                    <p className="text-xl md:text-3xl leading-relaxed md:leading-loose font-arabic">
                        {ayah}
                    </p>
                </div>

                {audioSrc && (
                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        onEnded={handleAudioEnded}
                        onCanPlay={handleCanPlay}
                        preload="none"
                        className="hidden"
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default AyahCard;