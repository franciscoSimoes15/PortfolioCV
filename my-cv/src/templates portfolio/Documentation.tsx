import React, { useState, useEffect } from 'react';
import { 
  Folder, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Layout, 
  Server, 
  Database, 
  Code, 
  Terminal, 
  Cpu, 
  Globe, 
  ExternalLink,
  Github,
  User,
  Zap
} from 'lucide-react';

// --- DATA STRUCTURE ---

const FILE_SYSTEM = {
  id: 'root',
  label: 'root',
  type: 'folder',
  children: [
    {
      id: 'bio',
      label: 'bio.md',
      type: 'file',
      icon: User,
      content: {
        title: 'About Alex',
        body: 'I am a Full Stack Engineer who loves building tools that other developers enjoy using. I bridge the gap between high-performance Go backends and polished React frontends.',
        tags: ['Self-Taught', 'Product-Minded', 'Remote-First']
      }
    },
    {
      id: 'projects',
      label: 'projects',
      type: 'folder',
      icon: Folder,
      children: [
        {
          id: 'proj-frontend',
          label: 'frontend',
          type: 'folder',
          icon: Layout,
          children: [
            {
              id: 'taskflow',
              label: 'task-flow-board',
              type: 'file',
              icon: Globe,
              content: {
                title: 'TaskFlow',
                subtitle: 'React 18 + Zustand',
                body: 'A Trello-style Kanban board focusing on drag-and-drop mechanics (dnd-kit) and optimistic UI updates for a snappy user experience.',
                links: [
                  { label: 'Live Demo', url: '#' },
                  { label: 'Source Code', url: '#' }
                ]
              }
            },
            {
              id: 'dashboard',
              label: 'analytics-kit',
              type: 'file',
              icon: Layout,
              content: {
                title: 'Analytics UI Kit',
                subtitle: 'Next.js + Tailwind',
                body: 'A reusable component library for building data-heavy dashboards. Includes accessible charts and data tables.',
                links: [{ label: 'NPM Package', url: '#' }]
              }
            }
          ]
        },
        {
          id: 'proj-backend',
          label: 'backend',
          type: 'folder',
          icon: Server,
          children: [
            {
              id: 'go-auth',
              label: 'go-auth-service',
              type: 'file',
              icon: Terminal,
              content: {
                title: 'Go Micro Auth',
                subtitle: 'Golang + gRPC + Redis',
                body: 'A centralized authentication service handling JWT issuance, rotation, and RBAC middleware. Designed for high-throughput environments.',
                links: [{ label: 'GitHub Repo', url: '#' }]
              }
            },
            {
              id: 'cli-tool',
              label: 'deploy-cli',
              type: 'file',
              icon: Terminal,
              content: {
                title: 'Deploy CLI',
                subtitle: 'Go + Cobra',
                body: 'A command-line tool to automate scaffolding of new microservices, ensuring standard project structure and CI/CD config.',
                links: [{ label: 'GitHub Repo', url: '#' }]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'stack',
      label: 'tech-stack',
      type: 'folder',
      icon: Cpu,
      children: [
        {
          id: 'stack-react',
          label: 'react.json',
          type: 'file',
          icon: Code,
          content: {
            title: 'Frontend Stack',
            body: 'My preferred frontend toolchain focuses on type safety and component velocity.',
            tags: ['React 18', 'TypeScript', 'Tailwind', 'Next.js', 'Framer Motion']
          }
        },
        {
          id: 'stack-go',
          label: 'golang.go',
          type: 'file',
          icon: Zap,
          content: {
            title: 'Backend Stack',
            body: 'I build backends that are simple to deploy and easy to maintain.',
            tags: ['Golang 1.21', 'Gin', 'gRPC', 'PostgreSQL', 'Docker']
          }
        }
      ]
    },
    {
      id: 'contact',
      label: 'contact.txt',
      type: 'file',
      icon: FileText,
      content: {
        title: 'Get in Touch',
        body: 'I am currently available for new opportunities. Let\'s build something great.',
        links: [
          { label: 'Email Me', url: 'mailto:alex@example.com' },
          { label: 'LinkedIn', url: '#' }
        ]
      }
    }
  ]
};

// --- COMPONENTS ---

const FileIcon = ({ icon: Icon, color }) => (
  <div className={`p-1.5 rounded-md ${color || 'bg-zinc-800 text-zinc-400'}`}>
    <Icon size={16} />
  </div>
);

const PreviewPane = ({ content }) => {
  if (!content) return <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">Select a file to preview</div>;

  return (
    <div className="flex-1 p-8 bg-white dark:bg-[#0c0c0c] h-full overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="max-w-2xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{content.title}</h2>
          {content.subtitle && <p className="text-indigo-500 font-mono text-sm">{content.subtitle}</p>}
        </div>
        
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-8">
          {content.body}
        </p>

        {content.tags && (
          <div className="flex flex-wrap gap-2 mb-8">
            {content.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-800">
                {tag}
              </span>
            ))}
          </div>
        )}

        {content.links && (
          <div className="flex flex-wrap gap-3">
            {content.links.map(link => (
              <a 
                key={link.label} 
                href={link.url}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/20"
              >
                {link.label} <ExternalLink size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---

export default function CloudColumnsPortfolio() {
  const [path, setPath] = useState([FILE_SYSTEM]); // Array of folders in the path
  const [selectedFile, setSelectedFile] = useState(null);

  // Helper to find folder by ID
  const findItem = (items, id) => items.find(i => i.id === id);

  const handleSelect = (columnLevel, item) => {
    // If clicking in column 0, we want path length to be 1 (root), then add new item
    // Slice path to current level + 1 (to keep parent)
    const newPath = path.slice(0, columnLevel + 1);
    
    if (item.type === 'folder') {
      newPath.push(item);
      setPath(newPath);
      setSelectedFile(null); // Clear file preview if opening a folder
    } else {
      // It's a file
      setPath(newPath); // Keep path to this file's folder
      setSelectedFile(item);
    }
  };

  const navigateBack = () => {
    if (selectedFile) {
      setSelectedFile(null);
    } else if (path.length > 1) {
      setPath(path.slice(0, -1));
    }
  };

  return (
    <div className="h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans overflow-hidden flex flex-col">
      
      {/* Top Bar / Breadcrumbs */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 bg-white dark:bg-[#0c0c0c] shrink-0">
        <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 flex items-center gap-1">
            ~/alex-dev
            {path.slice(1).map(folder => (
              <React.Fragment key={folder.id}>
                <span>/</span>
                <span className="text-zinc-800 dark:text-zinc-300">{folder.label}</span>
              </React.Fragment>
            ))}
            {selectedFile && (
              <>
                <span>/</span>
                <span className="text-indigo-500">{selectedFile.label}</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* COLUMNS CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* MOBILE VIEW: Only show active level */}
        <div className="md:hidden w-full h-full relative">
          {/* Back Button for Mobile */}
          {(path.length > 1 || selectedFile) && (
             <button 
               onClick={navigateBack}
               className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-full text-xs font-bold shadow-lg"
             >
               <ArrowLeft size={14} /> Back
             </button>
          )}

          {/* Show File Content OR Current Folder */}
          {selectedFile ? (
             <PreviewPane content={selectedFile.content} />
          ) : (
            <div className="h-full bg-white dark:bg-[#0c0c0c] p-2">
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2 pt-4">
                 {path[path.length - 1].label}
               </div>
               {path[path.length - 1].children.map(item => (
                 <button
                   key={item.id}
                   onClick={() => handleSelect(path.length - 1, item)}
                   className="w-full flex items-center justify-between p-4 rounded-xl mb-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 active:scale-[0.98] transition-transform"
                 >
                   <div className="flex items-center gap-3">
                     <FileIcon icon={item.icon || (item.type === 'folder' ? Folder : FileText)} color={item.type === 'folder' ? 'bg-blue-500/10 text-blue-500' : 'bg-zinc-800 text-zinc-400'} />
                     <span className="font-medium">{item.label}</span>
                   </div>
                   {item.type === 'folder' && <ChevronRight size={16} className="text-zinc-600" />}
                 </button>
               ))}
            </div>
          )}
        </div>


        {/* DESKTOP VIEW: Multi-Column Layout */}
        <div className="hidden md:flex w-full h-full">
          
          {/* Render a column for each level in the path */}
          {path.map((folder, index) => (
            <div 
              key={folder.id} 
              className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-black overflow-y-auto shrink-0 animate-in slide-in-from-left-4 duration-300"
            >
              <div className="p-2">
                {folder.children.map(item => {
                  // Check if this item is selected in the NEXT path index
                  const isActive = path[index + 1]?.id === item.id || selectedFile?.id === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(index, item)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${
                        isActive 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                         {item.type === 'folder' 
                           ? <Folder size={16} className={isActive ? 'text-white' : 'text-blue-500'} /> 
                           : <item.icon size={16} className={isActive ? 'text-white' : 'text-zinc-500'} />
                         }
                         <span className="truncate">{item.label}</span>
                      </div>
                      {item.type === 'folder' && <ChevronRight size={14} className={isActive ? 'text-white' : 'text-zinc-500'} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Final Column: The Preview Pane */}
          <div className="flex-1 bg-white dark:bg-[#0c0c0c] h-full overflow-hidden border-l border-zinc-200 dark:border-zinc-800">
             <PreviewPane content={selectedFile?.content} />
          </div>

        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-8 bg-white dark:bg-[#0c0c0c] border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 text-[10px] text-zinc-500 shrink-0">
         <div className="flex gap-4">
           <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-500"/> React Mode</span>
           <span>UTF-8</span>
         </div>
         <div>
           {selectedFile ? 'File Preview' : `${path[path.length-1].children.length} items`}
         </div>
      </div>

    </div>
  );
}