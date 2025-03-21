
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ajackal-black p-4">
      <div className="glass-card p-8 md:p-12 rounded-xl text-center max-w-md w-full relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-ajackal-purple/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-ajackal-pink/20 rounded-full blur-xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-6 ajackal-gradient-text">404</h1>
          <div className="glass-morph px-4 py-1 rounded-full mb-6 mx-auto inline-block">
            <span className="text-sm font-medium text-ajackal-white/90">Страница не найдена</span>
          </div>
          <p className="text-xl text-ajackal-white/80 mb-8">
            Кажется, вы пытаетесь найти страницу, которая не существует или была перемещена.
          </p>
          <Link to="/">
            <Button className="bg-ajackal-gradient hover:bg-ajackal-dark-gradient flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-4 w-4" />
              <span>Вернуться на главную</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
