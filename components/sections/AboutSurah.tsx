'use client'

import React from 'react';
import parse, { domToReact, Element } from 'html-react-parser';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { getSurahInfo } from "@/sdk/surah";
import { useQuery } from "@tanstack/react-query";

interface IProps {
    SurahId: string;
}

const AboutSurah = ({ SurahId }: IProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['surah-info', SurahId],
        queryFn: async () => getSurahInfo(SurahId),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        enabled: !!SurahId,
    });

    const parseContent = (content: string) => {
        return parse(content, {
            replace: (domNode) => {
                if (domNode instanceof Element) {
                    if (domNode.name === 'h2') {
                        return (
                            <>
                                <Separator className='my-6' />
                                <h2 className="text-2xl font-bold mt-6 mb-4 scroll-m-20">
                                    {domToReact(domNode.children as any)}
                                </h2>
                            </>
                        );
                    } else if (domNode.name === 'p') {
                        return (
                            <p className="leading-7 mb-4 text-muted-foreground">
                                {domToReact(domNode.children as any)}
                            </p>
                        );
                    } else if (domNode.name === 'ul') {
                        return (
                            <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
                                {domToReact(domNode.children as any)}
                            </ul>
                        );
                    } else if (domNode.name === 'ol') {
                        return (
                            <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">
                                {domToReact(domNode.children as any)}
                            </ol>
                        );
                    }
                }
            },
        });
    };

    if (isLoading) {
        return (
            <div className=" mx-auto max-w-5xl my-8">
                <Card className='dark:bg-black rouned-4xl'>
                    <CardHeader>
                        <Skeleton className="h-8 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="mx-auto max-w-5xl my-8">
                <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        Failed to load Surah information. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className=" mx-auto max-w-5xl my-8 ">
            <Card className='dark:bg-black rouned-4xl'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Info className="h-6 w-6" />
                        About This Surah
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        {parseContent(data.chapter_info.text)}
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className="justify-center pt-6">
                    <p className="text-sm text-muted-foreground">
                        Source: <span className="font-medium">{data.chapter_info.source}</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AboutSurah;