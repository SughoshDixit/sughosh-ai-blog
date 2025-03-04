
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star, Medal } from "lucide-react";

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
      year: "2023",
      title: "Design Excellence Award",
      description: "Recognized for outstanding UI/UX design work on the SmartHome application.",
      icon: <Trophy className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      year: "2022",
      title: "Tech Innovation Prize",
      description: "Awarded for developing an innovative AI-powered content generation platform.",
      icon: <Award className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      year: "2021",
      title: "Open Source Contributor",
      description: "Recognized as a top contributor to the React ecosystem with over 500 commits.",
      icon: <Star className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      year: "2020",
      title: "Hackathon Winner",
      description: "First place in the Global Tech Hackathon for developing a health monitoring solution.",
      icon: <Medal className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <section id="achievements" className="section-container">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle mx-auto">
            Milestones and recognition from my professional journey.
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
                  <Card className="glass-card hover-scale overflow-hidden">
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
