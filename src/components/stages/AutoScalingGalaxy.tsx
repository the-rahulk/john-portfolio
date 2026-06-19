"use client";

import React, { useState, useEffect } from "react";
import { Sliders, RefreshCw, Layers, ArrowUp } from "lucide-react";

export default function AutoScalingGalaxy() {
  const [load, setLoad] = useState(100); // req/sec
  const [podsCount, setPodsCount] = useState(1);
  const [cpuLoad, setCpuLoad] = useState(12); // %

  useEffect(() => {
    // Dynamic scaling logic
    if (load <= 500) {
      setPodsCount(1);
      setCpuLoad(Math.round((load / 500) * 35 + 8));
    } else if (load <= 2000) {
      setPodsCount(2);
      setCpuLoad(Math.round((load / 2000) * 45 + 15));
    } else if (load <= 5000) {
      setPodsCount(4);
      setCpuLoad(Math.round((load / 5000) * 50 + 25));
    } else {
      // 5000 to 10000 req/sec
      setPodsCount(8);
      setCpuLoad(Math.round((load / 10000) * 55 + 30));
    }
  }, [load]);

  return (
    <section id="scale" className="w-full min-h-screen py-24 bg-black text-white flex items-center justify-center border-b border-[#27272c]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            07 / Auto Scaling Galaxy
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Auto Scaling Engine
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Configure Horizontal Pod Autoscaling (HPA) to scale nodes dynamically in response to traffic volume surges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls */}
          <div className="lg:col-span-5 bg-[#16161a] border border-[#27272c] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#27272c] pb-4">
                <Sliders className="w-5 h-5 text-[#2997ff]" />
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-gray-400">
                  Scale Controller
                </h3>
              </div>

              {/* Slider */}
              <div className="mb-8">
                <div className="flex justify-between font-mono text-xs text-gray-400 mb-2">
                  <span>TRAFFIC LOAD</span>
                  <span className="font-bold text-[#2997ff]">{load} Req/sec</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={load}
                  onChange={(e) => setLoad(Number(e.target.value))}
                  className="w-full h-2 bg-[#27272a] rounded-lg appearance-none cursor-pointer accent-[#2997ff]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>100 req/s (Baseline)</span>
                  <span>10,000 req/s (Spike)</span>
                </div>
              </div>

              {/* Gauges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#242429] border border-[#2d2d34]">
                  <div className="text-[10px] font-mono text-gray-400 mb-1">AVG CPU LOAD</div>
                  <div className="text-2xl font-mono font-bold text-white">
                    {cpuLoad}%
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#242429] border border-[#2d2d34]">
                  <div className="text-[10px] font-mono text-gray-400 mb-1">ACTIVE PODS</div>
                  <div className="text-2xl font-mono font-bold text-[#ff7a4c] flex items-center gap-1.5">
                    <span>{podsCount}</span>
                    <span className="text-xs text-gray-500 font-sans">Pods</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#27272c] text-[11px] text-gray-500 font-mono flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
              <span>HPA Controller: cpuTargetPercentage=70%</span>
            </div>
          </div>

          {/* Pod Visualizer Grid */}
          <div className="lg:col-span-7 bg-[#16161a] border border-[#27272c] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            <div className="flex items-center justify-between border-b border-[#27272c] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#2997ff]" />
                <span className="font-mono text-[12px] font-bold text-gray-400 uppercase tracking-wider">Kubernetes Pod Instances</span>
              </div>
              <span className="text-xs font-mono text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20 px-2 py-0.5 rounded">
                Target: career-production
              </span>
            </div>

            {/* Kubernetes pods layout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
              {[...Array(8)].map((_, i) => {
                const isActive = i < podsCount;
                return (
                  <div 
                    key={i} 
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      isActive 
                        ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-semibold" 
                        : "border-[#2d2d34] opacity-25 text-gray-500 bg-[#242429]"
                    }`}
                  >
                    <div className="relative flex h-2.5 w-2.5 mb-2">
                      {isActive && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      )}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isActive ? "bg-emerald-500" : "bg-gray-600"}`}></span>
                    </div>
                    <span className="text-[10px] font-mono leading-none">AKS-POD-{i + 1}</span>
                    <span className="text-[8px] font-mono text-gray-500 mt-1 uppercase leading-none">
                      {isActive ? "RUNNING" : "OFFLINE"}
                    </span>
                  </div>
                );
              })}
            </div>

            {load > 5000 && (
              <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg">
                <ArrowUp className="w-4 h-4 animate-bounce" />
                <span>LOAD THRESHOLD HIT: AUTOSCALING TRIGGERED [v2.0]</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
