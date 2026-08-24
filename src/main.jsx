import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Code2,
  Copy,
  Database,
  ExternalLink,
  FileDown,
  Filter,
  GitBranch,
  GraduationCap,
  Layers3,
  Mail,
  Network,
  Rocket,
  ScanText,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap,
} from "lucide-react";
import SystemsLab from "./SystemsLab";
import "./styles.css";

const resumeUrl = `${import.meta.env.BASE_URL}charlie-qi-resume.pdf`;
const profilePhotoUrl = `${import.meta.env.BASE_URL}profile-photo.jpeg`;

const filters = ["All", "AI systems", "Product software", "ML / CV", "Foundations"];

const projects = [
  {
    title: "Integrated Nutrition Formulation Optimisation Platform",
    filter: "Product software",
    label: "Domain software",
    summary: "A full-stack formulation workspace that connects ingredient evidence, optimisation and reviewable product decisions.",
    stack: "React · TypeScript · FastAPI · PostgreSQL · SciPy/HiGHS · Gemini",
    build: "I modelled ingredient and specification versions, added evidence ingestion and formulator review, then connected linear optimisation, mass-balance modelling and deterministic risk bands.",
    proof: "This is the clearest example of turning a real biotech R&D workflow into software with data models, calculations, validation and auditability.",
    href: "https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool",
    questions: ["How do I keep calculations deterministic?", "How do I preserve version history?", "Where should AI assist rather than decide?"],
  },
  {
    title: "CareOps AI - MCP-Powered Operations Assistant",
    filter: "AI systems",
    label: "Agent tooling",
    summary: "An operations assistant that gives an LLM controlled access to validated business tools.",
    stack: "TypeScript · Node.js · React · MCP · PostgreSQL · Prisma · Docker",
    build: "I implemented tools for client search, worker availability, compliance checks, address updates and appointment rescheduling, with RBAC, validation, confirmation-gated writes and audit logging.",
    proof: "It demonstrates practical agent architecture: the model can reason about a task, but tools enforce permissions and business rules before anything changes.",
    href: "https://github.com/Charlie-Qi394/careops-ai",
    questions: ["What can the model read?", "Which actions require confirmation?", "How can a change be audited later?"],
  },
  {
    title: "AI Regulatory Knowledge Assistant",
    filter: "AI systems",
    label: "RAG application",
    summary: "A document-grounded assistant for searching technical and regulatory material with citations.",
    stack: "Python · FastAPI · Streamlit · PostgreSQL/pgvector · OpenAI · LangGraph",
    build: "I built TXT/PDF/DOCX ingestion, chunking, embeddings, pgvector retrieval, grounded answer generation, citations, query history, a LangGraph workflow and CSV evaluation.",
    proof: "It shows the complete RAG loop and a conservative boundary: when evidence is weak, the assistant should say so instead of inventing an answer.",
    href: "https://github.com/Charlie-Qi394/ai-regulatory-knowledge-assistant",
    questions: ["Is the evidence sufficient?", "Can the answer be traced to sources?", "How do I evaluate retrieval and faithfulness?"],
  },
  {
    title: "FridgePeace Shared-Household Food Management PWA",
    filter: "Product software",
    label: "Product build",
    summary: "A practical PWA that combines shared household workflows with an AI-assisted food scanning experience.",
    stack: "React · FastAPI · PostgreSQL · PWA patterns · AI-assisted workflow",
    build: "I focused on a user-facing workflow: shared ownership, item tracking and a clear interface around an everyday problem rather than a standalone model demo.",
    proof: "It demonstrates product thinking, frontend workflow design and the ability to connect AI assistance to a concrete user task.",
    href: "https://github.com/Charlie-Qi394/fridgepeace-portfolio",
    questions: ["What is the user trying to finish?", "What should be automated?", "What happens when the model is uncertain?"],
  },
  {
    title: "Seq2Seq Recipe Generation with Attention",
    filter: "ML / CV",
    label: "NLP model",
    summary: "A PyTorch sequence-generation project comparing LSTM encoder-decoder models with and without attention.",
    stack: "Python · PyTorch · LSTM · attention · beam search · BLEU/METEOR",
    build: "I implemented preprocessing, vocabulary construction, batching, packed sequences, masked attention and beam-search decoding, then evaluated overlap and ingredient-grounding behaviour.",
    proof: "The project taught me to pair model improvements with task-specific evaluation rather than treating one metric as the whole story.",
    href: "https://github.com/Charlie-Qi394/seq2seq-recipe-generation-nlp",
    questions: ["What did attention change?", "Where did hallucination remain?", "How would I compare a Transformer?"],
  },
  {
    title: "Computer Vision Classification and Segmentation",
    filter: "ML / CV",
    label: "Computer vision",
    summary: "A progression from classical image processing to CNN classification and semantic segmentation.",
    stack: "Python · TensorFlow/Keras · CNNs · FCN · U-Net · FPN-style models",
    build: "I implemented Harris and Canny methods, compared library baselines, trained CIFAR-100 CNNs and experimented with FCN, U-Net and FPN-style segmentation designs.",
    proof: "It demonstrates controlled experimentation: establish a baseline, change meaningful variables, measure the effect and explain the trade-off.",
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
    questions: ["What is the difference between classification and segmentation?", "How did I measure improvement?", "What is the cost of a larger model?"],
  },
  {
    title: "Python PKI Certificate System",
    filter: "Foundations",
    label: "Applied security",
    summary: "An educational PKI simulator covering certificate creation, trust chains, encrypted requests and revocation.",
    stack: "Python · cryptography · RSA · AES · X.509 · CSRs · CRLs",
    build: "I separated Root CA, Sub-CA and client responsibilities and used hybrid encryption so AES handled the payload while RSA protected the session key.",
    proof: "It shows secure-system reasoning and the ability to explain why different cryptographic primitives are combined.",
    href: "https://github.com/Charlie-Qi394/pki-certificate-system-python",
    questions: ["Why use RSA and AES together?", "How is a certificate chain checked?", "What would production require?"],
  },
  {
    title: "AI Graph Search Algorithms",
    filter: "Foundations",
    label: "Algorithms",
    summary: "A tested Python CLI for BFS, DFS, Greedy Best-First Search and A* over CSV graph inputs.",
    stack: "Python · CSV · CLI design · pytest · BFS · DFS · A*",
    build: "I implemented multiple search strategies, validated inputs and tested direct paths, unreachable goals, reverse paths and A* optimality.",
    proof: "It is a compact example of structured problem-solving and makes the trade-offs between speed, memory, completeness and path quality visible.",
    href: "https://github.com/Charlie-Qi394/ai-graph-search-algorithms",
    questions: ["When is BFS enough?", "What makes A* useful?", "How did I test edge cases?"],
  },
];

