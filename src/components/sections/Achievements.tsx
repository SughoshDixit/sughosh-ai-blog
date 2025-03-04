
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star, Medal, Cpu, Shield, Brain, Lightbulb, Rocket } from "lucide-react";

type Achievement = {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function Achievements() {
  const achievements: Achievement[] = [
    {
      id: 1,
      year: "2024",
      title: "FFI Scale91 Fintech Hackathon",
      description: "Currently working on a Fintech solution for Algorithmic trading by leveraging Zerodha's KiteConnect API.",
      icon: <Rocket className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      year: "2023",
      title: "Karnataka State Police Hackathon",
      description: "Finalists, built a Flask-based Face recognition application for criminals using Image Data Augmentation and GAN deployed on Microsoft Azure Cloud.",
      icon: <Shield className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      year: "2021",
      title: "PANIIT Hackathon IISC",
      description: "Selected in top 20 promising ideas. Worked on Project Alphers - an Early age Education and Talents prediction application.",
      icon: <Brain className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      year: "2020",
      title: "Garage48 Covid19 Hackathon",
      description: "Built an application called QuarantineForSure to assist with pandemic-related challenges.",
      icon: <Star className="h-8 w-8 text-primary" />,
    },
    {
      id: 5,
      year: "2019",
      title: "Rakathon 2.0",
      description: "Selected among the top 15 most promising ideas, showcasing innovation and problem-solving abilities.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section id="achievements" className="section-container bg-soft-pink/5 dark:bg-deep-blue/10">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title text-deep-blue dark:text-soft-pink">Achievements</h2>
          <p className="section-subtitle mx-auto text-deep-blue/70 dark:text-soft-pink/70">
            Hackathons and recognition from my professional journey.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-soft-pink/30 dark:bg-soft-pink/20" />

          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-deep-blue border-4 border-deep-blue dark:border-soft-pink flex items-center justify-center z-10">
                  <span className="font-bold text-sm text-deep-blue dark:text-soft-pink">{achievement.year}</span>
                </div>
                
                <div className="w-full md:w-[45%] px-4 md:px-0">
                  <Card className="glass-card hover-scale overflow-hidden shadow-md border-soft-pink/30 bg-white/90 dark:bg-deep-blue/30 dark:border-soft-pink/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="p-3 rounded-lg bg-soft-pink/20 dark:bg-soft-pink/10">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-2 text-deep-blue dark:text-soft-pink">{achievement.title}</h3>
                          <p className="text-deep-blue/70 dark:text-soft-pink/70">{achievement.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
