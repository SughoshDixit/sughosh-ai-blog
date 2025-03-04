
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-magenta/5 dark:bg-light-magenta/10 border-t border-magenta/20 dark:border-light-magenta/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-magenta dark:text-light-magenta">Portfolio</h3>
            <p className="text-dark-magenta/70 dark:text-light-magenta/70 max-w-xs">
              A personal portfolio and blog showcasing my work, achievements, and thoughts.
            </p>
            <p className="text-dark-magenta/70 dark:text-light-magenta/70 mt-4 font-serif italic">
              "Swayameva Mrugendrata"
            </p>
            <div className="mt-6">
              <img 
                src="/lovable-uploads/d3b47e7b-8dee-4592-a742-097df04b49f2.png"
                alt="Sughosh Dixit"
                className="rounded-lg shadow-md w-32 h-32 object-cover"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-magenta dark:text-light-magenta">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#projects" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/#achievements" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-magenta dark:text-light-magenta">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-dark-magenta/70 dark:text-light-magenta/70 hover:text-magenta dark:hover:text-light-magenta transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <p className="text-sm text-dark-magenta/60 dark:text-light-magenta/60">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="text-sm text-dark-magenta/60 dark:text-light-magenta/60 mt-2">
              Made with ❤️ by Sughosh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
