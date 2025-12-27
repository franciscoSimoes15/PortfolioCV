import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Hash, 
  Copy, 
  Check, 
  Server, 
  Globe, 
  Database, 
  Code, 
  Terminal, 
  Zap,
  Layout,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

// --- DATA ---

const ENDPOINTS = [
  { 
    id: 'intro', 
    method: 'GET', 
    path: '/introduction', 
    label: 'Introduction',
    desc: 'Retrieves the developer profile and summary.',
    response: `{
  "name": "Alex Dev",
  "role": "Full Stack Engineer",
  "focus": ["React", "Golang", "DX"],
  "status": "Open to Work",
  "location": "San Francisco, CA"
}`
  },
  { 
    id: 'skills', 
    method: 'GET', 
    path: '/skills', 
    label: 'Core Competencies',
    desc: 'Lists available technical capabilities and proficiency levels.',
    response: `[
  {
    "category": "Frontend",
    "tech": "React 18",
    "level": "Advanced",
    "tools": ["Next.js", "Tailwind", "Zustand"]
  },
  {
    "category": "Backend",
    "tech": "Golang",
    "level": "Intermediate",
    "tools": ["Gin", "gRPC", "Chi"]
  },
  {
    "category": "Infrastructure",
    "tech": "Docker",
    "level": "Intermediate",
    "tools": ["Postgres", "Redis", "AWS"]
  }
]` 
  },
  { 
    id: 'proj-1', 
    method: 'GET', 
    path: '/projects/taskflow', 
    label: 'Project: TaskFlow',
    desc: 'A collaborative Kanban board featuring optimistic UI updates and real-time state sync.',
    response: `{
  "id": "taskflow-v1",
  "stack": ["React", "Dnd-Kit", "WebSockets"],
  "features": {
    "optimistic_ui": true,
    "drag_drop": "Fluid 60fps",
    "dark_mode": true
  },
  "metrics": {
    "lighthouse_score": 98,
    "bundle_size": "42kb gzipped"
  }
}` 
  },
  { 
    id: 'proj-2', 
    method: 'GET', 
    path: '/projects/go-auth', 
    label: 'Project: GoAuth',
    desc: 'High-performance microservice for identity management using JWTs and RBAC.',
    response: `type AuthResponse struct {
    Token     string    \`json:"token"\`
    ExpiresIn int64     \`json:"expires_in"\`
    User      User      \`json:"user"\`
    Roles     []string  \`json:"roles"\`
}

// Features:
// - JWT Rotation
// - Redis Caching layer
// - gRPC Interceptors` 
  },
  { 
    id: 'contact', 
    method: 'POST', 
    path: '/contact', 
    label: 'Contact Me',
    desc: 'Initiates a communication channel.',
    response: `{
  "email": "alex@example.com",
  "github": "github.com/alexdev",
  "linkedin": "linkedin.com/in/alexdev",
  "availability": "Immediate"
}` 
  },
];

// --- COMPONENTS ---

