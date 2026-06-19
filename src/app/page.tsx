"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import BootSequence from "@/components/BootSequence";
import GlobalNav from "@/components/GlobalNav";
import SubNav from "@/components/SubNav";

import Hero from "@/components/stages/Hero";
import CodeUniverse from "@/components/stages/CodeUniverse";
import BuildFactory from "@/components/stages/BuildFactory";
import TestingGateway from "@/components/stages/TestingGateway";
import SecurityShield from "@/components/stages/SecurityShield";
import DeploymentPlatform from "@/components/stages/DeploymentPlatform";
import ObservabilityControl from "@/components/stages/ObservabilityControl";
import AutoScalingGalaxy from "@/components/stages/AutoScalingGalaxy";
import ExperienceHistory from "@/components/stages/ExperienceHistory";
import ContactCenter from "@/components/stages/ContactCenter";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [activeStage, setActiveStage] = useState("hero");

  useEffect(() => {
    if (!booted) return;

    // Initialize smooth scrolling using Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Intersection observer to track pipeline stages and update navigation items
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px", // Trigger active state when section is centered
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveStage(entry.target.id);
        }
      });
    }, observerOptions);

    const stages = [
      "hero", "code", "build", "test", "security", "deploy", "monitor", "scale", "experience", "contact"
    ];

    stages.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, [booted]);

  const handleBootComplete = () => {
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0 });
    }
    setBooted(true);
  };

  if (!booted) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navigation Headers */}
      <GlobalNav activeStage={activeStage} />
      <SubNav activeStage={activeStage} />

      {/* Pipeline Stages */}
      <main className="flex-1 select-text">
        <Hero />
        <CodeUniverse />
        <BuildFactory />
        <TestingGateway />
        <SecurityShield />
        <DeploymentPlatform />
        <ObservabilityControl />
        <AutoScalingGalaxy />
        <ExperienceHistory />
        <ContactCenter />
      </main>
    </div>
  );
}
