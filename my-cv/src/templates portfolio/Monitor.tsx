import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  Zap, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Terminal, 
  GitCommit,
  Layers,
  Globe,
  MoreVertical,
  RefreshCw
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const Panel = ({ title, className = "", children, actions }) => (
  <div className={`bg-[#0b0c0e] border border-zinc-800 rounded-lg flex flex-col overflow-hidden shadow-sm ${className}`}>
    <div className="h-8 px-3 border-b border-zinc-800 flex items-center justify-between bg-[#111217]">
      <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
        {title}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <MoreVertical size={14} className="text-zinc-600 cursor-pointer hover:text-zinc-300" />
      </div>
    </div>
    <div className="flex-1 p-4 relative overflow-hidden">
      {children}
    </div>
  </div>
);

const StatusRow = ({ name, status, uptime, latency, version }) => (
  <div className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0 text-xs font-mono">
    <div className="flex items-center gap-2 w-1/3">
      <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-yellow-500'}`}></div>
      <span className="text-zinc-300 font-bold truncate">{name}</span>
    </div>
    <div className="w-1/6 text-zinc-500">{version}</div>
    <div className="w-1/4 text-right text-emerald-400">{uptime}</div>
    <div className="w-1/4 text-right text-blue-400">{latency}</div>
  </div>
);

const LogLine = ({ time, level, msg }) => (
  <div className="font-mono text-[10px] md:text-xs mb-1 opacity-80 hover:opacity-100 transition-opacity flex gap-2">
    <span className="text-zinc-600">{time}</span>
    <span className={`${level === 'INFO' ? 'text-blue-400' : level === 'WARN' ? 'text-yellow-400' : 'text-emerald-400'} font-bold`}>{level}</span>
    <span className="text-zinc-300">{msg}</span>
  </div>
);

// --- MAIN LAYOUT ---

