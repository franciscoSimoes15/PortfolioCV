import React, { useState } from 'react';
import { 
  Globe, 
  Layout, 
  Server, 
  Database, 
  Terminal, 
  Cpu, 
  Zap, 
  Search,
  Filter,
  XOctagon,
  AlertCircle,
  Play,
  Trash2,
  MoreHorizontal,
  Wifi,
  HardDrive,
  Box,
  ChevronRight,
  ChevronDown,
  X
} from 'lucide-react';

// --- DATA ---

const NETWORK_REQUESTS = [
  { 
    id: 'proj1', 
    name: 'task-flow-api', 
    method: 'GET', 
    status: 200, 
    type: 'xhr', 
    size: '1.4 MB', 
    time: '3 mos',
    desc: 'Kanban board with optimistic UI updates.',
    tech: ['React', 'Zustand', 'dnd-kit'],
    link: '#'
  },
  { 
    id: 'proj2', 
    name: 'auth-service', 
    method: 'POST', 
    status: 201, 
    type: 'fetch', 
    size: '12 KB', 
    time: '1 mo',
    desc: 'Distributed identity management with JWT/RBAC.',
    tech: ['Golang', 'gRPC', 'Redis'],
    link: '#'
  },
  { 
    id: 'proj3', 
    name: 'analytics-dashboard', 
    method: 'GET', 
    status: 304, 
    type: 'document', 
    size: '450 KB', 
    time: '2 wks',
    desc: 'Next.js data visualization suite.',
    tech: ['Next.js', 'Tailwind', 'Recharts'],
    link: '#'
  },
  { 
    id: 'proj4', 
    name: 'cli-scaffold', 
    method: 'PUT', 
    status: 200, 
    type: 'script', 
    size: '5 MB', 
    time: '4 mos',
    desc: 'Go CLI for generating microservice templates.',
    tech: ['Go', 'Cobra', 'Viper'],
    link: '#'
  }
];

const LOCAL_STORAGE = [
  { key: 'theme', value: '"dark"' },
  { key: 'user_role', value: '"Full Stack Engineer"' },
  { key: 'skill_react', value: '{"level": "Advanced", "years": 3}' },
  { key: 'skill_golang', value: '{"level": "Intermediate", "years": 1}' },
  { key: 'preferred_db', value: '"PostgreSQL"' },
  { key: 'deployment', value: '"Docker + K8s"' },
  { key: 'availability', value: '"Immediate"' },
];

// --- COMPONENTS ---

const TabButton = ({ id, label, activeTab, onClick }) => (
  <button
    onClick={() => onClick(id)}
    className={`px-4 py-2 text-xs border-r border-zinc-700 hover:bg-zinc-800 transition-colors ${activeTab === id ? 'bg-zinc-800 text-zinc-100 border-b-2 border-b-blue-500' : 'text-zinc-400'}`}
  >
    {label}
  </button>
);

const ConsoleMessage = ({ type, children }) => (
  <div className={`font-mono text-xs py-1 border-b border-zinc-800/50 flex gap-2 px-2 ${type === 'error' ? 'bg-red-900/10 text-red-300' : 'text-zinc-300'}`}>
    <span className="text-blue-400">›</span>
    {children}
  </div>
);

