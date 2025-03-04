
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