export default function SystemMonitorPortfolio() {
  const [time, setTime] = useState(new Date());
  const [cpuLoad, setCpuLoad] = useState([20, 45, 30, 60, 45, 80, 55, 40, 30, 50, 65, 45]);

  // Simulate live data
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setCpuLoad(prev => [...prev.slice(1), Math.floor(Math.random() * 60) + 20]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-orange-500/30">
      
      {/* 1. TOP NAV / HEADER */}
      <div className="h-14 border-b border-zinc-800 bg-[#0b0c0e] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center font-bold text-black">
            AD
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">AlexDev Monitor</h1>
            <div className="text-[10px] text-zinc-500 font-mono mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SYSTEM OPERATIONAL
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-mono">
           <div className="flex flex-col items-end">
             <span className="text-zinc-500">REGION</span>
             <span className="text-white">US-WEST-1</span>
           </div>
           <div className="flex flex-col items-end">
             <span className="text-zinc-500">CLUSTER</span>
             <span className="text-orange-400">FULL-STACK-01</span>
           </div>
           <div className="flex flex-col items-end">
             <span className="text-zinc-500">TIME_UTC</span>
             <span className="text-white">{time.toLocaleTimeString()}</span>
           </div>
        </div>
      </div>

      {/* 2. DASHBOARD GRID */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 max-w-[1600px] mx-auto">
        
        {/* ROW 1: METRICS */}
        
        {/* Metric: Knowledge Capacity */}
        <Panel title="Memory / Knowledge" className="md:col-span-3 h-40">
           <div className="flex items-end gap-2 mb-2">
             <span className="text-3xl font-bold text-white">8.4</span>
             <span className="text-sm text-zinc-500 mb-1">GB Used</span>
           </div>
           <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-4">
             <div className="h-full bg-purple-500 w-[70%]"></div>
           </div>
           <div className="flex justify-between text-[10px] uppercase text-zinc-500 font-bold">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> React</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Golang</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-zinc-600"></div> Idle</div>
           </div>
        </Panel>

        {/* Metric: CPU / Focus */}
        <Panel title="CPU / Focus Load" className="md:col-span-6 h-40">
           <div className="flex items-end justify-between mb-4">
             <div>
                <div className="text-3xl font-bold text-white">{cpuLoad[cpuLoad.length - 1]}%</div>
                <div className="text-xs text-zinc-500">Current Load</div>
             </div>
             <div className="text-right">
                <div className="text-emerald-400 font-mono text-sm">Learning: Docker</div>
                <div className="text-xs text-zinc-500">High Usage Process</div>
             </div>
           </div>
           {/* Fake Graph Visual */}
           <div className="flex items-end justify-between h-12 gap-1">
             {cpuLoad.map((val, i) => (
               <div key={i} className="bg-orange-500/20 border-t-2 border-orange-500 w-full transition-all duration-300" style={{ height: `${val}%` }}></div>
             ))}
           </div>
        </Panel>

        {/* Metric: Uptime */}
        <Panel title="System Uptime" className="md:col-span-3 h-40">
           <div className="flex flex-col justify-center h-full items-center">
             <Clock size={32} className="text-emerald-500 mb-2 opacity-80" />
             <div className="text-3xl font-bold text-white">3 <span className="text-lg text-zinc-500 font-normal">Years</span></div>
             <div className="text-xs text-emerald-400 font-mono mt-1">Since Init (Hello World)</div>
           </div>
        </Panel>


        {/* ROW 2: MAIN CONTENT */}

        {/* ACTIVE SERVICES (PROJECTS) */}
        <Panel 
          title="Active Microservices (Projects)" 
          className="md:col-span-8 h-96"
          actions={<RefreshCw size={12} className="text-zinc-500" />}
        >
           <div className="grid grid-cols-4 text-[10px] font-bold text-zinc-500 uppercase mb-2 px-2">
             <div className="col-span-2">Service Name</div>
             <div className="text-right">Env</div>
             <div className="text-right">Tech Stack</div>
           </div>
           
           <div className="space-y-1">
             {/* Project 1 */}
             <div className="group bg-[#15161b] hover:bg-[#1a1b21] border border-zinc-800/50 p-3 rounded transition-colors cursor-pointer">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded"><Globe size={16}/></div>
                   <div>
                     <div className="text-sm font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">TaskFlow Board</div>
                     <div className="text-xs text-zinc-500">frontend-service</div>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 rounded">Production</span>
                 </div>
               </div>
               <div className="flex justify-between items-center mt-2 pl-10">
                 <p className="text-xs text-zinc-400 w-2/3">Kanban board with optimistic UI updates and dnd-kit.</p>
                 <div className="flex gap-1">
                   {['React', 'Zustand'].map(t => <span key={t} className="text-[10px] px-1 bg-zinc-800 rounded text-zinc-400">{t}</span>)}
                 </div>
               </div>
             </div>

             {/* Project 2 */}
             <div className="group bg-[#15161b] hover:bg-[#1a1b21] border border-zinc-800/50 p-3 rounded transition-colors cursor-pointer">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded"><Server size={16}/></div>
                   <div>
                     <div className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">GoAuth API</div>
                     <div className="text-xs text-zinc-500">auth-service</div>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 rounded">Production</span>
                 </div>
               </div>
               <div className="flex justify-between items-center mt-2 pl-10">
                 <p className="text-xs text-zinc-400 w-2/3">Distributed identity management with JWT and RBAC.</p>
                 <div className="flex gap-1">
                   {['Golang', 'gRPC', 'Redis'].map(t => <span key={t} className="text-[10px] px-1 bg-zinc-800 rounded text-zinc-400">{t}</span>)}
                 </div>
               </div>
             </div>
             
             {/* Project 3 */}
             <div className="group bg-[#15161b] hover:bg-[#1a1b21] border border-zinc-800/50 p-3 rounded transition-colors cursor-pointer">
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded"><Terminal size={16}/></div>
                   <div>
                     <div className="text-sm font-bold text-zinc-200 group-hover:text-purple-400 transition-colors">CLI Scaffold</div>
                     <div className="text-xs text-zinc-500">devtools</div>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 rounded">Dev</span>
                 </div>
               </div>
               <div className="flex justify-between items-center mt-2 pl-10">
                 <p className="text-xs text-zinc-400 w-2/3">Go CLI tool for generating microservice templates.</p>
                 <div className="flex gap-1">
                   {['Go', 'Cobra'].map(t => <span key={t} className="text-[10px] px-1 bg-zinc-800 rounded text-zinc-400">{t}</span>)}
                 </div>
               </div>
             </div>

           </div>
        </Panel>

        {/* LOGS / BIO */}
        <Panel title="System Logs (Bio)" className="md:col-span-4 h-96 font-mono text-xs overflow-y-auto">
           <LogLine time="09:00:01" level="INFO" msg="System boot initiated." />
           <LogLine time="09:00:05" level="INFO" msg="User 'Alex' loaded successfully." />
           <LogLine time="09:00:12" level="INFO" msg="Stack check: React [OK], Golang [OK]." />
           <LogLine time="09:01:00" level="WARN" msg="Passion for clean code exceeding limits." />
           <LogLine time="09:02:45" level="INFO" msg="Looking for opportunities..." />
           <div className="my-2 border-t border-zinc-800 border-dashed"></div>
           <p className="text-zinc-400 leading-relaxed p-2">
             <span className="text-blue-400 font-bold">BIO:</span> I am a self-taught engineer obsessed with performance. I started with Python scripts but fell in love with Go's simplicity and React's ecosystem.
           </p>
           <p className="text-zinc-400 leading-relaxed p-2">
             <span className="text-emerald-400 font-bold">GOAL:</span> To join a team where I can contribute to high-scale systems.
           </p>
           <div className="mt-4 p-2 bg-zinc-900 rounded border border-zinc-800">
             <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Contact Params</div>
             <div className="text-emerald-300">email: "alex@example.com"</div>
             <div className="text-blue-300">github: "github.com/alex"</div>
           </div>
        </Panel>

        {/* ROW 3: FOOTER STATS */}
        <Panel title="Dependency Health" className="md:col-span-4 h-48">
           <StatusRow name="React 18" status="healthy" version="v18.2.0" uptime="99.9%" latency="12ms" />
           <StatusRow name="Golang" status="healthy" version="v1.21" uptime="100%" latency="2ms" />
           <StatusRow name="PostgreSQL" status="healthy" version="v15" uptime="99.5%" latency="45ms" />
           <StatusRow name="Docker" status="warn" version="v24.0" uptime="98.0%" latency="120ms" />
        </Panel>

        <Panel title="Commit Activity" className="md:col-span-8 h-48 flex items-center justify-center text-zinc-500">
           {/* Abstract Heatmap */}
           <div className="flex gap-1 flex-wrap w-full">
             {Array.from({length: 126}).map((_, i) => (
               <div 
                 key={i} 
                 className={`w-3 h-3 rounded-sm ${Math.random() > 0.7 ? 'bg-emerald-500/80' : Math.random() > 0.4 ? 'bg-emerald-900/40' : 'bg-zinc-800'}`}
                 title="12 commits"
               ></div>
             ))}
           </div>
        </Panel>

      </div>
    </div>
  );
}