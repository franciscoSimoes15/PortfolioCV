import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Filter, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Layout, 
  Server, 
  Github, 
  Inbox,
  Zap,
  BarChart3,
  Calendar,
  UserCircle,
  Hash,
  ArrowUpCircle,
  AlertCircle
} from 'lucide-react';

// --- DATA ---

const ISSUES = [
  {
    id: 'T-1042',
    title: 'Build high-performance Auth Service',
    status: 'Done',
    priority: 'High',
    label: 'Backend',
    created: '2 months ago',
    assignee: 'Alex',
    desc: 'Designed a centralized authentication system using Golang and gRPC. Implemented JWT rotation and Redis caching to handle 5k req/s.',
    tech: ['Golang', 'gRPC', 'Redis'],
    links: [{ text: 'GitHub PR', url: '#' }]
  },
  {
    id: 'T-1041',
    title: 'Refactor Kanban Board UI',
    status: 'Done',
    priority: 'Medium',
    label: 'Frontend',
    created: '3 months ago',
    assignee: 'Alex',
    desc: 'Migrated legacy Redux state to Zustand. Improved drag-and-drop performance by 60fps using optimized React re-renders.',
    tech: ['React', 'Zustand', 'Tailwind'],
    links: [{ text: 'Live Demo', url: '#' }]
  },
  {
    id: 'T-1043',
    title: 'Integrate Docker containers',
    status: 'In Progress',
    priority: 'High',
    label: 'DevOps',
    created: '1 week ago',
    assignee: 'Alex',
    desc: 'Currently containerizing all microservices. Setting up docker-compose for local development parity.',
    tech: ['Docker', 'Bash'],
    links: []
  },
  {
    id: 'T-1044',
    title: 'Learn Rust fundamentals',
    status: 'Backlog',
    priority: 'Low',
    label: 'Learning',
    created: 'Yesterday',
    assignee: 'Alex',
    desc: 'Exploring memory safety and concurrency models in Rust to compare with Go channels.',
    tech: ['Rust'],
    links: []
  },
  {
    id: 'T-1039',
    title: 'CLI Scaffolding Tool',
    status: 'Done',
    priority: 'Medium',
    label: 'Tooling',
    created: '4 months ago',
    assignee: 'Alex',
    desc: 'Built a CLI to generate boilerplate code for new microservices, enforcing standard folder structure.',
    tech: ['Go', 'Cobra'],
    links: [{ text: 'Package', url: '#' }]
  }
];

// --- COMPONENTS ---

const StatusIcon = ({ status }) => {
  if (status === 'Done') return <CheckCircle2 size={16} className="text-indigo-500" />;
  if (status === 'In Progress') return <Circle size={16} className="text-yellow-500 stroke-[3px]" />;
  return <Circle size={16} className="text-zinc-500 border-zinc-500" />;
};

const PriorityIcon = ({ priority }) => {
  if (priority === 'High') return <ArrowUpCircle size={14} className="text-orange-500" />;
  if (priority === 'Medium') return <MoreHorizontal size={14} className="text-zinc-400" />;
  return <ArrowUpCircle size={14} className="text-zinc-600 rotate-180" />;
};

// --- MAIN LAYOUT ---

