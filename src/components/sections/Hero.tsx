
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
        <div className="absolute -top-[30%] -right-[10%] w-[80%] h-[80%] rounded-full bg-soft-pink/10 dark:bg-soft-pink/5 blur-3xl animate-spin-slow" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-soft-pink/10 dark:bg-soft-pink/5 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <div
            className={`transition-all duration-1000 delay-100 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
              <span className="block text-deep-blue dark:text-soft-pink">Sughosh Dixit</span>
              <span className="block text-deep-blue/80 dark:text-soft-pink/80">Data Scientist at Oracle</span>
            </h1>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <p className="mt-6 text-lg md:text-xl text-deep-blue/70 dark:text-soft-pink/70 max-w-3xl mx-auto italic">
              "Footballer and musician by passion, data scientist by profession, civilizationalist by ideology."
            </p>
          </div>

          <div
            className={`mt-12 flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-500 transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <Button size="lg" className="font-medium bg-deep-blue hover:bg-deep-blue/90 text-soft-pink dark:bg-soft-pink dark:hover:bg-soft-pink/90 dark:text-deep-blue">
              View My Work
            </Button>
            <Button size="lg" variant="outline" asChild className="border-deep-blue text-deep-blue hover:bg-deep-blue/10 dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink/10">
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
