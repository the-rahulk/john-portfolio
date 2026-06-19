"use client";

import React from "react";

const stageDetails: Record<string, { title: string; subtitle: string }> = {
  hero: { title: "Infrastructure Core", subtitle: "AWS Cloud Topology" },
  code: { title: "Code Universe", subtitle: "IaC & Shell Automation" },
  build: { title: "Build Factory", subtitle: "Docker Artifact Compiled" },
  test: { title: "Testing Gateway", subtitle: "88% Test Coverage Passed" },
  security: { title: "DevSecOps Shield", subtitle: "Akamai CDN / WAF Protected" },
  deploy: { title: "Deployment Platform", subtitle: "AWS ECS Blue-Green Deploy" },
  monitor: { title: "Observability Control", subtitle: "Telemetry: Latency & Logs" },
  scale: { title: "Auto Scaling Galaxy", subtitle: "Elastic Node Scaling" },
  experience: { title: "Career & Education Milestones", subtitle: "15+ Years Platform History" },
  contact: { title: "Mission Control Center", subtitle: "Establish Connection" }
};

export default function SubNav({ activeStage }: { activeStage: string }) {
  const current = stageDetails[activeStage] || { title: "DevOps Pipeline", subtitle: "Cloud Platform Running" };
  
  return (
    <div className="fixed top-[44px] left-0 w-full h-[52px] bg-[#1d1d1f]/70 backdrop-blur-lg border-b border-[#272729] z-40 px-4 md:px-8 flex items-center justify-between text-white">
      <div className="flex flex-col justify-center">
        <span className="text-[14px] font-semibold tracking-tight leading-tight">{current.title}</span>
        <span className="text-[10px] text-gray-400 font-mono leading-none mt-0.5">{current.subtitle}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-[11px] text-[#2997ff] font-mono hidden md:inline">
          BUILD: #JD-2026-PASSING
        </span>
        <a 
          href="#contact"
          className="apple-press bg-[#0066cc] hover:bg-[#0071e3] text-white text-[12px] font-sans px-4 py-1.5 rounded-full font-medium transition-colors inline-block"
        >
          Trigger Deploy
        </a>
      </div>
    </div>
  );
}
