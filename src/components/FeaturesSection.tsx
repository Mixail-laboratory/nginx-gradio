import React from 'react';
import { 
  ImageIcon, 
  Upload, 
  Zap, 
  MonitorSmartphone, 
  Shield
} from 'lucide-react';

const features = [
  {
    icon: <ImageIcon className="h-8 w-8 text-ajackal-purple" />,
    title: 'Удаление шумов',
    description: 'Интеллектуальное удаление шумов и артефактов с фотографий и видео без потери качества и деталей.'
  },
  {
    icon: <Upload className="h-8 w-8 text-ajackal-purple" />,
    title: 'Повышение разрешения',
    description: 'Увеличение разрешения изображений и видео до 4K с сохранением всех деталей и улучшением четкости.'
  },
  {
    icon: <Zap className="h-8 w-8 text-ajackal-purple" />,
    title: 'Высокая скорость',
    description: 'Быстрая обработка благодаря оптимизированным алгоритмам и использованию облачных вычислений.'
  },
  {
    icon: <MonitorSmartphone className="h-8 w-8 text-ajackal-purple" />,
    title: 'Кросс-платформенность',
    description: 'Работает на любых устройствах: от смартфонов до профессиональных рабочих станций.'
  },
  {
    icon: <Shield className="h-8 w-8 text-ajackal-purple" />,
    title: 'Безопасность данных',
    description: 'Полная конфиденциальность всех загружаемых материалов и автоматическое удаление после обработки.'
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ajackal-black to-ajackal-off-black"></div>
      
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Преимущества <span className="ajackal-gradient-text">Anti-Jackal</span>
          </h2>
          <p className="text-ajackal-white/80 max-w-2xl mx-auto">
            Наша технология основана на последних достижениях в области ИИ
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-glow group"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-ajackal-purple/20 to-ajackal-pink/20 flex items-center justify-center mb-4 group-hover:bg-ajackal-gradient transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-ajackal-white/70">{feature.description}</p>
            </div>
          ))}
        </div> 
      </div>
    </section>
  );
};

export default FeaturesSection;
