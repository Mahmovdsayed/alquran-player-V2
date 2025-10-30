'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { surah } from "@/static/surah";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { BookOpen, Play, Share2 } from "lucide-react";
import { handleShare } from "@/functions/copyURL";
import Prayer from "./Prayer";
import JuzsSection from "./Juzs";

const Home = () => {
    const router = useRouter();

    return (
        <div className="w-full">
            <Tabs defaultValue="surah" className="w-full">
                <div className="flex justify-center mb-6">
                    <TabsList className="bg-sidebar dark:bg-black dark:border">
                        <TabsTrigger value="surah">Surah <Badge className="rounded-sm ml-2" variant="secondary">114</Badge></TabsTrigger>
                        <TabsTrigger value="prayer">Prayer Times <Badge className="rounded-sm ml-2" variant="secondary">5</Badge></TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="surah" className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {surah.map((su, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.01 }}
                                key={su.id}
                                className="w-full"
                            >
                                <Card className="hover:shadow-md transition-shadow h-full dark:bg-black rounded-4xl">
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary font-bold text-sm flex-shrink-0">
                                                    {su.id}
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="font-semibold text-base leading-tight">
                                                        {su.name_simple}
                                                    </h2>
                                                    <p className="text-xs text-muted-foreground">
                                                        {su.translated_name.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-2xl font-arabic">{su.name_arabic}</p>
                                        </div>

                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="text-xs">
                                                {su.revelation_place}
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                {su.verses_count} Ayahs
                                            </Badge>
                                        </div>

                                        <Separator className="mb-3" />

                                        <div className="flex items-center gap-2">
                                            <Button
                                                aria-label="Read"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => router.push(`/read/${su.id}`)}
                                                className="flex-1 cursor-pointer rounded-full"
                                            >
                                                <BookOpen className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                aria-label="Play"
                                                size="sm"
                                                onClick={() => router.push(`/play/${su.id}`)}
                                                className="cursor-pointer flex-1 bg-secondary text-black hover:bg-muted/60 dark:text-white rounded-full"
                                            >
                                                <Play className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                aria-label="Share"
                                                size="sm"
                                                variant="ghost"
                                                className="cursor-pointer rounded-full"
                                                onClick={() => handleShare(`${window.location.origin}/read/${su.id}`)}
                                            >
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="prayer"><Prayer /></TabsContent>
            </Tabs>
        </div>
    );
};

export default Home;