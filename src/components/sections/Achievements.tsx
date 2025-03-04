
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
    <section id="achievements" className="section-container">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle mx-auto">
            Hackathons and recognition from my professional journey.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-border" />

          <div className="space-y-12">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
                  <span className="font-bold text-sm">{achievement.year}</span>
                </div>
                
                <div className="w-full md:w-[45%] px-4 md:px-0">
                  <Card className="glass-card hover-scale overflow-hidden shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="p-3 rounded-lg bg-primary/10">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl mb-2">{achievement.title}</h3>
                          <p className="text-muted-foreground">{achievement.description}</p>
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
