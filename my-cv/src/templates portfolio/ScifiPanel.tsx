import React, { useState, useEffect } from 'react';
import { 
  Crosshair, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Activity, 
  Target, 
  Wifi, 
  Database,
  Terminal,
  Code,
  Check,
  ChevronRight,
  Maximize,
  Aperture
} from 'lucide-react';

// --- DATA ---

const SYSTEMS = [
  { id: 'core', label: 'CORE_SYSTEMS', status: 'ONLINE', integrity: '100%' },
  { id: 'react', label: 'REACT_MODULE', status: 'OPTIMAL', integrity: '98%' },
  { id: 'go', label: 'GOLANG_ENGINE', status: 'OPTIMAL', integrity: '95%' },
  { id: 'db', label: 'DATA_PERSISTENCE', status: 'STABLE', integrity: '100%' },
];

const MISSIONS = [
  { 
    id: 'M-01', 
    codename: 'TASK_FLOW', 
    type: 'FRONTEND_OPS', 
    status: 'COMPLETE',
    desc: 'Tactical Kanban interface utilizing optimistic UI protocols for zero-latency user feedback.',
    stack: ['REACT', 'ZUSTAND', 'DND-KIT'] 
  },
  { 
    id: 'M-02', 
    codename: 'AUTH_GATEWAY', 
    type: 'SECURITY_OPS', 
    status: 'ACTIVE',
    desc: 'Distributed identity verification system. Implements JWT rotation and RBAC defenses.',
    stack: ['GOLANG', 'GRPC', 'REDIS'] 
  },
  { 
    id: 'M-03', 
    codename: 'CLI_SCAFFOLD', 
    type: 'TOOLING', 
    status: 'BETA',
    desc: 'Rapid deployment utility for microservice architecture generation.',
    stack: ['GO', 'COBRA'] 
  },
];

// --- COMPONENTS ---

