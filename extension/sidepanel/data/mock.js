/**
 * Browsify - Mock Data Store
 * All mock data tied directly to the hackathon demo, demo pages, and product specifications.
 */

export const mockPageContexts = {
  shopping: {
    url: "https://techbazaar.com/laptops/apple-macbook-air-15-m3",
    domain: "techbazaar.com",
    title: "Apple MacBook Air 15-inch M3 (16GB, 512GB SSD) - Space Gray | TechBazaar",
    favicon: "https://www.apple.com/favicon.ico",
    intent: "shopping",
    confidence: 0.92,
    suggestion: "Compare this laptop specifications and cross-site prices",
    taskId: "task_001",
    reasoning: "You opened Apple MacBook Air 15-inch M3 on TechBazaar and are examining technical specifications.",
    extracted: {
      productName: "Apple MacBook Air 15-inch M3 (16GB RAM, 512GB SSD)",
      brand: "Apple",
      price: 1299,
      currency: "$",
      formattedPrice: "$1,299.00",
      specs: {
        processor: "Apple M3 (8-core CPU / 10-core GPU)",
        ram: "16GB Unified RAM",
        storage: "512GB PCIe SSD",
        display: "15.3-inch Liquid Retina (2880 x 1864)",
        battery: "18 Hours",
        weight: "3.3 lbs"
      }
    }
  },

  learning: {
    url: "https://educode.academy/cs/data-structures/linked-lists",
    domain: "educode.academy",
    title: "Data Structures: Singly & Doubly Linked Lists | EduCode Academy",
    favicon: "https://educode.academy/favicon.ico",
    intent: "learning",
    confidence: 0.88,
    suggestion: "Update your Data Structures roadmap and prepare review quiz",
    taskId: "task_edu_01",
    reasoning: "You spent 12 minutes studying linked list node structures and pointer manipulation.",
    extracted: {
      subject: "Data Structures",
      topic: "Linked Lists",
      section: "Singly & Doubly Linked Lists"
    }
  },

  research: {
    url: "https://arxiv.org/abs/2403.09982",
    domain: "arxiv.org",
    title: "Autonomous Proactive Agents in Web Browsing: Architecture and Memory Models",
    favicon: "https://arxiv.org/favicon.ico",
    intent: "research",
    confidence: 0.94,
    suggestion: "Summarise paper and save key takeaways to vault",
    taskId: "task_res_01",
    reasoning: "You are reading an academic publication on proactive agent architecture and memory models.",
    extracted: {
      authors: "Dr. Elena Vance, Marcus Sterling",
      published: "March 2026",
      readingTime: "12 min read"
    }
  },

  framermcp: {
    url: "https://www.framer.com/mcp",
    domain: "framer.com",
    title: "Connect Claude, Codex and Cursor to Framer with MCP",
    favicon: "https://framer.com/favicon.ico",
    intent: "research",
    confidence: 0.93,
    suggestion: "Synthesize Model Context Protocol (MCP) integrations",
    taskId: "task_res_02",
    reasoning: "You visited Framer's Model Context Protocol hub connecting Claude, Cursor, ChatGPT, and Codex.",
    extracted: {
      toolsCount: 8,
      primaryTools: ["Claude", "Claude Code", "ChatGPT", "Codex", "Cursor", "Grok"],
      readingTime: "4 min read"
    }
  },

  unknown: {
    url: "https://en.wikipedia.org/wiki/Portal:Current_events",
    domain: "wikipedia.org",
    title: "Portal: Current events - Wikipedia",
    favicon: "https://en.wikipedia.org/favicon.ico",
    intent: "unknown",
    confidence: 0.44,
    suggestion: null,
    taskId: null,
    reasoning: "Observing standard browsing patterns. Confidence is below 60% threshold.",
    extracted: {}
  }
};

