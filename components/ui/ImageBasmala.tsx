'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import mainImageDark from "@/public/Basmala-dark.svg"
import mainImageLight from "@/public/Basmala.svg"
import Image from "next/image";

interface IProps {
    num: string
}

const ImageBasmala = ({ num }: IProps) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const parsedNum = Number(num);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (parsedNum <= 1 || parsedNum > 114) return null;
    if (!mounted) return null



    return (
        <Image
            alt='Basmala'
            className='w-[250px] md:w-[350px] mx-auto h-full my-4'
            src={theme === "dark" ? mainImageDark : mainImageLight}
            priority
            draggable="false"
        />
    );
};

export default ImageBasmala;