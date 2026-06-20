import React from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Trust } from "./components/Trust";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-50/20 text-slate-900 antialiased">
        {/* Fixed Navigation Bar */}
        <Navbar />

        {/* Hero Section (Home) */}
        <Hero />

        {/* Feature Section */}
        <Features />

        {/* How It Works Section (About/Process) */}
        <HowItWorks />

        {/* Trust & Verification Section */}
        <Trust />

        {/* Call to Action Banner */}
        <CTA />

        {/* Footer (Contact and Info) */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
