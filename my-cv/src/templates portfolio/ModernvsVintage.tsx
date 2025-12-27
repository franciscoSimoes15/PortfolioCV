import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Code, 
  Database, 
  Server, 
  Terminal, 
  Globe, 
  ExternalLink, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

// --- DATA ---
const PROJECTS = [
  {
    id: '01',
    title: 'TaskFlow System',
    type: 'Frontend Architecture',
    desc: 'A high-performance Kanban interface focusing on optimistic UI updates and local-first state synchronization.',
    stack: ['React 18', 'Zustand', 'dnd-kit'],
    status: 'Operational',
    year: '2024'
  },
  {
    id: '02',
    title: 'GoAuth Gateway',
    type: 'Backend Infrastructure',
    desc: 'Distributed identity management microservice. Features automatic JWT rotation and role-based access control.',
    stack: ['Golang', 'gRPC', 'Redis'],
    status: 'Deployed',
    year: '2023'
  },
  {
    id: '03',
    title: 'Deploy CLI',
    type: 'DevOps Tooling',
    desc: 'Command-line utility for scaffolding standardized microservice templates with built-in CI/CD configurations.',
    stack: ['Go', 'Cobra', 'Viper'],
    status: 'Beta',
    year: '2023'
  }
];

const SPECS = [
  { label: 'Frontend Core', val: 'React, Next.js, Tailwind', icon: LayoutIcon },
  { label: 'Backend Runtime', val: 'Golang (1.21+)', icon: TerminalIcon },
  { label: 'Data Persistence', val: 'PostgreSQL, Redis', icon: DatabaseIcon },
  { label: 'Containerization', val: 'Docker, Kubernetes', icon: BoxIcon },
];

// --- ICONS ---
function LayoutIcon(props) { return <LayoutIconSvg {...props} /> }
function TerminalIcon(props) { return <Terminal {...props} /> }
function DatabaseIcon(props) { return <Database {...props} /> }
function BoxIcon(props) { return <Server {...props} /> }

const LayoutIconSvg = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <line x1="3" x2="21" y1="9" y2="9" />
    <line x1="9" x2="9" y1="21" y2="9" />
  </svg>
);

// --- COMPONENTS ---

const SectionHeader = ({ title, num }) => (
  <div className="flex items-end gap-4 border-b-2 border-slate-700 pb-2 mb-8 mt-12">
    <span className="text-4xl font-black text-slate-800 leading-none tracking-tighter">
      {title}
    </span>
    <span className="font-mono text-sm text-slate-400 mb-1">
      // REF-{num}
    </span>
  </div>
);

