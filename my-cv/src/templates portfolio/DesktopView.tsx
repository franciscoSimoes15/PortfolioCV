import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Folder, 
  User, 
  X, 
  Minus, 
  Maximize2, 
  Github, 
  Globe, 
  Cpu, 
  Wifi, 
  Battery, 
  Search,
  Layout,
  Server,
  Code
} from 'lucide-react';

// --- CONFIG & DATA ---

const APPS = [
  { id: 'bio', label: 'Bio.txt', icon: User, type: 'text', color: 'bg-blue-500' },
  { id: 'projects', label: 'Projects', icon: Folder, type: 'explorer', color: 'bg-yellow-500' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, type: 'terminal', color: 'bg-zinc-800' },
  { id: 'browser', label: 'Chrome', icon: Globe, type: 'browser', color: 'bg-red-500' },
];

const PROJECTS = [
  { name: 'task-flow', stack: 'React/Go', status: 'Production', desc: 'Kanban board with optimistic UI.' },
  { name: 'auth-service', stack: 'Go/gRPC', status: 'Production', desc: 'Distributed identity provider.' },
  { name: 'cli-tools', stack: 'Cobra', status: 'Beta', desc: 'DevOps scaffolding utilities.' },
];

// --- WINDOW COMPONENT ---

const Window = ({ app, onClose, onMinimize, isActive, onClick, style }) => {
  return (
    <div 
      onClick={onClick}
      className={`absolute rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col transition-transform duration-200 ${isActive ? 'z-50 scale-100' : 'z-10 scale-[0.98] opacity-90'}`}
      style={{
        ...style,
        width: '600px',
        height: '400px',
        backgroundColor: '#1e1e2e', // Catppuccin-ish dark
      }}
    >
      {/* Title Bar */}
      <div className="h-10 bg-[#252535] border-b border-white/5 flex items-center px-4 justify-between handle cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
           <div onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center group"><X size={8} className="opacity-0 group-hover:opacity-100 text-black"/></div>
           <div onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer flex items-center justify-center group"><Minus size={8} className="opacity-0 group-hover:opacity-100 text-black"/></div>
           <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer flex items-center justify-center group"><Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black"/></div>
        </div>
        <div className="text-xs font-medium text-zinc-400 select-none flex items-center gap-2">
          <app.icon size={12} /> {app.label}
        </div>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#1e1e2e] text-zinc-200 p-0 relative">
        
        {/* APP: BIO (TEXT EDITOR) */}
        {app.type === 'text' && (
          <div className="p-6 font-mono text-sm leading-relaxed">
            <h1 className="text-xl font-bold mb-4 text-blue-400"># About Me</h1>
            <p className="mb-4">
              Hi, I'm Alex. I'm a Junior Full Stack Engineer with a passion for <span className="text-yellow-300">performance</span> and <span className="text-blue-300">usability</span>.
            </p>
            <p className="mb-4">
              I don't just write code; I build systems. My frontend work focuses on optimistic updates and accessibility, while my backend work emphasizes strict typing and concurrency.
            </p>
            <div className="mt-8 pt-4 border-t border-zinc-700 text-xs text-zinc-500">
              Last modified: Just now
            </div>
          </div>
        )}

        {/* APP: PROJECTS (FINDER) */}
        {app.type === 'explorer' && (
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-40 bg-[#181825] p-3 flex flex-col gap-1">
               <div className="text-[10px] font-bold text-zinc-500 uppercase px-2 mb-1">Favorites</div>
               <div className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs flex items-center gap-2 font-medium"><Code size={12}/> Projects</div>
               <div className="px-2 py-1 rounded hover:bg-white/5 text-zinc-400 text-xs flex items-center gap-2"><Github size={12}/> GitHub</div>
               <div className="px-2 py-1 rounded hover:bg-white/5 text-zinc-400 text-xs flex items-center gap-2"><Server size={12}/> Servers</div>
            </div>
            {/* Main Grid */}
            <div className="flex-1 p-4">
               <div className="grid grid-cols-3 gap-4">
                 {PROJECTS.map((proj, i) => (
                   <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                     <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                       <Folder size={24} fill="currentColor" className="opacity-80"/>
                     </div>
                     <div className="text-center">
                       <div className="text-xs font-bold">{proj.name}</div>
                       <div className="text-[10px] text-zinc-500">{proj.stack}</div>
                     </div>
                   </div>
                 ))}
                 
                 {/* New Folder Placeholder */}
                 <div className="flex flex-col items-center gap-2 p-4 rounded-xl opacity-50">
                    <div className="w-12 h-12 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center">
                       <Layout size={20} className="text-zinc-600"/>
                    </div>
                    <div className="text-[10px] text-zinc-600">Coming Soon...</div>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* APP: TERMINAL */}
        {app.type === 'terminal' && (
           <TerminalContent />
        )}
        
        {/* APP: BROWSER (PLACEHOLDER) */}
        {app.type === 'browser' && (
          <div className="h-full flex flex-col">
            <div className="h-8 bg-[#181825] flex items-center px-2 gap-2 border-b border-black">
              <div className="flex-1 bg-[#1e1e2e] rounded-full h-5 text-[10px] flex items-center px-3 text-zinc-500">
                https://alex.dev/contact
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center flex-col gap-4">
               <Globe size={48} className="text-zinc-700"/>
               <p className="text-zinc-500">404: Just kidding. Hire me?</p>
               <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm">Send Email</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Sub-component for Terminal Logic
const TerminalContent = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Alex OS [Version 1.0.0]' },
    { type: 'output', text: '(c) 2024 Alex Corporation. All rights reserved.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const newHistory = [...history, { type: 'input', text: cmd }];
      
      // Command Logic
      if (cmd === 'help') {
        newHistory.push({ type: 'output', text: 'Available commands: about, stack, contact, clear, whoami' });
      } else if (cmd === 'whoami') {
         newHistory.push({ type: 'output', text: 'root (The Recruiter)' });
      } else if (cmd === 'about') {
        newHistory.push({ type: 'output', text: 'Junior Full Stack Engineer. React enthusiast. Golang apprentice.' });
      } else if (cmd === 'stack') {
        newHistory.push({ type: 'output', text: '- Frontend: React, Tailwind, Next.js' });
        newHistory.push({ type: 'output', text: '- Backend: Go, Gin, gRPC' });
        newHistory.push({ type: 'output', text: '- DB: Postgres, Redis' });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd !== '') {
        newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="p-4 font-mono text-xs h-full bg-black/90 text-green-400 overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className={`${line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-white' : 'text-green-400'} mb-1`}>
          {line.type === 'input' ? <span className="text-blue-400 mr-2">➜ ~</span> : ''}
          {line.text}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-blue-400 mr-2">➜ ~</span>
        <input 
          id="term-input"
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none border-none flex-1 text-white"
          autoFocus
        />
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
};


// --- DESKTOP ICONS ---

const DesktopIcon = ({ app, onClick }) => (
  <div 
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 cursor-pointer w-24 group transition-colors"
  >
    <div className={`w-12 h-12 ${app.color} rounded-xl shadow-lg flex items-center justify-center text-white mb-1 group-hover:scale-105 transition-transform`}>
      <app.icon size={24} />
    </div>
    <span className="text-xs text-white font-medium drop-shadow-md bg-black/20 px-2 rounded-full">{app.label}</span>
  </div>
);

// --- MAIN OS COMPONENT ---

export default function WebOsPortfolio() {
  const [windows, setWindows] = useState([
    { id: 'welcome', app: APPS[0], x: 100, y: 50, z: 1 } // Open Bio by default
  ]);
  const [activeWindowId, setActiveWindowId] = useState('welcome');
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (app) => {
    const existing = windows.find(w => w.app.id === app.id);
    if (existing) {
      setActiveWindowId(existing.id);
      return;
    }
    const newWindow = { 
      id: Date.now(), 
      app, 
      x: 50 + (windows.length * 30), 
      y: 50 + (windows.length * 30),
      z: windows.length + 1 
    };
    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const focusWindow = (id) => {
    setActiveWindowId(id);
    // Move to top of stack visually could be done by sorting z-index, 
    // but simple state toggle works for focus effect
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-cover bg-center font-sans select-none relative"
         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)' }}>
      
      {/* 1. TOP BAR */}
      <div className="h-7 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-xs font-medium text-white shadow-sm relative z-50">
        <div className="flex items-center gap-4">
          <div 
             className="font-bold cursor-pointer hover:text-blue-300 transition-colors"
             onClick={() => setMenuOpen(!menuOpen)}
          >
              AlexOS
          </div>
          <div className="hidden md:block opacity-80 hover:opacity-100 cursor-pointer">File</div>
          <div className="hidden md:block opacity-80 hover:opacity-100 cursor-pointer">Edit</div>
          <div className="hidden md:block opacity-80 hover:opacity-100 cursor-pointer">View</div>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1 opacity-80"><Wifi size={12}/> <span className="hidden md:inline">Wi-Fi</span></div>
           <div className="flex items-center gap-1 opacity-80"><Battery size={12}/> <span className="hidden md:inline">100%</span></div>
           <div className="opacity-80"><Search size={12}/></div>
           <div>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>

        {/* Start Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-8 left-2 w-48 bg-[#1e1e2e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1 flex flex-col text-zinc-300">
             <div className="px-3 py-1.5 hover:bg-blue-600 hover:text-white rounded cursor-pointer">About This Portfolio</div>
             <div className="h-px bg-white/10 my-1"></div>
             <div className="px-3 py-1.5 hover:bg-blue-600 hover:text-white rounded cursor-pointer">System Preferences...</div>
             <div className="px-3 py-1.5 hover:bg-blue-600 hover:text-white rounded cursor-pointer">App Store...</div>
             <div className="h-px bg-white/10 my-1"></div>
             <div className="px-3 py-1.5 hover:bg-blue-600 hover:text-white rounded cursor-pointer">Shut Down...</div>
          </div>
        )}
      </div>

      {/* 2. DESKTOP AREA */}
      <div className="absolute inset-0 pt-10 pb-24 px-4 flex flex-col flex-wrap content-start gap-4">
         {APPS.map(app => (
           <DesktopIcon key={app.id} app={app} onClick={() => openApp(app)} />
         ))}
      </div>

      {/* 3. WINDOWS LAYER */}
      {windows.map(win => (
        <Window 
          key={win.id}
          app={win.app}
          isActive={activeWindowId === win.id}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => closeWindow(win.id)} // Simplify minimize to close for demo
          onClick={() => focusWindow(win.id)}
          style={{ 
            top: win.y, 
            left: win.x,
          }}
        />
      ))}

      {/* 4. DOCK */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-end gap-2 shadow-2xl hover:scale-105 transition-transform duration-300">
           {APPS.map(app => (
             <div 
               key={app.id} 
               onClick={() => openApp(app)}
               className="group relative flex flex-col items-center gap-1 cursor-pointer"
             >
               {/* Tooltip */}
               <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-[10px] px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none">
                 {app.label}
               </div>
               
               {/* Icon */}
               <div className={`w-10 h-10 md:w-12 md:h-12 ${app.color} rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200 group-hover:-translate-y-2 group-active:scale-95`}>
                 <app.icon size={24} />
               </div>
               
               {/* Active Dot */}
               {windows.some(w => w.app.id === app.id) && (
                 <div className="w-1 h-1 bg-white/80 rounded-full"></div>
               )}
             </div>
           ))}
           <div className="w-px h-10 bg-white/10 mx-1"></div>
           <div className="w-10 h-10 md:w-12 md:h-12 bg-zinc-800 rounded-full overflow-hidden border-2 border-zinc-600 cursor-pointer hover:brightness-110">
             {/* Fake Trash Bin or User Avatar */}
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" />
           </div>
        </div>
      </div>

    </div>
  );
}