const capabilities = [
  { icon: <Code2 size={20} />, label: "Software engineering", items: ["Python", "TypeScript", "React", "FastAPI", "Node.js", "REST APIs", "pytest/Vitest"] },
  { icon: <Database size={20} />, label: "Data systems", items: ["PostgreSQL", "pgvector", "SQLAlchemy", "Prisma", "SQLite", "pandas", "NumPy"] },
  { icon: <Bot size={20} />, label: "AI applications", items: ["RAG", "LangGraph", "MCP tools", "OpenAI embeddings", "Gemini extraction", "citations"] },
  { icon: <Workflow size={20} />, label: "Automation", items: ["Docker Compose", "GitHub Actions", "audit logging", "VBA tools", "SAP/M3 exposure"] },
  { icon: <BrainCircuit size={20} />, label: "ML / NLP / CV", items: ["PyTorch", "TensorFlow/Keras", "scikit-learn", "Seq2Seq", "CNNs", "model evaluation"] },
  { icon: <ShieldCheck size={20} />, label: "Security concepts", items: ["X.509", "RSA", "AES", "CSRs", "CRLs", "certificate validation"] },
];

const architectureNodes = [
  { id: "input", label: "Inputs", icon: <ScanText size={18} />, detail: "Documents, formulation data, operational records and user questions arrive messy and inconsistent.", output: "Files + requests" },
  { id: "data", label: "Data layer", icon: <Database size={18} />, detail: "Normalize data into explicit models with versions, provenance, validation and queryable history.", output: "Structured state" },
  { id: "intelligence", label: "AI layer", icon: <BrainCircuit size={18} />, detail: "Use embeddings, extraction or an LLM when language understanding adds value. Keep the context visible.", output: "Ranked evidence" },
  { id: "tools", label: "Tools", icon: <Workflow size={18} />, detail: "Expose calculations, checks and business actions through narrow, validated interfaces.", output: "Constrained actions" },
  { id: "review", label: "Review", icon: <CheckCircle2 size={18} />, detail: "Return citations, risk bands, logs and approval states so a person can understand the result.", output: "Auditable decision" },
];

const proofPoints = [
  "I can model data and build APIs.",
  "I can connect AI to controlled tools.",
  "I can make outputs reviewable and auditable.",
  "I can measure model and workflow behaviour.",
];

