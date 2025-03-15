
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu, X, BookOpen, Info, MessageSquareText, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/LoginButton";
import { Helmet } from "react-helmet-async";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Blog", path: "/", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { name: "About", path: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
    { name: "AI Gallery", path: "/ai-gallery", icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
    { name: "Chatbot", path: "/chatbot", icon: <MessageSquareText className="h-4 w-4 mr-2" /> },
  ];

  // Create organization structured data for the website
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sughosh Dixit",
    "url": "https://sughoshdixit.com",
    "logo": "https://sughoshdixit.com/og-image.png",
    "sameAs": [
      "https://twitter.com/sughoshdixit",
      "https://linkedin.com/in/sughoshdixit",
      "https://github.com/sughoshdixit"
    ]
  };

  // Create website structured data
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sughosh Dixit's Data Science Blog",
    "url": "https://sughoshdixit.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sughoshdixit.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteStructuredData)}
        </script>
      </Helmet>
      
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
            : "bg-transparent py-5"
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-xl text-primary dark:text-primary transition-all duration-300 hover:opacity-80 transform hover:-rotate-1 flex items-center"
              style={{ 
                fontFamily: "'Dancing Script', cursive",
                textShadow: "0px 1px 2px rgba(0,0,0,0.15)",
                letterSpacing: "0.5px"
              }}
              aria-label="Sughosh Dixit Home"
            >
              <span className="mr-2">Sughosh Dixit</span>
              <span className="text-sm font-normal opacity-70 hidden md:inline">| Data Science Chronicle</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 flex items-center",
                    "relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-primary dark:after:bg-primary",
                    location.pathname === item.path
                      ? "text-primary dark:text-primary after:scale-x-100 after:origin-bottom-left"
                      : "text-primary/70 dark:text-primary/70 hover:text-primary dark:hover:text-primary"
                  )}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <LoginButton />
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-primary dark:text-primary" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div 
              id="mobile-menu"
              className="md:hidden glass-card mt-4 p-4 animate-scale-in bg-background/90 dark:bg-background/90 border border-primary/30 dark:border-primary/10"
              role="navigation"
              aria-label="Mobile Navigation"
            >
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "text-base font-medium px-3 py-2 rounded-md transition-all duration-200 flex items-center",
                      location.pathname === item.path
                        ? "bg-primary/20 dark:bg-primary/10 text-primary dark:text-primary"
                        : "text-primary/80 dark:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/5 hover:text-primary dark:hover:text-primary"
                    )}
                    aria-current={location.pathname === item.path ? "page" : undefined}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
