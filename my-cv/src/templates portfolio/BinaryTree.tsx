import React, { useState, useRef, useEffect } from 'react';
import { 
  Server, 
  Database, 
  Layout, 
  Code, 
  Globe, 
  Zap, 
  Box, 
  Cpu, 
  Terminal, 
  ExternalLink, 
  Github, 
  X,
  MousePointer2
} from 'lucide-react';

// --- CONFIG ---

// Initial Node Positions
const INITIAL_NODES = [
  // Core
  { id: 'me', type: 'hub', label: 'Alex Dev', x: 400, y: 300, icon: Zap },
  
  // Skills Clusters
  { id: 'frontend', type: 'cluster', label: 'Frontend', x: 200, y: 200, icon: Layout },
  { id: 'backend', type: 'cluster', label: 'Backend', x: 600, y: 200, icon: Server },
  { id: 'infra', type: 'cluster', label: 'Infra', x: 400, y: 500, icon: Box },

  // Leaf Nodes (Projects/Specifics)
  { id: 'react', type: 'leaf', label: 'React 18', x: 100, y: 150, parent: 'frontend', icon: Code },
  { id: 'tailwind', type: 'leaf', label: 'Tailwind', x: 250, y: 100, parent: 'frontend', icon: Code },
  { id: 'project-a', type: 'project', label: 'TaskFlow', x: 50, y: 250, parent: 'frontend', icon: Globe, desc: 'Kanban board with optimistic UI.' },

  { id: 'go', type: 'leaf', label: 'Golang', x: 700, y: 150, parent: 'backend', icon: Terminal },
  { id: 'grpc', type: 'leaf', label: 'gRPC', x: 550, y: 100, parent: 'backend', icon: Zap },
  { id: 'project-b', type: 'project', label: 'Auth Svc', x: 750, y: 250, parent: 'backend', icon:  Github, desc: 'Distributed JWT identity service.' },

  { id: 'db', type: 'leaf', label: 'Postgres', x: 300, y: 600, parent: 'infra', icon: Database },
  { id: 'docker', type: 'leaf', label: 'Docker', x: 500, y: 600, parent: 'infra', icon: Box },
];

const CONNECTIONS = [
  { from: 'me', to: 'frontend' },
  { from: 'me', to: 'backend' },
  { from: 'me', to: 'infra' },
  { from: 'frontend', to: 'react' },
  { from: 'frontend', to: 'tailwind' },
  { from: 'frontend', to: 'project-a' },
  { from: 'backend', to: 'go' },
  { from: 'backend', to: 'grpc' },
  { from: 'backend', to: 'project-b' },
  { from: 'infra', to: 'db' },
  { from: 'infra', to: 'docker' },
];

// --- COMPONENTS ---

const ConnectionLine = ({ start, end }) => {
  // Calculate center points of nodes (assuming 60x60 node size roughly)
  const x1 = start.x;
  const y1 = start.y;
  const x2 = end.x;
  const y2 = end.y;

  return (
    <line 
      x1={x1} y1={y1} x2={x2} y2={y2} 
      stroke="#3f3f46" 
      strokeWidth="2" 
      strokeDasharray="4"
      className="transition-all duration-75 ease-linear"
    />
  );
};

const Node = ({ node, onMouseDown, onClick, isSelected }) => {
  const styles = {
    hub: "w-20 h-20 bg-white text-black text-xs font-bold z-30 shadow-[0_0_40px_rgba(255,255,255,0.3)]",
    cluster: "w-16 h-16 bg-zinc-800 border-2 border-zinc-600 text-zinc-300 text-[10px] font-bold z-20 hover:border-indigo-500 hover:text-white",
    leaf: "w-12 h-12 bg-zinc-900 border border-zinc-700 text-zinc-500 text-[9px] z-10 hover:border-zinc-500 hover:text-zinc-300",
    project: "w-14 h-14 bg-indigo-900/50 border border-indigo-500/50 text-indigo-300 text-[9px] font-bold z-20 hover:bg-indigo-600 hover:text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
  };

  return (
    <div
      onMouseDown={(e) => onMouseDown(e, node.id)}
      onClick={(e) => { e.stopPropagation(); onClick(node); }}
      className={`
        absolute rounded-full flex flex-col items-center justify-center gap-1 cursor-grab active:cursor-grabbing transition-shadow
        ${styles[node.type]}
        ${isSelected ? 'ring-2 ring-emerald-400 ring-offset-4 ring-offset-black' : ''}
      `}
      style={{ 
        left: node.x, 
        top: node.y, 
        transform: 'translate(-50%, -50%)' 
      }}
    >
      <node.icon size={node.type === 'hub' ? 24 : 16} />
      <span className="max-w-[120%] truncate px-1 text-center">{node.label}</span>
    </div>
  );
};

