
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-soft-pink/10 dark:bg-deep-blue/20 border-t border-soft-pink/20 dark:border-soft-pink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-deep-blue dark:text-soft-pink">Portfolio</h3>
            <p className="text-deep-blue/70 dark:text-soft-pink/70 max-w-xs">
              A personal portfolio and blog showcasing my work, achievements, and thoughts.
            </p>
            <p className="text-deep-blue/70 dark:text-soft-pink/70 mt-4 font-serif italic">
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
            <h3 className="text-lg font-semibold mb-4 text-deep-blue dark:text-soft-pink">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#projects" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/#achievements" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-deep-blue dark:text-soft-pink">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-deep-blue/70 dark:text-soft-pink/70 hover:text-deep-blue dark:hover:text-soft-pink transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <p className="text-sm text-deep-blue/60 dark:text-soft-pink/60">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="text-sm text-deep-blue/60 dark:text-soft-pink/60 mt-2">
              Made with ❤️ by Sughosh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
