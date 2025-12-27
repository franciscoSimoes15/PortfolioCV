import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Terminal, 
  Cpu, 
  Shield, 
  Zap, 
  Hexagon, 
  Crosshair,
  Wifi,
  Activity,
  Box
} from 'lucide-react';

// --- UTILS ---

// Random character generator for "decoding" effect
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

const GlitchText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className={`cursor-default inline-block ${className}`}>
      {display}
    </span>
  );
};

// --- COMPONENTS ---

const CyberCard = ({ title, sub, stack, index }) => (
  <div className="relative group">
    {/* Decorative corner markers */}
    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-zinc-500 transition-all group-hover:border-yellow-400 group-hover:w-full group-hover:h-full"></div>
    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-zinc-500 transition-all group-hover:border-yellow-400 group-hover:w-full group-hover:h-full"></div>
    
    <div className="bg-zinc-900 border border-zinc-800 p-6 h-full relative z-10 hover:bg-zinc-800/50 transition-colors clip-path-cyber">
      <div className="flex justify-between items-start mb-8">
        <div className="text-xs font-mono text-zinc-500">
          PROJ_ID_0{index} // <span className="text-yellow-500">ACTIVE</span>
        </div>
        <ArrowUpRight className="text-zinc-600 group-hover:text-yellow-400 transition-colors" />
      </div>
      
      <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
        <GlitchText text={title} />
      </h3>
      <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-6">
        {sub}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {stack.map((t) => (
          <span key={t} className="px-2 py-1 bg-zinc-950 border border-zinc-700 text-[10px] text-zinc-300 font-mono uppercase">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const StatBlock = ({ label, val, icon: Icon }) => (
  <div className="flex items-center justify-between border-b border-zinc-800 py-3 group hover:bg-zinc-900/50 px-2 transition-colors">
    <div className="flex items-center gap-3">
      <div className="text-zinc-600 group-hover:text-yellow-400 transition-colors">
        <Icon size={16} />
      </div>
      <span className="font-mono text-sm text-zinc-400 uppercase">{label}</span>
    </div>
    <div className="font-bold text-white tracking-widest">{val}</div>
  </div>
);

// --- MAIN LAYOUT ---

export default function CyberPortfolio() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      
      {/* GLOBAL GRIDS & LINES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-12 top-0 bottom-0 w-px bg-zinc-900"></div>
        <div className="absolute right-12 top-0 bottom-0 w-px bg-zinc-900"></div>
        <div className="absolute top-24 left-0 right-0 h-px bg-zinc-900"></div>
        
        {/* Animated Crosshairs */}
        <div className="absolute top-24 left-12 -translate-x-1/2 -translate-y-1/2 text-yellow-500/50">
          <Crosshair size={24} />
        </div>
        <div className="absolute top-24 right-12 translate-x-1/2 -translate-y-1/2 text-yellow-500/50">
          <Crosshair size={24} />
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full h-24 flex items-center justify-between px-6 md:px-16 z-50 bg-[#050505]/80 backdrop-blur-sm border-b border-zinc-900">
        <div className="flex items-center gap-4">
          <Hexagon className="text-yellow-500 fill-yellow-500/10" size={32} strokeWidth={1.5} />
          <div>
            <div className="font-black text-white text-xl tracking-tighter leading-none">ALEX_DEV</div>
            <div className="text-[10px] text-zinc-500 font-mono tracking-widest">UNIT 734 // SYS_ADMIN</div>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 font-mono text-xs text-zinc-500">
          <span className="hover:text-yellow-400 cursor-pointer transition-colors">[01] INDEX</span>
          <span className="hover:text-yellow-400 cursor-pointer transition-colors">[02] PROTOCOLS</span>
          <span className="hover:text-yellow-400 cursor-pointer transition-colors">[03] TRANSMISSION</span>
        </div>

        <div className="text-yellow-500 font-mono text-xs animate-pulse">
          ● SYSTEM_ONLINE
        </div>
      </nav>

      {/* CONTENT */}
      <main className="relative z-10 pt-40 pb-20 px-6 md:px-16 max-w-[1400px] mx-auto">
        
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8">
            <div className="inline-block border border-yellow-500/30 bg-yellow-500/5 px-2 py-1 mb-6">
              <span className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest flex items-center gap-2">
                <Wifi size={12} /> Connection Secure
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase">
              <GlitchText text="Full_Stack" /><br/>
              <span className="text-zinc-800 text-stroke">Architecture</span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-2xl font-mono leading-relaxed border-l-2 border-yellow-500 pl-6 mb-10">
              Executing high-precision development protocols. Bridging the gap between React interface layers and Golang backend systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black font-bold px-8 py-4 uppercase tracking-widest text-sm hover:bg-yellow-400 transition-colors clip-path-button">
                Initialize Project
              </button>
              <button className="border border-zinc-700 text-white font-bold px-8 py-4 uppercase tracking-widest text-sm hover:bg-zinc-900 transition-colors clip-path-button">
                Download_Data
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="text-xs font-bold text-zinc-500 mb-4 border-b border-zinc-800 pb-2">SYSTEM METRICS</div>
              <StatBlock label="React Core" val="98%" icon={Cpu} />
              <StatBlock label="Golang Svc" val="ACTIVE" icon={Terminal} />
              <StatBlock label="Security" val="MAX" icon={Shield} />
              <StatBlock label="Uptime" val="4Y 2D" icon={Zap} />
            </div>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="mb-32">
          <div className="flex items-end justify-between mb-12 border-b border-zinc-900 pb-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              Deployment <span className="text-yellow-500">Log</span>
            </h2>
            <div className="font-mono text-xs text-zinc-600">
              SHOWING RECENT ENTRIES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CyberCard 
              index="1"
              title="Task_Flow"
              sub="Concurrent mode Kanban board with local-first sync architecture."
              stack={['React', 'Zustand', 'dnd-kit']}
            />
            <CyberCard 
              index="2"
              title="Auth_Core"
              sub="Distributed identity provider utilizing JWT/RBAC protocols."
              stack={['Go', 'gRPC', 'Redis']}
            />
            <CyberCard 
              index="3"
              title="Deploy_CLI"
              sub="Automated scaffolding engine for microservice environments."
              stack={['Golang', 'Cobra', 'Viper']}
            />
          </div>
        </div>

        {/* TECH STACK TICKER */}
        <div className="border-y border-zinc-900 py-6 mb-32 overflow-hidden bg-zinc-950">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="text-2xl font-black text-zinc-800 uppercase tracking-tighter">React.js</span>
                <span className="text-2xl font-black text-white uppercase tracking-tighter">Golang</span>
                <span className="text-2xl font-black text-zinc-800 uppercase tracking-tighter">Docker</span>
                <span className="text-2xl font-black text-white uppercase tracking-tighter">Postgres</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER / CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 bg-yellow-500 flex items-center justify-center mb-6">
              <Activity className="text-black" />
            </div>
            <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              Ready to <br/> <span className="text-zinc-700">Interface?</span>
            </h2>
            <p className="text-zinc-500 font-mono max-w-md">
              Secure channel open for opportunities. Currently accepting new mission parameters.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <a href="#" className="border border-zinc-800 p-8 hover:bg-yellow-500 hover:text-black transition-all group">
              <div className="mb-4 text-zinc-500 group-hover:text-black">DIR_01</div>
              <div className="text-xl font-bold uppercase">GitHub</div>
            </a>
            <a href="#" className="border border-zinc-800 p-8 hover:bg-yellow-500 hover:text-black transition-all group">
              <div className="mb-4 text-zinc-500 group-hover:text-black">DIR_02</div>
              <div className="text-xl font-bold uppercase">LinkedIn</div>
            </a>
            <a href="#" className="col-span-2 border border-zinc-800 p-8 hover:bg-yellow-500 hover:text-black transition-all group">
              <div className="mb-4 text-zinc-500 group-hover:text-black">EXECUTE</div>
              <div className="text-xl font-bold uppercase flex justify-between items-center">
                Send Transmission <ArrowUpRight />
              </div>
            </a>
          </div>
        </div>

      </main>

      {/* CSS for custom clip-paths */}
      <style>{`
        .clip-path-cyber {
          clip-path: polygon(
            0 0, 
            100% 0, 
            100% calc(100% - 20px), 
            calc(100% - 20px) 100%, 
            0 100%
          );
        }
        .clip-path-button {
          clip-path: polygon(
            10px 0, 
            100% 0, 
            100% calc(100% - 10px), 
            calc(100% - 10px) 100%, 
            0 100%, 
            0 10px
          );
        }
        .text-stroke {
          -webkit-text-stroke: 1px #3f3f46;
          color: transparent;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}