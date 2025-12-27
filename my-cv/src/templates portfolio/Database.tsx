import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  Table, 
  Play, 
  Search, 
  Save, 
  Clock, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronDown, 
  X,
  Plus,
  Server,
  Code,
  Terminal,
  Download
} from 'lucide-react';

// --- MOCK DATA ---

const TABLES = {
  projects: {
    columns: ['id', 'name', 'stack', 'status', 'latency_ms', 'repo'],
    rows: [
      { id: 1, name: 'task_flow_board', stack: '["React", "Zustand"]', status: 'LIVE', latency_ms: 45, repo: 'github/taskflow' },
      { id: 2, name: 'go_auth_service', stack: '["Go", "Redis", "gRPC"]', status: 'PROD', latency_ms: 12, repo: 'github/go-auth' },
      { id: 3, name: 'cli_scaffold_tool', stack: '["Go", "Cobra"]', status: 'BETA', latency_ms: 0, repo: 'github/cli-tool' },
      { id: 4, name: 'analytics_dashboard', stack: '["Next.js", "Tailwind"]', status: 'LIVE', latency_ms: 120, repo: 'github/analytics' },
    ]
  },
  skills: {
    columns: ['id', 'tech', 'category', 'proficiency', 'years_exp'],
    rows: [
      { id: 101, tech: 'Golang', category: 'Backend', proficiency: 'Intermediate', years_exp: 2 },
      { id: 102, tech: 'React', category: 'Frontend', proficiency: 'Advanced', years_exp: 3 },
      { id: 103, tech: 'PostgreSQL', category: 'Database', proficiency: 'Intermediate', years_exp: 2 },
      { id: 104, tech: 'Docker', category: 'DevOps', proficiency: 'Learning', years_exp: 1 },
    ]
  },
  experience: {
    columns: ['id', 'role', 'company', 'duration', 'impact'],
    rows: [
      { id: 1, role: 'Full Stack Engineer', company: 'Freelance', duration: '2023-Present', impact: 'Shipped 3 production apps' },
      { id: 2, role: 'Junior Dev', company: 'Tech Startup', duration: '2022-2023', impact: 'Reduced API latency by 40%' },
    ]
  }
};

const QUERIES = [
  { id: 'q1', name: 'Get All Projects', sql: 'SELECT * FROM projects WHERE status = \'LIVE\';', target: 'projects' },
  { id: 'q2', name: 'Check Backend Skills', sql: 'SELECT * FROM skills WHERE category = \'Backend\';', target: 'skills' },
  { id: 'q3', name: 'Career History', sql: 'SELECT * FROM experience ORDER BY duration DESC;', target: 'experience' },
];

// --- COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active, onClick, isChild }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left truncate transition-colors ${
      active 
        ? 'bg-[#2b2d31] text-white' 
        : 'text-zinc-400 hover:bg-[#2b2d31] hover:text-zinc-200'
    } ${isChild ? 'pl-8' : ''}`}
  >
    <Icon size={14} className={active ? 'text-emerald-400' : 'text-zinc-500'} />
    {label}
  </button>
);

const QueryTab = ({ active, label, onClose }) => (
  <div className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-zinc-800 min-w-[120px] max-w-[200px] cursor-pointer ${active ? 'bg-[#1e1f22] text-white border-t-2 border-t-emerald-500' : 'bg-[#2b2d31] text-zinc-500 hover:bg-[#1e1f22]'}`}>
    <Code size={12} className="text-emerald-500" />
    <span className="truncate flex-1">{label}</span>
    <X size={12} className="hover:text-red-400" onClick={(e) => { e.stopPropagation(); onClose(); }} />
  </div>
);

// --- MAIN APP ---

