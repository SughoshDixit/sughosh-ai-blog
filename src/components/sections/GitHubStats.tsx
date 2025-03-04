
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, GitBranch, GitCommit } from "lucide-react";

export function GitHubStats() {
  const stats = [
    {
      id: 1,
      icon: <GitCommit className="h-8 w-8 text-primary" />,
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
    <section id="github-stats" className="section-container bg-muted/30 dark:bg-muted/5">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title text-gradient-primary dark:text-gradient">GitHub Statistics</h2>
          <p className="section-subtitle mx-auto text-muted-foreground">
            A snapshot of my open-source contributions and coding activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.id} className="glass-card hover-scale transition-all duration-300 border border-primary/20 dark:border-accent/20 shadow-lg dark:shadow-accent/5">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-accent/10">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1 text-foreground">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 bg-background rounded-xl shadow-sm border border-border dark:border-accent/10 glass-card">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground">Contribution Graph</h3>
            <p className="text-muted-foreground">My GitHub activity over the past year</p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={`https://ghchart.rshah.org/9b87f5/sughoshdixit`} 
              alt="GitHub Contribution Graph"
              className="max-w-full rounded-md dark:opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
