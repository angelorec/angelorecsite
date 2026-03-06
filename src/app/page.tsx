'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { HeroBackground } from '@/components/ui/hero-background';
import { Navbar } from '@/components/ui/navbar';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { Testimonials } from '@/components/ui/unique-testimonial';
import { ServicesSection } from '@/components/sections/services-section';
import { ContactSection } from '@/components/sections/contact-section';

const HeroFuturistic = dynamic(
  () => import('@/components/ui/hero-futuristic'),
  { ssr: false }
);

const navLinks = [
  { label: 'INÍCIO', href: '#hero' },
  { label: 'SOBRE', href: '#about-section' },
  { label: 'SERVIÇOS', href: '#services-section' },
  { label: 'CONTATO', href: '#contact-section' },
];

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
];

export default function Home() {
  return (
    <main className="text-foreground scroll-smooth relative">
      {/* Fixed Global Layers */}
      <Navbar logoText="AR Studios" navLinks={navLinks} />
      <HeroBackground />

      {/* Scrollable Content Stream */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* 1. Hero Content Section */}
        <section id="hero" className="w-full">
          <HeroFuturistic />
        </section>

        {/* Content sections with opaque backgrounds for readability */}
        <div className="relative bg-background/90 backdrop-blur-sm">
          {/* 2. About / Professional Section */}
          <motion.section
            id="about-section"
            className="w-full"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
          >
            <div className="w-full">
              <MinimalistHero
                mainText="6 anos de mercado digital. Especialista em IA. Designer por paixão."
                readMoreLink="#services-section"
                imageSrc="https://i.imgur.com/usGAHFP.png"
                imageAlt="Angelo Rec - Profissional de Marketing Digital"
                overlayText={{
                  part1: 'ANGELO',
                  part2: 'REC',
                }}
                socialLinks={socialLinks}
                locationText="Brasil"
              />
            </div>
          </motion.section>

          {/* 3. Services Section */}
          <motion.section
            id="services-section"
            className="py-20 w-full max-w-7xl mx-auto px-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any, delay: 0.1 }}
          >
            <ServicesSection />
          </motion.section>

          {/* 4. Testimonials Section */}
          <motion.section
            id="testimonials-section"
            className="py-20 w-full max-w-7xl mx-auto px-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any, delay: 0.1 }}
          >
            <div className="w-full">
              <h2 className="text-3xl md:text-5xl font-extrabold text-center text-foreground mb-12">
                O que dizem nossos clientes
              </h2>
              <Testimonials />
            </div>
          </motion.section>

          {/* 5. Contact Section */}
          <motion.section
            id="contact-section"
            className="pb-24 pt-12 w-full max-w-7xl mx-auto px-4"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any, delay: 0.1 }}
          >
            <ContactSection />
          </motion.section>

          {/* Footer */}
          <footer className="border-t border-border/10 py-8 text-center text-sm text-foreground/50">
            <p>&copy; {new Date().getFullYear()} AR Studios. Todos os direitos reservados.</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
