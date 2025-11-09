// app/page.js
'use client';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ScrollProgress from '../components/ScrollProgress';
import DataVisualization from '../components/DataVisualization';
import SolutionsSection from '../components/SolutionsSection';
import TrustedBy from '../components/TrustedBy';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <HeroSection />
      <DataVisualization />
      <SolutionsSection />
      <TrustedBy />
      <Footer />
    </main>
  );
}