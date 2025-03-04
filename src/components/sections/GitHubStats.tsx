
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, GitBranch, GitCommit } from "lucide-react";

export function GitHubStats() {
  const stats = [
    {
      id: 1,
      icon: <GitCommit className="h-8 w-8 text-primary dark:text-primary" />,
      value: "500+",
      label: "Contributions"
    },
    {
      id: 2,
      icon: <Star className="h-8 w-8 text-accent" />,
      value: "20+",
      label: "Stars Earned"
    },
    {
      id: 3,
      icon: <GitBranch className="h-8 w-8 text-secondary" />,
      value: "30+",
      label: "Forks"
    },
    {
      id: 4,
      icon: <Trophy className="h-8 w-8 text-accent" />,
      value: "15+",
      label: "Repositories"
    }
  ];

  return (
    <section id="github-stats" className="section-container bg-white dark:bg-background">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title text-primary dark:text-primary">GitHub Statistics</h2>
          <p className="section-subtitle mx-auto text-primary/70 dark:text-primary/70">
            A snapshot of my <span className="gold-accent">open-source</span> contributions and coding activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.id} className="hover-scale transition-all duration-300 border-accent/20 bg-white dark:bg-card dark:border-accent/20 shadow-lg dark:shadow-primary/5">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-muted dark:bg-muted/50">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1 text-primary dark:text-primary">{stat.value}</h3>
                <p className="text-primary/70 dark:text-primary/70">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 bg-white dark:bg-card rounded-xl shadow-sm border border-accent/30 dark:border-accent/20">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-primary dark:text-primary">Contribution Graph</h3>
            <p className="text-primary/70 dark:text-primary/70">My GitHub activity over the past year</p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={`https://ghchart.rshah.org/8b5cf6/sughoshdixit`} 
              alt="GitHub Contribution Graph"
              className="max-w-full rounded-md dark:opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
