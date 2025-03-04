
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Instagram, Twitter, Youtube, Code } from "lucide-react";

export function SocialMedia() {
  const profiles = [
    {
      id: 1,
      name: "GitHub",
      username: "sughoshdixit",
      url: "https://github.com/sughoshdixit",
      icon: <Github className="h-6 w-6" />,
      bgColor: "bg-zinc-900",
      textColor: "text-white"
    },
    {
      id: 2,
      name: "Blog",
      username: "sughoshblog",
      url: "https://sughoshblog.vercel.app/",
      icon: <ExternalLink className="h-6 w-6" />,
      bgColor: "bg-indigo-600",
      textColor: "text-white"
    },
    {
      id: 3,
      name: "X (Twitter)",
      username: "@PSughosh",
      url: "https://twitter.com/PSughosh",
      icon: <Twitter className="h-6 w-6" />,
      bgColor: "bg-sky-500",
      textColor: "text-white"
    },
    {
      id: 4,
      name: "YouTube",
      username: "Sughosh Dixit",
      url: "https://www.youtube.com/@sughoshdixit",
      icon: <Youtube className="h-6 w-6" />,
      bgColor: "bg-red-600",
      textColor: "text-white"
    },
    {
      id: 5,
      name: "Instagram",
      username: "@sughoshdixit",
      url: "https://www.instagram.com/sughoshdixit/",
      icon: <Instagram className="h-6 w-6" />,
      bgColor: "bg-pink-600",
      textColor: "text-white"
    },
    {
      id: 6,
      name: "LeetCode",
      username: "invincible0809",
      url: "https://leetcode.com/invincible0809/",
      icon: <Code className="h-6 w-6" />,
      bgColor: "bg-amber-500",
      textColor: "text-white"
    }
  ];

  return (
    <section className="section-container">
      <div className="container page-container">
        <div className="mb-16 text-center">
          <h2 className="section-title">Connect With Me</h2>
          <p className="section-subtitle mx-auto">
            Follow me on social media and other platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <Card key={profile.id} className="glass-card overflow-hidden hover-scale transition-all duration-300 border-none">
              <div className={`${profile.bgColor} py-4 px-6 ${profile.textColor}`}>
                <div className="flex items-center gap-3">
                  {profile.icon}
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {profile.username}
                </p>
                <Button asChild className="w-full">
                  <a href={profile.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <span>Visit {profile.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
