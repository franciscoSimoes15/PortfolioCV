import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Code, 
  Zap, 
  Globe, 
  Box, 
  Terminal
} from 'lucide-react';

// --- DATA ---
const PROJECTS = [
  {
    title: "Neural_Task_Flow",
    category: "Interface",
    desc: "A Kanban system with predictive state management.",
    tech: "React / Zustand",
    stat: "98% Efficiency"
  },
  {
    title: "Go_Auth_Cluster",
    category: "Infrastructure",
    desc: "Distributed identity verification microservices.",
    tech: "Golang / gRPC",
    stat: "12ms Latency"
  },
  {
    title: "Deploy_Mind",
    category: "Automation",
    desc: "Intelligent CLI for project scaffolding.",
    tech: "Cobra / Viper",
    stat: "Zero Config"
  }
];

// --- CANVAS COMPONENT ---
// This handles the high-performance background animation
const GenerativeBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Grid configuration
    const spacing = 30;
    const dotSize = 2;
    let cols, rows;
    let points = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / spacing);
      rows = Math.ceil(canvas.height / spacing);
      initPoints();
    };

    const initPoints = () => {
      points = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            x: i * spacing,
            y: j * spacing,
            originX: i * spacing,
            originY: j * spacing,
            vx: 0,
            vy: 0,
            size: dotSize
          });
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw points
      points.forEach(point => {
        // Distance to mouse
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        // Physics: Repel from mouse
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 5;
          const pushY = Math.sin(angle) * force * 5;
          
          point.vx -= pushX;
          point.vy -= pushY;
        }

        // Spring back to origin
        const spring = 0.05;
        const friction = 0.90;
        
        point.vx += (point.originX - point.x) * spring;
        point.vy += (point.originY - point.y) * spring;
        
        point.vx *= friction;
        point.vy *= friction;
        
        point.x += point.vx;
        point.y += point.vy;

        // Draw
        // Dynamic color based on velocity
        const speed = Math.abs(point.vx) + Math.abs(point.vy);
        const greenVal = Math.min(255, 100 + speed * 20);
        
        ctx.fillStyle = `rgba(0, ${greenVal}, ${greenVal + 50}, ${distance < maxDist ? 0.8 : 0.2})`;
        ctx.beginPath();
        const currentSize = point.size + (speed * 0.1);
        ctx.arc(point.x, point.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connecting lines for nearby points (optional, adds "web" look)
      // Keeping it disabled for performance/cleaner look, but easy to add.

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

// --- UI COMPONENTS ---

const NavItem = ({ label, active }) => (
  <button className={`
    relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300
    ${active ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}
  `}>
    {active && (
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></span>
    )}
    {label}
  </button>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`
    bg-zinc-900/40 backdrop-blur-md border border-white/5 
    hover:border-cyan-500/30 hover:bg-zinc-900/60 transition-all duration-500
    p-6 rounded-sm relative group overflow-hidden ${className}
  `}>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan-400 transition-colors"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan-400 transition-colors"></div>
    {children}
  </div>
);

// --- MAIN PAGE ---

export default function GenerativePortfolio() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
      
      <GenerativeBackground />

      {/* OVERLAY UI */}
      <div className="relative z-10">
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-6 pointer-events-none">
          <div className="pointer-events-auto">
            <h1 className="text-xl font-bold tracking-tighter">ALEX<span className="text-cyan-500">.DEV</span></h1>
            <div className="text-[10px] text-zinc-500 font-mono tracking-widest">COMPUTATIONAL DESIGN</div>
          </div>
          
          <nav className="pointer-events-auto hidden md:flex gap-4">
            <NavItem label="Simulation" active />
            <NavItem label="Projects" />
            <NavItem label="About" />
          </nav>

          <button className="pointer-events-auto px-6 py-2 bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all">
            Connect
          </button>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 pt-40 pb-20">
          
          {/* Hero Section */}
          <section className="max-w-4xl mb-32 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono uppercase tracking-widest pointer-events-auto">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              System Online
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter mix-blend-difference">
              ENGINEERING <br/>
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">INVISIBLE</span>
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-10 pointer-events-auto">
              I build resilient digital infrastructure. Specializing in <span className="text-white font-bold">Golang</span> backends and generative <span className="text-white font-bold">React</span> interfaces.
            </p>

            <div className="flex flex-wrap gap-4 pointer-events-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border-r border-zinc-800 pr-4">
                <Cpu size={14} /> REACT.JS
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 border-r border-zinc-800 pr-4">
                <Terminal size={14} /> GOLANG
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <Box size={14} /> DOCKER
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {PROJECTS.map((proj, i) => (
              <GlassCard key={i}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest border border-cyan-500/30 px-2 py-0.5 rounded-sm">
                    {proj.category}
                  </span>
                  <ArrowRight className="text-zinc-600 group-hover:text-white transition-colors" size={18} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {proj.desc}
                </p>
                
                <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                  <div className="text-xs text-zinc-500 font-mono">{proj.tech}</div>
                  <div className="text-xs font-bold text-white">{proj.stat}</div>
                </div>
              </GlassCard>
            ))}
          </section>

          {/* About / Footer */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
            <div>
              <h3 className="text-lg font-bold mb-4">ALEX DEV</h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mb-6">
                Based in San Francisco. I believe in code that is as beautiful as it is functional. Currently exploring WebGL and distributed systems.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-colors"><Github size={18}/></a>
                <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-colors"><Linkedin size={18}/></a>
                <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-colors"><Mail size={18}/></a>
              </div>
            </div>
            
            <div className="flex flex-col justify-between items-end text-right">
              <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">
                Coordinates
              </div>
              <div className="text-2xl font-mono font-bold text-zinc-800">
                37.7749° N <br/>
                122.4194° W
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}