"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Server, Layout, Cloud, Database, BarChart3 } from "lucide-react";

const skillGroups = [
  {
    title: "STRATEGY & ARCHITECTURE",
    icon: Layout,
    skills: ["DevOps Strategy", "Platform Architecture", "Release Management", "Team Leadership", "Stakeholder Management", "Agile SCRUM", "ITIL Framework"]
  },
  {
    title: "CLOUD & CONTAINERS",
    icon: Cloud,
    skills: ["Azure AKS", "AWS EKS", "Docker Containers", "Kubernetes Admin", "Helm Charts"]
  },
  {
    title: "INFRASTRUCTURE AS CODE",
    icon: Code,
    skills: ["Terraform", "PowerShell Automation", "Shell Scripting", "AIX / RHEL Admin"]
  },
  {
    title: "CI/CD & AUTOMATION",
    icon: Server,
    skills: ["Azure DevOps", "Harness", "TeamCity", "Jenkins CI", "IBM Code-Deploy", "Git"]
  },
  {
    title: "OBSERVABILITY",
    icon: BarChart3,
    skills: ["Datadog RUM", "Datadog APM", "Distributed Tracing", "Synthetic Monitors", "Log Ingestion", "Custom Dashboards"]
  },
  {
    title: "APPLICATION SERVERS",
    icon: Database,
    skills: ["IBM WebSphere", "Tomcat Server", "Oracle WebLogic", "Microsoft IIS", "Apache HTTP"]
  }
];

export default function CodeUniverse() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 120 }
    }
  };

  const tagVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 150 }
    }
  };

  return (
    <section id="code" className="w-full min-h-screen py-24 bg-[#0d0d11] text-white flex items-center justify-center border-b border-[#27272c]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        {/* Title Block */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            01 / Code Stage
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            DevOps Strategy & Stack
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            Everything from enterprise release orchestration and multi-cloud platform topology to custom application server parameters and Datadog tracing.
          </p>
        </div>

        {/* Skill Clusters Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillGroups.map((group, groupIdx) => {
            const Icon = group.icon;
            return (
              <motion.div 
                key={groupIdx} 
                className="bg-[#16161a] rounded-[18px] p-6 border border-[#27272c] flex flex-col hover:shadow-lg transition-all border-glow"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 mb-4 border-b border-[#27272c] pb-3">
                  <Icon className="w-4 h-4 text-[#2997ff]" />
                  <h3 className="font-mono text-[11px] font-bold text-gray-500 tracking-widest uppercase">
                    {group.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2 flex-1 items-start content-start">
                  {group.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skillIdx}
                      className="px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition-all bg-[#242429] border border-[#2d2d34] text-gray-300 hover:bg-[#0066cc] hover:border-[#0066cc] hover:text-white cursor-pointer select-none active:scale-95 duration-200"
                      variants={tagVariants}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
