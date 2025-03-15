import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { FunFacts } from "@/components/sections/FunFacts";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { SocialMedia } from "@/components/sections/SocialMedia";
import { YouTube } from "@/components/sections/YouTube";
import { SEOHead } from "@/components/seo/SEOHead";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  console.log("Index page rendering");
  const location = useLocation();

  // Smooth scroll to section based on hash
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <SEOHead
        title="Sughosh Dixit | Tech, AI, and Innovation"
        description="Welcome to my personal website. Explore my portfolio, projects, achievements, and insights on technology, AI, and innovative solutions."
        canonicalUrl="/"
      />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <GitHubStats />
        <Projects />
        <FunFacts />
        <YouTube />
        <Achievements />
        <SocialMedia />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
