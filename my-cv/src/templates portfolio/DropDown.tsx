import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Command, 
  Briefcase, 
  User, 
  Mail, 
  Code, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Github, 
  Linkedin,
  Terminal,
  X,
  ChevronRight,
  Database,
  Server,
  Layout
} from 'lucide-react';

// --- DATA ---
const COMMANDS = [
  { id: 'bio', label: 'Read Biography', icon: User, type: 'action', keywords: ['about', 'me', 'profile'] },
  { id: 'stack', label: 'View Tech Stack', icon: Cpu, type: 'action', keywords: ['skills', 'tech', 'react', 'go'] },
  { id: 'proj-1', label: 'Project: TaskFlow', icon: Layout, type: 'project', keywords: ['react', 'kanban', 'frontend'] },
  { id: 'proj-2', label: 'Project: GoAuth', icon: Server, type: 'project', keywords: ['backend', 'go', 'auth', 'grpc'] },
  { id: 'github', label: 'Open GitHub', icon: Github, type: 'link', url: 'https://github.com', keywords: ['git', 'code'] },
  { id: 'email', label: 'Copy Email Address', icon: Mail, type: 'action', keywords: ['contact', 'hire'] },
];

// --- COMPONENTS ---

const Shortcut = ({ keys }) => (
  <div className="flex gap-1">
    {keys.map((k, i) => (
      <span key={i} className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded border border-zinc-700 font-mono">
        {k}
      </span>
    ))}
  </div>
);

