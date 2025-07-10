import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';

// --- SVG Icons for a polished look ---
const BotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1 opacity-70">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 ml-1 opacity-70">
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M16 8a6 6 0 0 1 6 6v6" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <line x1="8" y1="8" x2="8" y2="8" />
  </svg>
);

// --- TypeScript Interfaces for our Data ---
interface VoiceAnalysis {
  toneMarkers: string;
  coreValues: string;
  persona: string;
}

interface Metrics {
  latency: string;
  confidence: string;
  timeSaved: string;
}

interface AgentResults {
  summary: string;
  email: string;
  voiceAnalysis: VoiceAnalysis;
  metrics: Metrics;
}

// --- Main Application Component ---
const Home: NextPage = () => {
  const [agentState, setAgentState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [results, setResults] = useState<AgentResults | null>(null);
  const [error, setError] = useState('');
  
  // State for the input text area. It's pre-filled but could be editable.
  const [jobDescription, setJobDescription] = useState(`
### Vibe Coder-in-Residence (GenAI Tech EA)

**Location:** US, CA, San Jose, Rio Robles
**Job Type:** Full time
**Job Requisition ID:** R253221

---

### About Analog Devices

Analog Devices, Inc. (NASDAQ: ADI) is a global semiconductor leader that bridges the physical and digital worlds to enable breakthroughs at the Intelligent Edge. ADI combines analog, digital, and software technologies into solutions that help drive advancements in digitized factories, mobility, and digital healthcare, combat climate change, and reliably connect humans and the world. With revenue of more than $9 billion in FY24 and approximately 24,000 people globally, ADI ensures today's innovators stay Ahead of What's Possible™. Learn more at www.analog.com and on LinkedIn and Twitter (X).

### Mission

Shadow our VP of Edge AI, capture every friction point in real time, and turn it into an automated GenAI workflow—shipping daily. Act as founding engineer for the VP’s digital twin “brain” while evangelizing and broadcasting the journey for maximum “AI halo” impact.

### What You’ll Do (First 6 Months)

- **Day 1-30 -> Observe & Automate:** Pair-shadow meetings, Teams, doc reviews. Ship micro-agents that cut repeat tasks (think: LLM-powered agenda generator, decision-tracker bot).
- **Day 31-60 -> Scale & Compose:** Chain agents together—calendar optimizer calls the meeting-minute bot which feeds the action-item tracker. Instrument with telemetry; cut human touchpoints by >25%. Build a microsite “tech radar” that maps VP’s Deep Research notes into visible tech-trends radar. Build a “team tracker” agent to generate the weekly status radar for whole of VP’s org.
- **Day 61-90 -> Externalize & Evangelize:** Package best agents as internal templates. Produce a public demo or open-sourced repo; partner with Comms for media drops.
- **Month 4-6 -> Digital Twin v1:** Fine-tune a personal-style LLM and multi-agent fabric that drafts briefs and strategic emails and technical articles indistinguishable from the VP. Formal Turing evaluation: randomize % past emails into twin vs. VP variants, have peers label author; shoot for >= 70% confusion before iterating toward BLEU 0.75 goal.

### Daily Responsibilities

- Live-code GenAI agents in Python / TypeScript using LangChain, OpenAI etc.
- Fine-tune and orchestrate LLMs (OpenAI, Claude, local models).
- Rapid-fire prompt engineering; optimize systems prompts for set of VP agents.
- Integrate with enterprise APIs (Teams, Confluence, Office).
- Maintain a “metrics or it didn’t happen” dashboard (latency, adoption, minutes saved).
- Co-write technical blogs and demo scripts with Comms to amplify the story.

### Must-Haves

- Track record of shipping GenAI products in < 2 weeks cycles. Provide links or repos.
- Mastery of GenAI and agent frameworks (Langchain, MCP etc).
- Rapid full-stack micro-site builder (e.g. Vercel).
- Comfortable pair-programming or pair-prompting in a fast-moving exec environment; ego-less, outcome-obsessed.
- Storytelling chops—can turn a changelog into a headline.
- Time zone: The role is based out of San Jose (CA, USA) or Limerick (Ireland), but the applicant can work remotely and must be willing to work in whichever time zone the VP is in, mostly the CA time zone.

### Nice-to-Haves

- Experience reverse-engineering personal workflows or building AI copilots.
- Familiar with range of productivity hacks and how to code them as agents.
- Prior startup founding engineer (doesn’t matter if company succeeded) or hacker-in-residence cred.
- Familiar with enterprise security & compliance for LLM rollouts.

### Success Metrics

- >= 5 production agents live by day 30.
- >= 30% reduction in VP calendar load by day 90.
- >= 2 external media features or conference demos by month 6.

### How to Apply

Skip the résumé. Ship a working agent that summarizes this job description, drafts your intro email in the VP’s voice, and posts both to a public GitHub repo. Include a README on architecture choices. Fastest high-quality submission wins the initial selection interview. Successful applicants will be expected to live-hack to solve a set of indicative problems. Finalists will live-code with our VP.

### Legal & Compliance

For positions requiring access to technical data, Analog Devices, Inc. may have to obtain export licensing approval from the U.S. Department of Commerce - Bureau of Industry and Security and/or the U.S. Department of State - Directorate of Defense Trade Controls. As such, applicants for this position – except US Citizens, US Permanent Residents, and protected individuals as defined by 8 U.S.C. 1324b(a)(3) – may have to go through an export licensing review process.

Analog Devices is an equal opportunity employer. We foster a culture where everyone has an opportunity to succeed regardless of their race, color, religion, age, ancestry, national origin, social or ethnic origin, sex, sexual orientation, gender, gender identity, gender expression, marital status, pregnancy, parental status, disability, medical condition, genetic information, military or veteran status, union membership, and political affiliation, or any other legally protected group. EEO is the Law: Notice of Applicant Rights Under the Law.

### Compensation & Benefits

- **Job Req Type:** Experienced
- **Required Travel:** Yes, 10% of the time
- **Shift Type:** 1st Shift/Days
- **Expected Wage Range:** $144,038 to $216,056. Actual wage offered may vary depending on work location, experience, education, training, external market data, internal pay equity, or other bona fide factors.
- This position qualifies for a discretionary performance-based bonus which is based on personal and company factors.
- This position includes medical, vision and dental coverage, 401k, paid vacation, holidays, and sick time, and other benefits.
`);

  // --- API Call Simulation ---
  const runAgent = async () => {
    setAgentState('loading');
    setResults(null);
    setError('');

    try {
      const summaryPrompt = `You are a strategic analyst. Summarize the following job description into a "Mission Briefing". Focus on the core objective, the ideal candidate profile, and the ultimate goal. Use bullet points for clarity. Job Description: ${jobDescription}`;
      const emailPrompt = `Analyze the voice and tone from the provided job description ('shipping daily', 'ego-less', 'AI halo', 'vibe'). Now, acting as an applicant who embodies this 'Vibe Coder-in-Residence' persona, draft a concise, direct, and confident introductory email to the VP. The email must reference the unique application task and provide a placeholder for the GitHub link. Job Description: ${jobDescription}`;
      
      const summary = await callGemini(summaryPrompt, "You are a strategic analyst.");
      const email = await callGemini(emailPrompt, "You are an AI assistant skilled in capturing specific tones.");

      const voiceAnalysis = {
        toneMarkers: "Direct, action-oriented, informal ('shipping daily', 'ego-less')",
        coreValues: "Speed, tangible results, high impact, 'AI halo'",
        persona: "Scrappy, outcome-obsessed builder",
      };
      
      const metrics = {
        latency: `${(Math.random() * (1.8 - 0.9) + 0.9).toFixed(2)}s`,
        confidence: `${Math.floor(Math.random() * (97 - 92) + 92)}%`,
        timeSaved: `~15 minutes`,
      };

      setResults({ summary, email, voiceAnalysis, metrics });
      setAgentState('success');

    } catch (err: any) {
      console.error("Error running agent:", err);
      setError("An error occurred while communicating with the agent. Please try again.");
      setAgentState('error');
    }
  };

  // --- Helper function for Gemini API calls ---
  async function callGemini(prompt: string, systemInstruction: string) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyCwiT8NHZqSrt-zbfT9xJcd0SzS0RiYkX0";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: { role: "model", parts: [{ text: systemInstruction }] }
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Could not parse a valid response from the model.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans flex flex-col">
      <header className="p-4 border-b border-gray-700/50 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white flex items-center">
            <BotIcon />
            <span>GenAI Application Agent</span>
          </h1>
          <a href="https://github.com/OuterSpacee/DigitalTwin" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-700/50">
            <GithubIcon />
            <span className="hidden sm:inline">View Source</span>
          </a>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-8">
        {/* --- Two-Column Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-8">
          
          {/* --- Left Column: Input & Controls --- */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <InputPanel 
              jobDescription={jobDescription} 
              setJobDescription={setJobDescription}
              onRunAgent={runAgent}
              agentState={agentState}
            />
          </div>

          {/* --- Right Column: Agent Output --- */}
          <div className="lg:col-span-3">
            <OutputPanel 
              agentState={agentState} 
              results={results}
              error={error}
            />
          </div>
        </div>
      </main>

      {/* --- NEW FOOTER SECTION --- */}
      <footer className="w-full text-center p-6 border-t border-gray-700/50 text-sm text-gray-500">
        <p className="mb-2">
          This interactive application was built by Ismail Likhon as a submission for the Vibe Coder-in-Residence role.
        </p>
        <div className="flex justify-center items-center gap-x-6">
          <a
            href="https://www.linkedin.com/in/ismaillikhon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-300 transition-colors"
          >
            LinkedIn <LinkedInIcon />
          </a>
          <a
            href="https://github.com/OuterSpacee/DigitalTwin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-300 transition-colors"
          >
            Project Source Code <ExternalLinkIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;

// --- UI Components ---

interface InputPanelProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  onRunAgent: () => void;
  agentState: 'idle' | 'loading' | 'success' | 'error';
}

const InputPanel: React.FC<InputPanelProps> = ({ jobDescription, setJobDescription, onRunAgent, agentState }) => (
  <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-6 sticky top-24">
    <h2 className="text-2xl font-bold text-white mb-4">Agent Configuration</h2>
    <div className="mb-4">
      <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-400 mb-2">
        Input: Job Description
      </label>
      <textarea
        id="jobDescription"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full h-64 bg-gray-900/70 border border-gray-600 rounded-md p-3 text-sm font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="Paste the job description here..."
      />
    </div>
    <button 
      onClick={onRunAgent} 
      disabled={agentState === 'loading'}
      className="w-full bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-600/20 disabled:bg-gray-600 disabled:scale-100 disabled:cursor-not-allowed"
    >
      {agentState === 'loading' ? 'Agent is Running...' : '[ Analyze & Draft ]'}
    </button>
  </div>
);

interface OutputPanelProps {
  agentState: 'idle' | 'loading' | 'success' | 'error';
  results: AgentResults | null;
  error: string;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ agentState, results, error }) => {
  if (agentState === 'idle') {
    return (
      <div className="h-full flex items-center justify-center text-center bg-gray-800/30 border-2 border-dashed border-gray-700/60 rounded-xl p-8">
        <div>
          <h3 className="text-2xl font-bold text-white">Agent Output</h3>
          <p className="text-gray-400 mt-2">Results will appear here once the agent is run.</p>
        </div>
      </div>
    );
  }

  if (agentState === 'loading') {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-400">Agent is thinking...</p>
        </div>
      </div>
    );
  }

  if (agentState === 'error') {
    return (
      <div className="text-center animate-fade-in bg-red-900/20 border border-red-500/30 p-8 rounded-lg">
        <h3 className="text-2xl font-bold text-red-400 mb-2">An Error Occurred</h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (agentState === 'success' && results) {
    return (
      <div className="space-y-6 animate-fade-in">
        <SummaryCard summary={results.summary} />
        <EmailCard email={results.email} voiceAnalysis={results.voiceAnalysis} />
        <MetricsCard metrics={results.metrics} />
      </div>
    );
  }

  return null;
};

const Card: React.FC<{ children: React.ReactNode; title: string; icon: React.ReactNode }> = ({ children, title, icon }) => (
  <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl shadow-lg overflow-hidden">
    <div className="p-4 sm:p-5 border-b border-gray-700/60 flex items-center">
      {icon}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="p-4 sm:p-6 text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

const SummaryCard: React.FC<{ summary: string }> = ({ summary }) => (
  <Card title="Mission Briefing" icon={<span className="text-xl mr-3">🎯</span>}>
    <div className="whitespace-pre-wrap font-mono text-sm">{summary}</div>
  </Card>
);

const EmailCard: React.FC<{ email: string; voiceAnalysis: VoiceAnalysis }> = ({ email, voiceAnalysis }) => {
  const [isAnalysisOpen, setAnalysisOpen] = useState(false);
  return (
    <Card title="Digital Twin Output: Email Draft" icon={<span className="text-xl mr-3">🤖</span>}>
      <p className="whitespace-pre-wrap font-mono text-sm">{email}</p>
      <div className="mt-4 pt-4 border-t border-gray-700/60">
        <button onClick={() => setAnalysisOpen(!isAnalysisOpen)} className="flex items-center justify-between w-full text-left text-blue-400 hover:text-blue-300 transition-colors">
          <span className="font-semibold">View Voice Analysis</span>
          <ChevronDownIcon className={`transform transition-transform duration-300 ${isAnalysisOpen ? 'rotate-180' : ''}`} />
        </button>
        {isAnalysisOpen && (
          <div className="mt-3 bg-gray-900/50 p-4 rounded-md text-xs font-mono animate-fade-in-fast">
            <h4 className="font-bold text-gray-400 mb-2">VP VOICE SIGNATURE:</h4>
            <ul className="space-y-1">
              <li><span className="font-semibold text-gray-500">Tone Markers:</span> {voiceAnalysis.toneMarkers}</li>
              <li><span className="font-semibold text-gray-500">Core Values:</span> {voiceAnalysis.coreValues}</li>
              <li><span className="font-semibold text-gray-500">Persona:</span> {voiceAnalysis.persona}</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

const MetricsCard: React.FC<{ metrics: Metrics }> = ({ metrics }) => (
  <Card title="Agent Performance Report" icon={<span className="text-xl mr-3">📊</span>}>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <div>
        <p className="text-sm text-gray-400">E2E Latency</p>
        <p className="text-2xl font-bold text-white">{metrics.latency}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Tone Confidence</p>
        <p className="text-2xl font-bold text-white">{metrics.confidence}</p>
      </div>
      <div>
        <p className="text-sm text-gray-400">Est. VP Time Saved</p>
        <p className="text-2xl font-bold text-white">{metrics.timeSaved}</p>
      </div>
    </div>
  </Card>
);