const missionData = {
  "Integrated Nutrition Formulation Optimisation Platform": {
    input: "Ingredient composition, specifications, cost and formulation targets",
    steps: ["Version evidence", "Solve constraints", "Review result"],
    output: "Feasible formulation scenario",
    beneficiary: "Formulators, R&D and regulatory reviewers",
    decision: "Numeric optimisation stays deterministic; AI supports extraction and navigation.",
    tradeoff: "More traceability and validation work, but a clearer decision than an unconstrained AI suggestion.",
  },
  "CareOps AI - MCP-Powered Operations Assistant": {
    input: "A natural-language operations request",
    steps: ["Understand intent", "Call controlled tool", "Confirm and log"],
    output: "Validated business action",
    beneficiary: "Operations teams handling repetitive service workflows",
    decision: "The model proposes; permissions, validation and confirmation control the write.",
    tradeoff: "A little more friction before a write creates a safer and more auditable workflow.",
  },
  "AI Regulatory Knowledge Assistant": {
    input: "Regulatory PDF, Word or text documents plus a user question",
    steps: ["Ingest and chunk", "Retrieve evidence", "Generate and verify"],
    output: "Cited answer or cautious fallback",
    beneficiary: "Technical teams searching complex regulatory material",
    decision: "The answer is constrained by retrieved context and can be traced to sources.",
    tradeoff: "Conservative fallback answers are preferable to confident unsupported claims.",
  },
  "FridgePeace Shared-Household Food Management PWA": {
    input: "Shared household food items and user actions",
    steps: ["Capture item", "Coordinate household", "Suggest next action"],
    output: "Clear shared task or food decision",
    beneficiary: "People managing food across a shared household",
    decision: "AI assistance sits inside a useful product workflow rather than replacing it.",
    tradeoff: "A simpler workflow can be more valuable than adding an impressive but unused model feature.",
  },
  "Seq2Seq Recipe Generation with Attention": {
    input: "Ingredient sequence",
    steps: ["Build vocabulary", "Encode and attend", "Decode and evaluate"],
    output: "Generated recipe instruction sequence",
    beneficiary: "Users exploring grounded sequence generation",
    decision: "Task-specific grounding metrics sit alongside BLEU and METEOR.",
    tradeoff: "Attention improved results but did not remove repetition or unsupported ingredients.",
  },
  "Computer Vision Classification and Segmentation": {
    input: "Images and labelled pixels",
    steps: ["Preprocess image", "Train model", "Inspect predictions"],
    output: "Class label or segmentation mask",
    beneficiary: "Teams building inspection and image-analysis workflows",
    decision: "A baseline and controlled experiments make model improvements explainable.",
    tradeoff: "The most accurate architecture is not automatically the best if runtime cost is too high.",
  },
  "Python PKI Certificate System": {
    input: "Keys, CSRs and certificate requests",
    steps: ["Issue identity", "Validate trust chain", "Revoke if needed"],
    output: "Trusted or rejected certificate state",
    beneficiary: "Developers learning applied identity and security workflows",
    decision: "Symmetric encryption handles payloads while asymmetric encryption protects the key.",
    tradeoff: "The simulator teaches the lifecycle, but production requires stronger operational controls.",
  },
  "AI Graph Search Algorithms": {
    input: "Weighted graph and search goal",
    steps: ["Load graph", "Choose strategy", "Test path"],
    output: "Path or explicit failure state",
    beneficiary: "Developers learning planning and algorithmic trade-offs",
    decision: "The search strategy changes the balance between speed, memory, completeness and optimality.",
    tradeoff: "A fixed graph is predictable; real agent environments require handling uncertain state and tools.",
  },
};

const journeyNodes = [
  { id: "positioning", number: "01", label: "The brief", caption: "What I solve", tone: "blue" },
  { id: "work", number: "02", label: "Build log", caption: "What I built", tone: "teal" },
  { id: "architecture", number: "03", label: "System lab", caption: "How it works", tone: "gold" },
  { id: "playground", number: "04", label: "Agent loop", caption: "How it behaves", tone: "purple" },
  { id: "context", number: "05", label: "Domain bridge", caption: "Why it matters", tone: "orange" },
];

const skillBranches = [
  { id: "software", label: "Software engineering", level: "Portfolio + coursework", tone: "blue", skills: ["Python", "FastAPI", "React", "Testing"], evidence: "Built APIs, user workflows, CLI tools and tests across public projects." },
  { id: "ai", label: "AI applications", level: "Portfolio projects", tone: "teal", skills: ["RAG", "LangGraph", "MCP", "Embeddings"], evidence: "Implemented grounded retrieval, workflow orchestration and controlled tool use." },
  { id: "data", label: "Data systems", level: "Portfolio + professional exposure", tone: "gold", skills: ["PostgreSQL", "pgvector", "SQL", "Data modelling"], evidence: "Designed schemas and persistence layers, with business-system exposure in SAP and M3." },
  { id: "ml", label: "ML, NLP and CV", level: "First-in-class coursework", tone: "purple", skills: ["PyTorch", "TensorFlow", "scikit-learn", "Evaluation"], evidence: "Trained and evaluated models across Machine Learning, NLP and Computer Vision projects." },
];

