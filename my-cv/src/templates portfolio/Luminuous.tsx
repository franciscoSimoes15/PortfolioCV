import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown, 
  Code, 
  Cpu, 
  Globe, 
  Zap,
  Layers,
  Terminal,
  ExternalLink,
  Database
} from 'lucide-react';

// --- CUSTOM HOOKS ---

// Tracks mouse position for the "Spotlight" effect
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

// --- COMPONENTS ---

// A card that reveals its border/background based on mouse position
const SpotlightCard = ({ children, className = "", onClick }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden group cursor-pointer ${className}`}
    >
      {/* The Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      {/* The Border Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      
      {/* Content */}
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const TechPill = ({ icon: Icon, label, color = "blue" }) => {
  const colors = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", 
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium uppercase tracking-wide transition-transform hover:scale-105 ${colors[color] || colors.blue}`}>
      <Icon size={12} />
      {label}
    </div>
  );
};

// --- MAIN APP ---

export default function LuminousPortfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initial Load Animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    const scrollHandler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', scrollHandler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Background Ambient Mesh */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] animate-pulse delay-1000"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6 bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              A
            </div>
            <span className="font-bold tracking-tight text-lg">Alex<span className="text-zinc-500">Dev</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#stack" className="hover:text-white transition-colors">Stack</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>
          <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-zinc-200 transition-colors">
            Contact
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <section className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-400"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Architecting <br />
            Digital <span className="text-blue-500">Reality.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            I bridge the gap between <span className="text-zinc-200 font-semibold">React</span> interactivity and <span className="text-zinc-200 font-semibold">Golang</span> performance. 
            Building scalable, distributed systems with pixel-perfect interfaces.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group">
              View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-full font-bold transition-all flex items-center justify-center gap-2">
              <Github size={18} /> GitHub
            </button>
          </div>

          {/* Abstract Stat Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 border-t border-white/10 pt-10">
            {[
              { label: "Uptime", val: "99.9%", icon: Zap },
              { label: "Commits", val: "2.4k+", icon: GitCommit },
              { label: "Projects", val: "12", icon: Layers },
              { label: "Exp.", val: "5 Yrs", icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-zinc-500 mb-1">
                  <stat.icon size={14} />
                  <span className="text-xs uppercase tracking-wider font-bold">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold font-mono">{stat.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK SECTION */}
        <section id="work" className="mt-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Selected Works</h2>
              <p className="text-zinc-400">Production-grade applications and experiments.</p>
            </div>
            <div className="hidden md:block text-sm text-zinc-500 font-mono">
              // SCROLL TO EXPLORE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Project 1 */}
            <SpotlightCard className="lg:col-span-2 group">
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Globe size={24} />
                  </div>
                  <ExternalLink size={20} className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">Global Fintech Dashboard</h3>
                <p className="text-zinc-400 mb-6 max-w-lg">
                  A high-frequency trading interface capable of processing 50k updates/sec. 
                  Built with Go websocket servers and React 18 concurrent features for buttery smooth data visualization.
                </p>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  <TechPill icon={Code} label="React" color="blue" />
                  <TechPill icon={Zap} label="Golang" color="cyan" />
                  <TechPill icon={Database} label="TimescaleDB" color="emerald" />
                </div>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute top-1/2 right-[-10%] w-[60%] h-[120%] bg-gradient-to-l from-blue-900/20 to-transparent transform -skew-x-12 blur-xl -z-10 group-hover:translate-x-2 transition-transform duration-700"></div>
            </SpotlightCard>

            {/* Project 2 */}
            <SpotlightCard>
              <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                  <Terminal size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">CLI Deployment Tool</h3>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Automated infrastructure provisioner written in Go. Wraps Terraform and AWS SDK.
                </p>
                <div className="flex flex-wrap gap-2">
                  <TechPill icon={Terminal} label="Cobra" color="violet" />
                  <TechPill icon={Globe} label="AWS" color="blue" />
                </div>
              </div>
            </SpotlightCard>

            {/* Project 3 */}
            <SpotlightCard>
              <div className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Distributed Auth</h3>
                <p className="text-zinc-400 text-sm mb-6 flex-1">
                  Microservice handling identity management with gRPC and Redis caching layers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <TechPill icon={Zap} label="gRPC" color="emerald" />
                  <TechPill icon={Database} label="Redis" color="cyan" />
                </div>
              </div>
            </SpotlightCard>

            {/* Project 4 */}
            <SpotlightCard className="lg:col-span-2 group">
              <div className="p-8 h-full flex flex-col">
                 <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                    <Layers size={24} />
                  </div>
                  <ExternalLink size={20} className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Immersive E-Commerce</h3>
                <p className="text-zinc-400 mb-6 max-w-lg">
                  3D product configurator using Three.js and React Fiber. 
                  Features real-time inventory checks via Go microservices.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <TechPill icon={Code} label="React Three Fiber" color="violet" />
                  <TechPill icon={Cpu} label="WebGL" color="blue" />
                  <TechPill icon={Globe} label="Stripe" color="emerald" />
                </div>
              </div>
               <div className="absolute top-1/2 left-[-10%] w-[60%] h-[120%] bg-gradient-to-r from-pink-900/20 to-transparent transform skew-x-12 blur-xl -z-10 group-hover:-translate-x-2 transition-transform duration-700"></div>
            </SpotlightCard>

          </div>
        </section>

        {/* TECH STACK - INFINITE MARQUEE */}
        <section id="stack" className="mt-32">
          <h2 className="text-2xl font-bold mb-8 text-center text-zinc-500 uppercase tracking-widest">Powered By</h2>
          
          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
              {[...TechStack, ...TechStack].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 text-2xl font-bold text-zinc-700 hover:text-white transition-colors cursor-default">
                  {tech.icon}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="mt-40 mb-20">
          <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden text-center p-12 md:p-24">
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to scale?</h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                I'm currently looking for new opportunities in distributed systems and frontend architecture.
              </p>
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Get in Touch
              </button>
            </div>

            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/2 pointer-events-none"></div>
          
          </div>
        </section>

        <footer className="flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm py-8 border-t border-zinc-900">
          <p>© {new Date().getFullYear()} Alex Dev. Built with React & Tailwind.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </footer>

      </main>
    </div>
  );
}

// Data for the Marquee
const TechStack = [
  { name: "GOLANG", icon: <Zap /> },
  { name: "REACT", icon: <Code /> },
  { name: "NEXT.JS", icon: <Globe /> },
  { name: "TYPESCRIPT", icon: <Terminal /> },
  { name: "POSTGRES", icon: <Database /> },
  { name: "DOCKER", icon: <Layers /> },
  { name: "KUBERNETES", icon: <Cpu /> },
  { name: "REDIS", icon: <Zap /> },
];

function GitCommit({size}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3"></circle>
      <line x1="3" y1="12" x2="9" y2="12"></line>
      <line x1="15" y1="12" x2="21" y2="12"></line>
    </svg>
  )
}