export default function SqlPortfolio() {
  const [activeTable, setActiveTable] = useState('projects');
  const [query, setQuery] = useState(QUERIES[0].sql);
  const [results, setResults] = useState(TABLES.projects);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([{ time: new Date().toLocaleTimeString(), msg: 'Connected to postgres@localhost:5432' }]);

  const runQuery = (targetTable, sqlText) => {
    setIsRunning(true);
    setQuery(sqlText);
    
    // Simulate network latency
    setTimeout(() => {
      setResults(TABLES[targetTable] || TABLES.projects);
      setIsRunning(false);
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg: `Query executed successfully: ${results.rows.length} rows returned.` }]);
    }, 600);
  };

  const handleSidebarClick = (tableName) => {
    setActiveTable(tableName);
    // Find a query that matches or default
    const q = QUERIES.find(q => q.target === tableName) || QUERIES[0];
    runQuery(tableName, `SELECT * FROM ${tableName} LIMIT 100;`);
  };

  return (
    <div className="flex h-screen bg-[#1e1f22] text-zinc-300 font-sans text-sm selection:bg-emerald-500/30 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-[#2b2d31] flex flex-col border-r border-black transition-all duration-300 overflow-hidden`}>
        <div className="p-3 text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between items-center">
          <span>Connections</span>
          <div className="flex gap-1">
             <Plus size={14} className="cursor-pointer hover:text-white" />
             <MoreHorizontal size={14} className="cursor-pointer hover:text-white" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Connection Node */}
          <div className="px-2 py-1 flex items-center gap-1 text-zinc-100 font-bold text-xs">
            <ChevronDown size={14} />
            <Database size={14} className="text-emerald-400" />
            <span>postgres@alex_dev</span>
          </div>
          
          {/* Schema Node */}
          <div className="px-2 py-1 pl-6 flex items-center gap-1 text-zinc-400 text-xs">
            <ChevronDown size={14} />
            <Server size={14} className="text-yellow-400" />
            <span>public</span>
          </div>

          {/* Tables List */}
          <div className="mt-1">
            <SidebarItem 
              icon={Table} 
              label="projects" 
              isChild 
              active={activeTable === 'projects'} 
              onClick={() => handleSidebarClick('projects')} 
            />
            <SidebarItem 
              icon={Table} 
              label="skills" 
              isChild 
              active={activeTable === 'skills'} 
              onClick={() => handleSidebarClick('skills')} 
            />
            <SidebarItem 
              icon={Table} 
              label="experience" 
              isChild 
              active={activeTable === 'experience'} 
              onClick={() => handleSidebarClick('experience')} 
            />
          </div>

          <div className="mt-6 px-3 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Saved Queries</div>
          {QUERIES.map(q => (
            <div 
              key={q.id}
              onClick={() => runQuery(q.target, q.sql)}
              className="flex items-center gap-2 px-4 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-[#3f4148] cursor-pointer"
            >
              <Terminal size={12} className="text-blue-400" />
              {q.name}
            </div>
          ))}

        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Tab Bar */}
        <div className="h-9 bg-[#2b2d31] flex items-center border-b border-black overflow-x-auto scrollbar-hide">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="px-3 text-zinc-500 hover:text-white">
            <Database size={16} />
          </button>
          <QueryTab active label={`console_${activeTable}.sql`} onClose={() => {}} />
          <QueryTab label="scratchpad.sql" onClose={() => {}} />
          <div className="ml-auto px-4 flex items-center gap-3">
             <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               Connected
             </div>
             <div className="text-xs text-zinc-500">54ms</div>
          </div>
        </div>

        {/* Query Editor Area */}
        <div className="h-1/3 bg-[#1e1f22] border-b border-black flex flex-col">
           {/* Toolbar */}
           <div className="h-10 border-b border-zinc-800 flex items-center px-4 gap-4">
             <button 
               onClick={() => runQuery(activeTable, query)}
               className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors"
             >
               <Play size={12} fill="currentColor" /> Run
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1 bg-[#2b2d31] hover:bg-[#3f4148] text-zinc-300 rounded text-xs transition-colors">
               <Save size={12} /> Save
             </button>
             <div className="h-4 w-px bg-zinc-700"></div>
             <span className="text-xs text-zinc-500">Limit: 500 rows</span>
           </div>
           
           {/* Editor Input */}
           <div className="flex-1 p-4 font-mono text-sm relative">
             <textarea 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full h-full bg-transparent resize-none outline-none text-blue-100 placeholder-zinc-600"
               spellCheck="false"
             />
             {/* Syntax Highlighting Fake Overlay (Simple color mapping) */}
             <div className="absolute top-4 left-4 pointer-events-none opacity-50" aria-hidden="true">
               {query.split(' ').map((word, i) => {
                 const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'LIMIT', 'INSERT', 'UPDATE'];
                 return (
                   <span key={i} className={keywords.includes(word.toUpperCase()) ? 'text-purple-400' : 'text-transparent'}>
                     {word}{' '}
                   </span>
                 );
               })}
             </div>
           </div>
        </div>

        {/* Results Grid Area */}
        <div className="flex-1 bg-[#1e1f22] flex flex-col overflow-hidden">
          <div className="h-8 bg-[#2b2d31] border-b border-zinc-800 flex items-center px-4 justify-between">
            <div className="text-xs font-bold text-zinc-400 uppercase">Result Grid</div>
            <div className="flex gap-2">
              <Search size={14} className="text-zinc-500 hover:text-white cursor-pointer" />
              <Download size={14} className="text-zinc-500 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* The Table */}
          <div className="flex-1 overflow-auto">
            {isRunning ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-2">
                 <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-xs">Executing query...</span>
              </div>
            ) : (
              <table className="w-full border-collapse text-left font-mono text-xs">
                <thead className="sticky top-0 bg-[#2b2d31] z-10">
                  <tr>
                    <th className="w-8 border-r border-b border-zinc-700 p-2 text-center text-zinc-500">#</th>
                    {results.columns.map(col => (
                      <th key={col} className="border-r border-b border-zinc-700 p-2 font-bold text-zinc-300 min-w-[100px]">
                        <div className="flex items-center gap-2">
                          {col === 'id' && <span className="text-yellow-500 text-[10px] key">PK</span>}
                          {col}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-[#2b2d31] transition-colors group">
                      <td className="border-r border-b border-zinc-800 p-2 text-center text-zinc-600 bg-[#26282c]">{i + 1}</td>
                      {results.columns.map(col => (
                        <td key={col} className={`border-r border-b border-zinc-800 p-2 text-zinc-400 whitespace-nowrap group-hover:text-zinc-100 ${col === 'status' ? getStatusColor(row[col]) : ''}`}>
                          {formatCell(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Status / Logs Footer */}
          <div className="h-32 border-t border-black bg-[#1e1f22] flex flex-col">
             <div className="px-2 py-1 bg-[#2b2d31] text-[10px] font-bold text-zinc-400 uppercase border-b border-zinc-800 flex justify-between">
               <span>Output Console</span>
               <div className="flex gap-2">
                 <span className="cursor-pointer hover:text-white">Clear</span>
               </div>
             </div>
             <div className="flex-1 p-2 font-mono text-[11px] overflow-y-auto">
               {logs.map((log, i) => (
                 <div key={i} className="flex gap-2 mb-1">
                   <span className="text-zinc-500">[{log.time}]</span>
                   <span className="text-zinc-300">{log.msg}</span>
                 </div>
               ))}
               <div className="flex gap-2">
                  <span className="text-zinc-500">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-emerald-500 animate-pulse">_</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helpers
function getStatusColor(status) {
  if (status === 'LIVE' || status === 'PROD') return 'text-emerald-400 font-bold';
  if (status === 'BETA') return 'text-yellow-400 font-bold';
  return '';
}

function formatCell(value) {
  if (typeof value === 'string' && value.startsWith('[')) {
    return <span className="text-blue-400">{value}</span>; // JSON highlight
  }
  return value;
}