export const mockShoppingComparison = {
  currentProduct: {
    title: "Apple MacBook Air 15\" M3 (16GB RAM, 512GB SSD)",
    brand: "Apple",
    site: "TechBazaar Online",
    price: 1299,
    formattedPrice: "$1,299.00",
    availability: "In Stock · Free 2-day delivery",
    specs: "Apple M3 (8c/10g) · 16GB Unified · 512GB SSD · 18hr Battery · 3.3 lbs",
    link: "https://techbazaar.com",
    rating: "4.8 ★ (1,420 reviews)"
  },
  hardwareComparison: {
    headers: ["SPECIFICATION", "MACBOOK AIR M3", "DELL XPS 15", "THINKPAD X1"],
    rows: [
      {
        spec: "Price",
        mac: "$1,299",
        dell: "$1,449",
        thinkpad: "$1,380",
        best: "mac"
      },
      {
        spec: "Processor",
        mac: "Apple M3 (8c/10g)",
        dell: "i7-13700H",
        thinkpad: "i7-1365U",
        best: null
      },
      {
        spec: "RAM",
        mac: "16GB Unified",
        dell: "16GB DDR5",
        thinkpad: "16GB LPDDR5",
        best: null
      },
      {
        spec: "Storage",
        mac: "512GB SSD",
        dell: "512GB SSD",
        thinkpad: "512GB SSD",
        best: null
      },
      {
        spec: "Battery",
        mac: "18 Hours",
        dell: "12 Hours",
        thinkpad: "14 Hours",
        best: "mac"
      },
      {
        spec: "Weight",
        mac: "3.3 lbs",
        dell: "4.2 lbs",
        thinkpad: "2.48 lbs",
        best: "thinkpad"
      }
    ],
    analysis: "The MacBook Air 15\" offers the best battery life (18 hours) and lowest price at $1,299 ($150 less than Dell XPS 15)."
  },
  sitesStatus: [
    { site: "TechBazaar Online", status: "done", time: "Active tab" },
    { site: "Amazon", status: "done", time: "Just now" },
    { site: "Best Buy", status: "done", time: "Just now" },
    { site: "B&H Photo Video", status: "done", time: "Just now" }
  ],
  listings: [
    {
      site: "TechBazaar Online",
      seller: "Official Verified",
      price: 1299,
      formattedPrice: "$1,299.00",
      priceDiff: "Best price ($150 savings)",
      isBestPrice: true,
      availability: "In Stock (Free 2-day delivery)",
      specs: "M3 (8c/10g) · 16GB Unified · 512GB SSD",
      link: "#",
      badge: "Best price"
    },
    {
      site: "Amazon",
      seller: "Apple Authorized",
      price: 1299,
      formattedPrice: "$1,299.00",
      priceDiff: "Same price",
      isBestPrice: false,
      availability: "In Stock (Prime delivery)",
      specs: "M3 · 16GB Unified · 512GB SSD",
      link: "#",
      badge: null
    },
    {
      site: "Best Buy",
      seller: "Best Buy Official",
      price: 1329,
      formattedPrice: "$1,329.00",
      priceDiff: "+$30 vs TechBazaar",
      isBestPrice: false,
      isBestSpec: true,
      availability: "In Store & Curbside Pickup",
      specs: "M3 · 16GB · 512GB + 2Yr Totaltech",
      link: "#",
      badge: "Extended warranty"
    }
  ]
};