const transitionNodes = [
  { id: "clinical", period: "2016", title: "Clinical nutrition placements", detail: "Worked across Concord Hospital, Sydney Prince Alfred Hospital, Bondi Mental Health Clinic and Sydney Westmead Children’s Hospital.", bridge: "Patient records, evidence, communication and decisions with real consequences.", tags: ["Healthcare", "Evidence", "Stakeholders"] },
  { id: "biotech", period: "2016–2022", title: "Biotech product R&D", detail: "Developed nutrition and infant-formula products, supported trials, specifications, quality systems and manufacturing operations.", bridge: "Product requirements, structured data, validation and cross-functional delivery.", tags: ["R&D", "Validation", "Quality"] },
  { id: "automation", period: "2020–2026", title: "Manufacturing automation", detail: "Built VBA and HTML calculators for formulation, ingredient conversion and forecasting workflows while working with SAP and M3 exposure.", bridge: "Manual calculations became reusable tools with clearer inputs, outputs and operational support.", tags: ["Automation", "Business systems", "Process improvement"] },
  { id: "computer-science", period: "2023–2026", title: "Master of Computer Science", detail: "Completed an AI-focused Master of Computer Science at Monash with first-in-class results in Machine Learning, Image and Video Processing and Applied Practice 1.", bridge: "Formal CS foundations connected the domain problems I knew with software and AI methods.", tags: ["AI", "Software", "Learning agility"] },
  { id: "portfolio", period: "NOW", title: "AI and software portfolio", detail: "Building public systems across optimisation, agent tooling, RAG, APIs, data systems and applied cybersecurity.", bridge: "The direction is deliberate: practical AI software for workflows where evidence and review matter.", tags: ["AI systems", "APIs", "Delivery"] },
];

function JourneyMap() {
  const [activeId, setActiveId] = useState("work");
  const active = journeyNodes.find((node) => node.id === activeId) ?? journeyNodes[1];

  return (
    <section className="journey-section" id="journey">
      <div className="journey-inner">
        <div className="journey-heading"><span className="console-kicker">Choose your route / 05 stations</span><h2>Explore the portfolio as a system.</h2><p>Each station opens a different part of the story. The route is linear for a first visit, but every node is also a direct shortcut.</p></div>
        <div className="journey-map" aria-label="Interactive portfolio map">
          <div className="journey-line" aria-hidden="true" />
          {journeyNodes.map((node) => (
            <a className={`journey-node ${node.tone} ${active.id === node.id ? "active" : ""}`} href={`#${node.id}`} key={node.id} onMouseEnter={() => setActiveId(node.id)} onFocus={() => setActiveId(node.id)} onClick={() => setActiveId(node.id)}>
              <span className="journey-number">{node.number}</span><strong>{node.label}</strong><small>{node.caption}</small>
            </a>
          ))}
        </div>
        <div className="journey-readout" aria-live="polite"><span>Selected station</span><strong>{active.label}</strong><p>{active.caption}. Follow the highlighted route or jump directly into this section.</p><a href={`#${active.id}`}>Enter station <ArrowRight size={15} /></a></div>
      </div>
    </section>
  );
}

function ProjectMissionRoom({ project }) {
  const mission = missionData[project.title] ?? missionData[projects[0].title];
  const [activeStep, setActiveStep] = useState(0);
  const [lens, setLens] = useState("flow");
  const stepLabel = mission.steps[activeStep] ?? mission.steps[0];
  const lensCopy = lens === "flow"
    ? { label: "System flow", title: stepLabel, body: `This stage turns ${activeStep === 0 ? "an ambiguous request or input" : activeStep === 1 ? "structured state" : "a candidate result"} into the next reviewable state.` }
    : lens === "decision"
      ? { label: "Engineering decision", title: "Where the boundary sits", body: mission.decision }
      : { label: "Trade-off", title: "What I would watch", body: mission.tradeoff };

  useEffect(() => setActiveStep(0), [project.title]);

  return (
    <div className="mission-room" aria-live="polite">
      <div className="mission-header">
        <div><span className="mission-kicker">Mission room / {project.label}</span><h3>{project.title}</h3><p>{mission.beneficiary}</p></div>
        <a className="mission-github" href={project.href} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={15} /></a>
      </div>
      <div className="mission-body">
        <div className="mission-flow">
          <div className="mission-input"><span>Input</span><strong>{mission.input}</strong></div>
          <div className="mission-step-row">
            <div className="mission-line" aria-hidden="true" />
            {mission.steps.map((label, index) => <button className={activeStep === index ? "active" : ""} type="button" key={label} onClick={() => setActiveStep(index)} aria-pressed={activeStep === index}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong></button>)}
          </div>
          <div className="mission-output"><span>Output</span><strong>{mission.output}</strong></div>
        </div>
        <div className="mission-inspector">
          <div className="mission-lenses" role="tablist" aria-label="Mission room views">
            {[{ id: "flow", label: "Flow" }, { id: "decision", label: "Decision" }, { id: "tradeoff", label: "Trade-off" }].map((item) => <button className={lens === item.id ? "active" : ""} type="button" role="tab" aria-selected={lens === item.id} key={item.id} onClick={() => setLens(item.id)}>{item.label}</button>)}
          </div>
          <span className="mission-inspector-label">{lensCopy.label} / step {activeStep + 1}</span><h4>{lensCopy.title}</h4><p>{lensCopy.body}</p>
        </div>
      </div>
    </div>
  );
}