const DetailPanel = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <div className="absolute right-6 top-6 bottom-6 w-80 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-50">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl ${node.type === 'project' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-400'}`}>
          <node.icon size={24} />
        </div>
        <button onClick={onClose} className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white"><X size={18}/></button>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{node.label}</h2>
      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">
        {node.type === 'hub' ? 'Root Node' : node.type === 'project' ? 'Deployed Service' : 'System Component'}
      </div>

      <div className="flex-1 overflow-y-auto">
        {node.type === 'hub' && (
          <p className="text-zinc-400 leading-relaxed">
            The central processing unit of this portfolio. Alex is a Junior Full Stack Engineer specializing in bridging React and Golang.
          </p>
        )}
        
        {node.type === 'project' && (
          <div className="space-y-4">
             <p className="text-zinc-300 leading-relaxed">
               {node.desc || "A high-performance application built to solve real-world problems."}
             </p>
             <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
               <div className="text-[10px] text-zinc-500 mb-1">Status</div>
               <div className="text-emerald-400 text-xs font-mono flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 Operational
               </div>
             </div>
             <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-colors">
               View Deployment
             </button>
          </div>
        )}

        {(node.type === 'cluster' || node.type === 'leaf') && (
          <div className="space-y-4">
            <p className="text-zinc-400">
              Proficiency module loaded.
            </p>
            <div className="space-y-2">
               <div className="flex justify-between text-xs">
                 <span className="text-zinc-500">Experience</span>
                 <span className="text-zinc-300">2 Years</span>
               </div>
               <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[75%]"></div>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-zinc-800 text-[10px] text-zinc-600 font-mono text-center">
        ID: {node.id} // COORDS: [{Math.round(node.x)}, {Math.round(node.y)}]
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---

export default function TopologyPortfolio() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const containerRef = useRef(null);

  // Drag Handlers
  const handleMouseDown = (e, id) => {
    setDraggingId(id);
  };

  const handleMouseMove = (e) => {
    if (!draggingId || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setNodes(prev => prev.map(n => 
      n.id === draggingId ? { ...n, x, y } : n
    ));
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <div className="w-screen h-screen bg-[#050505] text-zinc-300 font-sans overflow-hidden relative selection:bg-indigo-500/30">
      
      {/* 1. HEADER OVERLAY */}
      <div className="absolute top-6 left-6 z-40 pointer-events-none select-none">
        <h1 className="text-2xl font-bold text-white mb-1">Architecture Map</h1>
        <p className="text-zinc-500 text-sm">Interactive System Topology</p>
      </div>
      
      <div className="absolute top-6 right-6 z-40 pointer-events-none select-none flex items-center gap-2 text-zinc-600 text-xs border border-zinc-800 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur">
        <MousePointer2 size={12} />
        <span>Drag nodes to reorganize</span>
      </div>

      {/* 2. CANVAS AREA */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full relative cursor-crosshair"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ 
          backgroundImage: 'radial-gradient(#27272a 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}></div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {CONNECTIONS.map((conn, i) => {
            const start = nodes.find(n => n.id === conn.from);
            const end = nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;
            return <ConnectionLine key={i} start={start} end={end} />;
          })}
        </svg>

        {nodes.map(node => (
          <Node 
            key={node.id} 
            node={node} 
            onMouseDown={handleMouseDown} 
            onClick={setSelectedNode}
            isSelected={selectedNode?.id === node.id}
          />
        ))}

      </div>

      {/* 3. DETAIL PANEL */}
      {selectedNode && (
        <DetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}

      {/* 4. FOOTER */}
      <div className="absolute bottom-6 left-6 z-40 pointer-events-none select-none text-[10px] text-zinc-700 font-mono">
        RENDER_ENGINE: REACT_DOM <br/>
        NODES: {nodes.length} <br/>
        EDGES: {CONNECTIONS.length}
      </div>

    </div>
  );
}