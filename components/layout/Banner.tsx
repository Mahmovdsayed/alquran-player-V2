'use client'

import { getRandomAyah } from "@/sdk/surah";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Stars } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Search from "./Search";

const Banner = () => {
    const [clicked, setClicked] = useState(false);

    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["banner"],
        queryFn: async () => await getRandomAyah(),
        refetchOnWindowFocus: false,
        enabled: !!clicked,
    });
    const handleGenerate = async () => {
        if (!clicked) setClicked(true);
        else await refetch();
    };

    return (
        <div className="w-full px-4 pt-10 bg-linear-to-b from-secondary to-white dark:from-card dark:to-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl md:text-4xl font-semibold my-3">
                    Comprehensive Quran Experience: Listen, Learn, and Understand
                </h1>
                <p className="text-default-600 text-xs md:text-sm md:w-3/4 leading-relaxed m-auto">
                    Explore the Quran. Listen to every Surah with over 50 renowned reciters, and delve into detailed verse interpretations in both Arabic and English. Whether you're seeking spiritual growth or educational insight, our platform provides a complete and immersive Quranic experience.
                </p>

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button
                            onClick={handleGenerate}
                            size={"lg"}
                            className="mt-4 text-center w-full bg-secondary text-black dark:bg-card dark:text-white hover:bg-muted/60 font-semibold md:w-auto rounded-3xl cursor-pointer"
                            // style={{
                            //     background:
                            //         "radial-gradient(ellipse at bottom, #eab8, #9333ea, #3b82f6)",
                            // }}
                        >
                            <Stars className="mr-2 h-4 w-4" /> Random Ayah
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="bg-card rounded-t-4xl! max-w-xl mx-auto">
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Random Ayah</DrawerTitle>
                                <DrawerDescription>
                                    Here's a randomly selected Ayah from the Holy Quran
                                </DrawerDescription>
                            </DrawerHeader>

                            <div className="p-4 pb-0 min-h-[130px]">
                                {isLoading || isFetching ? (
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-3/4 mx-auto" />
                                        <Skeleton className="h-6 w-full mx-auto" />
                                        <Skeleton className="h-6 w-2/3 mx-auto" />
                                    </div>
                                ) : isError ? (
                                    <div className="text-center text-red-500">
                                        Error loading ayah
                                    </div>
                                ) : data?.verse ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="flex-1 text-center">
                                            <p className="text-2xl font-semibold text-right leading-relaxed">
                                                {data.verse.text_uthmani}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Surah ID: {data.verse.chapter_id} — Ayah:{" "}
                                                {data.verse.verse_number}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Verse Key: {data.verse.verse_key}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <DrawerFooter>
                                <Button
                                    onClick={handleGenerate}
                                    disabled={isFetching}
                                    className="mt-4 text-center w-full  bg-secondary text-black dark:bg-sidebar-accent hover:bg-muted/60 dark:text-white font-semibold md:w-auto rounded-3xl"
                                >
                                    <Stars className="h-4 w-4" />
                                    {isFetching ? "Generating..." : "Generate Another Ayah"}
                                </Button>
                                <DrawerClose asChild>
                                    <Button className="rounded-3xl" variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>

                <div className="mt-6" />
                <Search />
            </div>
        </div >
    );
};

export default Banner;
