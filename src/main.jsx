import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  Database,
  FileDown,
  GitBranch,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import "./styles.css";

const resumeUrl = `${import.meta.env.BASE_URL}charlie-qi-resume.pdf`;

const projects = [
  {
    title: "AI Regulatory Knowledge Assistant",
    tag: "RAG, FastAPI, PostgreSQL/pgvector",
    href: "https://github.com/Charlie-Qi394/ai-regulatory-knowledge-assistant",
    summary:
      "Document-grounded assistant for regulatory documents with ingestion, chunking, embeddings, vector search, citations, query history, LangGraph workflow, evaluation and Docker setup.",
  },
  {
    title: "Python PKI Certificate System",
    tag: "Python, cryptography, X.509",
    href: "https://github.com/Charlie-Qi394/pki-certificate-system-python",
    summary:
      "Educational PKI simulator covering Root CA, Sub-CAs, encrypted certificate requests, validation, revocation and certificate chain concepts.",
  },
  {
    title: "Seq2Seq Recipe Generation",
    tag: "NLP, PyTorch",
    href: "https://github.com/Charlie-Qi394/seq2seq-recipe-generation-nlp",
    summary:
      "LSTM encoder-decoder project with attention, packed sequences, beam search, BLEU/METEOR evaluation and ingredient-grounding analysis.",
  },
  {
    title: "Computer Vision Classification and Segmentation",
    tag: "CV, TensorFlow/Keras",
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
    summary:
      "Portfolio covering Harris/Canny image processing, CIFAR-100 CNN classification and Pascal VOC segmentation model design.",
  },
  {
    title: "AI Graph Search Algorithms",
    tag: "Python, algorithms, CLI",
    href: "https://github.com/Charlie-Qi394/ai-graph-search-algorithms",
    summary:
      "Implementations of BFS, DFS, Greedy Best-First Search and A* over CSV graph inputs with a package API, CLI and tests.",
  },
];

const skills = [
  { label: "AI / RAG", value: "OpenAI embeddings, vector search, LangGraph, grounded answers, citations" },
  { label: "Python Apps", value: "FastAPI, Streamlit, REST APIs, pytest, Docker Compose" },
  { label: "Data", value: "SQL, PostgreSQL, pgvector, pandas, NumPy, query history" },
  { label: "ML / NLP / CV", value: "PyTorch, TensorFlow/Keras, scikit-learn, Seq2Seq, CNNs" },
  { label: "Security", value: "RSA, AES, X.509, CSRs, CRLs, PKI concepts" },
  { label: "Automation", value: "VBA calculators, HTML forecasting tool, SAP/M3 exposure" },
];

const experience = [
  "10 years in biotech/nutrition product R&D, infant formula manufacturing and healthcare nutrition.",
  "Built practical calculators and forecasting tools to reduce manual work and support business decisions.",
  "Worked with SAP, M3, technical documentation, validation, supplier coordination and cross-functional stakeholders.",
  "Clinical placement exposure across Sydney hospital settings using electronic patient record and hospital information systems.",
];

