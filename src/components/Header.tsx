
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to style header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-ajackal-black/80 backdrop-blur-md border-b border-white/10' 
          : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 md:h-16 md:w-16 relative">
            <img 
              src="/lovable-uploads/e9d475c9-91bf-4926-a570-a8c3c93fae65.png" 
              alt="Anti-Jackal Logo" 
              className="h-full w-full object-contain relative z-10"
            />
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl md:text-2xl lg:text-3xl ajackal-gradient-text">Anti-Jackal</span>
              <span className="text-xs font-medium bg-gradient-to-r from-ajackal-purple/30 to-ajackal-pink/30 border border-white/20 px-2 py-0.5 rounded-md backdrop-blur-sm text-white/90 shadow-sm">beta</span>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-ajackal-white/100 hover:text-ajackal-white transition-colors">
            Преимущества
          </a>
          <a href="#examples" className="text-ajackal-white/100 hover:text-ajackal-white transition-colors">
            Примеры
          </a>
          <a href="#contact" className="text-ajackal-white/100 hover:text-ajackal-white transition-colors">
            Контакты
          </a>
          <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300">
            <a href="#try">Попробовать бесплатно</a>
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-ajackal-white/90 hover:text-ajackal-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-ajackal-black/95 backdrop-blur-md border-b border-white/10 animate-slide-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#features" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Преимущества
            </a>
            <a 
              href="#examples" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Примеры
            </a>
            <a 
              href="#try" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Попробовать
            </a>
            <a 
              href="#contact" 
              className="py-2 text-ajackal-white/90 hover:text-ajackal-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Контакты
            </a>
            <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient transition-all duration-300 w-full mt-2">
              <a href="#try">Попробовать бесплатно</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
