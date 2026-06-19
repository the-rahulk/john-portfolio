"use client";

import React, { useState, useEffect } from "react";
import { CloudLightning, ArrowRightLeft, Radio, Server } from "lucide-react";

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

  return (
    <section id="deploy" className="w-full min-h-screen py-24 bg-[#0d0d11] text-white flex items-center justify-center border-b border-[#27272c]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            05 / Deployment Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Deployment & Release Platform
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Zero-downtime Blue-Green deployments hosted on Azure AKS. Spin up new Helm-templated containers and shift routing safely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-4 bg-[#16161a] border border-[#27272c] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#27272c] pb-4">
                <CloudLightning className="w-5 h-5 text-[#2997ff]" />
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-gray-400">
                  Deploy Manager
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-[#242429] border border-[#2d2d34]">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 mb-2">
                    <span>BLUE ENVIRONMENT (v1.0)</span>
                    <span className="font-bold">{blueTraffic}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0066cc] transition-all duration-300"
                      style={{ width: `${blueTraffic}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#242429] border border-[#2d2d34]">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 mb-2">
                    <span>GREEN ENVIRONMENT (v2.0)</span>
                    <span className="font-bold">{greenTraffic}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#27272a] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${greenTraffic}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {status === "success" && (
                <div className="mb-4 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-center font-bold">
                  v2.0 PROMOTED TO PRODUCTION
                </div>
              )}
              
              <button
                onClick={triggerDeploy}
                disabled={deploying}
                className={`w-fit mx-auto md:w-full py-3 px-8 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  deploying
                    ? "bg-[#242429] text-gray-500 border border-[#2d2d34] cursor-not-allowed"
                    : "bg-[#0066cc] hover:bg-[#0071e3] text-white shadow-md active:scale-95"
                }`}
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>{deploying ? "Swapping Clusters..." : "Execute Blue-Green Swap"}</span>
              </button>
            </div>
          </div>

          {/* Infrastructure Map */}
          <div className="lg:col-span-8 bg-[#16161a] border border-[#27272c] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            <div className="flex items-center justify-between border-b border-[#27272c] pb-4 mb-6">
              <span className="font-mono text-[12px] font-bold text-gray-400 uppercase tracking-wider">Azure AKS Container Nodes</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <Radio className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>LOAD_BALANCER_ACTIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              {/* Blue Group */}
              <div className={`p-5 rounded-lg border transition-all ${
                blueTraffic > 0 ? "border-[#2997ff]/40 bg-[#2997ff]/5 shadow-sm" : "border-[#27272c] opacity-50"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#2997ff]" />
                    <span className="text-sm font-semibold text-white">Blue Cluster (v1.0)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#2997ff]">{blueTraffic}% Load</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-8 rounded flex items-center justify-center font-mono text-[10px] border transition-all ${
                        blueTraffic > 0 
                          ? "border-[#2997ff]/30 bg-[#2997ff]/10 text-[#2997ff] animate-pulse" 
                          : "border-[#2d2d34] text-gray-500 bg-[#242429]"
                      }`}
                    >
                      B-POD-{i}
                    </div>
                  ))}
                </div>
              </div>

              {/* Green Group */}
              <div className={`p-5 rounded-lg border transition-all ${
                greenTraffic > 0 ? "border-emerald-500/40 bg-emerald-500/5 shadow-sm" : "border-[#27272c] opacity-50"
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-white">Green Cluster (v2.0)</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-500">{greenTraffic}% Load</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-8 rounded flex items-center justify-center font-mono text-[10px] border transition-all ${
                        greenTraffic > 0 
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 animate-pulse" 
                          : "border-[#2d2d34] text-gray-500 bg-[#242429]"
                      }`}
                    >
                      G-POD-{i}
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
