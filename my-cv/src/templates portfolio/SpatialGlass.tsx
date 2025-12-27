import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  ExternalLink, 
  Github, 
  Linkedin,
  ChevronRight,
  Zap,
  Layout,
  Server,
  Database,
  Terminal,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

// --- COMPONENTS ---

const GlassCard = ({ children, className = "", hoverEffect = true }) => (
  <div className={`
    relative overflow-hidden rounded-3xl 
    bg-white/5 backdrop-blur-2xl border border-white/10 
    shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
    ${hoverEffect ? 'transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_15px_40px_0_rgba(0,0,0,0.4)]' : ''}
    ${className}
  `}>
    {/* Noise Texture Overlay for that "Premium" feel */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const SkillBadge = ({ icon: Icon, label, level }) => (
  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
    <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300">
      <Icon size={18} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-[10px] text-zinc-400 font-mono">{level}%</span>
      </div>
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, desc, stack, type }) => (
  <GlassCard className="p-0 group h-full flex flex-col">
    <div className="h-40 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 relative overflow-hidden">
      {/* Mock Browser UI */}
      <div className="absolute top-4 left-4 right-4 h-full bg-zinc-950/80 rounded-t-xl border border-white/10 p-3 shadow-2xl translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
        <div className="w-full h-24 rounded bg-zinc-900/50 flex items-center justify-center">
           <span className="text-zinc-700 font-mono text-xs">{type === 'frontend' ? '<ReactApp />' : 'func main() {}'}</span>
        </div>
      </div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
        <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
      </div>
      <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-1">
        {desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {stack.map((tech) => (
          <span key={tech} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider font-medium text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
    </div>
  </GlassCard>
);

// --- MAIN LAYOUT ---

export default function SpatialPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax on background based on mouse
  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 20, 
        y: (e.clientY / window.innerHeight) * 20 
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* 1. ANIMATED BACKGROUND (The "Spatial" Vibe) */}
      <div className="fixed inset-0 z-0">
        {/* Deep Gradient Blobs */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4s]"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        ></div>
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000 duration-[5s]"
          style={{ transform: `translate(-${mousePos.x}px, -${mousePos.y}px)` }}
        ></div>
        <div 
          className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-2000"
        ></div>
      </div>

      {/* 2. MAIN CONTENT SCROLL AREA */}
      <div className="relative z-10 h-screen overflow-y-auto overflow-x-hidden pb-32">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
          
          {/* HEADER / HERO */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Junior Full Stack Developer
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                Building bridge <br/>
                between <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">UI & Data</span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                Hi, I'm Alex. I might not have 10 years of experience, but I have an obsession with 
                clean <strong>React</strong> components and performant <strong>Go</strong> backends.
                I build apps that look good and run fast.
              </p>
            </div>
            
            {/* Quick Contact Card */}
            <GlassCard className="p-6 min-w-[280px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                  🚀
                </div>
                <div>
                  <h3 className="font-bold text-white">Alex Dev</h3>
                  <p className="text-xs text-zinc-400">San Francisco, CA</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors">Resume</button>
                <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"><Github size={20} /></button>
                <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"><Linkedin size={20} /></button>
              </div>
            </GlassCard>
          </div>

          {/* SKILLS SECTION ("The Growth Stack") */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Code className="text-indigo-400" /> Core Stack
              </h2>
              <div className="space-y-4">
                <SkillBadge icon={Layout} label="React & Next.js" level={85} />
                <SkillBadge icon={Zap} label="Golang & Gin" level={70} />
                <SkillBadge icon={Database} label="PostgreSQL" level={60} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="text-purple-400" /> Learning Now
              </h2>
              <GlassCard className="p-6 h-full border-dashed border-white/20">
                <p className="text-sm text-zinc-400 mb-4">
                  Currently expanding my knowledge in DevOps and System Architecture.
                </p>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><Server size={14}/></div>
                     <div>
                       <div className="text-sm font-medium text-white">Docker & K8s</div>
                       <div className="text-xs text-zinc-500">Containerizing my Go apps</div>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400"><Terminal size={14}/></div>
                     <div>
                       <div className="text-sm font-medium text-white">AWS Lambda</div>
                       <div className="text-xs text-zinc-500">Serverless experiments</div>
                     </div>
                   </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* PROJECTS SECTION */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Briefcase className="text-cyan-400" /> Featured Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">
              
              {/* Project 1 - Featured */}
              <div className="md:col-span-2 h-full">
                <ProjectCard 
                  title="Real-time Chat w/ Go"
                  desc="A slack-clone built to learn WebSockets and Concurrency. Handles 1k+ concurrent connections with a Go backend and a responsive React frontend with optimistic UI updates."
                  stack={['Golang', 'Goroutines', 'React', 'Tailwind', 'Redis']}
                  type="backend"
                />
              </div>

              {/* Project 2 */}
              <div className="h-full">
                <ProjectCard 
                  title="Task Flow"
                  desc="A drag-and-drop Kanban board focusing on complex React state management and accessibility (a11y)."
                  stack={['React', 'Dnd-Kit', 'Zustand']}
                  type="frontend"
                />
              </div>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <GlassCard className="p-12 text-center relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-3xl font-bold text-white mb-4">Hire for Potential</h2>
               <p className="text-zinc-400 max-w-lg mx-auto mb-8">
                 I'm looking for a Junior role where I can contribute immediately while learning from a strong engineering team.
               </p>
               <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 mx-auto">
                 <Mail size={18} /> Let's Talk
               </button>
             </div>
             {/* BG Decoration */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px]"></div>
          </GlassCard>

        </div>
      </div>

      {/* 3. FLOATING DOCK NAVIGATION (Mobile Friendly) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'code', icon: Code, label: 'Stack' },
            { id: 'work', icon: Briefcase, label: 'Work' },
            { id: 'about', icon: User, label: 'Bio' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                relative p-3 rounded-xl transition-all duration-300 group
                ${activeTab === item.id ? 'bg-white/10 text-white scale-110 shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}
              `}
            >
              <item.icon size={20} />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                {item.label}
              </span>
              
              {/* Active Indicator Dot */}
              {activeTab === item.id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></span>
              )}
            </button>
          ))}
          
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          
          <button className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 transition-all hover:scale-105">
            <Mail size={20} />
          </button>
        </div>
      </div>

    </div>
  );
}