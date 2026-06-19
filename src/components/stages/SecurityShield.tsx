"use client";

import React, { useState, useEffect } from "react";
import { Shield, ShieldAlert, ShieldCheck, RefreshCw, Eye } from "lucide-react";

export default function SecurityShield() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<"idle" | "clean" | "warning">("idle");
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [auditProgress, setAuditProgress] = useState(0);

  const securityLogs = [
    "Starting static code analysis (SAST)...",
    "Auditing project files for credentials leaking... [OK]",
    "Analyzing dependencies against CVE dictionary... [OK]",
    "Checking container layers base image: redhat/ubi8-minimal...",
    "Container signature matched with base publisher.",
    "Verifying Kubernetes RBAC configs: RoleBindings & ServiceAccounts... [SECURE]",
    "Verifying TLS handshake profile: TLS 1.3... [SECURE]",
    "Checking network policies for pod-to-pod restrictions... [OK]",
    "Mocking SQL Injection vector at /api/v1/checkout... Blocked by WAF.",
    "Mocking Cross-Site Scripting (XSS) at /login... Blocked by WAF.",
    "Scanning completed. Threat score: 0/100 [CLEAN]."
  ];

  const triggerScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanResult("idle");
    setAuditProgress(0);
    setScanLogs([]);
  };

  useEffect(() => {
    if (!scanning) return;

    let index = 0;
    let timerId: any = null;

    const runAudit = () => {
      if (index < securityLogs.length) {
        setScanLogs((prev) => [...prev, securityLogs[index]]);
        setAuditProgress(Math.round(((index + 1) / securityLogs.length) * 100));
        index++;
        timerId = setTimeout(runAudit, 400);
      } else {
        setScanning(false);
        setScanResult("clean");
      }
    };

    runAudit();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [scanning]);

  return (
    <section id="security" className="w-full min-h-screen py-24 bg-[#2a2a2c] text-white flex items-center justify-center border-b border-[#252527]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            04 / DevSecOps Shield
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Security Shield
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Continuously evaluate container configurations, Kubernetes RBAC policy matrices, and verify security protocols (WAF/CDN) before delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Audit Controls */}
          <div className="lg:col-span-5 bg-[#272729] border border-[#252527] rounded-lg p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-[#2a2a2c] pb-4">
                <Shield className="w-5 h-5 text-[#2997ff]" />
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-gray-400">
                  Security Controls
                </h3>
              </div>

              {/* Status Report */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 rounded-lg bg-[#2a2a2c] border border-[#252527]">
                  <span className="text-[12px] text-gray-400 font-mono">SAST AUDIT STATUS</span>
                  {scanResult === "clean" ? (
                    <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-bold">
                      CLEAN
                    </span>
                  ) : scanning ? (
                    <span className="text-[11px] bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full font-bold animate-pulse">
                      SCANNING
                    </span>
                  ) : (
                    <span className="text-[11px] bg-gray-500/10 text-gray-400 px-3 py-1 rounded-full font-bold">
                      INACTIVE
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 bg-[#2a2a2c] border border-[#252527] rounded-lg">
                    <div className="text-[10px] text-red-500 font-bold mb-1">CRITICAL</div>
                    <div className="font-mono text-lg font-bold">0</div>
                  </div>
                  <div className="p-3 bg-[#2a2a2c] border border-[#252527] rounded-lg">
                    <div className="text-[10px] text-amber-500 font-bold mb-1">HIGH</div>
                    <div className="font-mono text-lg font-bold">0</div>
                  </div>
                  <div className="p-3 bg-[#2a2a2c] border border-[#252527] rounded-lg">
                    <div className="text-[10px] text-gray-500 font-bold mb-1">MEDIUM</div>
                    <div className="font-mono text-lg font-bold">0</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {scanning && (
                <div className="mb-4">
                  <div className="w-full h-1 bg-[#252527] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0066cc] transition-all duration-300" 
                      style={{ width: `${auditProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                onClick={triggerScan}
                disabled={scanning}
                className={`w-full py-3 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  scanning
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-[#0066cc] hover:bg-[#0071e3] text-white active:scale-95 shadow-lg shadow-blue-500/10"
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
                <span>{scanning ? "Auditing Firewall..." : "Run Security Scan"}</span>
              </button>
            </div>
          </div>

          {/* Scanner Output Console */}
          <div className="lg:col-span-7 bg-black border border-[#252527] rounded-lg p-5 flex flex-col min-h-[350px] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#272729] mb-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
                <span className="ml-2">secops-analyzer.log</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AKAMAI_WAF_DAEMON</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[12px] text-gray-300 space-y-1.5 scrollbar-none max-h-[300px]">
              {scanLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 italic font-mono">
                  Console idle. Press "Run Security Scan" to test deployment compliance.
                </div>
              ) : (
                scanLogs.map((log, idx) => {
                  if (!log) return null;
                  const isOk = log.includes("[OK]") || log.includes("[SECURE]") || log.includes("[CLEAN]");
                  const isBlocked = log.includes("Blocked");
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start ${
                        isOk ? "text-emerald-400 font-semibold" : 
                        isBlocked ? "text-red-400 font-bold" : "text-gray-300"
                      }`}
                    >
                      <span className="text-gray-600 mr-2">{"#"}</span>
                      <span>{log}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
