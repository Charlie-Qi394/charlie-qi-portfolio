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
const profilePhotoUrl = `${import.meta.env.BASE_URL}profile-photo.jpeg`;

const projects = [
  {
    title: "Integrated Nutrition Formulation Optimisation Platform",
    tag: "Flagship build · React, FastAPI, PostgreSQL, SciPy/HiGHS",
    href: "https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool",
    summary:
      "Production-style platform for reviewed Excel/CSV/PDF nutrient ingestion, constrained bulk formulation optimisation, natural micronutrient mass balance, base-powder premix design and supplier-proposal risk assessment.",
    featured: true,
  },
  {
    title: "CareOps AI — MCP-Powered Operations Assistant",
    tag: "TypeScript, React, PostgreSQL, Prisma, MCP",
    href: "https://github.com/Charlie-Qi394/careops-ai",
    summary:
      "Production-style aged-care operations platform with secure MCP tools, role-based access, confirmation-gated writes, schema validation and structured audit logging.",
  },
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
    tag: "Three applied CV projects · TensorFlow/Keras",
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
    summary:
      "Built Harris/Canny algorithms, compared 12 CNN classification variants and designed semantic-segmentation models with FCN, U-Net, FPN, ASPP and attention gates; improved validation mIoU from 0.5332 to 0.6849.",
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
  { label: "Software / Backend", value: "Python, TypeScript, FastAPI, React, REST APIs, Celery, Redis, pytest/Vitest" },
  { label: "Data / Optimisation", value: "PostgreSQL, SQLAlchemy, SciPy/HiGHS, SQL, pandas, NumPy, mass-balance modelling" },
  { label: "AI / Extraction / RAG", value: "Gemini structured extraction, MCP, vector search, LangGraph, grounded answers, citations" },
  { label: "DevOps / Automation", value: "Docker Compose, Caddy, GitHub Actions, audit logging, VBA tools, SAP/M3 exposure" },
  { label: "ML / NLP / CV", value: "PyTorch, TensorFlow/Keras, scikit-learn, model evaluation, CNNs, U-Net/FPN, semantic segmentation, attention" },
  { label: "Security", value: "RSA, AES, X.509, CSRs, CRLs, PKI concepts" },
];

const experience = [
  "10 years in biotech/nutrition product R&D, infant formula manufacturing and healthcare nutrition.",
  "Built practical calculators and forecasting tools to reduce manual work and support business decisions.",
  "Worked with SAP, M3, technical documentation, validation, supplier coordination and cross-functional stakeholders.",
  "Clinical placement exposure across Sydney hospital settings using electronic patient record and hospital information systems.",
];

function ProjectPreview() {
  return (
    <div className="preview-panel" aria-label="Formulation optimisation project preview">
      <div className="preview-header">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-body">
        <div className="query-card">
          <p className="preview-label">Flagship workflow</p>
          <p>review nutrient evidence -&gt; optimise bulk BOM -&gt; design premix -&gt; assess specification risk</p>
        </div>
        <div className="metric-grid">
          <div>
            <strong>SciPy / HiGHS</strong>
            <span>Optimisation</span>
          </div>
          <div>
            <strong>React + FastAPI</strong>
            <span>Full stack</span>
          </div>
          <div>
            <strong>PostgreSQL</strong>
            <span>Versioned evidence</span>
          </div>
          <div>
            <strong>Gemini</strong>
            <span>Structured extraction</span>
          </div>
        </div>
        <div className="source-list">
          <span>Hard constraints</span>
          <span>Premix targets</span>
          <span>Range-risk bands</span>
        </div>
        <a
          className="preview-link"
          href="https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool"
          target="_blank"
          rel="noreferrer"
        >
          Explore the formulation platform <ArrowUpRight size={16} />
        </a>
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
            <div className="profile-strip">
              <img src={profilePhotoUrl} alt="Charlie Qi" />
              <div>
                <strong>Charlie Qi</strong>
                <span>Software engineer · AI and optimisation</span>
              </div>
            </div>
            <p className="eyebrow">Featured build · Nutrition formulation optimisation</p>
            <h1>
              <span>Domain expertise,</span>
              <span>translated into</span>
              <span>working software.</span>
            </h1>
            <p className="lead">
              Master of Computer Science graduate specialising in AI, with 10 years in
              biotech and nutrition R&amp;D. I build auditable full-stack tools and applied
              AI systems for optimisation, document extraction, data, computer vision and
              operational workflows.
            </p>
            <div className="hero-actions">
              <a
                className="button primary"
                href="https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool"
                target="_blank"
                rel="noreferrer"
              >
                <ArrowUpRight size={18} /> View flagship project
              </a>
              <a className="button" href="https://github.com/Charlie-Qi394" target="_blank" rel="noreferrer">
                <GitBranch size={18} /> GitHub profile
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
          <h2>Software Engineering Through Domain Problems</h2>
        </div>
        <p>
          My flagship formulation platform demonstrates how I approach software engineering:
          understand a complex real-world workflow, make assumptions and evidence traceable,
          encode hard constraints, automate repeatable decisions and present the result clearly.
          My broader projects cover MCP-powered operations, RAG, deep-learning computer vision,
          machine learning, security and full-stack product development.
        </p>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <TerminalSquare size={22} />
          <h2>Featured Projects</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`project-card${project.featured ? " project-card--featured" : ""}`}
              key={project.title}
            >
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
            Computer-vision work includes CNN classification and semantic-segmentation model
            design, training and quantitative evaluation.
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
          <p><strong>Master of Computer Science, AI specialisation</strong><br />Monash University | Completed Jun 2026</p>
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
        <p>Open to graduate and junior roles across software engineering, Python backend, data, machine learning, applied AI/RAG, computer vision and AI-adjacent cybersecurity.</p>
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