const MethodBadge = ({ method }) => {
  const colors = {
    GET: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
    POST: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colors[method] || colors.GET} font-mono`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ code, language = 'json' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg bg-[#0d1117] border border-zinc-800 overflow-hidden group">
      <div className="flex justify-between items-center px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs text-zinc-500 font-mono">Response Example ({language})</span>
        <button 
          onClick={handleCopy}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---

export default function ApiDocsPortfolio() {
  const [activeId, setActiveId] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeData = ENDPOINTS.find(e => e.id === activeId) || ENDPOINTS[0];

  return (
    <div className="flex h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden selection:bg-indigo-500/20">
      
      {/* 1. SIDEBAR NAVIGATION (Desktop) */}
      <div className="hidden md:flex w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0a0a0a]">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">API</div>
            AlexDev<span className="text-zinc-400 font-normal">Docs</span>
          </div>
          <div className="mt-2 text-xs text-zinc-500 font-mono">v2.4.0 (Latest)</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-2">Getting Started</div>
            <nav className="space-y-0.5">
              {ENDPOINTS.filter(e => ['intro', 'skills', 'contact'].includes(e.id)).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors ${activeId === item.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                >
                  {item.id === 'intro' && <Globe size={14}/>}
                  {item.id === 'skills' && <Zap size={14}/>}
                  {item.id === 'contact' && <Hash size={14}/>}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 px-2">Projects Endpoint</div>
            <nav className="space-y-0.5">
              {ENDPOINTS.filter(e => e.path.includes('/projects')).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors truncate font-mono ${activeId === item.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                >
                  <span className={`mr-2 ${item.method === 'GET' ? 'text-blue-500' : 'text-emerald-500'}`}>{item.method}</span>
                  {item.path.replace('/projects', '')}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
           <button className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
             <ExternalLink size={12} /> View Source on GitHub
           </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur z-20 sticky top-0">
          <div className="font-bold">AlexDev Docs</div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute inset-0 z-10 bg-white dark:bg-[#0a0a0a] pt-20 px-4 pb-4 overflow-y-auto md:hidden animate-in slide-in-from-top-10">
            <div className="space-y-6">
              {ENDPOINTS.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveId(item.id); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2 border-b border-zinc-100 dark:border-zinc-800"
                >
                  <div className="font-medium text-lg mb-1">{item.label}</div>
                  <div className="font-mono text-xs text-zinc-500">{item.method} {item.path}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT SCROLL */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 md:p-12 pb-32">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8 font-mono">
              <span>api</span>
              <ChevronRight size={12} />
              <span>v1</span>
              <ChevronRight size={12} />
              <span className="text-indigo-500">{activeData.id}</span>
            </div>

            {/* Title Block */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight">
                {activeData.label}
              </h1>
              <div className="flex items-center gap-3 font-mono text-sm mb-6 bg-zinc-100 dark:bg-zinc-900 w-fit px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <MethodBadge method={activeData.method} />
                <span className="text-zinc-600 dark:text-zinc-400">https://alex.dev/api/v1{activeData.path}</span>
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                {activeData.desc}
              </p>
            </div>

            {/* Split View: Details & Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left: Explanatory Content */}
              <div className="space-y-8">
                {activeData.id === 'intro' && (
                  <div className="prose dark:prose-invert">
                    <h3 className="text-xl font-bold mb-3">About the Developer</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      Alex is a junior engineer with a strong "Product Mindset". While mostly self-taught, Alex focuses on the intersection of performant backend logic and accessible frontend interfaces.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium border border-zinc-200 dark:border-zinc-700">React</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium border border-zinc-200 dark:border-zinc-700">Golang</span>
                      <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium border border-zinc-200 dark:border-zinc-700">PostgreSQL</span>
                    </div>
                  </div>
                )}

                {activeData.path.includes('projects') && (
                   <div className="space-y-6">
                     <div>
                       <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3">Key Parameters</h3>
                       <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-sm">
                         <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900/50 p-2 font-mono text-xs font-bold border-b border-zinc-200 dark:border-zinc-800">
                           <div>Field</div>
                           <div>Type</div>
                           <div>Description</div>
                         </div>
                         <div className="grid grid-cols-3 p-3 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                           <div className="font-mono text-indigo-500">stack</div>
                           <div className="text-zinc-500">array</div>
                           <div className="text-zinc-600 dark:text-zinc-400">Technologies used in build</div>
                         </div>
                         <div className="grid grid-cols-3 p-3 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                           <div className="font-mono text-indigo-500">live_url</div>
                           <div className="text-zinc-500">string</div>
                           <div className="text-zinc-600 dark:text-zinc-400">Production deployment link</div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
                          View Deployment <ArrowRight size={16} />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                          GitHub Repo
                        </button>
                     </div>
                   </div>
                )}
              </div>

              {/* Right: Code Sample */}
              <div className="lg:sticky lg:top-8">
                <CodeBlock code={activeData.response} language={activeData.path.includes('go') ? 'go' : 'json'} />
                
                <div className="mt-4 flex gap-2 justify-end">
                   <div className="flex items-center gap-1.5 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                     200 OK
                   </div>
                   <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700">
                     45ms latency
                   </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}