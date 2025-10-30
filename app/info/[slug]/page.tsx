import ContainerLayout from "@/components/layout/ContainerLayout";
import SectionBanner from "@/components/layout/SectionBanner";
import AboutSurah from "@/components/sections/AboutSurah";
import { Separator } from "@/components/ui/separator";
import { getChapter } from "@/sdk/surah";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const data = await getChapter(slug);
        return {
            title: `Surah ${data?.name_simple} - سوره ${data?.name_arabic}`,
            description: `Discover Surah ${data?.name_simple} , the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`,
            openGraph: {
                title: `Surah ${data?.name_simple} - سوره ${data?.name_arabic}`,
                description: `Discover Surah ${data?.name_simple} , the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`,
            },
            twitter: {
                card: "summary_large_image",
                title: `Surah ${data?.name_simple} - سوره ${data?.name_arabic}`,
                description: `Discover Surah ${data?.name_simple} , the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        return {
            title: "Surah Not Found",
            description: "The requested Surah could not be found.",
            openGraph: {
                title: "Surah Not Found",
                description: "The requested Surah could not be found.",
            },
            twitter: {
                card: "summary_large_image",
                title: "Surah Not Found",
                description: "The requested Surah could not be found.",
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return <>
        <main className="min-h-dvh">
            <SectionBanner url="info" />
            <ContainerLayout>
                <Separator className="my-3" />
                <div>
                    <AboutSurah SurahId={slug} />
                </div>
            </ContainerLayout>
        </main>
    </>;
};

export default Page;