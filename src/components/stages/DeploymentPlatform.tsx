"use client";

import React, { useState, useEffect } from "react";
import { 
  CloudLightning, 
  ArrowRightLeft, 
  Radio, 
  Server, 
  Heart, 
  CheckCircle2, 
  RotateCw, 
  AlertTriangle 
} from "lucide-react";

export default function DeploymentPlatform() {
  const [deploying, setDeploying] = useState(false);
  const [blueTraffic, setBlueTraffic] = useState(100);
  const [greenTraffic, setGreenTraffic] = useState(0);
  const [status, setStatus] = useState<"active" | "routing" | "success">("active");

  const triggerDeploy = () => {
    if (deploying) return;
    setDeploying(true);
    setStatus("routing");
    
    let currentBlue = 100;
    const interval = setInterval(() => {
      if (currentBlue > 0) {
        currentBlue -= 10;
        setBlueTraffic(currentBlue);
        setGreenTraffic(100 - currentBlue);
      } else {
        clearInterval(interval);
        setDeploying(false);
        setStatus("success");
      }
    }, 350);
  };

  // Argo CD status values based on deploy state
  const syncStatus = deploying ? "Syncing" : "Synced";
  const healthStatus = deploying ? "Progressing" : "Healthy";

  return (
    <section id="deploy" className="w-full min-h-screen py-24 bg-[#0d141f] text-white flex items-center justify-center border-b border-[#1f2e43]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#0dadea] font-bold uppercase mb-2 tracking-widest">
            05 / Deployment Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Deployment & Release Platform
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Zero-downtime Blue-Green deployments managed via GitOps triggers. Shift routing dynamically across container clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Sidepanel */}
          <div className="lg:col-span-4 bg-[#141d2b] border border-[#1f2e43] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#1f2e43] pb-4">
                <CloudLightning className="w-5 h-5 text-[#0dadea]" />
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-gray-400">
                  Deploy Manager
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-[#1a2638] border border-[#22354e]">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 mb-2">
                    <span>BLUE ENVIRONMENT (v1.0)</span>
                    <span className="font-bold">{blueTraffic}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#141d2b] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0066cc] transition-all duration-300"
                      style={{ width: `${blueTraffic}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#1a2638] border border-[#22354e]">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 mb-2">
                    <span>GREEN ENVIRONMENT (v2.0)</span>
                    <span className="font-bold">{greenTraffic}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#141d2b] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#18d18e] transition-all duration-300"
                      style={{ width: `${greenTraffic}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {status === "success" && (
                <div className="mb-4 text-xs font-mono text-[#18d18e] bg-[#18d18e]/10 border border-[#18d18e]/20 p-3 rounded-lg text-center font-bold">
                  v2.0 PROMOTED TO PRODUCTION
                </div>
              )}
              
              <button
                onClick={triggerDeploy}
                disabled={deploying}
                className={`w-fit mx-auto md:w-full py-3 px-8 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all apple-press ${
                  deploying
                    ? "bg-[#1a2638] text-gray-500 border border-[#22354e] cursor-not-allowed"
                    : "bg-[#0dadea] hover:bg-[#00a0e9] text-white shadow-md"
                }`}
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>{deploying ? "Swapping Clusters..." : "Execute Blue-Green Swap"}</span>
              </button>
            </div>
          </div>

          {/* Infrastructure Map */}
          <div className="lg:col-span-8 bg-[#141d2b] border border-[#1f2e43] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            
            {/* Argo CD-inspired App Status Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1f2e43] pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                <span className="text-gray-400 font-semibold">APP: <span className="text-white">portfolio-infra</span></span>
                <span className="text-gray-600 hidden md:inline">|</span>
                
                {/* Sync badge */}
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                  syncStatus === "Syncing" 
                    ? "text-[#f4c030] border-[#f4c030]/20 bg-[#f4c030]/10" 
                    : "text-[#18d18e] border-[#18d18e]/20 bg-[#18d18e]/10"
                }`}>
                  {deploying ? (
                    <RotateCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>{syncStatus.toUpperCase()}</span>
                </span>
                
                <span className="text-gray-600 hidden md:inline">|</span>

                {/* Health badge */}
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                  healthStatus === "Progressing"
                    ? "text-[#0dadea] border-[#0dadea]/20 bg-[#0dadea]/10"
                    : "text-[#18d18e] border-[#18d18e]/20 bg-[#18d18e]/10"
                }`}>
                  <Heart className={`w-3 h-3 ${deploying ? "animate-pulse text-[#0dadea]" : "text-[#18d18e] fill-current"}`} />
                  <span>{healthStatus.toUpperCase()}</span>
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <Radio className="w-3.5 h-3.5 text-[#0dadea]" />
                <span>LOAD_BALANCER_ACTIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              
              {/* Blue Group */}
              <div className={`p-5 rounded-lg border transition-all ${
                blueTraffic > 0 ? "border-[#1f2e43] bg-[#1a2638]/50 shadow-sm" : "border-[#1f2e43] opacity-40"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#0dadea]" />
                    <span className="text-sm font-semibold text-white">Blue Cluster (v1.0)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#0dadea]">{blueTraffic}% Load</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-9 rounded-sm flex items-center justify-center font-mono text-[9px] border-l-4 transition-all ${
                        blueTraffic > 0 
                          ? "border-l-[#18d18e] border-[#1f2e43] bg-[#1a2638] text-white" 
                          : "border-l-[#e96d7b] border-[#1f2e43] bg-[#141d2b] text-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-0.5">
                        <span>B-POD-{i}</span>
                        {blueTraffic > 0 && <Heart className="w-2 h-2 text-[#18d18e] fill-current animate-pulse" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Green Group */}
              <div className={`p-5 rounded-lg border transition-all ${
                greenTraffic > 0 ? "border-[#1f2e43] bg-[#1a2638]/50 shadow-sm" : "border-[#1f2e43] opacity-40"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#18d18e]" />
                    <span className="text-sm font-semibold text-white">Green Cluster (v2.0)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#18d18e]">{greenTraffic}% Load</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-9 rounded-sm flex items-center justify-center font-mono text-[9px] border-l-4 transition-all ${
                        greenTraffic > 0 
                          ? "border-l-[#18d18e] border-[#1f2e43] bg-[#1a2638] text-white" 
                          : "border-l-[#485c72] border-[#1f2e43] bg-[#141d2b] text-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-0.5">
                        <span>G-POD-{i}</span>
                        {greenTraffic > 0 && <Heart className="w-2 h-2 text-[#18d18e] fill-current animate-pulse" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
