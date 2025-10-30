'use client'

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { SkipBack, SkipForward, Pause, Play, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { surah } from "@/static/surah";
import { useAppSelector } from "@/redux/hook";

interface IProps {
    surahID: string;
}

const Plays = ({ surahID }: IProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isSeeking, setIsSeeking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { slug } = useParams();
    const router = useRouter();

    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id + 1)
        : null;
    const selectedReciterId = useAppSelector((state) => state.reciter.selectedReciterId);

    const updateBufferedProgress = useCallback(() => {
        const audio = audioRef.current;
        if (audio && audio.buffered.length > 0) {
            const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
            const bufferedPercent = (bufferedEnd / audio.duration) * 100;
            setBuffered(bufferedPercent);
        }
    }, []);

    useEffect(() => {
        const audio = new Audio();
        audio.preload = 'metadata';
        audio.src = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciterId}/${surahID}.mp3`;
        audioRef.current = audio;

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `Surah ${selectedSurah?.name_simple}` || "Surah",
                artist: selectedReciterId || 'Reciter',
                album: 'AL-Quran Player',
                artwork: [
                    { src: 'https://res.cloudinary.com/dxvpvtcbg/image/upload/v1718408970/tmmomilgpfuexrqjpynr.svg', sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audio.play();
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                audio.pause();
                setIsPlaying(false);
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                if (nextSurah) router.push(`/play/${nextSurah.id}`);
            });
            navigator.mediaSession.setActionHandler('previoustrack', () => {
                if (previousSurah) router.push(`/play/${previousSurah.id}`);
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => {
                if (audioRef.current) {
                    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                }
            });
            navigator.mediaSession.setActionHandler('seekforward', () => {
                if (audioRef.current) {
                    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
                }
            });
        }

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
            audio.play().catch(() => {
                setIsPlaying(false);
            });
            setIsPlaying(true);
        };

        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setCurrentTime(audio.currentTime);
            }
        };

        const handleProgress = () => {
            updateBufferedProgress();
        };

        const handleError = () => {
            setError('Failed to load audio file');
            setIsLoading(false);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            if (nextSurah) {
                router.push(`/play/${nextSurah.id}`);
            }
        };

        const handleWaiting = () => {
            setIsLoading(true);
        };

        const handleCanPlay = () => {
            setIsLoading(false);
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("progress", handleProgress);
        audio.addEventListener("error", handleError);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("waiting", handleWaiting);
        audio.addEventListener("canplay", handleCanPlay);

        return () => {
            audio.pause();
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("progress", handleProgress);
            audio.removeEventListener("error", handleError);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("waiting", handleWaiting);
            audio.removeEventListener("canplay", handleCanPlay);
        };
    }, [surahID, selectedReciterId, updateBufferedProgress, nextSurah, previousSurah, router]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                setIsPlaying(false);
            });
        }
        setIsPlaying(!isPlaying);
    };

    const skipToPrevious = () => {
        if (audioRef.current) {
            const newTime = Math.max(0, audioRef.current.currentTime - 10);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const skipToNext = () => {
        if (audioRef.current) {
            const newTime = Math.min(duration, audioRef.current.currentTime + 10);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const goToPreviousSurah = () => {
        if (previousSurah) {
            router.push(`/play/${previousSurah.id}`);
        }
    };

    const goToNextSurah = () => {
        if (nextSurah) {
            router.push(`/play/${nextSurah.id}`);
        }
    };

    const formatTime = (time: number) => {
        if (!isFinite(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSliderChange = (value: number[]) => {
        setIsSeeking(true);
        setCurrentTime(value[0]);
    };

    const handleSliderCommit = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
        setIsSeeking(false);
    };

    if (isLoading && !audioRef.current) {
        return (
            <div className="mx-auto max-w-5xl my-8">
                <Card className="p-12 dark:bg-black rounded-4xl">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <p className="text-muted-foreground">Loading audio...</p>
                    </div>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-5xl my-8">
                <Card className="p-12 dark:bg-black rounded-4xl">
                    <div className="text-center">
                        <p className="text-destructive">{error}</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl my-8 ">
            <Card className="overflow-hidden rounded-4xl shadow-lg dark:bg-black">
                <div className="pt-8 pb-4 px-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-4xl font-bold">{selectedSurah?.name_arabic}</h2>
                        <p className="text-xl text-muted-foreground">{selectedSurah?.name_simple}</p>
                        <p className="text-sm text-muted-foreground">
                            {selectedSurah?.verses_count} Verses • {selectedSurah?.revelation_place === 'makkah' ? 'Makkan' : 'Medinan'}
                        </p>
                    </div>
                </div>

                <div className="px-6 pb-8 space-y-6">
                    <div className="space-y-2">
                        <div className="relative">
                            <Slider
                                value={[currentTime]}
                                max={duration || 100}
                                step={0.1}
                                onValueChange={handleSliderChange}
                                onValueCommit={handleSliderCommit}
                                className="w-full cursor-pointer relative z-10"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={skipToPrevious}
                            aria-label="Skip-Back"
                            disabled={!previousSurah}
                            className="h-12 w-12 hover:bg-accent/10"
                        >
                            <SkipBack className="h-5 w-5" />
                        </Button>

                        <Button
                            size="icon"
                            onClick={togglePlayPause}
                            disabled={isLoading}
                            aria-label={isPlaying ? "Pause" : "Play"}
                            className="h-16 w-16 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                        >
                            {isLoading ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : isPlaying ? (
                                <Pause className="h-6 w-6" />
                            ) : (
                                <Play className="h-6 w-6 ml-1" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Skip-Forward"
                            onClick={skipToNext}
                            disabled={!nextSurah}
                            className="h-12 w-12 hover:bg-accent/10"
                        >
                            <SkipForward className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Plays;