function SkillTree() {
  const [activeId, setActiveId] = useState("ai");
  const active = skillBranches.find((branch) => branch.id === activeId) ?? skillBranches[1];

  return (
    <div className="skill-tree-shell">
      <div className="skill-tree-branches" role="tablist" aria-label="Skill evidence tree">
        <div className="skill-tree-trunk" aria-hidden="true" />
        {skillBranches.map((branch) => <button className={`skill-branch ${branch.tone} ${active.id === branch.id ? "active" : ""}`} type="button" role="tab" aria-selected={active.id === branch.id} key={branch.id} onClick={() => setActiveId(branch.id)}><span className="skill-branch-orb">{branch.skills.length}</span><strong>{branch.label}</strong><small>{branch.level}</small></button>)}
      </div>
      <div className="skill-evidence" aria-live="polite"><span className="skill-evidence-label">Evidence unlocked</span><h3>{active.label}</h3><div className="skill-tags">{active.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><p>{active.evidence}</p></div>
    </div>
  );
}

function TransitionTimeline() {
  const [activeId, setActiveId] = useState("portfolio");
  const active = transitionNodes.find((node) => node.id === activeId) ?? transitionNodes[4];

  return (
    <div className="transition-shell">
      <div className="transition-track" role="tablist" aria-label="Career transition timeline">
        {transitionNodes.map((node) => <button className={active.id === node.id ? "active" : ""} type="button" role="tab" aria-selected={active.id === node.id} key={node.id} onClick={() => setActiveId(node.id)}><span>{node.period}</span><i /><strong>{node.title}</strong></button>)}
      </div>
      <div className="transition-readout" aria-live="polite"><span>Transferable signal / {active.period}</span><h3>{active.title}</h3><p>{active.detail}</p><div className="transition-bridge"><strong>Bridge to software</strong><p>{active.bridge}</p></div><div className="transition-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
    </div>
  );
}

function ProjectCard({ project, expanded, onToggle, onOpenMission }) {
  return (
    <article className={`project-card ${expanded ? "is-expanded" : ""}`}>
      <div className="project-card-topline">
        <span className="project-label">{project.label}</span>
        <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
          <ExternalLink size={15} /> GitHub
        </a>
      </div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      <div className="project-stack">{project.stack}</div>
      <div className="project-toggle-row">
        <button className="text-button" type="button" aria-expanded={expanded} onClick={onToggle}>
          {expanded ? "Collapse evidence" : "Explore evidence"}
          <ChevronDown className={expanded ? "rotated" : ""} size={17} />
        </button>
        <button className="mission-trigger" type="button" onClick={() => onOpenMission(project)}><Rocket size={14} /> Mission room</button>
        <span className="project-index">{project.questions.length} interview angles</span>
      </div>
      {expanded && (
        <div className="project-detail">
          <div>
            <span>Build</span>
            <p>{project.build}</p>
          </div>
          <div>
            <span>Why it matters</span>
            <p>{project.proof}</p>
          </div>
          <div>
            <span>Good questions to ask me</span>
            <ul>
              {project.questions.map((question) => <li key={question}>{question}</li>)}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}

function ArchitectureMap() {
  const [activeId, setActiveId] = useState("input");
  const active = architectureNodes.find((node) => node.id === activeId) ?? architectureNodes[0];

  return (
    <div className="architecture-shell">
      <div className="architecture-map" aria-label="Interactive software architecture map">
        {architectureNodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <button className={`architecture-node ${active.id === node.id ? "active" : ""}`} type="button" onClick={() => setActiveId(node.id)} aria-pressed={active.id === node.id}>
              <span className="architecture-icon">{node.icon}</span>
              <span>{node.label}</span>
            </button>
            {index < architectureNodes.length - 1 && <ArrowRight className="architecture-arrow" size={18} aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <div className="architecture-detail" aria-live="polite">
        <div className="detail-kicker"><span /> Selected layer</div>
        <h3>{active.label}</h3>
        <p>{active.detail}</p>
        <div className="detail-output"><span>Output</span><strong>{active.output}</strong></div>
      </div>
    </div>
  );
}

const playgroundModes = [
  {
    id: "rag",
    label: "RAG assistant",
    kicker: "LANGUAGE + EVIDENCE",
    audience: "A user needs a defensible answer from a document set.",
    output: "Grounded answer with citations",
    stack: "FastAPI · PostgreSQL · pgvector · OpenAI · LangGraph",
    steps: [
      { label: "Question", detail: "Accept the user question and preserve it as the traceable start of the workflow.", data: "What does the source say?", type: "input" },
      { label: "Retrieve", detail: "Embed the question, search the vector store and return the most relevant chunks with metadata.", data: "Top-k chunks + source names", type: "ai" },
      { label: "Ground", detail: "Generate only from retrieved context, check whether evidence is sufficient and attach simple citations.", data: "Answer + [Source 1]", type: "review" },
    ],
  },
  {
    id: "agent",
    label: "Agent tools",
    kicker: "REASONING + CONTROL",
    audience: "An operations user wants an assistant to complete a business task safely.",
    output: "Validated action or approval request",
    stack: "TypeScript · MCP · PostgreSQL · Prisma · Docker",
    steps: [
      { label: "Intent", detail: "Interpret the request, identify the business object and decide whether a tool is needed.", data: "Reschedule appointment", type: "input" },
      { label: "Tool call", detail: "Expose a narrow tool with typed inputs, permission checks and business-rule validation.", data: "Validated tool request", type: "ai" },
      { label: "Confirm", detail: "Require confirmation before a write, then record who did what and when in the audit trail.", data: "Approved change + log", type: "review" },
    ],
  },
  {
    id: "optimisation",
    label: "Optimisation",
    kicker: "DATA + DETERMINISM",
    audience: "A formulator needs a feasible product version under explicit constraints.",
    output: "Reviewable formulation scenario",
    stack: "React · FastAPI · PostgreSQL · SciPy/HiGHS · Gemini",
    steps: [
      { label: "Evidence", detail: "Bring ingredient composition, cost, supplier and specification evidence into versioned records.", data: "Inputs + provenance", type: "input" },
      { label: "Solve", detail: "Use mass-balance constraints and an optimisation solver for the numeric decision rather than asking an LLM to calculate it.", data: "Feasible candidate", type: "ai" },
      { label: "Review", detail: "Show constraints, assumptions, risk bands and the proposed result so a domain expert can approve it.", data: "Decision + audit trail", type: "review" },
    ],
  },
];

function SystemsPlayground() {
  const [modeId, setModeId] = useState("rag");
  const [stepIndex, setStepIndex] = useState(0);
  const [showImplementation, setShowImplementation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const mode = playgroundModes.find((item) => item.id === modeId) ?? playgroundModes[0];
  const step = mode.steps[stepIndex] ?? mode.steps[0];

  useEffect(() => {
    if (!isRunning) return undefined;
    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= mode.steps.length - 1) {
          setIsRunning(false);
          return current;
        }
        return current + 1;
      });
    }, 720);
    return () => window.clearInterval(timer);
  }, [isRunning, mode.steps.length]);

  const changeMode = (nextMode) => {
    setModeId(nextMode);
    setStepIndex(0);
    setShowImplementation(false);
    setIsRunning(false);
  };

  return (
    <div className="playground-shell">
      <div className="playground-tabs" role="tablist" aria-label="Choose an example system">
        {playgroundModes.map((item) => (
          <button className={mode.id === item.id ? "active" : ""} type="button" role="tab" aria-selected={mode.id === item.id} key={item.id} onClick={() => changeMode(item.id)}>
            <span>{item.kicker}</span>{item.label}
          </button>
        ))}
      </div>
      <div className="playground-intro"><span>{mode.kicker}</span><p>{mode.audience}</p></div>
      <div className="playground-grid">
        <div className="playground-route">
          <div className="playground-route-line" aria-hidden="true" />
          {mode.steps.map((item, index) => (
            <button className={`playground-step ${stepIndex === index ? "active" : ""}`} type="button" key={item.label} onClick={() => setStepIndex(index)} aria-pressed={stepIndex === index}>
              <span className={`playground-node ${item.type}`}><span>{String(index + 1).padStart(2, "0")}</span></span>
              <strong>{item.label}</strong>
              <small>{item.data}</small>
            </button>
          ))}
        </div>
        <div className="playground-inspector" aria-live="polite">
          <div className="detail-kicker"><span /> Inspecting step {stepIndex + 1} / 3</div>
          <h3>{step.label}</h3>
          <p>{step.detail}</p>
          <div className="playground-readout"><span>Visible state</span><strong>{step.data}</strong></div>
          <div className="playground-actions">
            <button className={`text-button ${isRunning ? "selected" : ""}`} type="button" onClick={() => { setStepIndex(0); setIsRunning(true); }}><Rocket size={16} /> {isRunning ? "Running trace" : "Run trace"}</button>
            <button className="text-button" type="button" onClick={() => setStepIndex((stepIndex + 1) % mode.steps.length)}><ArrowRight size={16} /> Next step</button>
            <button className={`text-button ${showImplementation ? "selected" : ""}`} type="button" onClick={() => setShowImplementation((value) => !value)}><Code2 size={16} /> {showImplementation ? "Hide stack" : "Show stack"}</button>
          </div>
          {showImplementation && <div className="playground-stack"><span>Implementation lens</span><strong>{mode.stack}</strong></div>}
        </div>
      </div>
      <div className="playground-footer"><span>System output</span><strong>{mode.output}</strong><small>Conceptual walkthrough based on my public projects.</small></div>
    </div>
  );
}

const flowItems = [
  { id: "lab", label: "Lab" },
  { id: "top", label: "Profile" },
  { id: "journey", label: "Route" },
  { id: "positioning", label: "Positioning" },
  { id: "work", label: "Builds" },
  { id: "architecture", label: "Architecture" },
  { id: "playground", label: "Playground" },
  { id: "skills", label: "Capabilities" },
  { id: "context", label: "Context" },
  { id: "style", label: "Working style" },
  { id: "contact", label: "Contact" },
];

function FlowNavigator() {
  const [activeId, setActiveId] = useState("lab");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = flowItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) {
          setActiveId(current.target.id);
          current.target.classList.add("is-revealed");
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }} /></div>
      <aside className="flow-nav" aria-label="Portfolio sections">
        {flowItems.map((item, index) => (
          <a className={activeId === item.id ? "active" : ""} href={`#${item.id}`} key={item.id} aria-label={`Go to ${item.label}`} aria-current={activeId === item.id ? "location" : undefined}>
            <span>{String(index + 1).padStart(2, "0")}</span><i />
          </a>
        ))}
      </aside>
    </>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(projects[0].title);
  const [missionProject, setMissionProject] = useState(projects[0]);
  const [copied, setCopied] = useState(false);
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.filter === activeFilter);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("charlieqi2017@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <SystemsLab />
      <FlowNavigator />
      <section className="hero" id="top">
        <nav className="nav">
          <a className="brand" href="#top"><span className="brand-mark">CQ</span> Charlie Qi</a>
          <div className="nav-status"><span className="status-dot" /> Open to software + AI systems roles</div>
          <div className="nav-links">
            <a href="#work">Projects</a>
            <a href="#architecture">Architecture</a>
            <a href="#skills">Capabilities</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="profile-strip">
              <img src={profilePhotoUrl} alt="Charlie Qi" />
              <div><strong>Charlie Qi</strong><span>AI systems · software engineering · domain automation</span></div>
            </div>
            <p className="eyebrow">Portfolio / 2026 / Melbourne, Australia</p>
            <h1>Software that makes complex work easier to reason about.</h1>
            <p className="lead">Master of Computer Science graduate specialising in AI. I build practical systems across agent tooling, RAG, optimisation, APIs, data models and reviewable workflows.</p>
            <div className="hero-actions">
              <a className="button primary" href="#work"><TerminalSquare size={17} /> Explore the work <ArrowRight size={16} /></a>
              <a className="button" href={resumeUrl} target="_blank" rel="noreferrer"><FileDown size={17} /> Resume</a>
              <a className="button" href="https://github.com/Charlie-Qi394" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a>
            </div>
          </div>

          <div className="hero-console" aria-label="Interactive portfolio system preview">
            <div className="console-topbar"><span /><span /><span /><strong>portfolio.systems</strong><span className="console-live"><i /> live view</span></div>
            <div className="console-body">
              <div className="console-heading"><div><span className="console-kicker">System overview</span><h2>From input to decision</h2></div><Zap size={19} /></div>
              <div className="console-flow">
                <div className="console-card blue"><span>01</span><strong>Collect</strong><small>files / data / rules</small></div>
                <div className="console-connector" />
                <div className="console-card teal"><span>02</span><strong>Reason</strong><small>AI + deterministic tools</small></div>
                <div className="console-connector" />
                <div className="console-card gold"><span>03</span><strong>Review</strong><small>evidence / approval</small></div>
              </div>
              <div className="console-log"><p><span className="log-prompt">$</span> portfolio --show-strengths</p><p><Check size={13} /> APIs + data models</p><p><Check size={13} /> RAG + tool workflows</p><p><Check size={13} /> regulated domain context</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Portfolio proof points">
        <div><strong>3</strong><span>first-in-class Monash results</span></div>
        <div><strong>10 yrs</strong><span>biotech product R&D + manufacturing</span></div>
        <div><strong>End-to-end</strong><span>React, FastAPI, PostgreSQL projects</span></div>
        <div><strong>AI systems</strong><span>RAG, MCP, LangGraph, embeddings</span></div>
      </section>

      <JourneyMap />

      <section className="section flow-section intro-section" id="positioning">
        <div className="section-rail"><span>01</span><span>POSITIONING</span></div>
        <div className="section-content intro-content">
          <div className="section-heading"><Sparkles size={19} /><h2>Applied software for technical workflows.</h2></div>
          <p className="section-lede">My strongest profile is not a generic chatbot demo. It is the combination of computer science training and real experience with regulated product work: messy inputs, specification rules, traceability, validation, stakeholder decisions and human approval.</p>
          <div className="principle-row"><span>01 / Make the data explicit</span><span>02 / Keep actions controlled</span><span>03 / Make the result reviewable</span></div>
        </div>
      </section>

      <section className="section flow-section work-section" id="work">
        <div className="section-rail"><span>02</span><span>SELECTED BUILDS</span></div>
        <div className="section-content">
          <div className="work-heading"><div><div className="section-heading"><Layers3 size={19} /><h2>Build log</h2></div><p>Explore the systems, then open the evidence behind each one.</p></div><span className="count-label">{visibleProjects.length.toString().padStart(2, "0")} projects shown</span></div>
          <div className="filter-bar" role="toolbar" aria-label="Filter projects"><Filter size={16} />{filters.map((filter) => <button className={activeFilter === filter ? "active" : ""} type="button" key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
          <ProjectMissionRoom project={missionProject} />
          <div className="project-grid">
            {visibleProjects.map((project) => <ProjectCard key={project.title} project={project} expanded={expandedProject === project.title} onToggle={() => setExpandedProject(expandedProject === project.title ? "" : project.title)} onOpenMission={setMissionProject} />)}
          </div>
        </div>
      </section>

      <section className="section flow-section architecture-section" id="architecture">
        <div className="section-rail"><span>03</span><span>HOW I THINK</span></div>
        <div className="section-content">
          <div className="section-heading"><Network size={19} /><h2>System boundary, made visible.</h2></div>
          <p className="section-lede">Across my projects, I use a consistent pattern: structure the inputs, make the intelligence useful, constrain actions and leave a clear path for review.</p>
          <ArchitectureMap />
        </div>
      </section>

      <section className="section flow-section playground-section" id="playground">
        <div className="section-rail"><span>04</span><span>INTERACTIVE WALKTHROUGH</span></div>
        <div className="section-content">
          <div className="section-heading"><Zap size={19} /><h2>Choose a system. Trace the decision.</h2></div>
          <p className="section-lede">A small interactive view of how I separate language reasoning, deterministic tools and human review across three portfolio systems.</p>
          <SystemsPlayground />
        </div>
      </section>

      <section className="section flow-section capabilities-section" id="skills">
        <div className="section-rail"><span>05</span><span>CAPABILITIES</span></div>
        <div className="section-content capabilities-layout">
          <div><div className="section-heading"><Code2 size={19} /><h2>Tools I can work with.</h2></div><p className="section-lede">A working portfolio across software engineering, AI applications, data systems, automation and applied security.</p></div>
          <div className="capabilities-explorer"><SkillTree /><div className="capability-grid">{capabilities.map((group) => <div className="capability-card" key={group.label}><div className="capability-title">{group.icon}<h3>{group.label}</h3></div><div className="pill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></div>
        </div>
      </section>

      <section className="section flow-section story-section" id="context">
        <div className="section-rail"><span>06</span><span>DOMAIN CONTEXT</span></div>
        <div className="section-content story-layout">
          <div><div className="section-heading"><BriefcaseBusiness size={19} /><h2>Why this background matters.</h2></div><p className="section-lede">I bring software skills into problems I already understand: product R&D, manufacturing data, regulated documentation, quality systems and decisions that need evidence.</p></div>
          <TransitionTimeline />
        </div>
      </section>

      <section className="section flow-section proof-section" id="style">
        <div className="section-rail"><span>07</span><span>WORKING STYLE</span></div>
        <div className="section-content proof-layout">
          <div className="proof-copy"><div className="section-heading"><BookOpenCheck size={19} /><h2>What I bring to a team.</h2></div><p className="section-lede">I am early in commercial software engineering, but not early in ownership, structured problem-solving or working with consequences.</p></div>
          <div className="proof-list">{proofPoints.map((point, index) => <div key={point}><strong>{String(index + 1).padStart(2, "0")}</strong><span>{point}</span></div>)}</div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-panel"><div><span className="console-kicker">Next conversation</span><h2>Let us talk about the workflow behind the software.</h2><p>Open to software engineering, AI software engineering, Python backend, full-stack product, data systems, automation and applied AI roles.</p></div><div className="contact-actions"><a className="button primary" href="mailto:charlieqi2017@gmail.com"><Mail size={17} /> Email me</a><button className="button" type="button" onClick={copyEmail}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Copied" : "Copy email"}</button><a className="button" href="https://github.com/Charlie-Qi394" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a><a className="button" href={resumeUrl} target="_blank" rel="noreferrer"><FileDown size={17} /> Resume</a></div></div>
      </section>
    </main>
  );
}

const rootElement = document.getElementById("root");
const root = rootElement.__charlieQiRoot ?? createRoot(rootElement);
rootElement.__charlieQiRoot = root;
root.render(<App />);
