
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, GitBranch, GitCommit } from "lucide-react";

export function GitHubStats() {
  const stats = [
    {
      id: 1,
      icon: <GitCommit className="h-8 w-8 text-deep-blue dark:text-deep-blue" />,
      value: "500+",
      label: "Contributions"
    },
    {
      id: 2,
      icon: <Star className="h-8 w-8 text-accent-gold" />,
      value: "20+",
      label: "Stars Earned"
    },
    {
      id: 3,
      icon: <GitBranch className="h-8 w-8 text-soft-pink" />,
      value: "30+",
      label: "Forks"
    },
    {
      id: 4,
      icon: <Trophy className="h-8 w-8 text-accent-gold" />,
      value: "15+",
      label: "Repositories"
    }
  ];

  return (
    <section id="github-stats" className="section-container bg-white dark:bg-black">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title text-deep-blue dark:text-soft-pink">GitHub Statistics</h2>
          <p className="section-subtitle mx-auto text-deep-blue/70 dark:text-soft-pink/70">
            A snapshot of my open-source contributions and coding activity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.id} className="hover-scale transition-all duration-300 border-gray-200 bg-white dark:bg-black dark:border-gray-800 shadow-lg dark:shadow-soft-pink/5">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-900">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1 text-deep-blue dark:text-soft-pink">{stat.value}</h3>
                <p className="text-deep-blue/70 dark:text-soft-pink/70">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 p-6 bg-white dark:bg-black rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-deep-blue dark:text-soft-pink">Contribution Graph</h3>
            <p className="text-deep-blue/70 dark:text-soft-pink/70">My GitHub activity over the past year</p>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={`https://ghchart.rshah.org/8B5CF6/sughoshdixit`} 
              alt="GitHub Contribution Graph"
              className="max-w-full rounded-md dark:opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