export default function TicketPortfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState(ISSUES[0]);
  const [search, setSearch] = useState('');

  const filteredIssues = ISSUES.filter(issue => {
    const matchesFilter = activeFilter === 'All' || issue.status === activeFilter;
    const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase()) || issue.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-[#0e0e10] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <div className="w-64 border-r border-zinc-800 flex flex-col bg-[#0e0e10] shrink-0">
        
        {/* Workspace Dropdown */}
        <div className="h-12 flex items-center px-4 border-b border-zinc-800 hover:bg-zinc-900 cursor-pointer transition-colors gap-2">
          <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center text-[10px] font-bold text-white">A</div>
          <span className="font-medium text-sm text-zinc-100">Alex's Workspace</span>
          <div className="ml-auto text-zinc-600 text-[10px] px-1.5 py-0.5 border border-zinc-700 rounded">Free</div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          <div className="px-2 mb-2 text-[10px] font-bold text-zinc-500 uppercase">Views</div>
          
          <button onClick={() => setActiveFilter('All')} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${activeFilter === 'All' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}>
            <Inbox size={16} /> All Issues
          </button>
          <button onClick={() => setActiveFilter('In Progress')} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${activeFilter === 'In Progress' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}>
            <Circle size={16} /> Active
          </button>
          <button onClick={() => setActiveFilter('Backlog')} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${activeFilter === 'Backlog' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}>
            <Layout size={16} /> Backlog
          </button>

          <div className="px-2 mt-6 mb-2 text-[10px] font-bold text-zinc-500 uppercase">Your Teams</div>
          <div className="w-full flex items-center gap-2 px-2 py-1.5 text-zinc-400 text-sm cursor-default">
            <Hash size={16} /> frontend-team
          </div>
           <div className="w-full flex items-center gap-2 px-2 py-1.5 text-zinc-400 text-sm cursor-default">
            <Hash size={16} /> backend-guild
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-zinc-800 flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
           <div>
             <div className="text-sm font-medium text-zinc-100">Alex Dev</div>
             <div className="text-xs text-zinc-500">Junior Engineer</div>
           </div>
        </div>
      </div>

      {/* 2. MAIN LIST */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0e0e10]">
        
        {/* Toolbar */}
        <div className="h-14 border-b border-zinc-800 flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-100">
             {activeFilter === 'All' ? <Inbox size={18} /> : activeFilter === 'In Progress' ? <Circle size={18} /> : <Layout size={18}/>}
             {activeFilter} Issues
             <span className="ml-2 text-zinc-500 font-normal">{filteredIssues.length}</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
               <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="bg-zinc-900 border border-zinc-800 text-sm pl-8 pr-3 py-1.5 rounded-md focus:outline-none focus:border-zinc-700 w-48 text-zinc-300 placeholder-zinc-600"
               />
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-1.5 rounded-md transition-colors"><Plus size={16}/></button>
          </div>
        </div>

        {/* List Header */}
        <div className="flex items-center px-6 py-2 border-b border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider shrink-0">
           <div className="w-24">ID</div>
           <div className="flex-1">Title</div>
           <div className="w-24">Status</div>
           <div className="w-24">Priority</div>
           <div className="w-24">Created</div>
        </div>

        {/* Issues List */}
        <div className="flex-1 overflow-y-auto">
           {filteredIssues.map(issue => (
             <div 
               key={issue.id}
               onClick={() => setSelectedIssue(issue)}
               className={`flex items-center px-6 py-3 border-b border-zinc-800/50 cursor-pointer hover:bg-zinc-900/50 transition-colors group ${selectedIssue.id === issue.id ? 'bg-zinc-900/80 border-l-2 border-l-indigo-500 pl-[22px]' : 'border-l-2 border-l-transparent'}`}
             >
               <div className="w-24 text-xs font-mono text-zinc-500 group-hover:text-zinc-400">{issue.id}</div>
               <div className="flex-1 font-medium text-sm text-zinc-200 group-hover:text-white truncate pr-4">{issue.title}</div>
               <div className="w-24 flex items-center gap-2 text-xs text-zinc-400">
                 <StatusIcon status={issue.status} /> {issue.status}
               </div>
               <div className="w-24 flex items-center gap-2 text-xs text-zinc-400">
                 <PriorityIcon priority={issue.priority} /> {issue.priority}
               </div>
               <div className="w-24 text-xs text-zinc-500">{issue.created}</div>
             </div>
           ))}
        </div>
      </div>

      {/* 3. DETAILS PANE */}
      {selectedIssue && (
        <div className="w-[400px] border-l border-zinc-800 bg-[#0e0e10] flex flex-col animate-in slide-in-from-right duration-300 shadow-xl z-10">
           {/* Details Header */}
           <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
             <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
               <span className="text-zinc-300">{selectedIssue.id}</span>
             </div>
             <div className="flex gap-2">
               <button className="text-zinc-500 hover:text-white"><MoreHorizontal size={16}/></button>
             </div>
           </div>

           {/* Details Content */}
           <div className="flex-1 overflow-y-auto p-6">
             <h2 className="text-xl font-bold text-white mb-6 leading-snug">{selectedIssue.title}</h2>
             
             <div className="space-y-6 mb-8">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-zinc-500">Status</span>
                 <div className="flex items-center gap-2 text-sm text-zinc-300 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    <StatusIcon status={selectedIssue.status} /> {selectedIssue.status}
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-zinc-500">Priority</span>
                 <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <PriorityIcon priority={selectedIssue.priority} /> {selectedIssue.priority}
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-zinc-500">Assignee</span>
                 <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div> {selectedIssue.assignee}
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-zinc-500">Label</span>
                 <div className="text-xs text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-full">
                    {selectedIssue.label}
                 </div>
               </div>
             </div>

             <div className="border-t border-zinc-800 pt-6">
               <h3 className="text-sm font-bold text-zinc-400 mb-3">Description</h3>
               <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                 {selectedIssue.desc}
               </p>

               <h3 className="text-sm font-bold text-zinc-400 mb-3">Tech Stack</h3>
               <div className="flex flex-wrap gap-2 mb-6">
                 {selectedIssue.tech.map(t => (
                   <span key={t} className="px-2 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded text-xs font-medium">
                     {t}
                   </span>
                 ))}
               </div>

               {selectedIssue.links.length > 0 && (
                 <>
                   <h3 className="text-sm font-bold text-zinc-400 mb-3">Attachments</h3>
                   <div className="space-y-2">
                     {selectedIssue.links.map(link => (
                       <a key={link.text} href={link.url} className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-indigo-500/50 transition-colors group">
                         <Github size={18} className="text-zinc-500 group-hover:text-indigo-400" />
                         <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{link.text}</span>
                       </a>
                     ))}
                   </div>
                 </>
               )}
             </div>
           </div>

           {/* Comment Box Simulation */}
           <div className="p-4 border-t border-zinc-800 bg-[#0e0e10]">
              <input type="text" placeholder="Add a comment..." className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-700 text-zinc-300 placeholder-zinc-600" />
           </div>
        </div>
      )}

    </div>
  );
}