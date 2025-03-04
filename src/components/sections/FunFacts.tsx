
import { Card, CardContent } from "@/components/ui/card";
import { FilmIcon, History, MusicIcon, Trophy, Star } from "lucide-react";

export function FunFacts() {
  const facts = [
    {
      id: 1,
      icon: <Trophy className="h-10 w-10 text-accent-gold" />,
      title: "Football Enthusiast",
      description: "I'm passionate about football, both playing and watching. It's not just a sport but a way of life that teaches teamwork and perseverance."
    },
    {
      id: 2,
      icon: <MusicIcon className="h-10 w-10 text-soft-pink" />,
      title: "Music Lover",
      description: "Music is my creative outlet. I enjoy both playing and composing, finding harmony in melodies that tell stories without words."
    },
    {
      id: 3,
      icon: <FilmIcon className="h-10 w-10 text-deep-blue" />,
      title: "Astronomy Aficionado",
      description: "The cosmos fascinates me. I spend clear nights stargazing, contemplating our place in the vast universe and marveling at celestial wonders."
    },
    {
      id: 4,
      icon: <History className="h-10 w-10 text-accent-gold" />,
      title: "History Enthusiast",
      description: "I believe Bharat's rich history has been misinterpreted. I'm passionate about exploring its ancient wisdom and contributions to world civilization."
    }
  ];

  return (
    <section id="fun-facts" className="section-container bg-gray-50 dark:bg-black/50">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title text-deep-blue dark:text-soft-pink">Beyond Data Science</h2>
          <p className="section-subtitle mx-auto text-deep-blue/70 dark:text-soft-pink/70">
            A glimpse into my personal passions and interests outside of professional work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facts.map((fact) => (
            <Card key={fact.id} className="hover-scale transition-all duration-300 border-gray-200 bg-white dark:bg-black dark:border-gray-800 shadow-lg dark:shadow-soft-pink/5">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-gray-100 dark:bg-gray-900">
                    {fact.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-deep-blue dark:text-soft-pink">{fact.title}</h3>
                  <p className="text-deep-blue/70 dark:text-soft-pink/70">{fact.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
