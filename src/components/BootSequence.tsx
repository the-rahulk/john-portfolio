"use client";

import React, { useState, useEffect } from "react";
import { Cloud, Check } from "lucide-react";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const rawLogs = [
    "john@portfolio:~$ ./initialize_pipeline.sh",
    "Initializing DevOps Universe v2026.06...",
    "Connecting to cloud provider AWS... Connected [us-east-1]",
    "Provisioning Virtual Private Cloud (VPC)... 10.0.0.0/16 [SUCCESS]",
    "Starting EKS Cluster control plane... kubernetes.api.john.me",
    "Setting up namespace: career-production... [CREATED]",
    "Mounting distributed file storage... EFS [OK]",
    "Pulling base images... (Alpine-linux-3.19, Node 20-slim)... Done",
    "Verifying security scan database... ClamAV [UPDATED]",
    "Bootstrapping GitOps controllers... ArgoCD [ONLINE]",
    "Starting telemetry engines... OpenTelemetry + LogRocket [ACTIVE]",
    "System check: 0 vulnerabilities, SLA 99.98%, Core temp: 38°C",
    "Ready for pilot authorization. Pipeline Core initialized."
  ];

  useEffect(() => {
    if (currentLine < rawLogs.length) {
      const delay = currentLine === 0 ? 500 : Math.random() * 200 + 80;
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, rawLogs[currentLine]]);
        setCurrentLine((prev) => prev + 1);
        setLoadingPercent(Math.round(((currentLine + 1) / rawLogs.length) * 100));
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsDone(true);
    }
  }, [currentLine]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-4 font-mono select-none">
      <div className="w-full max-w-3xl h-[450px] bg-[#0A0A0F] border border-[#272729] rounded-lg p-6 flex flex-col shadow-2xl relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#272729] mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cloud className="w-3 h-3 text-[#2997ff]" />
            <span>AWS-EKS-PILOT-TERMINAL</span>
          </div>
          <span>v1.0.0</span>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto text-[13px] text-gray-300 space-y-1.5 scrollbar-none font-mono">
          {logs.map((log, index) => {
            const isCommand = log.startsWith("john@");
            const isSuccess = log.includes("[SUCCESS]") || log.includes("[OK]") || log.includes("[CREATED]") || log.includes("[ACTIVE]") || log.includes("[ONLINE]");
            return (
              <div key={index} className="flex items-start">
                <span className="text-gray-600 mr-2">{">"}</span>
                <span className={
                  isCommand ? "text-[#2997ff]" :
                  isSuccess ? "text-emerald-400 font-semibold" :
                  index === rawLogs.length - 1 ? "text-amber-400 font-bold" : "text-gray-300"
                }>
                  {log}
                </span>
              </div>
            );
          })}
          {!isDone && (
            <div className="flex items-center gap-1 text-[13px] text-[#2997ff]">
              <span className="text-gray-600 mr-2">{">"}</span>
              <span>Loading platform... {loadingPercent}%</span>
              <span className="inline-block w-1.5 h-4 bg-[#2997ff] animate-cursor-blink"></span>
            </div>
          )}
        </div>

        {/* Initialize Button */}
        {isDone && (
          <div className="mt-4 pt-4 border-t border-[#272729] flex justify-center">
            <button
              onClick={onComplete}
              className="apple-press bg-[#0066cc] hover:bg-[#0071e3] text-white font-sans text-sm font-semibold py-3 px-8 rounded-full flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
            >
              <span>Authorize Pipeline Entry</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 text-[10px] text-gray-600 font-mono tracking-wider">
        SECURE CONNECTED LAYER · CLOUD ACCESS GRANTED
      </div>
    </div>
  );
}
