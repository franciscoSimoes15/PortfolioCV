import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Mail, MapPin, ExternalLink, BookOpen, Code, Briefcase, 
  User, Terminal, Cpu, Globe, Database, Moon, Sun, Phone, Sparkles, 
  MessageSquare, Send, X, Loader, Minimize2, Maximize2, Play, Bot 
} from 'lucide-react';
import './index.css';

/** --- MOCK DATA --- */
const CV_DATA = {
  profile: {
    name: "Francisco Simões",
    role: "Software Engineering Master's Student",
    location: "Coimbra, Portugal",
    email: "francisco.simoes@example.com", 
    phone: "+351 910 513 419",
    github: "github.com/franciscosimoes", 
    linkedin: "linkedin.com/in/franciscosimoes", 
    summary: "Passionate about coding and driven by solving real needs. Experienced in building full-stack applications using Go, React, and Java. \n// Currently developing intelligent fintech solutions and integrating Open Banking systems. \n// Seeking a master's curricular internship to apply my skills and build impactful software.",
  },
  education: [
    {
      degree: "Master's in Software Engineering",
      institution: "Instituto Superior de Engenharia de Coimbra",
      period: "2023 - Present",
      description: "Specializing in Distributed Systems, AI, and DevOps. Grade Highlights: Software Testing (18/20), Web Development (16/20).",
      courses: ["Distributed Systems", "Artificial Intelligence", "CI/CD Pipelines", "Software Testing"]
    },
    {
      degree: "Bachelor's in Software Engineering",
      institution: "Instituto Superior de Engenharia de Coimbra",
      period: "2019 - 2023",
      description: "Developed mobile applications for iOS/Android and client-server Java architectures.",
      courses: ["Mobile Development", "Java Architecture", "Data Structures"]
    }
  ],
  experience: [
    {
      role: "Full Stack Developer (Masters Internship)",
      company: "Haupper",
      period: "2025 - Present",
      description: "Developing an intelligent bank reconciliation platform integrated with HLoan. integrating Open Banking and OCR, applying automated matching rules for credit and bank transactions.",
      technologies: ["Golang", ".NET", "React", "Open Banking"]
    },
    {
      role: "Full Stack Developer Trainee",
      company: "Haupper",
      period: "Summer 2025",
      description: "Immersed in company culture and tech stack. Interacted with and tested products, providing insights into functionality and user experience.",
      technologies: ["Full Stack", "QA Testing", "Product Analysis"]
    },
    {
      role: "Web Developer Intern",
      company: "One Source",
      period: "2023",
      description: "Self-learned project stack in 3 weeks. Developed standardized components to streamline and unify common project modules.",
      technologies: ["Web Development", "Component Architecture"]
    },
    {
      role: "App/Cloud Associate Intern",
      company: "Accenture",
      period: "2023",
      description: "Built an application and configured cloud infrastructure (Journey2Cloud). Developed screens using IFS MWM.",
      technologies: ["Cloud Infrastructure", "IFS MWM"]
    }
  ],
  projects: [
    {
      title: "DevOps & Cloud Pipeline",
      description: "Full-stack Spring Boot/Thymeleaf app with automated CI/CD. Uses Ansible scripts to deploy Docker images for frontend, backend, and MongoDB.",
      link: "#",
      tags: ["Ansible", "Docker", "Spring Boot", "CI/CD"]
    },
    {
      title: "AI Mobility Plugin",
      description: "Accessibility evaluation tool using gravity models and negative binomial regression to estimate visit frequency based on census data.",
      link: "#",
      tags: ["AI", "Data Science", "Algorithms"]
    },
    {
      title: "Distributed Backend System",
      description: "Backend application strictly adhering to API design principles and advanced Java design patterns.",
      link: "#",
      tags: ["Java", "API Design", "Backend"]
    }
  ],
  skills: {
    languages: ["Golang", "Java", "PHP (Laravel)", "JavaScript", "SQL"],
    frontend: ["React", "Thymeleaf", "HTML/CSS"],
    backend: ["Spring Boot", ".NET", "Laravel", "Gin/Echo"],
    devops: ["Terraform", "Ansible", "Docker", "CI/CD"]
  }
};

/** --- UTILS & COMPONENTS --- */
const apiKey = ""; 

const callGemini = async (prompt, systemInstruction = "") => {
  if (!apiKey) { console.error("API Key missing."); return "I'm sorry, my AI brain is currently offline (API Key missing)."; }
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], systemInstruction: { parts: [{ text: systemInstruction }] } }),
    });
    if (!response.ok) throw new Error("Gemini API Error");
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) { console.error(error); return "Error connecting to AI service."; }
};

const Typewriter = ({ text, delay = 50, className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < text.length) {
      const t = setTimeout(() => { setCurrentText(prev => prev + text[currentIndex]); setCurrentIndex(prev => prev + 1); }, delay);
      return () => clearTimeout(t);
    }
  }, [currentIndex, delay, text]);
  return <span className={className}>{currentText}</span>;
};

