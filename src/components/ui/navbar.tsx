import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X, Menu } from 'lucide-react';

interface NavbarProps {
    logoText: string;
    navLinks: { label: string; href: string }[];
    className?: string;
}

const NavLink = ({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) => (
    <a
        href={href}
        onClick={onClick}
        className={cn("text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground", className)}
    >
        {children}
    </a>
);

export const Navbar = ({
    logoText,
    navLinks,
    className,
}: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-8 py-6 md:px-12 bg-background/0 backdrop-blur-md border-b border-white/5", className)}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold tracking-wider"
            >
                {logoText}
            </motion.div>

            {/* Desktop Nav */}
            <motion.div
                className="hidden items-center space-x-8 md:flex"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {navLinks.map((link) => (
                    <NavLink key={link.label} href={link.href}>
                        {link.label}
                    </NavLink>
                ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center p-2 md:hidden z-50"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
            >
                {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
            </motion.button>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 flex h-screen w-full flex-col bg-background/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.1 }}
                                >
                                    <NavLink
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold"
                                    >
                                        {link.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