const SpecRow = ({ label, val, icon: Icon }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-300 group hover:bg-sky-50 transition-colors px-2 -mx-2">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-slate-200 text-slate-600 rounded group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
      <span className="font-bold text-slate-700">{label}</span>
    </div>
    <span className="font-mono text-sm text-slate-500 text-right">{val}</span>
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="group relative border-2 border-slate-700 bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] transition-all duration-200">
    {/* Technical Header */}
    <div className="bg-slate-800 text-slate-100 px-4 py-2 flex justify-between items-center font-mono text-xs">
      <span>FIG.{project.id}</span>
      <span>{project.year}</span>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">{project.type}</div>
          <h3 className="text-2xl font-bold text-slate-900 leading-tight">{project.title}</h3>
        </div>
        <div className="p-2 border border-slate-300 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors">
          <ArrowRight size={20} />
        </div>
      </div>
      
      <p className="text-slate-600 leading-relaxed mb-6">
        {project.desc}
      </p>
      
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
        {project.stack.map(tech => (
          <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide border border-slate-200">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- MAIN LAYOUT ---

export default function ModernVintagePortfolio() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 bg-[#f1f5f9]/90 backdrop-blur-md border-b-2 border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black text-lg border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]">
              A
            </div>
            <div className="font-bold text-xl tracking-tight text-slate-800">
              ALEX<span className="text-slate-400">.DEV</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8 font-mono text-sm font-bold text-slate-600">
            <a href="#work" className="hover:text-blue-600 transition-colors">./WORK</a>
            <a href="#specs" className="hover:text-blue-600 transition-colors">./SPECS</a>
            <a href="#bio" className="hover:text-blue-600 transition-colors">./ABOUT</a>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-50 font-bold text-xs uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-[4px_4px_0px_0px_rgba(148,163,184,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(148,163,184,1)]">
            Contact
            <Mail size={14} />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* 2. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 border-b-2 border-slate-300 pb-24 border-dashed">
          <div className="lg:col-span-8">
            <div className="inline-block px-3 py-1 border border-slate-800 text-xs font-mono font-bold text-slate-500 mb-6 bg-white">
              STATUS: OPEN TO WORK
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 leading-[0.95] mb-8 tracking-tighter">
              ENGINEERING <br/>
              <span className="text-slate-400">THE FUTURE</span> <br/>
              OF WEB.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
              I am a Junior Full Stack Engineer bridging the gap between <strong className="text-slate-900">Golang performance</strong> and <strong className="text-slate-900">React interactivity</strong>.
              Building digital products with architectural precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-[6px_6px_0px_0px_rgba(30,41,59,1)]">
                View Projects
              </button>
              <button className="px-8 py-4 border-2 border-slate-800 font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Github size={18} /> GitHub
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="aspect-square bg-slate-200 border-2 border-slate-800 relative overflow-hidden">
               {/* Decorative Abstract "Blueprint" Lines */}
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#334155_1px,transparent_1px)] bg-[size:10px_10px]"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-2 border-slate-700 rounded-full flex items-center justify-center">
                 <div className="w-2/3 h-2/3 border-2 border-dashed border-slate-500 rounded-full animate-spin-slow"></div>
               </div>
               <div className="absolute bottom-4 right-4 bg-white border border-slate-800 p-2 font-mono text-[10px] text-slate-600">
                 <div>FIG 1.1</div>
                 <div>SYSTEM_CORE</div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. WORK SECTION */}
        <section id="work">
          <SectionHeader title="PROJECT SCHEMATICS" num="01" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        {/* 4. SPECS SECTION */}
        <section id="specs" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-24">
          <div className="lg:col-span-5">
            <SectionHeader title="TECHNICAL SPECS" num="02" />
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              My toolkit is selected for reliability and scale. I prefer strongly typed languages and component-driven architectures.
            </p>
            <div className="p-6 bg-slate-800 text-slate-300 font-mono text-xs leading-loose relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-slate-500 font-bold">LOG_DUMP</div>
              <p>{'>'} Initializing Stack...</p>
              <p>{'>'} React Module: <span className="text-emerald-400">ACTIVE</span></p>
              <p>{'>'} Golang Runtime: <span className="text-emerald-400">ACTIVE</span></p>
              <p>{'>'} Docker Engine: <span className="text-amber-400">STANDBY</span></p>
              <p className="animate-pulse">{'>'} Awaiting input_</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 pt-8 lg:pt-24">
            <div className="border-t-2 border-slate-800">
              {SPECS.map((s, i) => (
                <SpecRow key={i} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT / FOOTER */}
        <section id="bio" className="mt-32 border-t-2 border-slate-800 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">ENGINEER'S NOTE</h2>
              <p className="text-slate-600 mb-6 max-w-md">
                "I believe the best code is the code you don't have to write. Simplicity, readability, and performance are the pillars of my engineering philosophy."
              </p>
              <img 
                src="https://api.dicebear.com/7.x/initials/svg?seed=AD&backgroundColor=0284c7" 
                alt="Signature" 
                className="w-12 h-12 rounded-full border-2 border-slate-800" 
              />
            </div>
            
            <div className="flex flex-col justify-between">
              <div className="flex gap-4 mb-8">
                <a href="#" className="w-12 h-12 bg-slate-200 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-300"><Github size={20} /></a>
                <a href="#" className="w-12 h-12 bg-slate-200 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-300"><Linkedin size={20} /></a>
                <a href="#" className="w-12 h-12 bg-slate-200 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors border border-slate-300"><Mail size={20} /></a>
              </div>
              <div className="flex justify-between items-end text-xs font-mono text-slate-500 uppercase tracking-wider">
                <div>
                  Based in San Francisco<br/>
                  Available for Hire
                </div>
                <div className="text-right">
                  © 2024 Alex Dev<br/>
                  System Ver. 1.0
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}