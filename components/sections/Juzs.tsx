'use client'

import { juzs } from "@/static/juzs";
import { surah } from "@/static/surah";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookOpen, Share2 } from "lucide-react";
import { handleShare } from "@/functions/copyURL";

type Surah = {
    id: number;
    name_arabic: string;
    name_simple: string;
    verses_count: number;
};

const JuzsSection = () => {
    const router = useRouter();

    return (
        <div className="w-full  mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {juzs.map((juz: any, index: number) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        key={juz.juz_number}
                        className="h-full"
                    >
                        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-border dark:bg-black rounded-4xl">
                            <div className="px-5 flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-3xl bg-secondary font-bold">
                                            {juz.juz_number}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Juz {juz.juz_number}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {Object.keys(juz.verse_mapping).length} Surahs
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="mb-4" />

                                <div className="space-y-2.5 mb-4">
                                    {Object.entries(juz.verse_mapping).map(([surahId, verses]) => {
                                        const surahInfo: Surah | undefined = surah.find((s) => s.id === parseInt(surahId));
                                        if (!surahInfo) return null;

                                        return (
                                            <div
                                                key={surahId}
                                                onClick={() => router.push(`/read/${surahInfo.id}`)}
                                                className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors group"
                                            >
                                                <span className="text-sm font-medium  transition-colors">
                                                    {surahInfo.name_simple}
                                                </span>
                                                <Badge variant="secondary" className="text-xs font-normal">
                                                    {verses as string}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Separator />

                            <div className="px-4 flex gap-2">
                                <Button
                                    onClick={() => router.push(`juz/${juz.juz_number}`)}
                                    size="lg"
                                    className="flex-1 bg-secondary text-black hover:bg-muted/50 dark:text-white rounded-3xl cursor-pointer transition-colors"
                                >
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Read
                                </Button>
                                <Button
                                    size="icon-lg"
                                    className="rounded-full cursor-pointer"
                                    variant="outline"
                                    onClick={() => handleShare(`juz/${juz.juz_number}`)}
                                >
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JuzsSection;