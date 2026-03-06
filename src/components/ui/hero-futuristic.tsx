'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const HeroFuturistic = () => {
    const titleWords = 'AR Studios'.split(' ');
    const subtitle = 'BUILD YOUR DREAMS';
    const [delays, setDelays] = useState<number[]>([]);

    useEffect(() => {
        setDelays(titleWords.map(() => Math.random() * 0.1));
    }, [titleWords.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.5
            }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as any
            }
        }
    };

    return (
        <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
            <motion.div
                className="uppercase items-center z-10 pointer-events-none px-4 flex justify-center flex-col text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="text-4xl xs:text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-8">
                        {titleWords.map((word, index) => (
                            <motion.span
                                key={index}
                                variants={wordVariants}
                                style={{ transitionDelay: `${delays[index] || 0}s` }}
                                className="text-white/95"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="text-[0.7rem] xs:text-xs md:text-2xl xl:text-3xl mt-4 md:mt-6 font-bold tracking-[0.1em] xs:tracking-[0.2em] text-primary drop-shadow-lg"
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1] as any,
                        delay: 1.2
                    }}
                >
                    {subtitle}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroFuturistic;
