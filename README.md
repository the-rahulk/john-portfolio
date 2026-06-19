# DevOps Pipeline Portfolio — John D'Souza
### DevOps Manager & Platform Architect

An immersive, interactive 3D portfolio website designed to showcase a career not as a static resume, but as a live, production-grade DevOps CI/CD pipeline. Visitors travel through the stages of code verification, security audits, deployments, observability control rooms, and auto-scaling events.

Live experience at: `http://localhost:3000` (Local Dev)

---

## 🚀 Core Concept & Experience Flow

Instead of reading a traditional list, visitors navigate a scrollable pipeline representing the stages of modern infrastructure lifecycle:

1. **Boot Sequence**: Simulates EKS cluster checkups, Alpine Linux image pulls, and GitOps bootstrap controls in a retro-modern CLI terminal.
2. **Infrastructure Core**: A **3D interactive Kubernetes Cluster** (WebGL via Three.js/React Three Fiber) rendering Deloitte, Atos, and Capgemini milestones as worker nodes, with an inspector card detailing key deliverables.
3. **Code Stage**: John's DevOps skills categorized (Strategy, Containers, IaC, CI/CD, Observability, App Servers) as interactive Apple-inspired pills.
4. **Build Stage**: A compiler simulation demonstrating linter output, Docker container building, and Azure ACR uploads.
5. **Testing Gateway**: Test execution dashboard simulating 480 test cases running in a Jenkins/TeamCity pipeline, hitting 92% coverage.
6. **DevSecOps Shield**: SAST security auditing verifying Kubernetes RBAC, dependency CVE dictionaries, network policies, and blocking SQLi/XSS threads.
7. **Deployment Platform**: Interactive Blue-Green deployment control showing canary routing across AKS cluster environments.
8. **Observability Control**: Real-time telemetry dashboard detailing system latency (40% MTTR reduction) alongside custom log filters and tracer outputs.
9. **Auto Scaling Galaxy**: Interactive simulation where spikes in traffic trigger container pods to scale out horizontally (HPA) in real-time.
10. **Milestones**: A dedicated, clean vertical timeline presenting John's 15+ years career timeline, education credentials (MCA, B.Sc Computer Science), and certifications.
11. **Mission Control Center**: An interactive query console terminal where visitors can execute command prompts (`help`, `about`, `skills`, `resume`, `metrics`) to pull JSON data or connect directly.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
* **Styling**: Tailwind CSS v4 (Sleek Apple design chassis: Inter, Space Mono, Action Blue `#0066cc`, no decorative gradients, 18px card borders)
* **3D Graphics**: Three.js + React Three Fiber (R3F) + React Three Drei
* **Smooth Scrolling**: Lenis Scroll Engine
* **Animations**: Framer Motion (Scroll-triggered stages, orchestrations, and interactive micro-actions)
* **Branding & Icons**: Custom brand SVGs + Lucide React Icons

---

## 💻 Local Setup & Development

Ensure you have [Node.js](https://nodejs.org) (v18.x or higher) installed.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/the-rahulk/john-portfolio.git
cd john-portfolio
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the active pipeline.

### 3. Build for Production
To test production optimization, prerender routes, and run strict TypeScript checks:
```bash
npm run build
npm run start
```

---

## 📋 Folder Directory Highlights

* `/src/app/` — Global styling theme overrides (`globals.css`) and layout mounts (`layout.tsx`, `page.tsx`).
* `/src/components/` — Chrome frames (`GlobalNav.tsx`, `SubNav.tsx`) and the boot console terminal (`BootSequence.tsx`).
* `/src/components/stages/` — The 10 individual stage components (e.g. `CodeUniverse.tsx`, `ExperienceHistory.tsx`, `ObservabilityControl.tsx`, etc.).
* `/src/components/icons/` — High-fidelity SVG vectors representing GitHub, LinkedIn, and DevOps brands.
