
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ExamplesSection from '@/components/ExamplesSection';
import TryNowSection from '@/components/TryNowSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll to sections when navigating
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    // Run once on mount for direct URL access with hash
    handleHashChange();

    // Add event listener for future hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-ajackal-black text-ajackal-white antialiased overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ExamplesSection />
        <TryNowSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
