"use client";

import React from "react";
import { Terminal } from "lucide-react";

export default function GlobalNav({ activeStage }: { activeStage: string }) {
  return (
    <nav className="fixed top-0 left-0 w-full h-[44px] bg-black border-b border-[#272729] z-50 px-4 md:px-8 flex items-center justify-between text-[12px] font-sans tracking-tight">
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
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
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
