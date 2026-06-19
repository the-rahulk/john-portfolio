"use client";

import React, { useState, useEffect, useRef } from "react";
import { Activity, BarChart2, Eye, Terminal } from "lucide-react";

export default function ObservabilityControl() {
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  // Stats counter
  const [releases, setReleases] = useState(0);
  const [mttrRed, setMttrRed] = useState(0);
  const [taskRed, setTaskRed] = useState(0);

  const mockLogsList = [
    "[DD-APM] Ingesting request GET /api/v1/checkout - status:200 [14ms]",
    "[DD-RUM] Trace session active: browser-chrome-mumbai [User id: JohnD]",
    "[DD-MONITOR] Alert cleared: cpu_utilization_stabilized on AKS-NODE-4",
    "[DD-APM] Trace matched span: database_query_websphere [8ms]",
    "[DD-APM] Ingesting request POST /api/v1/release/promote - status:202 [140ms]",
    "[DD-MONITOR] Logs synced. Synthetic check URL: healthcheck.deloitte.com [OK]",
    "[DD-APM] Log ingested: 'PowerShell cron script triggered: clean_temp_volumes'",
    "[DD-APM] Thread pool optimized. WebSphere JVM: 42 active [OK]"
  ];

  // Increment stats
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("monitor");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          // Count up
          let currRel = 0;
          let currMttr = 0;
          let currTask = 0;

          const interval = setInterval(() => {
            let done = true;
            if (currRel < 100) {
              currRel += 4;
              setReleases(Math.min(currRel, 100));
              done = false;
            }
            if (currMttr < 40) {
              currMttr += 1;
              setMttrRed(currMttr);
              done = false;
            }
            if (currTask < 60) {
              currTask += 2;
              setTaskRed(Math.min(currTask, 60));
              done = false;
            }
            if (done) clearInterval(interval);
          }, 30);
          
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediately in case it's in view
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stream logs
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const log = mockLogsList[index % mockLogsList.length];
      const timestamp = new Date().toISOString().split("T")[1].substring(0, 8);
      setLogs((prev) => [...prev.slice(-30), `[${timestamp}] ${log}`]);
      index++;
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="monitor" className="w-full min-h-screen py-24 bg-[#252527] text-white flex items-center justify-center border-b border-[#000000]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            06 / Observability Control
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Observability Mission Control
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Monitor API traffic, logs, metrics, and application traces in real-time. Built to optimize latency and minimize MTTR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Telemetry metrics */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <div className="p-6 rounded-lg bg-[#272729] border border-[#252527] flex flex-col justify-between hover:shadow-lg transition-all border-glow">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-gray-400 font-bold uppercase">Release Management</span>
                <Activity className="w-4 h-4 text-[#ff7a4c]" />
              </div>
              <div>
                <span className="text-5xl font-mono font-bold text-[#ff7a4c] tracking-tight">
                  {releases}+
                </span>
                <p className="text-[13px] text-gray-400 mt-2 font-sans">
                  Production releases delivered as Release Manager across multi-cloud platforms in 2025.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#272729] border border-[#252527] flex flex-col justify-between hover:shadow-lg transition-all border-glow">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-gray-400 font-bold uppercase">Observability Impact</span>
                <BarChart2 className="w-4 h-4 text-[#ff7a4c]" />
              </div>
              <div>
                <span className="text-5xl font-mono font-bold text-[#ff7a4c] tracking-tight">
                  -{mttrRed}%
                </span>
                <p className="text-[13px] text-gray-400 mt-2 font-sans">
                  MTTR reduction accomplished by configuring Datadog RUM/APM monitors and distributed tracing.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#272729] border border-[#252527] flex flex-col justify-between hover:shadow-lg transition-all border-glow">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-gray-400 font-bold uppercase">Infrastructure Automation</span>
                <Eye className="w-4 h-4 text-[#ff7a4c]" />
              </div>
              <div>
                <span className="text-5xl font-mono font-bold text-[#ff7a4c] tracking-tight">
                  -{taskRed}%
                </span>
                <p className="text-[13px] text-gray-400 mt-2 font-sans">
                  Reduction in manual infrastructure tasks achieved using PowerShell and shell scripting.
                </p>
              </div>
            </div>
          </div>

          {/* Logging stream */}
          <div className="lg:col-span-7 bg-black border border-[#252527] rounded-lg p-5 flex flex-col min-h-[400px] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#272729] mb-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
                <span className="ml-2 font-semibold">live-traffic-stream.log</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 font-mono">
                <Terminal className="w-3.5 h-3.5 text-[#2997ff]" />
                <span>stdout</span>
              </div>
            </div>

            <div 
              ref={logContainerRef}
              className="flex-1 overflow-y-auto font-mono text-[11px] text-gray-300 space-y-1.5 pr-2 max-h-[340px]"
            >
              {logs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 font-mono italic">
                  Initializing stdout listener...
                </div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-gray-600 mr-2">{"$"}</span>
                    <span>{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
