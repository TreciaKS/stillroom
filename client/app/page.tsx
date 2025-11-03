"use client";

import Navbar from "./components/Navbar";
import Mission from "./components/Mission";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Demo from "./components/Demo";
import Hero from "./components/Hero";

export default function LandingPage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-(--pure-white) bg-(--pure-black)">
      <Navbar />
      <Hero />
      <Demo />
      <Features />
      <Mission />
      <CTA />
      <Footer />
    </section>
  );
}