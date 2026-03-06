import { Career, CareerCategory, TreeNode } from "@/types/career";

export const categories: CareerCategory[] = [
  { id: "tech", label: "Technology", icon: "Monitor", count: 12 },
  { id: "design", label: "Design", icon: "Palette", count: 8 },
  { id: "marketing", label: "Marketing", icon: "Megaphone", count: 6 },
  { id: "data", label: "Data", icon: "BarChart3", count: 9 },
  { id: "business", label: "Business", icon: "Briefcase", count: 7 },
  { id: "finance", label: "Finance", icon: "DollarSign", count: 5 },
];

export const careers: Career[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "tech",
    description: "Build beautiful, interactive user interfaces for web applications.",
    overview: "Frontend developers create the visual and interactive elements of websites and web applications. They work with HTML, CSS, JavaScript, and modern frameworks to deliver seamless user experiences across devices.",
    salaryRange: "$65,000 – $145,000",
    growthRate: "+23%",
    icon: "Code",
    relatedCareerIds: ["ui-ux-designer", "product-manager"],
    tree: [
      {
        id: "fe-degree", title: "Degree Route", type: "pathway",
        description: "Traditional CS or software engineering degree path.",
        children: [
          {
            id: "fe-degree-web", title: "Web Development Focus", type: "sub-path",
            description: "Specialize in web technologies during your degree.",
            children: [
              { id: "fe-s-html", title: "HTML & CSS", type: "skill", description: "The building blocks of every web page.", level: "beginner" },
              { id: "fe-s-js", title: "JavaScript", type: "skill", description: "The programming language of the web.", level: "beginner" },
              { id: "fe-s-react", title: "React", type: "skill", description: "Popular component-based UI library.", level: "intermediate" },
              { id: "fe-r-mdn", title: "MDN Web Docs", type: "resource", resourceType: "article", sourceType: "external", url: "https://developer.mozilla.org", description: "Comprehensive web development documentation.", tags: ["reference", "free"] },
              { id: "fe-r-cs50", title: "CS50 Web Programming", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Harvard's free web programming course.", duration: "12 weeks", difficulty: "intermediate", provider: "Harvard", tags: ["free", "university"] },
            ]
          },
          {
            id: "fe-degree-se", title: "Software Engineering Focus", type: "sub-path",
            description: "Broader software engineering principles applied to frontend.",
            children: [
              { id: "fe-s-ds", title: "Data Structures", type: "skill", description: "Fundamental CS concepts for efficient code.", level: "intermediate" },
              { id: "fe-s-testing", title: "Testing", type: "skill", description: "Unit, integration, and E2E testing.", level: "intermediate" },
              { id: "fe-r-leetcode", title: "LeetCode Practice", type: "resource", resourceType: "project", sourceType: "external", url: "#", description: "Practice algorithmic problem solving.", tags: ["practice"] },
            ]
          }
        ]
      },
      {
        id: "fe-bootcamp", title: "Bootcamp Route", type: "pathway",
        description: "Intensive 12-16 week coding bootcamp.",
        children: [
          {
            id: "fe-boot-react", title: "React Specialization", type: "sub-path",
            description: "Focus on React ecosystem and modern tooling.",
            children: [
              { id: "fe-s-ts", title: "TypeScript", type: "skill", description: "Typed JavaScript for scalable applications.", level: "intermediate" },
              { id: "fe-s-nextjs", title: "Next.js", type: "skill", description: "React framework for production apps.", level: "advanced" },
              { id: "fe-r-bootcamp1", title: "Frontend Masters Complete Path", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Comprehensive frontend curriculum.", duration: "40 hours", difficulty: "intermediate", provider: "Frontend Masters", tags: ["paid", "comprehensive"] },
              { id: "fe-r-cert-meta", title: "Meta Frontend Developer Certificate", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Industry-recognized certification from Meta.", duration: "7 months", difficulty: "intermediate", provider: "Coursera", tags: ["certification", "paid"] },
            ]
          }
        ]
      },
      {
        id: "fe-selftaught", title: "Self-Taught Route", type: "pathway",
        description: "Learn at your own pace using free and paid online resources.",
        children: [
          {
            id: "fe-self-fundamentals", title: "Web Fundamentals Path", type: "sub-path",
            description: "Master the core technologies step by step.",
            children: [
              { id: "fe-s-git", title: "Git & GitHub", type: "skill", description: "Version control and collaboration.", level: "beginner" },
              { id: "fe-s-responsive", title: "Responsive Design", type: "skill", description: "Build layouts that work on all devices.", level: "beginner" },
              { id: "fe-s-api", title: "REST APIs", type: "skill", description: "Fetch and manage data from servers.", level: "intermediate" },
              { id: "fe-r-fcc", title: "freeCodeCamp", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Free, project-based web dev curriculum.", duration: "300 hours", difficulty: "beginner", provider: "freeCodeCamp", tags: ["free", "projects"] },
              { id: "fe-r-odin", title: "The Odin Project", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Full-stack open-source curriculum.", duration: "6-12 months", difficulty: "beginner", provider: "The Odin Project", tags: ["free", "open-source"] },
            ]
          },
          {
            id: "fe-self-design", title: "Design-to-Code Path", type: "sub-path",
            description: "Bridge design and development skills.",
            children: [
              { id: "fe-s-figma", title: "Figma", type: "skill", description: "Design tool for creating UI mockups.", level: "beginner" },
              { id: "fe-s-css-adv", title: "Advanced CSS", type: "skill", description: "Animations, Grid, custom properties.", level: "intermediate" },
              { id: "fe-r-designcode", title: "Design+Code", type: "resource", resourceType: "video", sourceType: "internal", url: "#", description: "Learn to turn designs into code.", duration: "8 hours", difficulty: "intermediate", tags: ["video", "design"] },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "data",
    description: "Turn raw data into actionable insights that drive decisions.",
    overview: "Data analysts collect, process, and analyze data to help organizations make informed decisions. They use statistical tools, visualization software, and programming to identify trends and patterns.",
    salaryRange: "$55,000 – $110,000",
    growthRate: "+25%",
    icon: "BarChart3",
    relatedCareerIds: ["frontend-developer", "product-manager"],
    tree: [
      {
        id: "da-degree", title: "Degree Route", type: "pathway",
        description: "Statistics, mathematics, or data science degree.",
        children: [
          {
            id: "da-degree-stats", title: "Statistics Focus", type: "sub-path",
            description: "Deep statistical foundations for analysis.",
            children: [
              { id: "da-s-stats", title: "Statistics & Probability", type: "skill", description: "Core statistical concepts and methods.", level: "intermediate" },
              { id: "da-s-r", title: "R Programming", type: "skill", description: "Statistical computing language.", level: "intermediate" },
              { id: "da-s-sql", title: "SQL", type: "skill", description: "Query and manage relational databases.", level: "beginner" },
              { id: "da-r-stats-course", title: "Statistics for Data Science", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Comprehensive statistics foundation.", duration: "10 weeks", difficulty: "intermediate", provider: "MIT OpenCourseWare", tags: ["free", "university"] },
            ]
          }
        ]
      },
      {
        id: "da-cert", title: "Certification Route", type: "pathway",
        description: "Industry certifications to validate skills quickly.",
        children: [
          {
            id: "da-cert-google", title: "Google Analytics Path", type: "sub-path",
            description: "Follow Google's structured data analytics program.",
            children: [
              { id: "da-s-spreadsheets", title: "Spreadsheets", type: "skill", description: "Advanced Excel and Google Sheets.", level: "beginner" },
              { id: "da-s-viz", title: "Data Visualization", type: "skill", description: "Create compelling charts and dashboards.", level: "intermediate" },
              { id: "da-r-google-cert", title: "Google Data Analytics Certificate", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Google's professional certification.", duration: "6 months", difficulty: "beginner", provider: "Google", tags: ["certification", "paid"] },
              { id: "da-r-tableau", title: "Tableau Public Training", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Learn data visualization with Tableau.", duration: "20 hours", difficulty: "beginner", provider: "Tableau", tags: ["free", "visualization"] },
            ]
          }
        ]
      },
      {
        id: "da-selftaught", title: "Self-Taught Route", type: "pathway",
        description: "Build data analysis skills through online resources.",
        children: [
          {
            id: "da-self-python", title: "Python for Data Path", type: "sub-path",
            description: "Use Python ecosystem for data analysis.",
            children: [
              { id: "da-s-python", title: "Python", type: "skill", description: "Core programming language for data.", level: "beginner" },
              { id: "da-s-pandas", title: "Pandas & NumPy", type: "skill", description: "Data manipulation libraries.", level: "intermediate" },
              { id: "da-r-kaggle", title: "Kaggle Learn", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Free micro-courses on data skills.", duration: "15 hours", difficulty: "beginner", provider: "Kaggle", tags: ["free", "hands-on"] },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "design",
    description: "Design intuitive, delightful digital experiences for users.",
    overview: "UI/UX designers research user needs, create wireframes and prototypes, and design visual interfaces. They bridge the gap between user needs and business goals through thoughtful design.",
    salaryRange: "$60,000 – $130,000",
    growthRate: "+16%",
    icon: "Palette",
    relatedCareerIds: ["frontend-developer", "product-manager"],
    tree: [
      {
        id: "ux-degree", title: "Design Degree Route", type: "pathway",
        description: "Graphic design, HCI, or interaction design degree.",
        children: [
          {
            id: "ux-degree-hci", title: "HCI Specialization", type: "sub-path",
            description: "Human-computer interaction research and practice.",
            children: [
              { id: "ux-s-research", title: "User Research", type: "skill", description: "Methods for understanding user needs.", level: "intermediate" },
              { id: "ux-s-ia", title: "Information Architecture", type: "skill", description: "Organize and structure content.", level: "intermediate" },
              { id: "ux-s-wireframing", title: "Wireframing", type: "skill", description: "Low-fidelity layout sketching.", level: "beginner" },
              { id: "ux-r-nngroup", title: "NN/g UX Certification", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Industry-leading UX certification.", duration: "Self-paced", difficulty: "advanced", provider: "Nielsen Norman Group", tags: ["certification", "premium"] },
            ]
          }
        ]
      },
      {
        id: "ux-bootcamp", title: "Bootcamp Route", type: "pathway",
        description: "Intensive UX/UI design bootcamp programs.",
        children: [
          {
            id: "ux-boot-product", title: "Product Design Track", type: "sub-path",
            description: "End-to-end product design process.",
            children: [
              { id: "ux-s-figma", title: "Figma", type: "skill", description: "Industry-standard design tool.", level: "beginner" },
              { id: "ux-s-proto", title: "Prototyping", type: "skill", description: "Interactive mockups and flows.", level: "intermediate" },
              { id: "ux-s-design-system", title: "Design Systems", type: "skill", description: "Scalable component libraries.", level: "advanced" },
              { id: "ux-r-google-cert", title: "Google UX Design Certificate", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Google's professional UX certification.", duration: "6 months", difficulty: "beginner", provider: "Google", tags: ["certification", "paid"] },
            ]
          }
        ]
      },
      {
        id: "ux-selftaught", title: "Self-Taught Route", type: "pathway",
        description: "Learn design thinking and tools independently.",
        children: [
          {
            id: "ux-self-visual", title: "Visual Design Path", type: "sub-path",
            description: "Focus on visual and graphic design fundamentals.",
            children: [
              { id: "ux-s-typography", title: "Typography", type: "skill", description: "The art of arranging type.", level: "beginner" },
              { id: "ux-s-color", title: "Color Theory", type: "skill", description: "Using color effectively in design.", level: "beginner" },
              { id: "ux-r-refactoring-ui", title: "Refactoring UI", type: "resource", resourceType: "article", sourceType: "external", url: "#", description: "Practical design tips for developers.", tags: ["design", "practical"] },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "digital-marketer",
    title: "Digital Marketer",
    category: "marketing",
    description: "Drive growth through digital channels and data-driven strategies.",
    overview: "Digital marketers plan and execute marketing campaigns across digital channels including social media, email, SEO, and paid advertising to grow brands and drive revenue.",
    salaryRange: "$45,000 – $105,000",
    growthRate: "+10%",
    icon: "Megaphone",
    relatedCareerIds: ["data-analyst", "product-manager"],
    tree: [
      {
        id: "dm-degree", title: "Marketing Degree Route", type: "pathway",
        description: "Traditional marketing or business degree path.",
        children: [
          {
            id: "dm-degree-digital", title: "Digital Marketing Focus", type: "sub-path",
            description: "Specialize in digital channels during studies.",
            children: [
              { id: "dm-s-seo", title: "SEO", type: "skill", description: "Search engine optimization strategies.", level: "intermediate" },
              { id: "dm-s-analytics", title: "Google Analytics", type: "skill", description: "Web analytics and reporting.", level: "beginner" },
              { id: "dm-s-content", title: "Content Strategy", type: "skill", description: "Plan and create effective content.", level: "intermediate" },
              { id: "dm-r-hubspot", title: "HubSpot Academy", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Free inbound marketing certification.", duration: "6 hours", difficulty: "beginner", provider: "HubSpot", tags: ["free", "certification"] },
            ]
          }
        ]
      },
      {
        id: "dm-cert", title: "Certification Route", type: "pathway",
        description: "Stack industry certifications to build credibility.",
        children: [
          {
            id: "dm-cert-ads", title: "Paid Advertising Path", type: "sub-path",
            description: "Master paid digital advertising platforms.",
            children: [
              { id: "dm-s-google-ads", title: "Google Ads", type: "skill", description: "Search and display advertising.", level: "intermediate" },
              { id: "dm-s-social-ads", title: "Social Media Ads", type: "skill", description: "Facebook, Instagram, LinkedIn advertising.", level: "intermediate" },
              { id: "dm-r-google-ads-cert", title: "Google Ads Certification", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Official Google advertising credential.", duration: "Self-paced", difficulty: "intermediate", provider: "Google", tags: ["free", "certification"] },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "business",
    description: "Lead product strategy from idea to launch and beyond.",
    overview: "Product managers define the vision and strategy for products. They work cross-functionally with engineering, design, and business teams to deliver value to users and the organization.",
    salaryRange: "$80,000 – $170,000",
    growthRate: "+12%",
    icon: "Layers",
    relatedCareerIds: ["ui-ux-designer", "data-analyst"],
    tree: [
      {
        id: "pm-degree", title: "MBA / Business Degree", type: "pathway",
        description: "Traditional business education path into product management.",
        children: [
          {
            id: "pm-degree-tech", title: "Tech Product Focus", type: "sub-path",
            description: "Combine business acumen with technical understanding.",
            children: [
              { id: "pm-s-strategy", title: "Product Strategy", type: "skill", description: "Define vision, goals, and roadmaps.", level: "advanced" },
              { id: "pm-s-metrics", title: "Metrics & KPIs", type: "skill", description: "Measure product success.", level: "intermediate" },
              { id: "pm-s-stakeholder", title: "Stakeholder Management", type: "skill", description: "Align cross-functional teams.", level: "intermediate" },
              { id: "pm-r-inspired", title: "Inspired by Marty Cagan", type: "resource", resourceType: "article", sourceType: "external", url: "#", description: "Essential product management book.", tags: ["book", "essential"] },
            ]
          }
        ]
      },
      {
        id: "pm-transition", title: "Career Transition Route", type: "pathway",
        description: "Move into PM from engineering, design, or other roles.",
        children: [
          {
            id: "pm-trans-eng", title: "From Engineering Path", type: "sub-path",
            description: "Leverage technical background for product roles.",
            children: [
              { id: "pm-s-roadmapping", title: "Roadmapping", type: "skill", description: "Plan and prioritize feature development.", level: "intermediate" },
              { id: "pm-s-user-stories", title: "User Stories & PRDs", type: "skill", description: "Write clear product requirements.", level: "beginner" },
              { id: "pm-r-reforge", title: "Reforge Product Strategy", type: "resource", resourceType: "course", sourceType: "external", url: "#", description: "Advanced product strategy program.", duration: "6 weeks", difficulty: "advanced", provider: "Reforge", tags: ["paid", "advanced"] },
            ]
          }
        ]
      },
      {
        id: "pm-cert", title: "Certification Route", type: "pathway",
        description: "Gain PM credentials through industry certifications.",
        children: [
          {
            id: "pm-cert-agile", title: "Agile / Scrum Path", type: "sub-path",
            description: "Agile methodologies for product development.",
            children: [
              { id: "pm-s-agile", title: "Agile Methodology", type: "skill", description: "Iterative development frameworks.", level: "beginner" },
              { id: "pm-s-scrum", title: "Scrum Framework", type: "skill", description: "Sprint-based delivery process.", level: "beginner" },
              { id: "pm-r-cspo", title: "Certified Scrum Product Owner", type: "resource", resourceType: "certification", sourceType: "external", url: "#", description: "Scrum Alliance certification.", duration: "2 days", difficulty: "intermediate", provider: "Scrum Alliance", tags: ["certification", "paid"] },
            ]
          }
        ]
      }
    ]
  }
];

export function getCareerById(id: string): Career | undefined {
  return careers.find(c => c.id === id);
}

export function getCareersByCategory(categoryId: string): Career[] {
  return careers.filter(c => c.category === categoryId);
}

export function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}
