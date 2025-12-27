import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Power } from 'lucide-react';

// --- DATA ---
const FILES = {
  projects: [
    { id: 1, name: 'TASK_FLOW.EXE', desc: 'Kanban board w/ Optimistic UI', stack: '[REACT, ZUSTAND]', status: 'DEPLOYED' },
    { id: 2, name: 'GO_AUTH.BAT', desc: 'Distributed Identity Service', stack: '[GO, GRPC, REDIS]', status: 'RUNNING' },
    { id: 3, name: 'CLI_TOOL.SH', desc: 'Microservice Scaffolder', stack: '[GOLANG, COBRA]', status: 'V1.0' },
  ],
  skills: [
    { cat: 'FRONTEND', val: 'React 18, Tailwind, Framer' },
    { cat: 'BACKEND', val: 'Golang, Gin, gRPC' },
    { cat: 'DATABASE', val: 'PostgreSQL, Redis' },
    { cat: 'DEVOPS', val: 'Docker, Linux, AWS' },
  ],
  bio: [
    "Subject: Alex Dev",
    "Role: Junior Full Stack Engineer",
    "Mission: Bridging high-performance Go backends with reactive UIs.",
    "Status: Ready for assignment.",
    "Origin: Self-taught // Passionate."
  ]
};

// --- CRT SCREEN EFFECT ---
const CrtOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
    {/* Scanlines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
    {/* Flicker */}
    <div className="absolute inset-0 bg-white opacity-[0.02] animate-flicker pointer-events-none" />
    {/* Vignette */}
    <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#101010] opacity-80 pointer-events-none" />
  </div>
);

// --- MAIN COMPONENT ---