function ProjectPreview() {
  return (
    <div className="preview-panel" aria-label="Portfolio project preview">
      <div className="preview-header">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-body">
        <div className="query-card">
          <p className="preview-label">RAG workflow</p>
          <p>question -&gt; retrieve context -&gt; check sufficiency -&gt; answer with citations</p>
        </div>
        <div className="metric-grid">
          <div>
            <strong>FastAPI</strong>
            <span>Backend</span>
          </div>
          <div>
            <strong>pgvector</strong>
            <span>Retrieval</span>
          </div>
          <div>
            <strong>LangGraph</strong>
            <span>Workflow</span>
          </div>
          <div>
            <strong>Docker</strong>
            <span>Setup</span>
          </div>
        </div>
        <div className="source-list">
          <span>Source 1</span>
          <span>Source 2</span>
          <span>Evaluation</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav">
          <a className="brand" href="#top">Charlie Qi</a>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI / RAG / Python / Data / Software</p>
            <h1>
              <span>AI/software candidate</span>
              <span>with practical technical</span>
              <span>delivery experience.</span>
            </h1>
            <p className="lead">
              Final-year Master of Computer Science student specialising in Artificial Intelligence,
              building public projects across RAG, machine learning, NLP, computer vision,
              data systems and applied cybersecurity.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="https://github.com/Charlie-Qi394" target="_blank" rel="noreferrer">
                <GitBranch size={18} /> GitHub
              </a>
              <a className="button" href={resumeUrl} target="_blank" rel="noreferrer">
                <FileDown size={18} /> Resume
              </a>
              <a className="button" href="mailto:charlieqi2017@gmail.com">
                <Mail size={18} /> Email
              </a>
            </div>
          </div>
          <ProjectPreview />
        </div>
      </section>

      <section className="section intro">
        <div className="section-heading">
          <Sparkles size={22} />
          <h2>Career Transition</h2>
        </div>
        <p>
          I am transitioning from biotech product R&D, infant formula manufacturing and
          healthcare nutrition into AI/software engineering. My previous roles were not IT
          roles, but they built relevant habits: documentation, validation, data handling,
          stakeholder support, business systems exposure, process improvement and practical
          automation. My computer science study and public GitHub projects show the technical
          direction of that transition.
        </p>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <TerminalSquare size={22} />
          <h2>Featured Projects</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div>
                <p className="project-tag">{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <a href={project.href} target="_blank" rel="noreferrer">
                View project <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="skills">
        <div>
          <div className="section-heading">
            <Bot size={22} />
            <h2>Technical Skills</h2>
          </div>
          <div className="skill-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.label}>
                <h3>{skill.label}</h3>
                <p>{skill.value}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="proof-panel">
          <BookOpenCheck size={24} />
          <h3>Learning Evidence</h3>
          <p>
            First in class in Machine Learning, Image and Video Processing, and Applied
            Practice 1, with a High Distinction average in the Monash MCS AI specialisation.
          </p>
        </aside>
      </section>

      <section className="section" id="experience">
        <div className="section-heading">
          <BriefcaseBusiness size={22} />
          <h2>Transferable Experience</h2>
        </div>
        <div className="experience-grid">
          {experience.map((item) => (
            <div className="experience-item" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="section credentials">
        <div className="credential">
          <GraduationCap size={22} />
          <h3>Education</h3>
          <p><strong>Master of Computer Science, AI specialisation</strong><br />Monash University | Expected Jun 2026</p>
          <p><strong>Master of Science, Nutrition and Dietetics</strong><br />The University of Sydney | 2016</p>
          <p><strong>Bachelor of Science, Food Science and Nutrition</strong><br />The University of Auckland | 2014</p>
        </div>
        <div className="credential">
          <Database size={22} />
          <h3>Data and Systems</h3>
          <p>PostgreSQL, pgvector, SQL, pandas, query history, SAP/M3 exposure and operational data handling.</p>
        </div>
        <div className="credential">
          <ShieldCheck size={22} />
          <h3>Applied Security</h3>
          <p>PKI concepts, X.509 certificates, RSA, AES, CSRs, CRLs and certificate-chain validation.</p>
        </div>
      </section>

      <section className="section contact" id="contact">
        <h2>Contact</h2>
        <p>Open to graduate and junior roles across AI engineering, RAG/LLM engineering, data, software and AI-adjacent cybersecurity.</p>
        <div className="hero-actions">
          <a className="button primary" href="mailto:charlieqi2017@gmail.com">
            <Mail size={18} /> charlieqi2017@gmail.com
          </a>
          <a className="button" href="https://github.com/Charlie-Qi394" target="_blank" rel="noreferrer">
            <GitBranch size={18} /> github.com/Charlie-Qi394
          </a>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
