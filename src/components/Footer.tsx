
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ajackal-off-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 relative">
                <img 
                  src="/lovable-uploads/e9d475c9-91bf-4926-a570-a8c3c93fae65.png" 
                  alt="Anti-Jackal Logo" 
                  className="h-full w-full object-contain relative z-10"
                />
              </div>
              <span className="font-bold text-lg ajackal-gradient-text">Anti-Jackal</span>
            </div>
            <p className="mt-4 text-sm text-ajackal-white/70">
              Современная технология на базе ИИ для улучшения качества визуального контента.
            </p>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-medium text-lg mb-4">Ссылки</h3>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-ajackal-white/70 hover:text-ajackal-white transition-colors text-sm">
                Преимущества
              </a>
              <a href="#examples" className="text-ajackal-white/70 hover:text-ajackal-white transition-colors text-sm">
                Примеры
              </a>
              <a href="#try" className="text-ajackal-white/70 hover:text-ajackal-white transition-colors text-sm">
                Попробовать
              </a>
              <a href="#contact" className="text-ajackal-white/70 hover:text-ajackal-white transition-colors text-sm">
                Контакты
              </a>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-medium text-lg mb-4">Подписаться на обновления</h3>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="flex-1 px-4 py-2 bg-ajackal-off-black border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajackal-purple"
              />
              <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient">
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
