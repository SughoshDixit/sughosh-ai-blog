
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import ChatbotPage from "./pages/Chatbot";
import AIGalleryPage from "./pages/AIGallery";
// Commented out ChatbotButton import
// import { ChatbotButton } from "./components/chatbot/ChatbotButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Make Blog the main landing page */}
              <Route path="/" element={<BlogPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Navigate replace to="/" />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/ai-gallery" element={<AIGalleryPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* Removed ChatbotButton component */}
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