export const mockLearningData = {
  subjects: ["Data Structures", "Web Development", "Machine Learning Basics"],
  activeSubject: "Data Structures",
  overallProgress: {
    completed: 2,
    total: 6,
    percentage: 33
  },
  pendingConfirmation: {
    topic: "Linked Lists",
    message: "Looks like you studied Linked Lists on EduCode Academy. Mark as completed?"
  },
  topics: [
    {
      id: "t1",
      name: "Arrays & Dynamic Arrays",
      status: "completed",
      resources: [
        { title: "Array Operations Cheatsheet", url: "https://educode.academy/arrays" },
        { title: "Dynamic Array Resizing Lecture", url: "https://youtube.com" }
      ],
      revisionQuestion: {
        q: "What is the amortized insertion time complexity for dynamic array append?",
        a: "O(1) amortized. Resizing costs O(n) infrequently, which averages out over n insertions."
      }
    },
    {
      id: "t2",
      name: "Linked Lists",
      status: "completed",
      resources: [
        { title: "Singly vs Doubly Linked Lists", url: "https://educode.academy/linked-list" },
        { title: "Node Memory Representation & Pointers", url: "https://youtube.com" }
      ],
      revisionQuestion: {
        q: "What is the prepend (insert at head) time complexity of a singly linked list?",
        a: "O(1) constant time, because only head pointer and new node's next pointer need updating."
      }
    },
    {
      id: "t3",
      name: "Stacks & LIFO Operations",
      status: "in_progress",
      resources: [
        { title: "Call Stack Mechanics & Monotonic Stacks", url: "https://leetcode.com" }
      ],
      revisionQuestion: {
        q: "Which standard data structure is used to evaluate postfix arithmetic expressions?",
        a: "A stack (operands pushed, popped when an operator is encountered)."
      }
    },
    {
      id: "t4",
      name: "Queues & Circular Buffers",
      status: "pending",
      resources: [],
      revisionQuestion: {
        q: "How does a circular queue prevent false overflow?",
        a: "By wrapping rear and front pointers using modulo arithmetic ((rear + 1) % size)."
      }
    },
    {
      id: "t5",
      name: "Binary Trees & BST Traversals",
      status: "pending",
      resources: [],
      revisionQuestion: {
        q: "In which traversal of a Binary Search Tree are elements visited in strictly ascending order?",
        a: "In-order traversal (Left, Root, Right)."
      }
    },
    {
      id: "t6",
      name: "Graph Algorithms (BFS & DFS)",
      status: "pending",
      resources: [],
      revisionQuestion: {
        q: "What data structure does Breadth-First Search (BFS) employ to track discovery order?",
        a: "A First-In, First-Out (FIFO) queue."
      }
    }
  ]
};

export const mockResearchData = {
  article: {
    title: "Autonomous Proactive Agents in Web Browsing: Architecture and Memory Models",
    source: "AI Frontiers Journal (Peer-Reviewed Publication)",
    readingTime: "12 min read",
    url: "https://arxiv.org/abs/2403.09982"
  },
  summary: "Traditional search engines and reactive AI chatbots force the human to act as an orchestrator—copying text, defining prompts, and juggling tabs. This paper demonstrates the paradigm shift toward 'Proactive Autonomous Browser Companions'. By combining lightweight DOM observation, schema extraction, and a 4-tier structured memory hierarchy, intelligent agents anticipate user requirements without polluting model context windows.",
  takeaways: [
    "Information retrieval is shifting from link-ranking to continuous contextual synthesis.",
    "Indiscriminate raw HTML prompt dumping causes severe context bloat and high latency; structured 4-tier memory provides 4x efficiency.",
    "Proactive assistants eliminate 'blank prompt fatigue' by initiating non-intrusive action cards when confidence exceeds 60%.",
    "Balanced autonomy models ensure safe tasks execute autonomously while sensitive actions (payments, forms) remain strictly user-approved."
  ],
  glossary: [
    { term: "Agentic Retrieval", definition: "A paradigm where an autonomous system navigates, evaluates, and aggregates sources without per-step human prompts." },
    { term: "Context Window Bloat", definition: "Degradation in retrieval accuracy and latency when unparsed web content fills the LLM context buffer." },
    { term: "Controlled Autonomy", definition: "Confidence-calibrated permission gates separating silent observation, suggestion, and reversible action." }
  ],
  collections: [
    { name: "AI & Search Architecture", count: 4 },
    { name: "Browser Automation", count: 6 },
    { name: "Reading List", count: 7 }
  ]
};

