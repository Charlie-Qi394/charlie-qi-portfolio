export const portfolioProjects = [
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
    title: "Local LLM Coding Assistant",
    stack: "Python · Ollama · Qwen3.5 9B · Gemma 4 12B · Continue",
    href: "https://github.com/Charlie-Qi394/local-llm-coding-assistant",
    bullets: [
      "Configured two Q4_K_M open-weight models for local coding assistance on an Apple M4 Pro, with terminal chat, selected-file context and editor integration.",
      "Bound Ollama to loopback, disabled its cloud features and capped context and concurrency; documented single-run memory and throughput observations without presenting them as a model benchmark.",
    ],
  },
  {
    number: "05",
    title: "JevRouter Prompt Tier Extension",
    stack: "JavaScript · Chrome MV3 · TypeSafe Jev · Confidence gating",
    href: "https://github.com/Charlie-Qi394/jevrouter-prompt-tier-extension",
    bullets: [
      "Built a Manifest V3 extension that reviews prompts on ChatGPT, Claude and Gemini and recommends a lightweight, standard, frontier or manual-review capability tier.",
      "Implemented explicit user-triggered analysis, optional Jev Choice decisions, a 0.60 confidence review gate, transparent local fallback rules, seven unit scenarios and browser smoke tests.",
    ],
  },
  {
    number: "06",
    title: "Computer Vision Algorithms and Deep Learning",
    stack: "TensorFlow/Keras · CNNs · Semantic segmentation",
    href: "https://github.com/Charlie-Qi394/computer-vision-cnn-segmentation",
    bullets: [
      "Implemented Harris corner detection and a Canny edge-detection pipeline; built and compared 12 CNN classification variants, reaching 74.18% final tuned test accuracy.",
      "Designed and evaluated FCN, U-Net and FPN/ASPP/attention segmentation models, improving validation mIoU from 0.5332 to 0.6849 within a less-than-15M-parameter constraint.",
    ],
  },
  {
    number: "07",
    title: "Python PKI Certificate System",
    stack: "Python · cryptography · X.509",
    href: "https://github.com/Charlie-Qi394/pki-certificate-system-python",
    bullets: [
      "Implemented an educational PKI simulator with Root CA, Sub-CAs, clients, encrypted certificate requests, certificate-chain validation and revocation.",
    ],
  },
  {
    number: "08",
    title: "Seq2Seq Recipe Generation with Attention",
    stack: "NLP · PyTorch",
    href: "https://github.com/Charlie-Qi394/seq2seq-recipe-generation-nlp",
    bullets: [
      "Built a PyTorch LSTM encoder-decoder recipe-generation system using ingredient lists as source sequences and recipe instructions as targets.",
    ],
  },
  {
    number: "NEW",
    title: "Formulation Cost Optimisation & Supply Chain Planner",
    stack: "Excel · VBA · Solver · Linear programming",
    href: "https://github.com/Charlie-Qi394/charlie-qi-portfolio/tree/main/public/projects/formulation-supply-planner",
    bullets: [
      "Built two independent inventory-constrained workflows for formulation feasibility and least-cost planning, with ingredient-demand forecasts for production volume in MT.",
      "Compare original and optimised ingredient usage, savings per MT and total savings; retain five scenario snapshots. Public showcase is anonymised; the workbook and formulation details are not distributed.",
    ],
  },
];

