'use client';

import { recitations } from "@/static/recitations";
import { surah } from "@/static/surah";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { setSelectedReciter } from "@/redux/slices/reciterSlice";

interface IProps {
    surahID: string;
}

const Filters = ({ surahID }: IProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const selectedReciterId = useAppSelector((state) => state.reciter.selectedReciterId);

    const handleSurahChange = (value: string) => {
        router.push(`/play/${value}`);
    };

    const handleReciterChange = (value: string) => {
        dispatch(setSelectedReciter(value));
    };

    return (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-xs" htmlFor="surah-select">Select Surah</Label>
                    <Select value={surahID} onValueChange={handleSurahChange}>
                        <SelectTrigger id="surah-select" className="w-full">
                            <SelectValue placeholder="Choose a Surah" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] ">
                            {surah.map((su) => (
                                <SelectItem key={su.id} value={String(su.id)}>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{su.id}.</span>
                                        <span>{su.name_simple}</span>
                                        <span className="text-muted-foreground">- {su.name_arabic}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs" htmlFor="reciter-select">Select Reciter</Label>
                    <Select value={selectedReciterId} onValueChange={handleReciterChange}>
                        <SelectTrigger id="reciter-select" className="w-full">
                            <SelectValue placeholder="Choose a Reciter" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {recitations.map((rec) => (
                                <SelectItem key={rec.identifier} value={rec.identifier}>
                                    {rec.englishName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default Filters;