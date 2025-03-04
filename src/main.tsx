
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-white text-deep-blue dark:bg-black dark:text-white transition-colors duration-300">
        <App />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