export const mockFramerMcpData = {
  article: {
    title: "Connect Claude, Codex and Cursor to Framer with MCP",
    source: "Framer Official Announcement (Model Context Protocol)",
    readingTime: "4 min read",
    url: "https://www.framer.com/mcp"
  },
  summary: "Framer MCP (Model Context Protocol) allows designers and developers to connect modern AI tools like ChatGPT, Claude, Cursor, and Codex directly to Framer. Users can design, build, and update interactive sites directly through AI assistants without sacrificing visual layout control or design fidelity.",
  takeaways: [
    "Standardized MCP protocol bridges leading coding agents (Claude Code, Cursor, Codex) directly to Framer's site engine.",
    "Enables dual workflows: visual drag-and-drop design paired with autonomous code and style generation.",
    "Supports multi-agent workflows including Grok Bot, Muse, and ChatGPT for copywriting and layout iteration.",
    "Zero lock-in: maintains full web exportability and Framer hosting reliability."
  ],
  tools: [
    { name: "Claude", type: "Anthropic", badge: "Direct Connect", desc: "Design and update components via Claude chat." },
    { name: "Claude Code", type: "CLI Agent", badge: "CLI Tool", desc: "Terminal-driven web deployment and component syncing." },
    { name: "ChatGPT", type: "OpenAI", badge: "Integration", desc: "Copywriting, page structuring, and prompt-to-layout." },
    { name: "Codex", type: "Code AI", badge: "Code Agent", desc: "Custom React component generation and styling." },
    { name: "Cursor", type: "IDE", badge: "Editor", desc: "Full-code editing with real-time Framer live sync." },
    { name: "Grok Bot", type: "xAI", badge: "Bot", desc: "Rapid layout iteration and interactive previewing." }
  ],
  collections: [
    { name: "Developer Tools & MCP", count: 5 },
    { name: "Design Engineering", count: 3 }
  ]
};

export const mockProductivityData = {
  patterns: [
    {
      id: "pat_01",
      title: "Morning Routine Detected",
      description: "You open GitHub, LeetCode, and Gmail every weekday morning around 9:30 AM.",
      actionLabel: "Create one-click routine",
      type: "routine"
    },
    {
      id: "pat_02",
      title: "Autofill Non-Sensitive Info",
      description: "Autofill name ('Aditya Sharma') and email ('aditya@example.com') on this registration form?",
      actionLabel: "Autofill fields",
      type: "autofill",
      disclaimer: "Browsify never autofills passwords, credit cards, or sensitive credentials."
    }
  ]
};

export const mockInitialTasks = [
  {
    task_id: "task_001",
    intent: "shopping",
    status: "in_progress",
    title: "MacBook Air 15\" M3 price & spec comparison",
    product_category: "laptop",
    visited_websites: ["TechBazaar", "Amazon", "Best Buy"],
    next_action: "Review best price on TechBazaar ($1,299.00)",
    updatedAt: "2 mins ago"
  },
  {
    task_id: "task_002",
    intent: "learning",
    status: "in_progress",
    title: "Data Structures: Linked Lists",
    product_category: "education",
    visited_websites: ["EduCode Academy", "YouTube"],
    next_action: "Complete practice problem 3",
    updatedAt: "48 mins ago"
  }
];

export const mockTimeline = [
  {
    id: "tl_1",
    time: "Just now",
    domain: "techbazaar.com",
    action: "Opened Apple MacBook Air 15-inch M3 ($1,299)",
    intent: "shopping",
    confidence: 0.92
  },
  {
    id: "tl_2",
    time: "15 mins ago",
    domain: "framer.com",
    action: "Explored Framer MCP (Connect Claude, Cursor & ChatGPT)",
    intent: "research",
    confidence: 0.93
  },
  {
    id: "tl_3",
    time: "48 mins ago",
    domain: "educode.academy",
    action: "Studied Linked Lists node pointers and time complexity",
    intent: "learning",
    confidence: 0.88
  },
  {
    id: "tl_4",
    time: "2 hours ago",
    domain: "arxiv.org",
    action: "Read 'Autonomous Proactive Agents in Web Browsing'",
    intent: "research",
    confidence: 0.94
  }
];
