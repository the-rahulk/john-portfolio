"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Globe, Terminal, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export default function ContactCenter() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<LogLine[]>([
    { text: "Welcome to John's Mission Control Console.", type: "success" },
    { text: "Type 'help' to view available core platform commands.", type: "output" },
    { text: "Currently available for hire / DevOps Manager conversations.", type: "success" }
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const commandParser = (input: string) => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { text: `john@pipeline:~$ ${input}`, type: "input" as const }];

    switch (trimmed) {
      case "help":
        setHistory([
          ...newHistory,
          { text: "Available commands:", type: "output" },
          { text: "  about       - Describe John D'Souza's professional profile", type: "output" },
          { text: "  skills      - Show current cloud & observability stack", type: "output" },
          { text: "  resume      - Output raw JSON profile data structure", type: "output" },
          { text: "  metrics     - Telemetry statistics of the platform", type: "output" },
          { text: "  clear       - Clear terminal session history", type: "output" }
        ]);
        break;
      case "about":
        setHistory([
          ...newHistory,
          { text: "JOHN D'SOUZA - Specialist Senior (Release Manager & Architect)", type: "success" },
          { text: "Based in Mumbai, India. Azure AZ-104 & AWS AI Practitioner Certified.", type: "output" },
          { text: "15+ years experience leading cloud automation, release cycles, and APM tracing.", type: "output" },
          { text: "Managed 15+ members across 4 platform teams at Deloitte.", type: "output" },
          { text: "Education: MCA Computer Applications (SIES, 2010) & B.Sc Computer Science (Birla, 2006).", type: "output" }
        ]);
        break;
      case "skills":
        setHistory([
          ...newHistory,
          { text: "Strategy & Arch: DevOps Strategy, Release Management, Team Leadership", type: "output" },
          { text: "Containers     : Azure AKS, AWS EKS, Docker, Kubernetes, Helm Charts", type: "output" },
          { text: "IaC & Scripting: Terraform, PowerShell, Shell, AIX/RHEL admin", type: "output" },
          { text: "Observability  : Datadog RUM/APM, Monitors, Tracing, Log Ingestion", type: "output" },
          { text: "App Servers    : IBM WebSphere, Tomcat, WebLogic, IIS, Apache", type: "output" }
        ]);
        break;
      case "resume":
        setHistory([
          ...newHistory,
          { text: JSON.stringify({
            name: "John D'Souza",
            title: "DevOps Manager / Platform Architect",
            location: "Mumbai, India",
            experience: [
              {
                company: "Deloitte",
                role: "Specialist Senior",
                tenure: "Oct 2015 - Present",
                bullets: [
                  "Delivered 100+ production releases as Release Manager in 2025 across multi-cloud platforms",
                  "Configured Datadog RUM/APM for production workloads with dashboards, monitors, and tracing",
                  "Automated log collection & metrics in Datadog, reducing MTTR by 40%",
                  "Administered Kubernetes clusters with RBAC, network policies, and Helm chart deployments",
                  "Managed Docker container lifecycle & multi-stage deployments",
                  "Implemented zero-downtime Kubernetes rollouts & canary releases via CI/CD",
                  "Led 4 teams (15 members): Release Management, Observability, DevOps, Security Audit",
                  "Developed PowerShell/Shell automation, reducing manual tasks by 60%"
                ]
              },
              {
                company: "Atos India",
                role: "Senior Systems Engineer",
                tenure: "Dec 2014 - Oct 2015",
                bullets: [
                  "Led DevOps team implementing AWS/Azure VM automation and CI/CD pipelines",
                  "Application server expert: WAS, Tomcat, WebLogic, IIS, Apache administration",
                  "Collaborated across ITSM teams for production changes and incident resolution"
                ]
              },
              {
                company: "IGate (Capgemini)",
                role: "Senior Systems Engineer",
                tenure: "Oct 2010 - Dec 2014",
                bullets: [
                  "IBM WebSphere administration across AIX/RHEL for dev-to-prod deployments",
                  "Performance tuning, JVM optimization, automated monitoring implementation",
                  "Deployed EAR/WAR applications, managed JVM settings & web container parameters"
                ]
              }
            ],
            education: [
              {
                degree: "MCA: Computer Applications (2010)",
                institution: "SIES College of Management Studies - Mumbai"
              },
              {
                degree: "B.Sc: Computer Science (2006)",
                institution: "Birla College of Commerce Arts and Science - Mumbai"
              }
            ],
            credentials: [
              "Microsoft Certified Azure Administrator (AZ-104)",
              "AWS Certified AI Practitioner (AIF-C01)",
              "SCRUM Foundation - Professional Certificate",
              "ITIL V3 Foundation"
            ],
            metrics: {
              releasesIn2025: "100+",
              mttrReduction: "40%",
              infrastructureAutomationTaskReduction: "60%"
            }
          }, null, 2), type: "output" }
        ]);
        break;
      case "metrics":
        setHistory([
          ...newHistory,
          { text: "Target Service Level Agreement (SLA): 99.98% [PASSING]", type: "success" },
          { text: "Average MTTR reduction: 40% (via Datadog)", type: "output" },
          { text: "Delivered 100+ production releases in 2025 with zero unplanned rollbacks.", type: "success" }
        ]);
        break;
      case "clear":
        setHistory([]);
        break;
      default:
        setHistory([
          ...newHistory,
          { text: `Command not recognized: '${trimmed}'. Type 'help' for options.`, type: "error" }
        ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commandParser(command);
    setCommand("");
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section id="contact" className="w-full min-h-screen pt-24 pb-12 bg-black text-white flex flex-col justify-between border-b border-[#272729]">
      <div className="max-w-6xl w-full mx-auto px-4 md:px-8 flex-1 flex flex-col justify-center">
        {/* Title */}
        <div className="mb-12 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            08 / Contact Center
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Mission Control Center
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Establish direct connectivity with John's cloud stack. Trigger communication tunnels or query details.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="mailto:jonermezildo@gmail.com"
            className="apple-press px-6 py-3.5 rounded-full border border-[#0066cc]/40 bg-[#0066cc]/5 hover:bg-[#0066cc] text-[#2997ff] hover:text-white transition-all text-sm font-semibold flex items-center gap-2 cursor-pointer border-glow"
          >
            <Mail className="w-4 h-4" />
            <span>jonermezildo@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/john-dsouza"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-press px-6 py-3.5 rounded-full border border-[#0066cc]/40 bg-[#0066cc]/5 hover:bg-[#0066cc] text-[#2997ff] hover:text-white transition-all text-sm font-semibold flex items-center gap-2 cursor-pointer border-glow"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/john-dsouza"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-press px-6 py-3.5 rounded-full border border-[#0066cc]/40 bg-[#0066cc]/5 hover:bg-[#0066cc] text-[#2997ff] hover:text-white transition-all text-sm font-semibold flex items-center gap-2 cursor-pointer border-glow"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://github.com/jonermezildo"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-press px-6 py-3.5 rounded-full border border-[#0066cc]/40 bg-[#0066cc]/5 hover:bg-[#0066cc] text-[#2997ff] hover:text-white transition-all text-sm font-semibold flex items-center gap-2 cursor-pointer border-glow"
          >
            <Globe className="w-4 h-4" />
            <span>Portfolio Code</span>
          </a>
        </div>

        {/* Command Terminal Console */}
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0f] border border-[#272729] rounded-lg p-5 flex flex-col h-[380px] shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#272729] mb-4 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span className="ml-2 font-bold uppercase tracking-wider text-[#2997ff]">Command Center Terminal</span>
            </div>
            <span>SSH-Session: Secure</span>
          </div>

          {/* Console lines stream */}
          <div 
            ref={logContainerRef} 
            className="flex-1 overflow-y-auto font-mono text-[12px] space-y-1.5 pr-2 mb-4 scrollbar-none"
          >
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={`flex items-start whitespace-pre-wrap ${
                  line.type === "input" ? "text-gray-400" :
                  line.type === "success" ? "text-emerald-400 font-semibold" :
                  line.type === "error" ? "text-red-400 font-bold" : "text-[#E8E6FF]"
                }`}
              >
                <span className="text-gray-600 mr-2">{">"}</span>
                <span>{line.text}</span>
              </div>
            ))}
          </div>

          {/* Console input command line */}
          <form onSubmit={handleSubmit} className="flex items-center border-t border-[#272729] pt-3">
            <span className="text-gray-500 font-mono text-[12px] mr-2 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#2997ff]" />
              <span>john@pipeline:~$</span>
            </span>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type command (e.g. help, about)..."
              className="flex-1 bg-transparent text-[#E8E6FF] font-mono text-[12px] outline-none border-none"
            />
            <button type="submit" className="p-1 hover:text-[#2997ff] transition-colors cursor-pointer">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Currently available for conversations.</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-24 border-t border-[#272729] pt-8 text-center text-gray-500 font-mono text-[11px] space-y-1 select-none">
        <div>Built by John D'Souza · 2026</div>
        <div>jonermezildo@gmail.com</div>
      </footer>
    </section>
  );
}