const TerminalWelcome = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  useEffect(() => {
    const seq = [
      { text: "> initializing_kernel...", delay: 200 },
      { text: "> loading_modules...", delay: 600 },
      { text: "> verifying_integrity... OK", delay: 1200 },
      { text: "> mounting_profile...", delay: 1800 },
      { text: "> starting_gui...", delay: 2400 },
    ];
    seq.forEach(({ text, delay }, i) => setTimeout(() => {
        setLines(p => [...p, text]);
        if (i === seq.length - 1) setTimeout(onComplete, 800);
    }, delay));
  }, [onComplete]);
  return <div className="fixed inset-0 bg-black text-green-500 font-mono p-8 z-[100] flex flex-col justify-end pb-20">{lines.map((l, i) => <div key={i}>{l}</div>)}<div className="animate-pulse">_</div></div>;
};

const CodeWindow = ({ children }) => (
  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-white dark:bg-[#1e1e1e] font-mono text-sm my-6 transition-all hover:shadow-2xl hover:scale-[1.01]">
    <div className="bg-slate-100 dark:bg-[#252526] px-4 py-2 flex items-center gap-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
      <div className="flex-1 text-center text-slate-500 text-xs">profile.go</div>
    </div>
    <div className="p-4 overflow-x-auto">
      <div className="flex">
        <div className="text-slate-400 dark:text-[#858585] pr-4 select-none text-right border-r border-slate-200 dark:border-slate-700 mr-4">1<br/>2<br/>3<br/>4<br/>5</div>
        <div className="text-slate-800 dark:text-[#d4d4d4] whitespace-pre-wrap"><span className="text-purple-600 dark:text-[#c586c0]">package</span> main<br/><br/><span className="text-purple-600 dark:text-[#c586c0]">func</span> GetBio() string {'{'}<br/>&nbsp;&nbsp;return "{children}"<br/>{'}'}</div>
      </div>
    </div>
  </div>
);

const ContributionGraph = () => (
  <div className="mt-8 pt-6 border-t border-slate-700">
    <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
      <Github className="w-4 h-4" /> Activity Graph (Mock)
    </h3>
    <div className="flex flex-wrap gap-1 w-full max-w-[18rem]">
      {Array.from({ length: 140 }).map((_, i) => <div key={i} className={`w-2 h-2 rounded-sm ${Math.random() > 0.5 ? 'bg-green-600' : 'bg-slate-800'}`} />)}
    </div>
  </div>
);

const ChatWidget = ({ resumeData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: "Hi! I'm Francisco's Virtual Assistant." }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [loading, setLoading] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactBody, setContactBody] = useState("");
  
  useEffect(() => { if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]);

  const handleSendChat = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input; setInput(""); setMessages(prev => [...prev, { role: 'user', text: userMsg }]); setLoading(true);
    const aiResponse = await callGemini(userMsg, `Guide for ${resumeData.profile.name}'s portfolio.`);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]); setLoading(false);
  };

  const handleSendEmail = () => { window.location.href = `mailto:${resumeData.profile.email}?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactBody)}`; };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-xl z-[60] hover:bg-indigo-700 transition-all hover:scale-110">
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {isOpen && (
        // FIX: Added max-h-[80vh] to stop it from going off-screen on high zoom
        // FIX: Added 'overflow-hidden' to ensure inner scrollbars work
        // FIX: Adjusted bottom position to be safe
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 border border-slate-200 dark:border-slate-700 z-50 overflow-hidden flex flex-col max-h-[80vh] transition-all duration-300">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white -m-4 mb-4 shrink-0">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">Project Guide</span>
            </div>
            <div className="flex bg-black/20 p-1 rounded-lg">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 py-1.5 text-xs font-bold rounded-md ${activeTab === 'chat' ? 'bg-white text-indigo-600' : 'text-white/70'}`}>Ask AI</button>
              <button onClick={() => setActiveTab('contact')} className={`flex-1 py-1.5 text-xs font-bold rounded-md ${activeTab === 'contact' ? 'bg-white text-indigo-600' : 'text-white/70'}`}>Contact</button>
            </div>
          </div>

          {activeTab === 'chat' && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-1">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-700 dark:text-white rounded-tl-none'}`}>{m.text}</div>
                  </div>
                ))}
                {loading && <Loader className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400 ml-4" />}
                <div ref={messagesEndRef} />
              </div>
              <div className="flex gap-2 shrink-0">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendChat()} className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-full px-3 py-2 text-sm dark:text-white border-none outline-none" placeholder="Type..." />
                <button onClick={handleSendChat} disabled={loading || !input.trim()} className="p-2 bg-indigo-600 text-white rounded-full"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="flex-col flex-1 min-h-0 overflow-y-auto space-y-3 p-1">
               <div className="text-center mb-4 mt-2">
                 <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-2">
                   <Mail className="w-6 h-6" />
                 </div>
                 <h3 className="text-slate-800 dark:text-white font-bold text-sm">Send me a message</h3>
               </div>
               <input type="text" value={contactSubject} onChange={(e) => setContactSubject(e.target.value)} placeholder="Subject" className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-sm outline-none dark:text-white" />
               <textarea value={contactBody} onChange={(e) => setContactBody(e.target.value)} placeholder="Message..." className="w-full h-24 px-3 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-sm outline-none resize-none dark:text-white" />
               <button onClick={handleSendEmail} disabled={!contactSubject || !contactBody} className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Open Mail Client</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const TimelineItem = ({ title, subtitle, date, description, tags }) => (
  <div className="relative pl-8 pb-12 last:pb-0 border-l-2 border-slate-200 dark:border-slate-700 ml-2 group h-full">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform"></div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{title}</h3>
      <span className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded mt-2 sm:mt-0.5 w-fit whitespace-nowrap shrink-0 ml-4">{date}</span>
    </div>
    <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{subtitle}</div>
    <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed max-w-prose">{description}</p>
    {tags && <div className="flex flex-wrap gap-2 mt-2">{tags.map(tag => <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">{tag}</span>)}</div>}
  </div>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [data, setData] = useState(null);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => { setTimeout(() => setData(CV_DATA), 100); }, []);

  if (!introFinished) return <TerminalWelcome onComplete={() => setIntroFinished(true)} />;
  if (!data) return <div className="min-h-screen bg-slate-900"></div>;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0" 
           style={{ backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', backgroundSize: '2.5rem 2.5rem' }}>
      </div>

      <button onClick={() => setIsDark(!isDark)} className="fixed top-6 right-6 p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 z-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <ChatWidget resumeData={data} />

      <div className="w-full bg-white dark:bg-slate-900 min-h-screen flex flex-col md:flex-row relative z-10 animate-in fade-in duration-1000">
        
        <aside className="w-full md:w-[30%] lg:w-[25vw] shrink-0 bg-slate-900 text-white p-8 md:p-10 flex flex-col border-r border-slate-800 md:h-screen md:sticky md:top-0 overflow-y-auto">
            <div className="relative z-10 text-center md:text-left h-full flex flex-col">
                
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 mx-auto md:mx-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold mb-6 shadow-xl border-4 border-slate-800 ring-4 ring-indigo-500/30">
                    {data.profile.name.charAt(0)}
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">{data.profile.name}</h1>
                <div className="text-indigo-400 font-mono text-sm mb-8 h-10"><Typewriter text={"> " + data.profile.role} delay={40} /></div>
                
                <div className="space-y-4 mb-10 text-sm">
                    <a href={`mailto:${data.profile.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group justify-center md:justify-start">
                        <Mail className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" /><span>{data.profile.email}</span>
                    </a>
                    <div className="flex items-center gap-3 text-slate-300 justify-center md:justify-start"><MapPin className="w-4 h-4 text-indigo-400" /><span>{data.profile.location}</span></div>
                    <a href={`https://${data.profile.github}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group justify-center md:justify-start">
                        <Github className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" /><span>{data.profile.github}</span>
                    </a>
                </div>
                <div className="mb-8 hidden md:block">
                    <h2 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-4 border-b border-slate-700 pb-2">Top Skills</h2>
                    <div className="flex flex-wrap gap-2">{data.skills.languages.map(skill => <span key={skill} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 hover:border-indigo-500 transition-colors cursor-default">{skill}</span>)}</div>
                </div>
                <div className="mt-12 hidden md:block"><ContributionGraph /></div>
            </div>
        </aside>

        <main className="flex-1 p-8 md:p-12 lg:p-10 overflow-y-auto bg-white dark:bg-slate-900 transition-colors">
            <div className="w-full space-y-12">
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <Terminal className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile.go</h2>
                    </div>
                    <CodeWindow>{data.profile.summary}</CodeWindow>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-32">
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Briefcase className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h2>
                        </div>
                        <div className="ml-2 flex flex-col gap-6">
                            {data.experience.map((job, idx) => (
                                <TimelineItem key={idx} title={job.role} subtitle={job.company} date={job.period} description={job.description} tags={job.technologies} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
                        </div>
                        <div className="ml-2 flex flex-col gap-6">
                            {data.education.map((edu, idx) => (
                                <TimelineItem key={idx} title={edu.degree} subtitle={edu.institution} date={edu.period} description={edu.description} tags={edu.courses} />
                            ))}
                        </div>
                    </section>
                </div>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {data.projects.map((proj, idx) => (
                            <div key={idx} className="group bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 relative overflow-hidden flex flex-col h-full">
                                <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{proj.title}</h3>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow">{proj.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {proj.tags.map(tag => <span key={tag} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">{tag}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            
            </div>
        </main>
      </div>
    </div>
  );
}