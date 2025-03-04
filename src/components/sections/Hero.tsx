
import { ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-magenta/5 dark:bg-light-magenta/5 blur-3xl animate-spin-slow" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-magenta/5 dark:bg-light-magenta/5 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <div
            className={`transition-all duration-1000 delay-100 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="block text-magenta dark:text-light-magenta">Sughosh Dixit</span>
              <span className="block text-dark-magenta/80 dark:text-light-magenta/80">Data Scientist at Oracle</span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <p className="mt-6 text-lg md:text-xl text-dark-magenta/70 dark:text-light-magenta/70 max-w-3xl mx-auto italic">
              "Footballer and musician by passion, data scientist by profession, civilizationalist by ideology."
            </p>
          </div>

          <div
            className={`mt-12 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-500 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <Button size="lg" className="font-medium bg-magenta hover:bg-magenta/90 text-white dark:bg-light-magenta dark:hover:bg-light-magenta/90 dark:text-black">
              View My Work
            </Button>
            <Button size="lg" variant="outline" asChild className="border-magenta text-magenta hover:bg-magenta/10 dark:border-light-magenta dark:text-light-magenta dark:hover:bg-light-magenta/10">
              <a href="#about" className="flex items-center gap-2">
                <span>Learn More</span>
                <ArrowDownCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