const NetworkDetail = ({ request, onClose }) => (
  <div className="absolute top-0 right-0 w-80 h-full bg-[#202124] border-l border-zinc-700 shadow-xl z-20 flex flex-col animate-in slide-in-from-right duration-200">
    <div className="h-8 flex items-center justify-between px-2 bg-[#2b2b2b] border-b border-zinc-700">
      <span className="text-xs font-bold text-zinc-300">Headers</span>
      <button onClick={onClose}><X size={14} className="text-zinc-400 hover:text-white"/></button>
    </div>
    <div className="p-4 overflow-y-auto font-mono text-xs space-y-4">
      <div>
        <div className="font-bold text-zinc-400 mb-1">General</div>
        <div className="pl-2 space-y-1 text-zinc-300">
          <div className="flex gap-2"><span className="text-zinc-500">Request URL:</span> <span className="text-blue-400">https://alex.dev/{request.name}</span></div>
          <div className="flex gap-2"><span className="text-zinc-500">Request Method:</span> <span className="text-emerald-400">{request.method}</span></div>
          <div className="flex gap-2"><span className="text-zinc-500">Status Code:</span> <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> {request.status}</span></div>
        </div>
      </div>
      
      <div>
        <div className="font-bold text-zinc-400 mb-1">Response Payload</div>
        <div className="bg-[#181818] p-2 rounded border border-zinc-700 text-zinc-300">
          <div className="text-zinc-500 mb-2">// {request.desc}</div>
          <div>{`{`}</div>
          <div className="pl-4"><span className="text-purple-400">"stack"</span>: [</div>
          {request.tech.map(t => (
            <div key={t} className="pl-8 text-yellow-300">"{t}",</div>
          ))}
          <div className="pl-4">],</div>
          <div className="pl-4"><span className="text-purple-400">"duration"</span>: <span className="text-blue-400">"{request.time}"</span></div>
          <div>{`}`}</div>
        </div>
      </div>
      
      <button className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-center font-sans font-bold">
        View Source Code
      </button>
    </div>
  </div>
);

// --- MAIN LAYOUT ---

