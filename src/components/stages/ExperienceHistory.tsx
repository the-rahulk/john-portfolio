"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from "lucide-react";

const workExperience = [
  {
    company: "Deloitte",
    role: "Specialist Senior (Release Manager & Architect)",
    tenure: "Oct 2015 – Present",
    location: "Mumbai, India",
    bullets: [
      "Delivered 100+ production releases as Release Manager in 2025 across multi-cloud platforms.",
      "Led observability initiatives: Configured Datadog RUM/APM for production workloads with custom dashboards, monitors, and distributed tracing.",
      "Automated log collection, metric ingestion, and synthetic monitoring in Datadog, reducing MTTR by 40%.",
      "Administered Kubernetes clusters (installation, upgrades, scaling) with RBAC, network policies, and Helm chart deployments.",
      "Managed Docker container lifecycle: image builds, registry management, multi-stage deployments.",
      "Implemented zero-downtime Kubernetes rollouts and canary releases via CI/CD pipelines.",
      "Led 4 teams (15 members) covering Release Management, Observability, DevOps, and Security Audit.",
      "Developed PowerShell/Shell automation, reducing manual infrastructure tasks by 60%."
    ],
    tags: ["Kubernetes", "Docker", "Datadog APM", "Terraform", "Harness", "Azure DevOps", "Helm", "PowerShell"]
  },
  {
    company: "Atos India",
    role: "Senior Systems Engineer",
    tenure: "Dec 2014 – Oct 2015",
    location: "Mumbai, India",
    bullets: [
      "Led DevOps team implementing AWS/Azure VM automation and CI/CD pipelines.",
      "Application server expert: WAS, Tomcat, WebLogic, IIS, Apache administration.",
      "Collaborated across ITSM teams for production changes and major incident resolution."
    ],
    tags: ["AWS", "Azure", "VM Automation", "Tomcat", "WebLogic", "ITSM", "Apache"]
  },
  {
    company: "IGate (Capgemini)",
    role: "Senior Systems Engineer",
    tenure: "Oct 2010 – Dec 2014",
    location: "Mumbai, India",
    bullets: [
      "IBM WebSphere administration across AIX/RHEL for dev-to-prod deployments.",
      "Performance tuning, JVM optimization, and automated monitoring implementation.",
      "Deployed EAR/WAR applications, managed JVM settings and web container parameters."
    ],
    tags: ["IBM WebSphere", "AIX / RHEL Admin", "JVM Tuning", "Performance Optimization"]
  }
];

const educationList = [
  {
    degree: "MCA: Computer Applications",
    year: "Graduated 2010",
    school: "SIES College of Management Studies",
    location: "Mumbai, India"
  },
  {
    degree: "B.Sc: Computer Science",
    year: "Graduated 2006",
    school: "Birla College of Commerce Arts and Science",
    location: "Mumbai, India"
  }
];

const certifications = [
  "Microsoft Certified Azure Administrator (AZ-104)",
  "AWS Certified AI Practitioner (AIF-C01)",
  "SCRUM Foundation - Professional Certificate",
  "ITIL V3 Foundation",
  "CKAD (Kubernetes Administration Training)"
];

export default function ExperienceHistory() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <section id="experience" className="w-full min-h-screen py-24 bg-[#0d0d11] text-white flex items-center justify-center border-b border-[#27272c]">
      <div className="max-w-6xl w-full px-4 md:px-8">
        
        {/* Title Block */}
        <div className="mb-16 text-center lg:text-left">
          <div className="font-mono text-[12px] text-[#2997ff] font-bold uppercase mb-2 tracking-widest">
            08 / Pipeline History
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight apple-tight mb-4">
            Milestones & Environments
          </h2>
          <p className="text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            A comprehensive record of 15+ years managing production-grade releases, cloud environments, application servers, and academic qualifications.
          </p>
        </div>

        {/* Grid Contents */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline of Professional Experience */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2 text-gray-500 border-b border-[#27272c] pb-3">
              <Briefcase className="w-4 h-4 text-[#2997ff]" />
              <h3 className="font-mono text-[11px] font-bold tracking-widest uppercase text-gray-500">
                PROFESSIONAL EXPERIENCE
              </h3>
            </div>

            {workExperience.map((exp, idx) => (
              <motion.div 
                key={idx}
                className="bg-[#16161a] rounded-[18px] p-6 border border-[#27272c] flex flex-col hover:shadow-lg transition-all border-glow"
                variants={itemVariants}
              >
                {/* Card Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#27272c] pb-4 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {exp.role}
                    </h4>
                    <div className="text-sm font-semibold text-[#2997ff] mt-0.5">
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      {exp.tenure}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 text-[13px] text-gray-400 list-disc list-outside pl-4 leading-relaxed mb-5">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#27272c]">
                  {exp.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className="px-2.5 py-1.5 rounded-full text-[10px] font-mono font-medium bg-[#242429] border border-[#2d2d34] text-gray-300 hover:bg-[#0066cc] hover:border-[#0066cc] hover:text-white cursor-pointer select-none transition-all duration-200 active:scale-95"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Education & Certifications */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Education Block */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-500 border-b border-[#27272c] pb-3">
                <GraduationCap className="w-4 h-4 text-[#2997ff]" />
                <h3 className="font-mono text-[11px] font-bold tracking-widest uppercase text-gray-500">
                  EDUCATION
                </h3>
              </div>

              {educationList.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-[#16161a] rounded-[18px] p-5 border border-[#27272c] flex flex-col hover:shadow-lg transition-all border-glow"
                  variants={itemVariants}
                >
                  <h4 className="text-sm font-bold text-white">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-semibold text-[#2997ff] mt-0.5">
                    {edu.school}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono mt-3 pt-2 border-t border-[#27272c]">
                    <span>{edu.year}</span>
                    <span>{edu.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications Block */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-500 border-b border-[#27272c] pb-3">
                <Award className="w-4 h-4 text-[#2997ff]" />
                <h3 className="font-mono text-[11px] font-bold tracking-widest uppercase text-gray-500">
                  CERTIFICATIONS & TRAINING
                </h3>
              </div>

              <motion.div 
                className="bg-[#16161a] rounded-[18px] p-5 border border-[#27272c] hover:shadow-lg transition-all border-glow"
                variants={itemVariants}
              >
                <ul className="space-y-3 font-mono text-[11px] text-gray-300 leading-normal">
                  {certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#2997ff] font-bold">✓</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
