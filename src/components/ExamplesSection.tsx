
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Film, ChevronLeft, ChevronRight, PlayCircle, PauseCircle } from 'lucide-react';

// Example data
const photoExamples = [
  {
    id: 1,
    title: "Портретная фотография",
    before: "img/Examples_1-1.jpg",
    after: "img/Examples_1-2.jpg"
  },
  {
    id: 2,
    title: "Пейзажная фотография",
    before: "img/Examples_2-1.jpg",
    after: "img/Examples_2-2.jpg"
  },
  {
    id: 3,
    title: "Синтетический контент",
    before: "img/Examples_3-1.jpg",
    after: "img/Examples_3-2.jpg"
  }
];

const videoExamples = [
  {
    id: 1,
    title: "Видеоблогинг",
    src: "video/video1.mp4",
    poster: "https://images.unsplash.com/photo-1576097449702-2aa6bd1d0214?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 2,
    title: "Рекламные ролики",
    src: "https://player.vimeo.com/external/371843175.sd.mp4?s=e0c3e7eab9e5c30b60ae21057b12b832eada6c97&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1561174356-638609006ea4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    id: 3,
    title: "Кинематограф",
    src: "https://player.vimeo.com/external/368320203.sd.mp4?s=38d67480d8b6a0cafa7fd55e788013a901e1ccca&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  }
];

const ExamplesSection = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDragging = useRef(false);
    
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photoExamples.length - 1 ? 0 : prev + 1));
  };

  const nextVideo = () => {
    pauseVideo();
    setCurrentVideoIndex((prev) => (prev === videoExamples.length - 1 ? 0 : prev + 1));
  };
  
  const prevVideo = () => {
    pauseVideo();
    setCurrentVideoIndex((prev) => (prev === 0 ? videoExamples.length - 1 : prev - 1));
  };
  
  const toggleVideo = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };
  
  const playVideo = () => {
    if (!videoRef.current) return;
    
    videoRef.current.play().catch(error => {
      console.error("Error playing video:", error);
    });
    setIsPlaying(true);
  };
  
  const pauseVideo = () => {
    if (!videoRef.current) return;
    
    videoRef.current.pause();
    setIsPlaying(false);
  };
  
  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photoExamples.length - 1 : prev - 1));
  };
  
  const handleMouseDown = () => {
    isDragging.current = true;
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement> | TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };
  
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMouseMove(e);
    };
    
    const handleGlobalTouchEnd = () => {
      isDragging.current = false;
    };
    
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        handleTouchMove(e);
      }
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchend', handleGlobalTouchEnd);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);
  
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);
  
  // Reset video play state when changing videos
  useEffect(() => {
    setIsPlaying(false);
  }, [currentVideoIndex]);
  
  return (
    <section id="examples" className="py-20 bg-ajackal-off-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Примеры <span className="ajackal-gradient-text">до и после</span>
          </h2>
          <p className="text-ajackal-white/80 max-w-2xl mx-auto">
            Оцените разницу в качестве фото и видео после обработки при помощи нашей технологии
          </p>
        </div>
        
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Фотографии</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span>Видео</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="photos" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="relative">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">
                  {photoExamples[currentPhotoIndex].title}
                </h3>
                <p className="text-ajackal-white/70">
                </p>
              </div>
              
              <div 
                ref={containerRef}
                className="w-full max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-xl overflow-hidden relative glass-card cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={photoExamples[currentPhotoIndex].after}  
                      alt="После" 
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute bottom-4 right-4 glass-morph px-3 py-1 rounded-md z-10 transition-opacity duration-300"
                      style={{ opacity: sliderPosition < 90 ? 1 : 0 }}
                    >
                      <span className="text-sm font-medium">После</span>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute inset-0 h-full overflow-hidden" 
                    style={{ 
                      width: `${sliderPosition}%`,
                      clipPath: `inset(0 0 0 0)`,
                    }}
                  >
                    <img 
                      src={photoExamples[currentPhotoIndex].before} 
                      alt="До" 
                      className="absolute top-0 left-0 h-full w-full object-cover"
                      style={{ 
                        width: `${100 / (sliderPosition/100)}%`,
                        maxWidth: `${100 * (100/sliderPosition)}%`,
                        minWidth: '100%'
                      }}
                    />
                    <div 
                      className="absolute bottom-4 left-4 glass-morph px-3 py-1 rounded-md z-10 transition-opacity duration-300"
                      style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
                    >
                      <span className="text-sm font-medium">До</span>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white/90 z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                  >
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleMouseDown();
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleMouseDown();
                      }}
                    >
                      <div className="h-2 w-2 rounded-full bg-ajackal-black"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={prevPhoto}
                  className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {photoExamples.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`h-2 transition-all ${
                        index === currentPhotoIndex 
                          ? 'bg-ajackal-gradient w-8 rounded-full' 
                          : 'bg-ajackal-white/30 hover:bg-ajackal-white/50 w-2 rounded-full'
                      }`}
                      aria-label={`Пример ${index + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextPhoto}
                  className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="relative">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">
                  {videoExamples[currentVideoIndex].title}
                </h3>
                <p className="text-ajackal-white/70">
                </p>
              </div>
              
              <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden relative glass-card">
                <div className="relative aspect-video">
                  <video 
                    ref={videoRef}
                    src={videoExamples[currentVideoIndex].src}
                    poster={videoExamples[currentVideoIndex].poster}
                    className="w-full h-full object-cover"
                    playsInline
                    onClick={toggleVideo}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ajackal-black to-transparent opacity-60 pointer-events-none"></div>
                  
                  {!isPlaying && (
                    <button 
                      className="absolute inset-0 flex items-center justify-center"
                      onClick={toggleVideo}
                      aria-label="Воспроизвести видео"
                    >
                      <div className="h-16 w-16 rounded-full bg-ajackal-gradient flex items-center justify-center opacity-90 hover:scale-110 transition-transform">
                        <PlayCircle className="h-8 w-8 text-white" />
                      </div>
                    </button>
                  )}

                  {isPlaying && (
                    <button 
                      className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-ajackal-gradient flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                      onClick={toggleVideo}
                      aria-label="Пауза"
                    >
                      <PauseCircle className="h-6 w-6 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={prevVideo}
                  className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {videoExamples.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`h-2 transition-all ${
                        index === currentVideoIndex 
                          ? 'bg-ajackal-gradient w-8 rounded-full' 
                          : 'bg-ajackal-white/30 hover:bg-ajackal-white/50 w-2 rounded-full'
                      }`}
                      aria-label={`Видео ${index + 1}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextVideo}
                  className="h-10 w-10 rounded-full glass-morph flex items-center justify-center hover:bg-ajackal-purple/30 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center mt-6">
                <div className="glass-morph px-5 py-3 rounded-lg inline-block">
                  <p className="text-sm text-ajackal-white/80">
                    Нажмите на видео, чтобы воспроизвести или приостановить.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExamplesSection;
