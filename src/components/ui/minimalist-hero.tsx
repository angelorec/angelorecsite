import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
    mainText: string;
    readMoreLink: string;
    imageSrc: string;
    imageAlt: string;
    overlayText: {
        part1: string;
        part2: string;
    };
    socialLinks: { icon: LucideIcon; href: string }[];
    locationText: string;
    className?: string;
}

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
        <Icon className="h-5 w-5" />
    </a>
);

export const MinimalistHero = ({
    mainText,
    readMoreLink,
    imageSrc,
    imageAlt,
    overlayText,
    socialLinks,
    locationText,
    className,
}: MinimalistHeroProps) => {
    return (
        <div
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden p-6 font-sans md:p-12',
                className
            )}
        >
            {/* Main Content Area */}
            <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-0 mt-20 md:mt-0">
                {/* Left Text Content (Description) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="z-20 order-3 md:order-1 text-center md:text-left flex flex-col items-center md:items-start"
                >
                    <p className="mx-auto max-w-xs text-sm md:text-base leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
                    <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font hover:text-primary transition-colors">
                        Saiba Mais
                    </a>
                </motion.div>

                {/* Center Image with Red Sphere */}
                <div className="relative order-1 md:order-2 flex justify-center items-center h-[280px] md:h-full my-4 md:my-0">
                    <div
                        className="absolute z-0 h-[220px] w-[220px] rounded-full md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                        style={{ background: 'radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 40%, #7f1d1d 80%, #450a0a 100%)' }}
                    ></div>
                    <img
                        src="https://i.imgur.com/usGAHFP.png"
                        alt={imageAlt}
                        className="relative z-10 h-auto w-44 object-cover md:w-64 scale-150 lg:w-72 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://placehold.co/400x600/ef4444/ffffff?text=Image+Not+Found`;
                        }}
                    />
                </div>

                {/* Right Text (Name) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="z-20 order-2 md:order-3 flex items-center justify-center text-center md:text-left md:justify-end py-2 md:py-0"
                >
                    <h1 className="text-4xl xs:text-5xl font-extrabold text-foreground md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] md:leading-[0.85]">
                        {overlayText.part1}
                        <span className="md:hidden"> </span>
                        <br className="hidden md:block" />
                        {overlayText.part2}
                    </h1>
                </motion.div>
            </div>

            {/* Footer Elements */}
            <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex items-center space-x-4"
                >
                    {socialLinks.map((link, index) => (
                        <SocialIcon key={index} href={link.href} icon={link.icon} />
                    ))}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="text-sm font-medium text-foreground/80"
                >
                    {locationText}
                </motion.div>
            </footer>
        </div>
    );
};
