"use client";

import React, { useState, useEffect } from "react";
import { Terminal, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalNav({ activeStage }: { activeStage: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[44px] bg-black border-b border-[#272729] z-50 px-4 md:px-8 flex items-center justify-between text-[12px] font-sans tracking-tight transition-colors duration-300">
      <div className="flex items-center gap-2 font-mono text-[#2997ff] font-bold">
        <Terminal className="w-4 h-4 text-[#2997ff]" />
        <span className="hidden md:inline">JOHN@PORTFOLIO:~$</span>
        <span className="md:hidden font-sans text-white text-xs font-semibold">John D'Souza</span>
      </div>
      
      {/* Scroll sections */}
      <div className="hidden lg:flex items-center gap-6 text-gray-400">
        {[
          { id: "hero", label: "Core" },
          { id: "code", label: "Code" },
          { id: "build", label: "Build" },
          { id: "test", label: "Test" },
          { id: "security", label: "Security" },
          { id: "deploy", label: "Deploy" },
          { id: "monitor", label: "Observability" },
          { id: "scale", label: "AutoScaling" },
          { id: "experience", label: "Milestones" },
          { id: "contact", label: "Contact" }
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`hover:text-white transition-colors ${
              activeStage === item.id ? "text-[#2997ff] font-semibold" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Creative DevOps Switcher (Git Branch Toggle) */}
        <div className="flex items-center gap-2.5 select-none pr-1">
          {/* Label indicating active git environment branch */}
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <GitBranch className={`w-3.5 h-3.5 transition-colors duration-300 ${
              theme === "dark" ? "text-[#2997ff]" : "text-[#ff7a4c]"
            }`} />
            <span className={`font-bold transition-colors duration-300 ${
              theme === "dark" ? "text-[#2997ff]" : "text-[#ff7a4c]"
            }`}>
              {theme === "dark" ? "env/prod" : "env/dev"}
            </span>
          </div>

          {/* Slider track designed as a branching pipeline path */}
          <div 
            onClick={toggleTheme}
            className={`w-[48px] h-[22px] rounded-full p-0.5 relative cursor-pointer overflow-hidden border transition-colors duration-300 flex items-center ${
              theme === "dark"
                ? "bg-[#161a23] border-[#2d3139]"
                : "bg-[#f5f5f7] border-[#d1d1d6]"
            }`}
          >
            {/* Visual SVG branch splits in background */}
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 48 22">
              {/* Main production trunk line */}
              <line x1="4" y1="11" x2="44" y2="11" stroke={theme === "dark" ? "#2997ff" : "#8e8e93"} strokeWidth="1.5" />
              {/* Branch split line */}
              <path d="M 12 11 Q 20 11, 28 17 L 44 17" fill="none" stroke={theme === "dark" ? "#8e8e93" : "#ff7a4c"} strokeWidth="1.5" />
            </svg>

            {/* Commit node slider */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-[12px] h-[12px] rounded-full shadow-md z-10"
              style={{
                position: "absolute",
                top: theme === "dark" ? "4px" : "10px",
                left: theme === "dark" ? "6px" : "28px",
                backgroundColor: theme === "dark" ? "#2997ff" : "#ff7a4c"
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 border-l border-[#272729] pl-3.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>PIPELINE: ACTIVE</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400 font-mono">
          <span>SLA: 99.98%</span>
        </div>
      </div>
    </nav>
  );
}
