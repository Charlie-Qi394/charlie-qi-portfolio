import { useState } from "react";
import { Bot, Code2, Database, Eye, FileSearch, FlaskConical, GitBranch, ShieldCheck } from "lucide-react";

const projects = [
  {
    id: "01",
    short: "FORMULATION",
    title: "Integrated Formulation Optimisation Tool",
    description: "A domain workflow for importing evidence, optimising multi-stage formulations and reporting deterministic specification fit.",
    stack: "Python · FastAPI · PostgreSQL · SciPy · Docker",
    href: "https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool",
    color: "gold",
    icon: FlaskConical,
  },
  {
    id: "02",
    short: "REGULATORY RAG",
    title: "AI Regulatory Knowledge Assistant",
    description: "A document-grounded assistant that ingests regulatory files, retrieves evidence with pgvector and answers with citations.",
    stack: "Python · FastAPI · Streamlit · LangGraph · pgvector",
    href: "https://github.com/Charlie-Qi394/ai-regulatory-knowledge-assistant",
    color: "cyan",
    icon: FileSearch,
  },
  {
    id: "03",
    short: "AGENT WORKFLOWS",
    title: "CareOps AI",
    description: "A controlled operations assistant using MCP tools, service boundaries, validation, confirmation and audit logging.",
    stack: "TypeScript · Node.js · React · MCP · PostgreSQL",
    href: "https://github.com/Charlie-Qi394/careops-ai",
    color: "teal",
    icon: Bot,
  },
  {
    id: "04",
    short: "FULL-STACK PWA",
    title: "FridgePeace",
    description: "A shared-household food management product covering pantry ownership, expiry tracking and AI-assisted food scanning.",
    stack: "React · FastAPI · SQLAlchemy · Gemini · Cloudflare",
    href: "https://github.com/Charlie-Qi394/fridgepeace-portfolio",
    color: "lilac",
    icon: Database,
  },
  {
    id: "05",
    short: "COMPUTER VISION",
    title: "Computer Vision Classification and Segmentation",
    description: "A model-building portfolio moving from Harris and Canny methods to CNN classification and semantic segmentation.",
    stack: "Python · TensorFlow/Keras · CNNs · U-Net · FPN",
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
    color: "blue",
    icon: Eye,
  },
];

function SystemMap() {
  const [selectedId, setSelectedId] = useState("01");
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];
  const SelectedIcon = selected.icon;

  return (
    <div className="system-map" aria-label="Interactive featured project system map">
      <div className="system-map-heading">
        <span className="system-map-kicker">PORTFOLIO / 2026 / MELBOURNE, AUSTRALIA</span>
        <h1>Enter the System: Charlie Qi.</h1>
        <p>Explore the software, workflows, and domain context behind an applied AI engineering portfolio.</p>
      </div>

      <div className="system-map-layout">
        <div className="system-map-stage" aria-label="Five clickable project nodes">
          <div className="map-stage-label"><span>PROJECT NETWORK</span><b>CLICK A NODE TO INSPECT</b></div>
          <svg className="map-edges" viewBox="0 0 700 500" aria-hidden="true">
            <path d="M120 174 L350 96 L580 174 L545 375 L180 375 Z M120 174 L350 286 L580 174 M180 375 L350 96 M350 286 L545 375" />
          </svg>
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <button
                className={`map-node map-node-${index + 1} map-${project.color} ${selectedId === project.id ? "is-selected" : ""}`}
                type="button"
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                aria-label={`Project ${project.id}: ${project.title}`}
                aria-pressed={selectedId === project.id}
              >
                <span className="map-node-platform" />
                <span className="map-node-core"><Icon size={27} strokeWidth={1.7} /></span>
                <span className="map-node-number">{project.id}</span>
                <span className="map-node-label">{project.short}</span>
              </button>
            );
          })}
          <div className="map-center-badge"><Code2 size={20} /><span>AI<br />SYSTEMS</span></div>
        </div>

        <aside className={`system-map-detail map-detail-${selected.color}`} aria-live="polite">
          <div className="system-map-detail-top"><span>SELECTED PROJECT / {selected.id}</span><SelectedIcon size={19} /></div>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <div className="system-map-stack"><span>STACK</span><strong>{selected.stack}</strong></div>
          <a href={selected.href} target="_blank" rel="noreferrer"><GitBranch size={16} /> Open repository</a>
          <p className="system-map-related"><ShieldCheck size={14} /> Related university work: Seq2Seq NLP · PKI · Graph Search</p>
        </aside>
      </div>

      <div className="system-map-index" aria-label="Featured project index">
        <span className="system-map-index-title">FEATURED PROJECTS / 01—05</span>
        <div className="system-map-index-list">
          {projects.map((project) => (
            <button className={selectedId === project.id ? "is-selected" : ""} type="button" key={project.id} onClick={() => setSelectedId(project.id)} aria-label={`Select project ${project.id}: ${project.title}`}>
              <b>{project.id}</b><span>{project.short}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SystemMap;
