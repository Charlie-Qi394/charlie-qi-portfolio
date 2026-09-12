import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, GitBranch, Mail, Maximize2, Minimize2 } from "lucide-react";
import SystemsLab from "./SystemsLab";
import "./deck.css";

const chapters = [
  { page: 2, title: "Software that makes complex work easier to reason about.", label: "POSITIONING" },
  { page: 3, title: "The System Boundary: Constraining AI for Practical Workflows", label: "SYSTEM BOUNDARY" },
  { page: 4, title: "Matching the AI Architecture to the Problem Space", label: "ARCHITECTURE CHOICE" },
  { page: 5, title: "System Architecture: Controlling Business Actions", label: "CONTROLLED ACTIONS" },
  { page: 6, title: "System Architecture: Enforcing Determinism on Messy Data.", label: "DETERMINISTIC DATA" },
  { page: 7, title: "System Architecture: Grounding Language in Evidence", label: "GROUNDED LANGUAGE" },
  { page: 8, title: "Extended Capabilities Across the ML and Software Stack", label: "CAPABILITIES" },
  { page: 9, title: "The Technical Architecture Blueprint", label: "TECHNICAL BLUEPRINT" },
  { page: 10, title: "Bridging a Decade of Domain Reality with Computer Science", label: "DOMAIN CONTEXT" },
  { page: 11, title: "Translating Engineering into Day-One Business Value", label: "BUSINESS VALUE" },
];

const portfolioProjects = [
  {
    number: "NEW",
    title: "Charlie Job Application OS",
    stack: "React · TypeScript · Express · SQLite · Playwright",
    href: "https://github.com/Charlie-Qi394/charlie-job-application-os",
    bullets: [
      "Built a local-first job discovery product with public ATS feeds, a swipeable recommendation deck, persistent pass/like decisions and automatic selection of an existing résumé.",
      "Implemented immutable application snapshots and browser assistance for supported fields, with human review and manual submission. Validated with 41 automated tests.",
    ],
  },
  {
    number: "01",
    title: "Integrated Nutrition Formulation Optimisation Platform",
    stack: "React · TypeScript · FastAPI · PostgreSQL · SciPy/HiGHS · Gemini",
    href: "https://github.com/Charlie-Qi394/integrated-formulation-optimisation-tool",
    bullets: [
      "Built a production-style platform for supplier Excel, CSV and digital PDF nutrient evidence, with formulation review and immutable specification history.",
      "Implemented multi-stage linear optimisation, nutrient mass balance, premix gap calculations, supplier reconciliation and deterministic risk bands.",
    ],
  },
  {
    number: "02",
    title: "CareOps AI - MCP-Powered Aged Care Operations Assistant",
    stack: "TypeScript · Node.js · MCP · PostgreSQL",
    href: "https://github.com/Charlie-Qi394/careops-ai",
    bullets: [
      "Built a production-style operations platform for a fictional Australian aged-care provider using TypeScript, Express, React, PostgreSQL, Prisma, Docker and GitHub Actions.",
      "Implemented MCP tools for client search, worker availability, compliance checks, address updates and appointment rescheduling with RBAC, Zod validation, confirmation-gated writes and audit logging.",
    ],
  },
  {
    number: "03",
    title: "AI Regulatory Knowledge Assistant",
    stack: "RAG · FastAPI · PostgreSQL/pgvector",
    href: "https://github.com/Charlie-Qi394/ai-regulatory-knowledge-assistant",
    bullets: [
      "Built a document-grounded RAG assistant using FastAPI, Streamlit, PostgreSQL/pgvector, OpenAI embeddings and chat generation.",
      "Supports TXT, PDF and DOCX ingestion, citations, query history and a LangGraph workflow for grounded answers over local regulatory documents.",
    ],
  },
  {
    number: "04",
    title: "Computer Vision Algorithms and Deep Learning",
    stack: "TensorFlow/Keras · CNNs · Semantic segmentation",
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
    bullets: [
      "Implemented Harris corner detection and a Canny edge-detection pipeline; built and compared 12 CNN classification variants, reaching 74.18% final tuned test accuracy.",
      "Designed and evaluated FCN, U-Net and FPN/ASPP/attention segmentation models, improving validation mIoU from 0.5332 to 0.6849 within a less-than-15M-parameter constraint.",
    ],
  },
  {
    number: "05",
    title: "Python PKI Certificate System",
    stack: "Python · cryptography · X.509",
    href: "https://github.com/Charlie-Qi394/pki-certificate-system-python",
    bullets: [
      "Implemented an educational PKI simulator with Root CA, Sub-CAs, clients, encrypted certificate requests, certificate-chain validation and revocation.",
    ],
  },
  {
    number: "06",
    title: "Seq2Seq Recipe Generation with Attention",
    stack: "NLP · PyTorch",
    href: "https://github.com/Charlie-Qi394/seq2seq-recipe-generation-nlp",
    bullets: [
      "Built a PyTorch LSTM encoder-decoder recipe-generation system using ingredient lists as source sequences and recipe instructions as targets.",
    ],
  },
];

