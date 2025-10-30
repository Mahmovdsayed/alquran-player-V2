import Script from "next/script";

interface IProps {
    pId: string
}
const AdSense = ({ pId }: IProps) => {
    return (
        <Script
            async
            rel="preload"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />

    )

};

export default AdSense;