export default function DevToolsPortfolio() {
  const [activeTab, setActiveTab] = useState('network');
  const [selectedReq, setSelectedReq] = useState(null);
  const [filter, setFilter] = useState('');

  return (
    <div className="h-screen bg-[#202124] text-[#9aa0a6] font-sans text-xs flex flex-col overflow-hidden selection:bg-blue-500/30 selection:text-white">
      
      {/* 1. TOP TOOLBAR */}
      <div className="h-8 bg-[#2b2b2b] border-b border-zinc-700 flex items-center px-2 select-none">
        <div className="flex items-center gap-2 mr-4 text-zinc-400">
          <XOctagon size={14} className="hover:text-red-400 cursor-pointer"/>
          <AlertCircle size={14} className="hover:text-blue-400 cursor-pointer"/>
        </div>
        <div className="flex h-full">
          <TabButton id="elements" label="Elements" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="console" label="Console" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="network" label="Network" activeTab={activeTab} onClick={setActiveTab} />
          <TabButton id="application" label="Application" activeTab={activeTab} onClick={setActiveTab} />
        </div>
      </div>

      {/* 2. TAB CONTENT */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        
        {/* --- NETWORK TAB (PROJECTS) --- */}
        {activeTab === 'network' && (
          <div className="flex flex-col h-full bg-[#242528]">
            {/* Filter Bar */}
            <div className="h-7 border-b border-zinc-700 flex items-center px-2 gap-2 bg-[#2b2b2b]">
              <div className="p-0.5 rounded hover:bg-zinc-700 cursor-pointer text-red-400"><div className="w-2 h-2 rounded-full bg-red-500"></div></div>
              <div className="p-0.5 rounded hover:bg-zinc-700 cursor-pointer"><Filter size={12}/></div>
              <div className="h-4 w-px bg-zinc-600 mx-1"></div>
              <input 
                type="text" 
                placeholder="Filter" 
                className="bg-transparent border-none outline-none text-zinc-300 placeholder-zinc-600 h-full w-32"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <div className="flex gap-1">
                 {['All', 'Fetch/XHR', 'JS', 'CSS', 'Img', 'Media'].map(f => (
                   <span key={f} className={`px-1.5 cursor-pointer hover:bg-zinc-700 rounded ${f === 'All' ? 'bg-zinc-600 text-white' : ''}`}>{f}</span>
                 ))}
              </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-1 px-2 py-1 bg-[#2b2b2b] border-b border-zinc-700 font-bold text-zinc-300 select-none">
              <div className="col-span-3">Name</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1">Method</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-1">Time</div>
              <div className="col-span-4 text-center">Waterfall</div>
            </div>

            {/* Table Body */}
            <div className="flex-1 overflow-y-auto">
              {NETWORK_REQUESTS.filter(r => r.name.includes(filter)).map((req, i) => (
                <div 
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`grid grid-cols-12 gap-1 px-2 py-0.5 cursor-pointer border-b border-zinc-800/50 hover:bg-[#2a2d3e] ${selectedReq?.id === req.id ? 'bg-[#353b48] text-white' : (i % 2 === 0 ? 'bg-[#202124]' : 'bg-[#242528]')}`}
                >
                  <div className="col-span-3 truncate flex items-center gap-2">
                     {req.type === 'xhr' ? <Globe size={10} className="text-blue-400"/> : <Terminal size={10} className="text-yellow-400"/>}
                     {req.name}
                  </div>
                  <div className="col-span-1 text-zinc-400">{req.status}</div>
                  <div className="col-span-1 text-zinc-500">{req.type}</div>
                  <div className="col-span-1 font-bold text-zinc-400">{req.method}</div>
                  <div className="col-span-1 text-zinc-500">{req.size}</div>
                  <div className="col-span-1 text-zinc-400">{req.time}</div>
                  <div className="col-span-4 px-2 py-1">
                     <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                        <div className="h-full bg-transparent w-[10%]"></div>
                        <div className={`h-full opacity-80 w-[${Math.random() * 60 + 20}%] ${req.method === 'GET' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Status Footer */}
            <div className="h-6 border-t border-zinc-700 bg-[#2b2b2b] flex items-center px-2 gap-4 text-zinc-400">
               <span>{NETWORK_REQUESTS.length} requests</span>
               <span>2.4 MB transferred</span>
               <span>Finish: 1.2s</span>
            </div>

            {/* Detail Panel */}
            {selectedReq && <NetworkDetail request={selectedReq} onClose={() => setSelectedReq(null)} />}
          </div>
        )}

        {/* --- CONSOLE TAB (BIO) --- */}
        {activeTab === 'console' && (
           <div className="flex flex-col h-full bg-[#242528] font-mono p-1">
             <ConsoleMessage>AlexDev Portfolio [Version 1.0.0]</ConsoleMessage>
             <ConsoleMessage>Loading profile data...</ConsoleMessage>
             <ConsoleMessage>
               <span className="text-zinc-400">User Agent:</span> Junior Full Stack Engineer
             </ConsoleMessage>
             <ConsoleMessage type="error">
                Warning: Obsessive attention to detail detected.
             </ConsoleMessage>
             <div className="mt-4 px-2">
                <span className="text-blue-400">›</span> <span className="text-zinc-100">User.getBio()</span>
             </div>
             <div className="px-6 py-2 text-zinc-300 whitespace-pre-wrap">
               "Hi, I'm Alex. I build things for the web. React for the glass, Golang for the engine. 
               Looking for a team where I can deploy to production on Day 1."
             </div>
             <div className="mt-2 px-2">
                <span className="text-blue-400">›</span> <span className="text-zinc-100">User.contactInfo</span>
             </div>
             <div className="px-6 py-2 text-yellow-300">
               {`{ email: "alex@example.com", github: "github.com/alex", status: "Hiring?" }`}
             </div>
             <div className="flex-1"></div>
             <div className="px-2 py-2 flex items-center gap-2 border-t border-zinc-700 text-blue-400">
               › <span className="animate-pulse">_</span>
             </div>
           </div>
        )}

        {/* --- APPLICATION TAB (SKILLS) --- */}
        {activeTab === 'application' && (
          <div className="flex h-full bg-[#242528]">
             {/* App Sidebar */}
             <div className="w-48 border-r border-zinc-700 flex flex-col pt-2">
                <div className="flex items-center gap-1 px-2 py-1 text-zinc-300 font-bold"><HardDrive size={12}/> Storage</div>
                <div className="pl-4 text-zinc-400">
                   <div className="flex items-center gap-2 py-1 px-2 bg-[#353b48] text-white cursor-pointer"><Database size={12}/> Local Storage</div>
                   <div className="flex items-center gap-2 py-1 px-2 hover:bg-zinc-800 cursor-pointer"><Box size={12}/> Session Storage</div>
                   <div className="flex items-center gap-2 py-1 px-2 hover:bg-zinc-800 cursor-pointer"><Database size={12}/> IndexedDB</div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 text-zinc-300 font-bold mt-4"><Wifi size={12}/> Background Services</div>
             </div>

             {/* Storage Table */}
             <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-2 bg-[#2b2b2b] border-b border-zinc-700 px-2 py-1 font-bold text-zinc-300">
                   <div>Key</div>
                   <div>Value</div>
                </div>
                <div className="overflow-y-auto font-mono">
                   {LOCAL_STORAGE.map((item, i) => (
                     <div key={item.key} className={`grid grid-cols-2 px-2 py-1 border-b border-zinc-800/30 ${i%2===0 ? 'bg-[#202124]' : 'bg-[#242528]'}`}>
                        <div className="text-red-300">{item.key}</div>
                        <div className="text-blue-300 truncate">{item.value}</div>
                     </div>
                   ))}
                   {/* Empty rows to fill space */}
                   {Array.from({length: 10}).map((_, i) => (
                      <div key={i} className={`h-6 border-b border-zinc-800/30 ${i%2!==0 ? 'bg-[#202124]' : 'bg-[#242528]'}`}></div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* --- ELEMENTS TAB (VISUAL) --- */}
        {activeTab === 'elements' && (
           <div className="flex h-full bg-[#242528]">
             <div className="flex-1 p-2 font-mono text-zinc-400 overflow-y-auto">
               <div className="pl-2">
                 <span className="text-zinc-500">&lt;</span><span className="text-red-400">html</span> <span className="text-yellow-400">lang</span>=<span className="text-green-300">"en"</span><span className="text-zinc-500">&gt;</span>
               </div>
               <div className="pl-4">
                 <span className="text-zinc-500">&lt;</span><span className="text-red-400">body</span><span className="text-zinc-500">&gt;</span>
               </div>
               <div className="pl-8">
                 <span className="text-zinc-500">&lt;</span><span className="text-red-400">div</span> <span className="text-yellow-400">id</span>=<span className="text-green-300">"hero"</span><span className="text-zinc-500">&gt;</span>
               </div>
               <div className="pl-12 bg-[#353b48] text-white inline-block w-full">
                  Hello! I'm Alex. This is the visual DOM representation of my career.
               </div>
               <div className="pl-8">
                 <span className="text-zinc-500">&lt;/</span><span className="text-red-400">div</span><span className="text-zinc-500">&gt;</span>
               </div>
               <div className="pl-8">
                  <span className="text-zinc-500">&lt;!-- TODO: Hire me --&gt;</span>
               </div>
               <div className="pl-4">
                 <span className="text-zinc-500">&lt;/</span><span className="text-red-400">body</span><span className="text-zinc-500">&gt;</span>
               </div>
               <div className="pl-2">
                 <span className="text-zinc-500">&lt;/</span><span className="text-red-400">html</span><span className="text-zinc-500">&gt;</span>
               </div>
             </div>
             
             {/* Styles Pane */}
             <div className="w-80 border-l border-zinc-700 bg-[#2b2b2b] flex flex-col">
               <div className="px-2 py-1 bg-[#353b48] text-zinc-300 font-bold border-b border-zinc-700">Styles</div>
               <div className="p-2 font-mono text-xs">
                 <div className="text-yellow-300">element.style <span className="text-zinc-300">{`{`}</span></div>
                 <div className="pl-4 flex gap-2"><span className="text-blue-300">display</span>: <span className="text-zinc-300">flex;</span></div>
                 <div className="pl-4 flex gap-2"><span className="text-blue-300">justify-content</span>: <span className="text-zinc-300">center;</span></div>
                 <div className="text-zinc-300">{`}`}</div>
                 
                 <div className="mt-4 text-yellow-300">.engineer <span className="text-zinc-300">{`{`}</span></div>
                 <div className="pl-4 flex gap-2"><span className="text-blue-300">skills</span>: <span className="text-zinc-300">React, Go;</span></div>
                 <div className="pl-4 flex gap-2"><span className="text-blue-300">passion</span>: <span className="text-zinc-300">100%;</span></div>
                 <div className="text-zinc-300">{`}`}</div>
               </div>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}