const HolographicCard = ({ children, className = "", title }) => (
  <div className={`relative bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-sm p-6 overflow-hidden group ${className}`}>
    {/* Corner Accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
    
    {/* Scanline Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
    
    {/* Header */}
    {title && (
      <div className="flex items-center gap-2 mb-4 border-b border-cyan-500/30 pb-2">
        <Aperture size={14} className="text-cyan-400 animate-spin-slow" />
        <span className="text-xs font-bold text-cyan-400 tracking-[0.2em]">{title}</span>
      </div>
    )}
    
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const ProgressBar = ({ label, value, color = "bg-cyan-500" }) => (
  <div className="mb-3">
    <div className="flex justify-between text-[10px] text-cyan-300 font-mono mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-cyan-950/50 border border-cyan-900">
      <div 
        className={`h-full ${color} shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-1000`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

// --- MAIN LAYOUT ---

export default function HudPortfolio() {
  const [activeMission, setActiveMission] = useState(MISSIONS[0]);
  const [scannerPos, setScannerPos] = useState(0);

  // Animate scanner line
  useEffect(() => {
    const interval = setInterval(() => {
      setScannerPos(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-100 font-mono overflow-hidden relative selection:bg-cyan-500/30 selection:text-white">
      
      {/* 1. BACKGROUND GRID & EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [transform:perspective(1000px)_rotateX(20deg)_scale(1.2)]"></div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-80"></div>
        {/* Scanner Line */}
        <div 
          className="absolute left-0 w-full h-px bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.5)] z-0"
          style={{ top: `${scannerPos}%` }}
        ></div>
      </div>

      {/* 2. HUD HEADER */}
      <header className="fixed top-0 w-full h-16 border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-cyan-500/50 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin"></div>
            <Crosshair size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400 tracking-widest leading-none">ALEX.DEV</h1>
            <span className="text-[10px] text-cyan-700">SYS.VER.2.4.0 // ONLINE</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
           {SYSTEMS.map(sys => (
             <div key={sys.id} className="flex flex-col items-end">
               <span className="text-[9px] text-cyan-700 font-bold">{sys.label}</span>
               <span className="text-xs text-cyan-400 shadow-cyan-500/50 drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]">{sys.status}</span>
             </div>
           ))}
        </div>
      </header>

      {/* 3. MAIN INTERFACE */}
      <main className="relative z-10 pt-24 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 pb-20">
        
        {/* LEFT COLUMN: PROFILE & STATS */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Pilot Profile */}
          <HolographicCard title="PILOT_PROFILE" className="text-center">
             <div className="w-24 h-24 mx-auto mb-4 border-2 border-cyan-500/30 rounded-full p-1 relative">
               <img 
                 src="https://api.dicebear.com/7.x/bottts/svg?seed=Alex" 
                 alt="Avatar" 
                 className="w-full h-full rounded-full bg-cyan-900/20 grayscale opacity-80 hover:grayscale-0 transition-all"
               />
               <div className="absolute inset-0 rounded-full border-b-2 border-cyan-400 animate-pulse"></div>
             </div>
             <div className="text-xl font-bold text-white mb-1">ALEX DEV</div>
             <div className="text-xs text-cyan-600 mb-4">LVL.02 ENGINEER // REACT + GO</div>
             <div className="grid grid-cols-2 gap-2 text-[10px] text-left">
               <div className="bg-cyan-950/40 p-2 border border-cyan-900">
                 <div className="text-cyan-600">CLASS</div>
                 <div className="text-cyan-300">BUILDER</div>
               </div>
               <div className="bg-cyan-950/40 p-2 border border-cyan-900">
                 <div className="text-cyan-600">LOC</div>
                 <div className="text-cyan-300">SFO, CA</div>
               </div>
             </div>
          </HolographicCard>

          {/* Skill Matrix */}
          <HolographicCard title="POWER_DISTRIBUTION">
            <ProgressBar label="REACT_CORE" value={95} />
            <ProgressBar label="GOLANG_RUNTIME" value={80} />
            <ProgressBar label="DOCKER_CONTAINMENT" value={65} />
            <ProgressBar label="POSTGRES_STORAGE" value={75} />
            
            <div className="mt-4 pt-4 border-t border-cyan-500/20 text-[10px] text-cyan-600 flex justify-between">
              <span>TOTAL_OUTPUT</span>
              <span className="text-cyan-400 animate-pulse">3.21 GW</span>
            </div>
          </HolographicCard>
        
        </div>

        {/* CENTER COLUMN: ACTIVE MISSION (PROJECT) */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <HolographicCard title="MISSION_VIEWER" className="flex-1 min-h-[400px] flex flex-col">
            
            {/* Mission Viz (Placeholder for Screenshot) */}
            <div className="flex-1 bg-black/40 border border-cyan-900/50 mb-6 relative group overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                 <Globe size={64} className="text-cyan-900 opacity-50 group-hover:scale-110 transition-transform duration-500" />
               </div>
               
               {/* Overlay Data */}
               <div className="absolute top-4 left-4">
                 <div className="text-xs text-cyan-500 font-bold bg-black/60 px-2 py-1">TARGET: {activeMission.codename}</div>
               </div>
               
               {/* Animated Reticle */}
               <div className="absolute inset-0 border-[20px] border-cyan-500/0 hover:border-cyan-500/10 transition-all duration-300 flex items-center justify-center">
                  <Crosshair size={32} className="text-cyan-500/50 opacity-0 group-hover:opacity-100" />
               </div>
            </div>

            {/* Mission Details */}
            <div className="space-y-4">
               <div className="flex justify-between items-end border-b border-cyan-900/50 pb-2">
                 <div>
                   <h2 className="text-2xl font-bold text-white tracking-wider">{activeMission.codename}</h2>
                   <span className="text-xs text-cyan-600">{activeMission.type} // {activeMission.status}</span>
                 </div>
                 <button className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 px-4 py-2 text-xs font-bold border border-cyan-500/50 transition-all">
                   INITIATE_LINK <Maximize size={12} />
                 </button>
               </div>
               
               <p className="text-cyan-200/80 text-sm leading-relaxed">
                 {activeMission.desc}
               </p>

               <div className="flex flex-wrap gap-2 pt-2">
                 {activeMission.stack.map(tech => (
                   <span key={tech} className="px-2 py-1 bg-cyan-950 border border-cyan-800 text-[10px] text-cyan-400">
                     [{tech}]
                   </span>
                 ))}
               </div>
            </div>

          </HolographicCard>
        </div>

        {/* RIGHT COLUMN: MISSION LOG (NAV) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <HolographicCard title="MISSION_LOGS" className="flex-1">
             <div className="space-y-2">
               {MISSIONS.map(m => (
                 <div 
                   key={m.id}
                   onClick={() => setActiveMission(m)}
                   className={`p-3 border cursor-pointer transition-all relative overflow-hidden group ${activeMission.id === m.id ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-black/40 border-cyan-900/50 text-cyan-600 hover:border-cyan-600'}`}
                 >
                   <div className="flex justify-between items-center relative z-10">
                     <span className="text-xs font-bold">{m.codename}</span>
                     {activeMission.id === m.id && <Activity size={12} className="text-cyan-400 animate-pulse" />}
                   </div>
                   <div className="text-[9px] opacity-70 relative z-10">{m.type}</div>
                   
                   {/* Hover Fill Effect */}
                   <div className={`absolute inset-0 bg-cyan-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ${activeMission.id === m.id ? 'hidden' : ''}`}></div>
                 </div>
               ))}
             </div>
          </HolographicCard>

          {/* Communication Module */}
          <HolographicCard title="COMM_LINK">
             <div className="text-[10px] text-cyan-500 mb-4">
               ESTABLISH SECURE CONNECTION WITH PILOT?
             </div>
             <button className="w-full py-3 bg-cyan-900/30 border border-cyan-500 text-cyan-400 text-xs font-bold hover:bg-cyan-500 hover:text-black transition-colors flex items-center justify-center gap-2 group">
               <Wifi size={14} className="group-hover:animate-ping" /> TRANSMIT_SIGNAL
             </button>
          </HolographicCard>
        </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="fixed bottom-0 w-full h-8 bg-black/80 border-t border-cyan-900/50 flex items-center justify-between px-6 text-[9px] text-cyan-800 z-50">
         <div className="flex gap-4">
           <span>MEM_USAGE: 450MB</span>
           <span>NET_LATENCY: 12ms</span>
         </div>
         <div className="animate-pulse">
           SYSTEM_READY
         </div>
      </footer>

    </div>
  );
}