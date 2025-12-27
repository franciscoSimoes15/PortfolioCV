import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  BookOpen, 
  Code, 
  Briefcase, 
  User, 
  Terminal,
  Cpu,
  Globe,
  Database,
  Moon,
  Sun,
  Phone,
  Sparkles,
  MessageSquare,
  Send,
  X,
  Loader,
  Minimize2,
  Maximize2,
  Play,
  Bot
} from 'lucide-react';

/**
 * MOCK DATA
 * Populated from Francisco Simões's CV
 */
const CV_DATA = {
  profile: {
    name: "Francisco Simões",
    role: "Software Engineering Master's Student",
    location: "Coimbra, Portugal",
    email: "francisco.simoes@example.com", // Placeholder
    phone: "+351 910 513 419",
    github: "github.com/franciscosimoes", // Placeholder
    linkedin: "linkedin.com/in/franciscosimoes", // Placeholder
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

/**
 * GEMINI API UTILITIES
 */
// NOTE: For Vercel/Vite deployment, uncomment the line below and comment out the empty string line.
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const apiKey = ""; 

const callGemini = async (prompt, systemInstruction = "") => {
  if (!apiKey) {
    console.error("API Key is missing. Please set VITE_GEMINI_API_KEY in your environment.");
    return "I'm sorry, my AI brain is currently offline (API Key missing).";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );

    if (!response.ok) throw new Error("Gemini API Error");
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error(error);
    return "Error connecting to AI service. Please try again later.";
  }
};

/**
 * UI COMPONENTS
 */

// Typewriter Effect Component
const Typewriter = ({ text, delay = 50, className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span className={className}>{currentText}</span>;
};

// Terminal Welcome Screen
const TerminalWelcome = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    const sequence = [
      { text: "> initializing_kernel...", delay: 200 },
      { text: "> loading_modules: [golang, terraform, react, java]...", delay: 600 },
      { text: "> verifying_integrity... OK", delay: 1200 },
      { text: "> mounting_profile: /home/francisco_simoes", delay: 1800 },
      { text: "> boot_sequence_complete.", delay: 2400 },
      { text: "> starting_gui...", delay: 2800 },
    ];

    let timeouts = [];
    sequence.forEach(({ text, delay }, index) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (index === sequence.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono p-8 z-[100] flex flex-col justify-end pb-20">
      {lines.map((line, i) => (
        <div key={i} className="mb-2">{line}</div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};

// VS Code Style Window for Summary
const CodeWindow = ({ children }) => (
  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl bg-white dark:bg-[#1e1e1e] font-mono text-sm my-6 transition-all hover:shadow-2xl hover:scale-[1.01]">
    {/* Window Title Bar */}
    <div className="bg-slate-100 dark:bg-[#252526] px-4 py-2 flex items-center gap-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-1 text-center text-slate-500 text-xs">profile_summary.go</div>
    </div>
    {/* Code Content */}
    <div className="p-4 overflow-x-auto">
      <div className="flex">
        <div className="text-slate-400 dark:text-[#858585] pr-4 select-none text-right border-r border-slate-200 dark:border-slate-700 mr-4">
          1<br/>2<br/>3<br/>4<br/>5
        </div>
        <div className="text-slate-800 dark:text-[#d4d4d4] whitespace-pre-wrap">
          <span className="text-purple-600 dark:text-[#c586c0]">package</span> main<br/><br/>
          <span className="text-purple-600 dark:text-[#c586c0]">func</span> <span className="text-blue-600 dark:text-[#dcdcaa]">GetBio</span>() <span className="text-teal-600 dark:text-[#4ec9b0]">string</span> {'{'}<br/>
          &nbsp;&nbsp;<span className="text-purple-600 dark:text-[#c586c0]">return</span> <span className="text-amber-600 dark:text-[#ce9178]">"{children}"</span><br/>
          {'}'}
        </div>
      </div>
    </div>
  </div>
);

// Decorative GitHub Contribution Graph
const ContributionGraph = () => {
  // Generate random activity levels for visual flair
  const weeks = 20;
  const days = 7;
  const grid = Array.from({ length: weeks * days }, () => Math.random());

  return (
    <div className="mt-8 pt-6 border-t border-slate-700">
      <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
        <Github size={14} /> Activity Graph (Mock)
      </h3>
      <div className="flex flex-wrap gap-1 w-full max-w-[240px]">
        {grid.map((val, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-sm ${
              val > 0.8 ? 'bg-green-400' : 
              val > 0.5 ? 'bg-green-600' : 
              val > 0.2 ? 'bg-green-900' : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Chat / Contact Widget
const ChatWidget = ({ resumeData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'contact'
  
  // Chat State
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Francisco's Virtual Assistant. I can guide you through his projects in Go, React, and Cloud infrastructure." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Contact Form State
  const [contactSubject, setContactSubject] = useState("");
  const [contactBody, setContactBody] = useState("");

  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, activeTab]);

  const handleSendChat = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const systemPrompt = `You are a friendly and professional Virtual Guide for ${resumeData.profile.name}'s portfolio. 
    Your goal is to explain his projects and skills to potential recruiters.
    Use the following Resume Data: ${JSON.stringify(resumeData)}.
    
    Guidelines:
    - If asked about projects, provide specific technical details (tech stack, challenges solved) from the data.
    - Be enthusiastic but professional.
    - If the user wants to contact Francisco, guide them to the 'Contact' tab in this widget.
    - Answer in the first person ("I" referring to Francisco's digital twin).
    - Keep answers concise (max 3 sentences).`;

    const aiResponse = await callGemini(userMsg, systemPrompt);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  const handleSendEmail = () => {
    if (!contactSubject || !contactBody) return;
    const mailtoLink = `mailto:${resumeData.profile.email}?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 hover:scale-110 transition-all z-50 flex items-center justify-center animate-bounce-slow"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 flex flex-col max-h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header & Tabs */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} />
              <span className="font-bold">Project Guide</span>
            </div>
            <div className="flex bg-black/20 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'chat' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                Ask AI
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'contact' ? 'bg-white text-indigo-600 shadow-sm' : 'text-white/70 hover:text-white'}`}
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50 min-h-[300px]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-tl-none shadow-sm'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && <Loader size={16} className="animate-spin text-indigo-600 dark:text-indigo-400 ml-4" />}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask about Open Banking or DevOps..."
                  className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                />
                <button 
                  onClick={handleSendChat}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-4 min-h-[350px]">
               <div className="text-center mb-2">
                 <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-2">
                   <Mail size={24} />
                 </div>
                 <h3 className="text-slate-800 dark:text-white font-bold text-sm">Send me a message</h3>
                 <p className="text-xs text-slate-500 dark:text-slate-400">This will open your default email client.</p>
               </div>
               
               <div className="space-y-3">
                 <div>
                   <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Subject</label>
                   <input 
                      type="text" 
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="Project Inquiry"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Message</label>
                   <textarea 
                      value={contactBody}
                      onChange={(e) => setContactBody(e.target.value)}
                      placeholder="Hi Francisco, I'd like to discuss..."
                      className="w-full h-24 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none dark:text-white"
                   />
                 </div>
                 <button 
                   onClick={handleSendEmail}
                   disabled={!contactSubject || !contactBody}
                   className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                   <Send size={14} /> Open Mail Client
                 </button>
               </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// Timeline Item
const TimelineItem = ({ title, subtitle, date, description, tags }) => (
  <div className="relative pl-8 pb-12 last:pb-0 border-l-2 border-slate-200 dark:border-slate-700 ml-2 group">
    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 border-4 border-white dark:border-slate-900 group-hover:scale-125 transition-transform"></div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      <span className="text-sm font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{date}</span>
    </div>
    <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">{subtitle}</div>
    <p className="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">{description}</p>
    {tags && (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded font-medium border border-slate-200 dark:border-slate-700">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

// Main App
export default function App() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode for "Hacker" feel
  const [data, setData] = useState(null);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => setData(CV_DATA), 100);
  }, []);

  if (!introFinished) {
    return <TerminalWelcome onComplete={() => setIntroFinished(true)} />;
  }

  if (!data) return <div className="min-h-screen bg-slate-900"></div>;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      
      {/* Background Grid Pattern (Visual Only) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 z-50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Widgets */}
      <ChatWidget resumeData={data} />

      <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 shadow-2xl min-h-screen flex flex-col md:flex-row relative z-10 animate-in fade-in duration-1000">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-900 text-white p-8 md:p-10 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 border-8 border-indigo-500 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
            </div>

            <div className="relative z-10 text-center md:text-left">
                <div className="w-32 h-32 mx-auto md:mx-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold mb-6 shadow-xl border-4 border-slate-800 ring-4 ring-indigo-500/30">
                    {data.profile.name.charAt(0)}
                </div>

                <h1 className="text-3xl font-bold mb-2 tracking-tight">{data.profile.name}</h1>
                <div className="text-indigo-400 font-mono text-sm mb-8 h-10">
                   <Typewriter text={"> " + data.profile.role} delay={40} />
                </div>

                <div className="space-y-4 mb-10 text-sm">
                    <a href={`mailto:${data.profile.email}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                        <Mail size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span>{data.profile.email}</span>
                    </a>
                    <div className="flex items-center gap-3 text-slate-300">
                        <MapPin size={16} className="text-indigo-400" />
                        <span>{data.profile.location}</span>
                    </div>
                    <a href={`https://${data.profile.github}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                        <Github size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span>{data.profile.github}</span>
                    </a>
                </div>

                <div className="mb-8">
                    <h2 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-4 border-b border-slate-700 pb-2">Top Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.languages.map(skill => (
                            <span key={skill} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 hover:border-indigo-500 transition-colors cursor-default">{skill}</span>
                        ))}
                    </div>
                </div>

                {/* Contribution Graph Decoration */}
                <ContributionGraph />
            </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto">
            
            {/* About Section - now with VS Code Window */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Terminal className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile.go</h2>
                </div>
                <CodeWindow>{data.profile.summary}</CodeWindow>
            </section>

            {/* Experience Timeline */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                    <Briefcase className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h2>
                </div>
                <div className="ml-2">
                    {data.experience.map((job, idx) => (
                        <TimelineItem 
                            key={idx}
                            title={job.role}
                            subtitle={job.company}
                            date={job.period}
                            description={job.description}
                            tags={job.technologies}
                        />
                    ))}
                </div>
            </section>

            {/* Projects Grid */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Code className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Academic Projects</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {data.projects.map((proj, idx) => (
                        <div key={idx} className="group bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 relative overflow-hidden">
                            {/* Hover Reveal Effect */}
                            <div className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{proj.title}</h3>
                                    <ExternalLink size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                                    {proj.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {proj.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

             {/* Education Timeline */}
             <section className="mt-12">
                <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="text-indigo-600 dark:text-indigo-400" size={24} />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
                </div>
                <div className="ml-2">
                    {data.education.map((edu, idx) => (
                        <TimelineItem 
                            key={idx}
                            title={edu.degree}
                            subtitle={edu.institution}
                            date={edu.period}
                            description={edu.description}
                            tags={edu.courses}
                        />
                    ))}
                </div>
            </section>

        </main>
      </div>
    </div>
  );
}