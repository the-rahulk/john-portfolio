"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Check, Cpu, HardDrive, ShieldAlert } from "lucide-react";

export default function BuildFactory() {
  const [buildStatus, setBuildStatus] = useState<"idle" | "running" | "completed">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const buildSteps = [
    { log: "[INFO] Scanning directory /src/release-management for build configuration...", delay: 200 },
    { log: "[INFO] Parsing TeamCity configurations (Harness / Azure DevOps bindings)...", delay: 400 },
    { log: "[INFO] Resolving multi-cloud workspace charts (AKS/EKS targets)...", delay: 200 },
    { log: "[INFO] Compiling infrastructure assets and manifests...", delay: 800 },
    { log: "[INFO] Linting Helm charts and Terraform config maps... [0 warnings]", delay: 400 },
    { log: "[INFO] Running static container vulnerability scanner (Trivy)...", delay: 500 },
    { log: "[INFO] Packaging target/john-release-1.28.tgz charts...", delay: 600 },
    { log: "[INFO] Helm archive built successfully. Size: 1.2 MB", delay: 200 },
    { log: "[INFO] Generating Docker container: docker build -t john/deloitte-prod:2026.1 .", delay: 400 },
    { log: "Sending build context to Docker daemon  142.5MB", delay: 200 },
    { log: "Step 1/5 : FROM redhat/ubi8-minimal -> Cache resolved", delay: 300 },
    { log: "Step 2/5 : COPY target/*.tgz chart.tgz -> Added layer [12ms]", delay: 200 },
    { log: "Step 3/5 : EXPOSE 8443 -> SSL Port exposed", delay: 200 },
    { log: "Step 4/5 : ENTRYPOINT [\"helm\", \"install\"] -> Layer cached", delay: 200 },
    { log: "Step 5/5 : HEALTHCHECK --interval=15s CMD kubelet check", delay: 300 },
    { log: "Successfully built container image: sha256:d82c1b2c3a51fef07", delay: 100 },
    { log: "[INFO] Authenticating Azure Container Registry (ACR) central-india...", delay: 500 },
    { log: "[INFO] Pushing image to ACR repo: john-devops-prod...", delay: 700 },
    { log: "[SUCCESS] Image pushed. Tag: john-deloitte-prod:2026.1 [168 MB]", delay: 100 }
  ];

  const triggerBuild = () => {
    if (buildStatus === "running") return;
    setBuildStatus("running");
    setLogs([]);
    setProgress(0);
  };

  useEffect(() => {
    if (buildStatus !== "running") return;

    let stepIndex = 0;
    let timerId1: any = null;
    let timerId2: any = null;

    const runNextStep = () => {
      if (stepIndex < buildSteps.length) {
        const currentStep = buildSteps[stepIndex];
        setLogs((prev) => [...prev, currentStep.log]);
        setProgress(Math.round(((stepIndex + 1) / buildSteps.length) * 100));
        stepIndex++;
        
        timerId1 = setTimeout(runNextStep, currentStep.delay);
      } else {
        setBuildStatus("completed");
      }
    };

    timerId2 = setTimeout(runNextStep, 200);

    return () => {
      if (timerId1) clearTimeout(timerId1);
      if (timerId2) clearTimeout(timerId2);
    };
  }, [buildStatus]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <section id="build" className="w-full min-h-screen py-24 bg-[#272729] text-white flex items-center justify-center border-b border-[#252527]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Header */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            02 / Build Stage
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Build Factory
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Simulate the compilation process that takes raw code commits and builds containerized microservices ready for the cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controller Panel */}
          <div className="lg:col-span-4 bg-[#2a2a2c] border border-[#252527] rounded-lg p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-5 h-5 text-[#2997ff]" />
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-gray-400">
                  Build Controls
                </h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg bg-[#272729] border border-[#252527]">
                  <div className="text-[11px] font-mono text-gray-500 mb-1">CI ENGINE / ENVIRONMENT</div>
                  <div className="text-sm font-semibold">TeamCity & Jenkins (RHEL)</div>
                </div>
                <div className="p-4 rounded-lg bg-[#272729] border border-[#252527]">
                  <div className="text-[11px] font-mono text-gray-500 mb-1">TARGET REGISTRY</div>
                  <div className="text-sm font-semibold font-mono">Azure ACR & AWS ECR</div>
                </div>
              </div>
            </div>

            <div>
              {buildStatus === "completed" && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 flex gap-3 items-start">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold font-mono">BUILD SUCCESSFUL</div>
                    <div className="text-[11px] text-gray-400 mt-1">Docker image published to Azure ACR registry.</div>
                  </div>
                </div>
              )}

              {buildStatus === "running" && (
                <div className="mb-6">
                  <div className="flex justify-between font-mono text-xs text-gray-400 mb-2">
                    <span>Compiling Artifacts...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#252527] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0066cc] transition-all duration-200" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                onClick={triggerBuild}
                disabled={buildStatus === "running"}
                className={`w-fit mx-auto md:w-full py-3 px-8 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  buildStatus === "running"
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-[#0066cc] hover:bg-[#0071e3] text-white shadow-lg shadow-blue-500/10 active:scale-95"
                }`}
              >
                <Play className="w-4 h-4" />
                <span>{buildStatus === "running" ? "Building..." : "Trigger Compile Pipeline"}</span>
              </button>
            </div>
          </div>

          {/* Console / Log Terminal */}
          <div className="lg:col-span-8 bg-black border border-[#252527] rounded-lg p-5 flex flex-col min-h-[350px] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#272729] mb-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50"></span>
                <span className="ml-2">console-logs.txt</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 font-mono">
                <HardDrive className="w-3.5 h-3.5" />
                <span>ECR_PUSH_DAEMON</span>
              </div>
            </div>

            <div 
              ref={logContainerRef}
              className="flex-1 overflow-y-auto font-mono text-[12px] text-gray-300 space-y-1.5 pr-2"
            >
              {logs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 font-mono italic">
                  Pipeline Idle. Click "Trigger Compile Pipeline" to start.
                </div>
              ) : (
                logs.map((log, index) => {
                  if (!log) return null;
                  const isSuccess = log.startsWith("[SUCCESS]");
                  return (
                    <div key={index} className="flex items-start">
                      <span className="text-gray-600 mr-2">{">"}</span>
                      <span className={isSuccess ? "text-emerald-400 font-semibold" : "text-gray-300"}>
                        {log}
                      </span>
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