function ChapterCard({ chapter, baseUrl, layout = "standard" }) {
  return (
    <article className={`site-chapter site-reveal site-chapter-${layout}`} id={`chapter-${chapter.page}`}>
      <div className="site-chapter-meta">
        <span>CHAPTER {String(chapter.page).padStart(2, "0")}</span>
        <span>{chapter.label}</span>
      </div>
      <img className="site-chapter-image" src={`${baseUrl}reference-deck/page-${String(chapter.page).padStart(2, "0")}.jpg`} alt={chapter.title} loading="lazy" draggable="false" />
    </article>
  );
}

function ReferenceDeck() {
  const siteRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const setParallax = useCallback((x, y) => {
    siteRef.current?.style.setProperty("--pointer-x", `${x}px`);
    siteRef.current?.style.setProperty("--pointer-y", `${y}px`);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".site-reveal").forEach((element) => observer.observe(element));

    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    const onPointerMove = (event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setParallax(((event.clientX / window.innerWidth) - 0.5) * 6, ((event.clientY / window.innerHeight) - 0.5) * 6);
    };
    const onPointerLeave = () => setParallax(0, 0);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    siteRef.current?.addEventListener("pointermove", onPointerMove);
    siteRef.current?.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      siteRef.current?.removeEventListener("pointermove", onPointerMove);
      siteRef.current?.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [setParallax]);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await document.documentElement.requestFullscreen?.();
  };

  const copyEmail = async () => {
    try {
      const email = "charlieqi2017@gmail.com";
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const helper = document.createElement("textarea");
        helper.value = email;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="portfolio-site" ref={siteRef} aria-label="Charlie Qi applied AI systems portfolio">
      <SystemsLab />

      <header className="site-header">
        <a className="site-brand" href="#lab" aria-label="Charlie Qi home"><span>CQ</span><strong>Charlie Qi</strong></a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#lab">Home</a>
          <a href="#projects">Projects</a>
          <a href="#architecture">Architecture</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="site-fullscreen" type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"} title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </header>

      <section className="site-section site-section-projects" id="projects" aria-labelledby="projects-title">
        <div className="site-section-heading site-reveal">
          <span className="site-kicker">01 / FEATURED PROJECTS</span>
          <h2 id="projects-title">Seven systems, one practical direction.</h2>
          <p>Explore my latest product alongside scientific software, agent tooling, RAG, computer vision, applied security and NLP.</p>
        </div>
        <div className="site-project-index">
          {portfolioProjects.map((project) => (
            <article className="site-project-card site-reveal" key={project.number}>
              <div className="site-project-card-top"><span>{project.number}</span><a href={project.href} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a></div>
              <h3>{project.title}</h3>
              <p className="site-project-stack">{project.stack}</p>
              <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="site-chapter-grid">
          {chapters.slice(0, 3).map((chapter) => <ChapterCard key={chapter.page} chapter={chapter} baseUrl={baseUrl} layout="project" />)}
        </div>
      </section>

      <section className="site-section site-section-architecture" id="architecture" aria-labelledby="architecture-title">
        <div className="site-section-heading site-reveal">
          <span className="site-kicker">02 / SYSTEM ARCHITECTURE</span>
          <h2 id="architecture-title">From messy inputs to controlled outputs.</h2>
          <p>These chapters show how I separate language reasoning, deterministic computation, tools, review and evidence instead of treating an LLM as the whole system.</p>
        </div>
        <div className="site-chapter-stack">
          {chapters.slice(3, 8).map((chapter) => <ChapterCard key={chapter.page} chapter={chapter} baseUrl={baseUrl} layout="architecture" />)}
        </div>
      </section>

      <section className="site-section site-section-experience" id="experience" aria-labelledby="experience-title">
        <div className="site-section-heading site-reveal">
          <span className="site-kicker">03 / EXPERIENCE AND VALUE</span>
          <h2 id="experience-title">Domain reality is part of the engineering context.</h2>
          <p>My software work is grounded in a decade of biotech and infant-formula R&amp;D, manufacturing, quality and regulated product decisions.</p>
        </div>
        <div className="site-chapter-stack">
          {chapters.slice(8).map((chapter) => <ChapterCard key={chapter.page} chapter={chapter} baseUrl={baseUrl} layout="experience" />)}
        </div>
      </section>

      <section className="site-contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-card site-reveal">
          <span className="contact-kicker">NEXT CONVERSATION</span>
          <h2 id="contact-title">Let us talk about the workflow behind the software.</h2>
          <p>Open to software engineering, AI software engineering, Python backend, full-stack product, data systems, automation, and applied AI roles.</p>
          <div className="contact-actions">
            <a className="contact-button primary" href="mailto:charlieqi2017@gmail.com"><Mail size={17} /> [ Email me ]</a>
            <button className="contact-button" type="button" onClick={copyEmail}>{copied ? <Check size={17} /> : <Copy size={17} />} [ {copied ? "Copied" : "Copy email"} ]</button>
            <a className="contact-button" href="https://github.com/Charlie-Qi394" target="_blank" rel="noreferrer"><GitBranch size={17} /> [ GitHub ]</a>
            <span className="contact-note">Résumé available on request</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>CHARLIE QI / APPLIED AI SYSTEMS / MELBOURNE, AUSTRALIA</span>
        <a href="#lab">Back to top ↑</a>
      </footer>
    </main>
  );
}

export default ReferenceDeck;