export default function RetroPortfolio() {
  const [bootSequence, setBootSequence] = useState([
    "BIOS DATE 01/15/24 14:22:55 VER 1.0.2",
    "CPU: GOLANG PROCESSOR @ 3.4GHZ",
    "640K RAM SYSTEM... OK",
    "INITIALIZING VIDEO ADAPTER... OK",
    "LOADING KERNEL... OK",
    "MOUNTING REACT MODULES...",
    " "
  ]);
  const [isBooting, setIsBooting] = useState(true);
  const [activeScreen, setActiveScreen] = useState('MENU'); // MENU, PROJECTS, SKILLS, BIO
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const menuOptions = ['PROJECTS', 'SKILLS', 'IDENTITY', 'CONTACT'];
  const scrollRef = useRef(null);

  // Boot Animation
  useEffect(() => {
    if (!isBooting) return;
    
    let line = 0;
    const interval = setInterval(() => {
      if (line >= 4) { // Simulate varying load times
         if (Math.random() > 0.7) return; 
      }
      
      if (line < bootSequence.length) {
         // Just waiting for the "visual" delay
         line++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 800);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isBooting]);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [bootSequence]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-green-400 font-mono overflow-hidden relative selection:bg-green-500/30 selection:text-black">
      <style>{`
        @keyframes flicker {
          0% { opacity: 0.02; }
          5% { opacity: 0.05; }
          10% { opacity: 0.02; }
          100% { opacity: 0.02; }
        }
        .animate-flicker { animation: flicker 0.15s infinite; }
        .text-glow { text-shadow: 0 0 5px rgba(74, 222, 128, 0.5); }
      `}</style>
      
      <CrtOverlay />

      <div className="relative z-10 h-screen p-4 md:p-12 flex flex-col max-w-4xl mx-auto">
        
        {/* BOOT SEQUENCE */}
        {isBooting ? (
          <div className="flex-1 flex flex-col justify-end pb-20" ref={scrollRef}>
            {bootSequence.map((line, i) => (
              <div key={i} className="mb-1 text-glow text-sm md:text-base">
                {line}
              </div>
            ))}
            <div className="animate-pulse">_</div>
          </div>
        ) : (
          /* MAIN OS INTERFACE */
          <div className="flex-1 border-2 border-green-500/30 rounded-lg p-6 md:p-10 flex flex-col shadow-[0_0_20px_rgba(34,197,94,0.1)] relative bg-black/50 backdrop-blur-sm">
            
            {/* Header */}
            <div className="flex justify-between items-end border-b-2 border-green-500/30 pb-4 mb-8 select-none">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-glow tracking-widest mb-1">ALEX_OS</h1>
                <div className="text-xs text-green-600">v.2.0.4 // UNREGISTERED HYPERCAM</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-xs">MEM: 64KB OK</div>
                <div className="text-xs">NET: CONNECTED</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              
              {/* --- MAIN MENU --- */}
              {activeScreen === 'MENU' && (
                <div className="space-y-6">
                  <p className="mb-8 text-green-300">
                    WELCOME, USER. SELECT A MODULE TO LOAD:
                  </p>
                  <div className="space-y-4 pl-4">
                    {menuOptions.map((opt, i) => (
                      <button 
                        key={opt}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => setActiveScreen(opt === 'IDENTITY' ? 'BIO' : opt)}
                        className={`block w-full text-left text-lg md:text-xl transition-all duration-75 group ${selectedIndex === i ? 'text-green-400 font-bold text-glow translate-x-4' : 'text-green-700 hover:text-green-600'}`}
                      >
                        <span className="inline-block w-6">{selectedIndex === i ? '>' : ''}</span>
                        [{i + 1}] {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* --- PROJECTS SCREEN --- */}
              {activeScreen === 'PROJECTS' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold border-b border-green-800 pb-2 mb-6 w-fit">{'>'}{'>'} DIR /PROJECTS</h2>
                  
                  <div className="grid gap-6">
                    {FILES.projects.map(proj => (
                      <div key={proj.id} className="border border-green-500/30 p-4 hover:bg-green-500/10 cursor-pointer transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-lg group-hover:text-glow">{proj.name}</span>
                          <span className="text-xs border border-green-600 px-1 py-0.5">{proj.status}</span>
                        </div>
                        <p className="text-green-300/80 mb-3 text-sm">{proj.desc}</p>
                        <div className="text-xs text-green-600 font-bold">{proj.stack}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- SKILLS SCREEN --- */}
              {activeScreen === 'SKILLS' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold border-b border-green-800 pb-2 mb-6 w-fit">{'>'}{'>'} CAT SKILLS.LOG</h2>
                  
                  <div className="font-mono space-y-4">
                    {FILES.skills.map((skill, i) => (
                      <div key={i}>
                        <span className="text-green-600">root@alex:~$</span> check_proficiency --{skill.cat.toLowerCase()}
                        <div className="pl-4 py-1 text-green-300 text-glow">
                          {'>'} {skill.val}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- BIO SCREEN --- */}
              {activeScreen === 'BIO' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <h2 className="text-xl font-bold border-b border-green-800 pb-2 mb-6 w-fit">{'>'}{'>'} WHOAMI</h2>
                   <div className="p-4 border-l-2 border-green-500/50 bg-green-500/5 leading-relaxed space-y-4">
                     {FILES.bio.map((line, i) => (
                       <p key={i}>{line}</p>
                     ))}
                   </div>
                   <div className="pt-4 text-green-600 text-xs">
                     END OF FILE.
                   </div>
                </div>
              )}

              {/* --- CONTACT SCREEN --- */}
              {activeScreen === 'CONTACT' && (
                <div className="space-y-6 animate-in fade-in duration-300 flex flex-col items-center justify-center h-full">
                   <div className="text-4xl mb-4 text-glow animate-pulse">✉</div>
                   <p>ESTABLISH UPLINK?</p>
                   <div className="flex gap-4 mt-4">
                     <button className="border border-green-500 px-6 py-2 hover:bg-green-500 hover:text-black font-bold transition-colors">
                       YES (EMAIL)
                     </button>
                     <button className="border border-green-800 text-green-800 px-6 py-2 hover:border-green-600 hover:text-green-600 transition-colors">
                       NO (ABORT)
                     </button>
                   </div>
                </div>
              )}

            </div>

            {/* Footer Navigation */}
            {activeScreen !== 'MENU' && (
              <div className="mt-6 pt-4 border-t border-green-500/30 flex justify-between text-xs text-green-600">
                <span>[ESC] BACK TO MENU</span>
                <button onClick={() => setActiveScreen('MENU')} className="hover:text-green-400 hover:underline">
                  <span className="animate-pulse">_</span>RETURN
                </button>
              </div>
            )}
            
          </div>
        )}

        <div className="mt-4 text-center text-[10px] text-green-900 select-none">
          SYSTEM_ID: 8492-AC // TERMINAL_MODE
        </div>

      </div>
    </div>
  );
}