const DetailView = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="absolute inset-0 bg-[#0c0c0c] z-20 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-zinc-100 font-medium">
          <item.icon size={18} className="text-indigo-400" />
          {item.label}
        </div>
        <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
          <span className="sr-only">Close</span>
          <kbd className="font-sans text-xs bg-zinc-800 px-2 py-1 rounded">ESC</kbd>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        
        {item.id === 'bio' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white">Junior Engineer, <br/> Senior Mindset.</h2>
            <p className="text-zinc-400 leading-relaxed text-lg">
              I'm Alex, a developer who bridges the gap between <strong className="text-indigo-400">React</strong> interactivity and <strong className="text-emerald-400">Golang</strong> performance.
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                 <div className="text-2xl font-bold text-white mb-1">100%</div>
                 <div className="text-xs text-zinc-500 uppercase">Self Taught</div>
               </div>
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                 <div className="text-2xl font-bold text-white mb-1">2024</div>
                 <div className="text-xs text-zinc-500 uppercase">First Commit</div>
               </div>
            </div>
          </div>
        )}

        {item.id === 'stack' && (
          <div className="max-w-2xl mx-auto">
             <h2 className="text-2xl font-bold text-white mb-8">System Capabilities</h2>
             <div className="space-y-4">
               {/* Skill Item */}
               <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-indigo-500/50 transition-colors group">
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><Layout size={20}/></div>
                   <div>
                     <div className="font-bold text-white">React & Next.js</div>
                     <div className="text-xs text-zinc-500">Frontend Architecture</div>
                   </div>
                 </div>
                 <div className="flex gap-1">
                   <div className="w-2 h-8 bg-indigo-500 rounded-sm"></div>
                   <div className="w-2 h-8 bg-indigo-500 rounded-sm"></div>
                   <div className="w-2 h-8 bg-indigo-500 rounded-sm"></div>
                   <div className="w-2 h-8 bg-zinc-800 rounded-sm"></div>
                 </div>
               </div>

               <div className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-emerald-500/50 transition-colors group">
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Zap size={20}/></div>
                   <div>
                     <div className="font-bold text-white">Golang</div>
                     <div className="text-xs text-zinc-500">Microservices & CLI</div>
                   </div>
                 </div>
                 <div className="flex gap-1">
                   <div className="w-2 h-8 bg-emerald-500 rounded-sm"></div>
                   <div className="w-2 h-8 bg-emerald-500 rounded-sm"></div>
                   <div className="w-2 h-8 bg-zinc-800 rounded-sm"></div>
                   <div className="w-2 h-8 bg-zinc-800 rounded-sm"></div>
                 </div>
               </div>
             </div>
          </div>
        )}

        {item.type === 'project' && (
          <div className="max-w-2xl mx-auto">
             <div className="aspect-video bg-zinc-900 rounded-2xl border border-zinc-800 mb-8 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10"></div>
                {item.id === 'proj-1' ? <Layout size={64} className="text-zinc-700" /> : <Server size={64} className="text-zinc-700" />}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 rounded-full text-xs text-white border border-white/10">
                  {item.id === 'proj-1' ? 'Live Demo' : 'v1.0.2'}
                </div>
             </div>
             
             <h2 className="text-3xl font-bold text-white mb-4">{item.label}</h2>
             <p className="text-zinc-400 leading-relaxed mb-8">
               {item.id === 'proj-1' 
                 ? "A drag-and-drop Kanban board built with React 18 concurrent features. Solves the problem of state synchronization across multiple clients using optimistic updates." 
                 : "A high-throughput authentication service. Handles JWT issuance, rotation, and role-based access control. Built with Go, gRPC, and Redis."}
             </p>

             <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-colors">
                 <Github size={18} /> View Code
               </button>
               <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-zinc-800 text-white font-bold border border-zinc-700 hover:bg-zinc-700 transition-colors">
                 <ArrowRight size={18} /> Deployment
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default function CommandPortfolio() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const inputRef = useRef(null);

  // Filter commands based on query
  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.keywords.some(k => k.includes(query.toLowerCase()))
  );

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeItem) {
        if (e.key === 'Escape') setActiveItem(null);
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(filteredCommands[selectedIndex]);
      }
      
      // Focus input on any key press if not focused
      if (document.activeElement !== inputRef.current && !activeItem) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, selectedIndex, activeItem]);

  const handleSelect = (item) => {
    if (!item) return;
    if (item.type === 'link') {
      window.open(item.url, '_blank');
    } else if (item.id === 'email') {
      navigator.clipboard.writeText('alex@example.com');
      alert('Email copied to clipboard!'); // Simple feedback
    } else {
      setActiveItem(item);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-zinc-300 font-sans selection:bg-indigo-500/30 flex items-center justify-center p-4">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Main Container (The "Modal") */}
      <div className="w-full max-w-2xl bg-[#141414] border border-zinc-800 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col h-[600px] md:h-[500px]">
        
        {/* Active Item View Overlay */}
        {activeItem && <DetailView item={activeItem} onClose={() => setActiveItem(null)} />}

        {/* 1. INPUT AREA */}
        <div className="flex items-center px-4 py-4 border-b border-zinc-800 gap-3 shrink-0">
          <Search className={`text-zinc-500 transition-colors ${query ? 'text-indigo-400' : ''}`} size={20} />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Type a command or search..."
            className="bg-transparent border-none outline-none text-lg text-white placeholder-zinc-600 flex-1 h-full"
            autoFocus
          />
          <div className="hidden md:flex gap-2">
            <Shortcut keys={['↑', '↓']} />
            <Shortcut keys={['↵']} />
          </div>
        </div>

        {/* 2. LIST AREA */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
          <div className="space-y-1">
            <div className="px-2 py-2 text-xs font-bold text-zinc-600 uppercase tracking-wider flex justify-between">
              <span>{query ? 'Search Results' : 'Suggested'}</span>
              <span className="font-mono">{filteredCommands.length} items</span>
            </div>
            
            {filteredCommands.map((cmd, index) => {
              const isActive = index === selectedIndex;
              return (
                <div 
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`
                    flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-all duration-100
                    ${isActive ? 'bg-indigo-600/10 border-l-2 border-indigo-500 pl-2.5' : 'hover:bg-zinc-900 border-l-2 border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-zinc-800 text-zinc-400'}`}>
                      <cmd.icon size={18} />
                    </div>
                    <div>
                      <div className={`font-medium ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                        {cmd.label}
                      </div>
                      {query && (
                        <div className="text-[10px] text-zinc-500">
                          Matches: {cmd.keywords.filter(k => k.includes(query.toLowerCase())).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="text-xs text-zinc-500 flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                      {cmd.type === 'action' ? 'Run Action' : 'Open'} 
                      <CornerDownLeftIcon />
                    </div>
                  )}
                </div>
              );
            })}

            {filteredCommands.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                <Command size={32} className="mx-auto mb-4 opacity-20" />
                <p>No commands found for "{query}"</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. FOOTER */}
        <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-500 flex justify-between items-center shrink-0">
          <div className="flex gap-4">
             <span className="flex items-center gap-1"><User size={10}/> Alex Dev</span>
             <span className="flex items-center gap-1"><Github size={10}/> git/main</span>
          </div>
          <div className="hidden md:block">
            Powered by React + Go
          </div>
        </div>

      </div>
    </div>
  );
}

// Icon helper
const CornerDownLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 10 4 15 9 20"></polyline>
    <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
  </svg>
);