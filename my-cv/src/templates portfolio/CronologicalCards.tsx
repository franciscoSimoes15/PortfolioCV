import React, { useState, useRef, useEffect } from 'react';
import { 
  Move, 
  Minus, 
  Plus, 
  Code, 
  Server, 
  Database, 
  ExternalLink, 
  Github, 
  Zap, 
  Layout, 
  Cpu, 
  MousePointer2,
  Home,
  Terminal
} from 'lucide-react';

// --- SUB-COMPONENTS ---

const NodeCard = ({ title, icon: Icon, children, color = "zinc", x, y, width = 300 }) => {
  const colors = {
    zinc: "border-zinc-700 bg-zinc-900/90",
    blue: "border-blue-500/50 bg-blue-950/90 shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    emerald: "border-emerald-500/50 bg-emerald-950/90 shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    purple: "border-purple-500/50 bg-purple-950/90 shadow-[0_0_30px_rgba(168,85,247,0.2)]",
  };

  return (
    <div 
      className={`absolute rounded-2xl border backdrop-blur-md p-6 transition-shadow hover:shadow-2xl ${colors[color]}`}
      style={{ 
        left: x, 
        top: y, 
        width: width,
        transform: 'translate(-50%, -50%)' // Center anchor
      }}
    >
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
        <div className={`p-2 rounded-lg bg-white/5`}>
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      <div className="text-zinc-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const ConnectionLine = ({ start, end, label }) => {
  // Simple straight line logic (could be bezier)
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
  
  return (
    <div 
      className="absolute h-px bg-zinc-700 origin-center pointer-events-none"
      style={{
        left: start.x,
        top: start.y,
        width: length,
        transformOrigin: '0 0',
        transform: `rotate(${angle}deg)`
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black px-2 py-1 text-[10px] text-zinc-500 font-mono uppercase tracking-wider border border-zinc-800 rounded">
        {label}
      </div>
      {/* Animated Dot flowing along the line */}
      <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"
           style={{ animation: 'flow 3s linear infinite' }} />
      <style>{`
        @keyframes flow {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- DATA CONFIGURATION ---
// Define positions for nodes so we can connect them
const POSITIONS = {
  HOME: { x: 0, y: 0 },
  FRONTEND: { x: -400, y: 300 },
  BACKEND: { x: 400, y: 300 },
  PROJECT_A: { x: -500, y: 700 }, // Connected to Frontend
  PROJECT_B: { x: 500, y: 700 },  // Connected to Backend
  ABOUT: { x: 0, y: -400 },
};

// --- MAIN COMPONENT ---

export default function InfinitePortfolio() {
  const [offset, setOffset] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);

  // Handle Dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setOffset({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  // "Fly To" Navigation Helper
  const flyTo = (target) => {
    const screenCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setOffset({
      x: screenCenter.x - (target.x * zoom),
      y: screenCenter.y - (target.y * zoom)
    });
  };

  return (
    <div className="w-screen h-screen bg-[#09090b] overflow-hidden relative font-sans text-zinc-100 selection:bg-blue-500/30">
      
      {/* 1. HUD / NAVIGATION OVERLAY (Fixed on Screen) */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">AD</div>
        <div>
          <div className="font-bold text-sm">Alex Dev</div>
          <div className="text-xs text-zinc-500">Infinite Workspace v1.0</div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <div className="bg-zinc-800/80 backdrop-blur border border-zinc-700 p-2 rounded-xl flex flex-col gap-1 shadow-2xl">
          <p className="text-[10px] text-zinc-500 font-bold uppercase text-center mb-1">Mini-Map</p>
          <button onClick={() => flyTo(POSITIONS.HOME)} className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs">
            <Home size={14} /> Start
          </button>
          <button onClick={() => flyTo(POSITIONS.ABOUT)} className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs">
            <MousePointer2 size={14} /> Bio
          </button>
          <button onClick={() => flyTo(POSITIONS.FRONTEND)} className="p-2 hover:bg-zinc-700 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors flex items-center gap-2 text-xs">
            <Layout size={14} /> Frontend
          </button>
          <button onClick={() => flyTo(POSITIONS.BACKEND)} className="p-2 hover:bg-zinc-700 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-2 text-xs">
            <Server size={14} /> Backend
          </button>
        </div>
        
        <div className="bg-zinc-800/80 backdrop-blur border border-zinc-700 p-1 rounded-xl flex items-center justify-between shadow-2xl">
           <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400"><Minus size={14}/></button>
           <span className="text-xs font-mono text-zinc-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
           <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400"><Plus size={14}/></button>
        </div>
      </div>

      <div className="fixed top-6 right-6 z-50 text-zinc-500 flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800 pointer-events-none">
        <Move size={14} />
        <span className="text-xs">Drag to explore</span>
      </div>

      {/* 2. THE INFINITE CANVAS */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Background Grid */}
        <div className="absolute -top-[5000px] -left-[5000px] w-[10000px] h-[10000px] bg-[#09090b] -z-50 pointer-events-none">
          <div className="w-full h-full opacity-20" style={{ 
            backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}></div>
        </div>

        {/* --- CONNECTIONS (DRAWN BEHIND NODES) --- */}
        <ConnectionLine start={POSITIONS.HOME} end={POSITIONS.FRONTEND} label="Is proficient in" />
        <ConnectionLine start={POSITIONS.HOME} end={POSITIONS.BACKEND} label="Is proficient in" />
        <ConnectionLine start={POSITIONS.HOME} end={POSITIONS.ABOUT} label="Who is he?" />
        <ConnectionLine start={POSITIONS.FRONTEND} end={POSITIONS.PROJECT_A} label="Built with" />
        <ConnectionLine start={POSITIONS.BACKEND} end={POSITIONS.PROJECT_B} label="Built with" />


        {/* --- NODES --- */}

        {/* 1. CENTRAL NODE */}
        <NodeCard title="Start Here" icon={MousePointer2} x={POSITIONS.HOME.x} y={POSITIONS.HOME.y} color="zinc">
          <p className="mb-4">
            Hello! I'm Alex. This is my <strong className="text-white">Infinite Workspace</strong>. 
          </p>
          <p className="mb-4">
            I'm a Full Stack Engineer bridging the gap between <strong className="text-blue-400">React UIs</strong> and <strong className="text-emerald-400">Go Microservices</strong>.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-black py-2 rounded font-bold text-xs hover:bg-zinc-200">Download CV</button>
            <button className="px-3 bg-zinc-800 rounded hover:bg-zinc-700"><Github size={16} /></button>
          </div>
        </NodeCard>

        {/* 2. FRONTEND CLUSTER */}
        <NodeCard title="Frontend Stack" icon={Layout} x={POSITIONS.FRONTEND.x} y={POSITIONS.FRONTEND.y} color="blue">
          <p className="mb-4 text-xs uppercase tracking-widest font-bold text-blue-400">Core Competencies</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2"><Cpu size={14} className="text-blue-500"/> React 18 & Next.js</li>
            <li className="flex items-center gap-2"><Zap size={14} className="text-yellow-500"/> Tailwind CSS & Framer</li>
            <li className="flex items-center gap-2"><Database size={14} className="text-zinc-500"/> Zustand / Redux</li>
          </ul>
          <p className="text-xs text-zinc-500">
            Focus on accessibility, component composition, and smooth interactions.
          </p>
        </NodeCard>

        <NodeCard title="Project: TaskFlow" icon={ExternalLink} x={POSITIONS.PROJECT_A.x} y={POSITIONS.PROJECT_A.y} width={350}>
           <div className="w-full h-32 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-zinc-700 relative group">
             <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
             <Layout className="text-blue-400 opacity-50" size={48} />
           </div>
           <p className="mb-3">
             A drag-and-drop Kanban board with optimistic UI updates.
           </p>
           <div className="flex gap-2 mb-4">
             <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded">React</span>
             <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-1 rounded">Dnd-Kit</span>
           </div>
           <button className="w-full py-2 border border-zinc-700 rounded hover:bg-zinc-800 text-xs font-bold transition-colors">View Deployment</button>
        </NodeCard>


        {/* 3. BACKEND CLUSTER */}
        <NodeCard title="Backend Stack" icon={Server} x={POSITIONS.BACKEND.x} y={POSITIONS.BACKEND.y} color="emerald">
          <p className="mb-4 text-xs uppercase tracking-widest font-bold text-emerald-400">System Architecture</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2"><Zap size={14} className="text-emerald-500"/> Golang & Gin</li>
            <li className="flex items-center gap-2"><Database size={14} className="text-blue-500"/> PostgreSQL & Redis</li>
            <li className="flex items-center gap-2"><Server size={14} className="text-zinc-500"/> Docker & gRPC</li>
          </ul>
           <p className="text-xs text-zinc-500">
            Building stateless, scalable microservices with strict type safety.
          </p>
        </NodeCard>

        <NodeCard title="Project: GoAuth" icon={Code} x={POSITIONS.PROJECT_B.x} y={POSITIONS.PROJECT_B.y} width={350}>
           <div className="w-full h-32 bg-zinc-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-zinc-700 relative group">
             <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors"></div>
             <Terminal className="text-emerald-400 opacity-50" size={48} />
           </div>
           <p className="mb-3">
             A standalone authentication service featuring JWT rotation and RBAC.
           </p>
           <div className="flex gap-2 mb-4">
             <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded">Go</span>
             <span className="text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-1 rounded">gRPC</span>
           </div>
           <button className="w-full py-2 border border-zinc-700 rounded hover:bg-zinc-800 text-xs font-bold transition-colors">View GitHub Repo</button>
        </NodeCard>

        {/* 4. ABOUT NODE */}
        <NodeCard title="About Me" icon={MousePointer2} x={POSITIONS.ABOUT.x} y={POSITIONS.ABOUT.y} color="purple">
           <p className="mb-4">
             I'm a self-taught engineer based in Portugal. I love solving complex logic puzzles and making them look beautiful.
           </p>
           <p className="text-xs text-zinc-400">
             Currently reading: "Designing Data-Intensive Applications"
           </p>
        </NodeCard>

      </div>
    </div>
  );
}