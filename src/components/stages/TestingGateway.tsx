"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Play, Flame, Award, Percent } from "lucide-react";

export default function TestingGateway() {
  const [testingStatus, setTestingStatus] = useState<"idle" | "running" | "completed">("idle");
  const [activeSuite, setActiveSuite] = useState("");
  const [passCount, setPassCount] = useState(0);
  const [coverage, setCoverage] = useState(0);
  const [failedSuites, setFailedSuites] = useState(0);
  const [runLogs, setRunLogs] = useState<string[]>([]);

  const testSuites = [
    { name: "DatadogAPIMonitorTest", cases: 45, cov: 93 },
    { name: "KubernetesRBACPolicyTest", cases: 62, cov: 91 },
    { name: "VMOptimizationTest", cases: 38, cov: 89 },
    { name: "JvmMemoryTuningTest", cases: 52, cov: 94 },
    { name: "CanaryReleaseRoutingTest", cases: 78, cov: 95 },
    { name: "HelmChartComplianceTest", cases: 40, cov: 90 },
    { name: "NetworkSecurityPolicyTest", cases: 85, cov: 92 },
    { name: "IncidentITSMResponseTest", cases: 80, cov: 92 }
  ];

  const triggerTests = () => {
    if (testingStatus === "running") return;
    setTestingStatus("running");
    setPassCount(0);
    setCoverage(0);
    setRunLogs([]);
    setFailedSuites(0);
  };

  useEffect(() => {
    if (testingStatus !== "running") return;

    let index = 0;
    let accumulatedPasses = 0;
    let accumulatedCoverage = 0;
    let timerId1: any = null;
    let timerId2: any = null;

    const runSuite = () => {
      if (index < testSuites.length) {
        const suite = testSuites[index];
        setActiveSuite(suite.name);
        
        // Add log lines
        setRunLogs((prev) => [
          ...prev, 
          `[TEST] Running com.deloitte.devops.${suite.name}...`,
          `  -> Executing ${suite.cases} test cases...`
        ]);

        timerId1 = setTimeout(() => {
          accumulatedPasses += suite.cases;
          accumulatedCoverage += suite.cov;
          
          setPassCount(accumulatedPasses);
          setCoverage(Math.round(accumulatedCoverage / (index + 1)));
          setRunLogs((prev) => [
            ...prev,
            `  [OK] com.deloitte.devops.${suite.name} passed completely. [Coverage: ${suite.cov}%]`
          ]);
          index++;
          timerId2 = setTimeout(runSuite, 350);
        }, 300);
      } else {
        setTestingStatus("completed");
        setActiveSuite("");
        setCoverage(92); // Lock actual metric for John
      }
    };

    runSuite();

    return () => {
      if (timerId1) clearTimeout(timerId1);
      if (timerId2) clearTimeout(timerId2);
    };
  }, [testingStatus]);

  return (
    <section id="test" className="w-full min-h-screen py-24 bg-white text-[#1d1d1f] flex items-center justify-center border-b border-[#e0e0e0]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#0066cc] font-bold uppercase mb-2 tracking-widest">
            03 / Testing Gateway
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Testing Gateway
          </h2>
          <p className="text-lg text-gray-500 font-sans max-w-2xl leading-relaxed">
            Validate every code commit and chart values with fully automated Unit & Integration test suites. Target coverage: 92%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Logs Terminal */}
          <div className="lg:col-span-7 bg-[#f5f5f7] border border-[#e0e0e0] rounded-lg p-5 flex flex-col min-h-[350px] shadow-sm relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e0e0] mb-4 text-xs font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
                <span className="ml-2 font-semibold">teamcity-test-report</span>
              </div>
              {activeSuite && (
                <div className="text-[10px] bg-[#0066cc]/10 text-[#0066cc] px-2 py-0.5 rounded-full font-mono animate-pulse">
                  RUNNING: {activeSuite}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto font-mono text-[12px] text-gray-600 space-y-1.5 scrollbar-none max-h-[300px]">
              {runLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 italic">
                  Gateway Idle. Ready to audit package sanity.
                </div>
              ) : (
                runLogs.map((log, idx) => {
                  if (!log) return null;
                  const isOk = log.includes("[OK]");
                  return (
                    <div key={idx} className={`flex items-start ${isOk ? "text-emerald-600 font-semibold" : ""}`}>
                      <span className="text-gray-400 mr-2">{isOk ? "✓" : "❯"}</span>
                      <span>{log}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="lg:col-span-5 bg-white border border-[#e0e0e0] rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-all border-glow">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#f0f0f0] mb-6">
                <span className="font-mono text-[12px] font-bold text-gray-500 uppercase tracking-wider">Test Report</span>
                <Award className="w-5 h-5 text-[#0066cc]" />
              </div>

              {/* Counts */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-[#f5f5f7]">
                  <div className="text-[10px] font-mono text-gray-500 mb-1">TOTAL PASSED</div>
                  <div className="text-3xl font-mono font-bold text-[#1d1d1f] tracking-tight">
                    {passCount} <span className="text-xs text-gray-400">/ 480</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#f5f5f7]">
                  <div className="text-[10px] font-mono text-gray-500 mb-1">CODE COVERAGE</div>
                  <div className="text-3xl font-mono font-bold text-[#ff7a4c] tracking-tight flex items-center">
                    <span>{coverage}%</span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-gray-500 font-sans">
                  <span>Coverage threshold check (Target: 85%+)</span>
                  <span className="font-mono font-semibold">{coverage}%</span>
                </div>
                <div className="w-full h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#ff7a4c] transition-all duration-300"
                    style={{ width: `${coverage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <button
              onClick={triggerTests}
              disabled={testingStatus === "running"}
              className={`w-full py-3 px-6 rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
                testingStatus === "running"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#0066cc] hover:bg-[#0071e3] text-white shadow-md active:scale-95"
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{testingStatus === "running" ? "Running Audits..." : "Run Test Suites"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
