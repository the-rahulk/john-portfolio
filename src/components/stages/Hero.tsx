"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Info, ArrowDown } from "lucide-react";

// Dynamically import Three.js Canvas to avoid SSR errors
const KubernetesCluster = dynamic(
  () => import("../KubernetesCluster"),
  { ssr: false }
);

interface DetailData {
  title: string;
  subtitle: string;
  details: string[];
  metrics: string[];
}

const nodeDetails: Record<string, DetailData> = {
  "deloitte-prod": {
    title: "Deloitte",
    subtitle: "Specialist Senior (Release Manager) · Oct 2015 – Present",
    details: [
      "Delivered 100+ production releases as Release Manager in 2025 across multi-cloud platforms.",
      "Configured Datadog RUM/APM metric logs, monitors, and tracing, reducing system MTTR by 40%.",
      "Managed 15+ engineers across Release, Observability, DevOps, and Security teams."
    ],
    metrics: ["100+ Releases (2025)", "-40% MTTR (Datadog)", "15+ Team Members"]
  },
  "atos-prod": {
    title: "Atos India",
    subtitle: "Senior Systems Engineer · Dec 2014 – Oct 2015",
    details: [
      "Led DevOps team implementing AWS/Azure VM automation and CI/CD pipelines.",
      "Application server expert: WAS, Tomcat, WebLogic, IIS, Apache administration.",
      "Collaborated across ITSM teams for production changes and major incident resolution."
    ],
    metrics: ["VM Automation", "Tomcat / WebLogic", "ITSM Incident Lead"]
  },
  "capgemini-prod": {
    title: "IGate (Capgemini)",
    subtitle: "Senior Systems Engineer · Oct 2010 – Dec 2014",
    details: [
      "IBM WebSphere administration across AIX/RHEL for dev-to-prod deployments.",
      "Performance tuning, JVM optimization, and automated monitoring implementation.",
      "Deployed EAR/WAR applications, managed JVM settings and web container parameters."
    ],
    metrics: ["IBM WebSphere", "JVM Tuning", "AIX / RHEL Admin"]
  },
  "aws-certs": {
    title: "Cloud & Agile Credentials",
    subtitle: "Professional Certifications & Training",
    details: [
      "Microsoft Certified Azure Administrator (AZ-104)",
      "AWS Certified AI Practitioner (AIF-C01)",
      "Claude Certified Architect - Foundation (Anthropic)",
      "CKAD (Kubernetes Administration Training)",
      "SCRUM Foundation Certificate & ITIL V3 Foundation"
    ],
    metrics: ["Azure AZ-104", "AWS AI Practitioner", "Claude Architect", "CKAD Training"]
  },
  "education-node": {
    title: "Education",
    subtitle: "Academic Qualifications",
    details: [
      "MCA: Computer Applications (2010) — SIES College of Management Studies, Mumbai.",
      "B.Sc: Computer Science (2006) — Birla College of Commerce Arts and Science, Mumbai."
    ],
    metrics: ["MCA (2010)", "B.Sc CS (2006)", "Mumbai Univ"]
  }
};

export default function Hero() {
  const [selectedNode, setSelectedNode] = useState<string>("deloitte-prod");
  const detail = nodeDetails[selectedNode] || nodeDetails["deloitte-prod"];

  return (
    <section id="hero" className="w-full min-h-screen pt-32 pb-24 bg-black text-white flex items-center justify-center border-b border-[#272729] relative overflow-hidden">
      <div className="max-w-6xl w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Bio Block */}
        <div className="lg:col-span-5 flex flex-col text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            CONTROL PLANE / CORE
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-none apple-tight mb-2 text-[#E8E6FF]">
            JOHN D'SOUZA
          </h1>
          <h3 className="text-lg text-gray-400 font-sans font-light mb-4">
            DevOps Manager / Platform Architect
          </h3>
          <p className="text-[13px] text-gray-500 font-mono mb-8">
            Mumbai, India · Azure AZ-104 · AWS AI Practitioner · Claude Architect · CKA
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <a 
              href="#code"
              className="apple-press bg-[#0066cc] hover:bg-[#0071e3] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors inline-block"
            >
              Explore Stack
            </a>
            <a 
              href="#build"
              className="apple-press bg-transparent border border-gray-600 hover:border-white text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors inline-block"
            >
              Trigger Build
            </a>
          </div>
        </div>

        {/* 3D Cluster Visualizer */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <KubernetesCluster onNodeSelect={(nodeName) => setSelectedNode(nodeName)} />
          
          {/* Node Inspect Details */}
          <div className="bg-[#0A0A0F] border border-[#272729] rounded-lg p-5 flex flex-col md:flex-row gap-5 shadow-xl transition-all border-glow">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#2997ff]">
                <Info className="w-3.5 h-3.5 animate-pulse" />
                <span>INSPECTING NODE: {selectedNode}</span>
              </div>
              <h3 className="text-lg font-bold text-[#E8E6FF]">{detail.title}</h3>
              <p className="text-[11px] text-gray-500 font-mono mb-3">{detail.subtitle}</p>
              
              <ul className="space-y-1.5 text-[12px] text-gray-300 list-disc list-inside">
                {detail.details.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-[180px] flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-[#272729] pt-4 md:pt-0 md:pl-4">
              <div className="text-[10px] font-mono text-gray-500 mb-1">METRICS DEPLOYED</div>
              {detail.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs font-mono text-center text-[#ff7a4c] font-bold select-none">
                  {metric}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-pulse text-[11px] font-mono text-gray-500">
        <span>scroll to pipeline</span>
        <ArrowDown className="w-3 h-3 text-[#2997ff]" />
      </div>
    </section>
  );
}
