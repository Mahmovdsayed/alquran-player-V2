'use client';

import { asmaAlHusna } from "@/static/asmaAlHusna";
import { motion } from "framer-motion";

const AsmaAlHusnaa = () => {
    return (
        <div className='py-3 md:py-6'>
            <div className='container'>
                <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
                    <motion.div
                        className='flex gap-14 flex-none pr-14'
                        animate={{
                            translateX: ["1%", "-100%"], 
                        }}
                        transition={{
                            duration: 500, 
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop"
                        }}
                    >
                        <div className="space-x-6">
                            {asmaAlHusna.concat(asmaAlHusna).map((a: any, index: number) => (
                                <span key={index} className="text-2xl">{a.transliteration}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AsmaAlHusnaa;
