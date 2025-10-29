'use client'

import { formatPageRange } from "@/functions/formatPageRange";

interface IProps {
    pages: any
}
const PageRange = ({ pages }: IProps) => {

    const [startPage, endPage] = pages;
    const formatPageRange = (start: number, end: number) => {
        return start === end ? `Page: ${start}` : `From page: ${start} to page ${end}`;
    };
    return <>
        <span className="text-tiny font-semibold text-default-500">{formatPageRange(startPage, endPage)}</span>
    </>;
};

export default PageRange;