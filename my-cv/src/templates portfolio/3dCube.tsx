import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Code, 
  Server, 
  Database, 
  Globe, 
  Cpu, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight,
  MousePointer2,
  RotateCw
} from 'lucide-react';

// --- DATA ---
const FACES = {
  front: { title: "PROFILE", id: "front" },
  right: { title: "PROJECTS", id: "right" },
  back: { title: "CONTACT", id: "back" },
  left: { title: "STACK", id: "left" },
  top: { title: "STATUS", id: "top" },
  bottom: { title: "CREDITS", id: "bottom" }
};

const PROJECTS = [
  { id: 1, name: "TaskFlow", type: "Frontend", stack: "React / Zustand", desc: "Optimistic UI Kanban board." },
  { id: 2, name: "GoAuth", type: "Backend", stack: "Go / gRPC", desc: "Distributed Identity System." },
  { id: 3, name: "DeployCLI", type: "DevOps", stack: "Cobra / Docker", desc: "Microservice Scaffolding." }
];

// --- COMPONENTS ---

const FaceContent = ({ face }) => {
  switch (face) {
    case 'front':
      return (
        <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-zinc-900/90 backdrop-blur-md border border-white/10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
            <Box size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">ALEX DEV</h1>
          <p className="text-indigo-400 font-mono text-sm mb-6">FULL STACK ENGINEER</p>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            I build digital products with <strong className="text-white">React</strong> interfaces and <strong className="text-white">Golang</strong> engines.
          </p>
          <div className="mt-8 flex gap-2 text-xs font-bold text-zinc-500">
            <span className="flex items-center gap-1"><MousePointer2 size={12}/> DRAG TO ROTATE</span>
          </div>
        </div>
      );
    case 'right':
      return (
        <div className="h-full flex flex-col p-8 bg-zinc-900/90 backdrop-blur-md border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">PROJECTS</h2>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {PROJECTS.map(p => (
              <div key={p.id} className="group p-4 bg-black/40 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all rounded-xl cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white font-bold">{p.name}</span>
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                </div>
                <div className="text-xs text-indigo-400 mb-2 font-mono">{p.stack}</div>
                <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'left':
      return (
        <div className="h-full flex flex-col p-8 bg-zinc-900/90 backdrop-blur-md border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">TECH STACK</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-blue-500/50 transition-colors">
              <Code size={24} className="text-blue-400" />
              <span className="text-xs font-bold text-zinc-300">React</span>
            </div>
            <div className="p-4 bg-black/40 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-cyan-500/50 transition-colors">
              <Terminal size={24} className="text-cyan-400" />
              <span className="text-xs font-bold text-zinc-300">Golang</span>
            </div>
            <div className="p-4 bg-black/40 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-green-500/50 transition-colors">
              <Server size={24} className="text-green-400" />
              <span className="text-xs font-bold text-zinc-300">Node.js</span>
            </div>
            <div className="p-4 bg-black/40 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-blue-300/50 transition-colors">
              <Database size={24} className="text-blue-300" />
              <span className="text-xs font-bold text-zinc-300">Postgres</span>
            </div>
            <div className="p-4 bg-black/40 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-orange-500/50 transition-colors">
              <Cpu size={24} className="text-orange-400" />
              <span className="text-xs font-bold text-zinc-300">Docker</span>
            </div>
            <div className="p-4 bg-black/40 rounded-xl flex flex-col items-center gap-2 border border-white/5 hover:border-purple-500/50 transition-colors">
              <Globe size={24} className="text-purple-400" />
              <span className="text-xs font-bold text-zinc-300">Next.js</span>
            </div>
          </div>
        </div>
      );
    case 'back':
      return (
        <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-zinc-900/90 backdrop-blur-md border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-8">GET IN TOUCH</h2>
          <div className="space-y-4 w-full">
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
              <Mail size={18} /> Send Email
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 bg-black border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Github size={18} /> GitHub
              </button>
              <button className="py-4 bg-[#0077b5] text-white font-bold rounded-xl hover:bg-[#006396] transition-colors flex items-center justify-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </button>
            </div>
          </div>
        </div>
      );
    case 'top':
      return (
        <div className="h-full flex flex-col justify-center items-center bg-zinc-800/90 backdrop-blur-md border border-white/10">
           <div className="text-4xl font-black text-white/10 tracking-widest">SYSTEM</div>
           <div className="text-emerald-400 font-mono text-xl mt-2 animate-pulse">ONLINE</div>
        </div>
      );
    case 'bottom':
      return (
        <div className="h-full flex flex-col justify-center items-center bg-zinc-800/90 backdrop-blur-md border border-white/10">
           <div className="text-zinc-500 font-mono text-xs">© 2024 ALEX DEV</div>
        </div>
      );
    default:
      return null;
  }
};

// --- MAIN SCENE ---

export default function IsometricPortfolio() {
  const [rotation, setRotation] = useState({ x: -15, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    
    setRotation(prev => ({
      x: prev.x - dy * 0.5, // Invert Y for natural feel
      y: prev.y + dx * 0.5
    }));
    
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startPos.current.x;
    const dy = e.touches[0].clientY - startPos.current.y;
    
    setRotation(prev => ({
      x: prev.x - dy * 0.5,
      y: prev.y + dx * 0.5
    }));
    
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Quick navigation buttons
  const snapTo = (face) => {
    switch(face) {
      case 'front': setRotation({ x: 0, y: 0 }); break;
      case 'right': setRotation({ x: 0, y: -90 }); break;
      case 'back': setRotation({ x: 0, y: 180 }); break;
      case 'left': setRotation({ x: 0, y: 90 }); break;
      case 'top': setRotation({ x: -90, y: 0 }); break;
      case 'bottom': setRotation({ x: 90, y: 0 }); break;
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-[#050505] text-white overflow-hidden cursor-grab active:cursor-grabbing font-sans perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <style>{`
        .scene {
          transform-style: preserve-3d;
          transition: transform 0.1s linear; 
        }
        .cube-face {
          position: absolute;
          width: 400px;
          height: 400px;
          backface-visibility: hidden; /* Or visible for transparency */
          transform-style: preserve-3d;
        }
        /* Positions */
        .face-front  { transform: rotateY(0deg) translateZ(200px); }
        .face-right  { transform: rotateY(90deg) translateZ(200px); }
        .face-back   { transform: rotateY(180deg) translateZ(200px); }
        .face-left   { transform: rotateY(-90deg) translateZ(200px); }
        .face-top    { transform: rotateX(90deg) translateZ(200px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(200px); }
        
        @media (max-width: 768px) {
          .cube-face { width: 300px; height: 300px; }
          .face-front  { transform: rotateY(0deg) translateZ(150px); }
          .face-right  { transform: rotateY(90deg) translateZ(150px); }
          .face-back   { transform: rotateY(180deg) translateZ(150px); }
          .face-left   { transform: rotateY(-90deg) translateZ(150px); }
          .face-top    { transform: rotateX(90deg) translateZ(150px); }
          .face-bottom { transform: rotateX(-90deg) translateZ(150px); }
        }
      `}</style>

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[800px] h-[800px] border border-zinc-800 rounded-full absolute animate-[spin_60s_linear_infinite]"></div>
        <div className="w-[600px] h-[600px] border border-zinc-800 rounded-full absolute animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="w-[1200px] h-px bg-zinc-800 absolute"></div>
        <div className="h-[1200px] w-px bg-zinc-800 absolute"></div>
      </div>

      {/* 3D SCENE */}
      <div className="w-full h-full flex items-center justify-center perspective-[1200px]">
        <div 
          className="scene relative w-[400px] h-[400px] md:w-[400px] md:h-[400px]"
          style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {/* CUBE FACES */}
          <div className="cube-face face-front bg-black">
            <FaceContent face="front" />
          </div>
          <div className="cube-face face-right bg-black">
            <FaceContent face="right" />
          </div>
          <div className="cube-face face-back bg-black">
            <FaceContent face="back" />
          </div>
          <div className="cube-face face-left bg-black">
            <FaceContent face="left" />
          </div>
          <div className="cube-face face-top bg-zinc-900">
            <FaceContent face="top" />
          </div>
          <div className="cube-face face-bottom bg-zinc-900">
            <FaceContent face="bottom" />
          </div>
        </div>
      </div>

      {/* HUD / CONTROLS */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
        <div className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur">
          Spatial Interface v1.0
        </div>
        
        <div className="flex gap-2 p-2 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <button onClick={() => snapTo('front')} className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors">Front</button>
          <button onClick={() => snapTo('right')} className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors">Projects</button>
          <button onClick={() => snapTo('left')} className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors">Stack</button>
          <button onClick={() => snapTo('back')} className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors">Contact</button>
          <div className="w-px h-8 bg-white/10 mx-1"></div>
          <button onClick={() => setRotation({ x: -15, y: 45 })} className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
            <RotateCw size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}