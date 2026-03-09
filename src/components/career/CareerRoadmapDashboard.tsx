import { useMemo, useState } from "react";
import {
  Background,
  Edge,
  Handle,
  Node,
  NodeProps,
  NodeTypes,
  Position,
  ReactFlow,
} from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, Coins, Cpu, FolderGit2, GraduationCap } from "lucide-react";
import "@xyflow/react/dist/style.css";

type MapNodeData = {
  label: string;
  subtitle?: string;
  isCenter?: boolean;
  isActive?: boolean;
};

type CurriculumItem = {
  title: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const curriculumByNode: Record<string, CurriculumItem[]> = {
  A: [
    { title: "Core Courses", points: ["Data Structures", "OOP with Java", "DBMS"], icon: GraduationCap },
    { title: "Emerging Technologies", points: ["AI Assistants", "Web3 Basics", "Cloud Native"], icon: Cpu },
    { title: "Certifications", points: ["AWS CCP", "Google Cloud Essentials", "Meta Front-End"], icon: Award },
    { title: "Internships", points: ["Frontend Intern", "QA Automation Intern", "Developer Support"], icon: Briefcase },
    { title: "Projects", points: ["Portfolio Site", "SaaS Dashboard", "Realtime Chat App"], icon: FolderGit2 },
    { title: "Revenue Opportunities", points: ["Freelance Web Dev", "Theme Templates", "Bug Bounty"], icon: Coins },
  ],
  B: [
    { title: "Core Courses", points: ["C Programming", "Digital Logic", "Computer Networks"], icon: GraduationCap },
    { title: "Emerging Technologies", points: ["Edge AI", "IoT Systems", "5G Apps"], icon: Cpu },
    { title: "Certifications", points: ["Cisco CCNA", "Azure Fundamentals", "Oracle Java"], icon: Award },
    { title: "Internships", points: ["Network Engineer Intern", "IoT Lab Intern", "Tech Support"], icon: Briefcase },
    { title: "Projects", points: ["Smart Campus IoT", "Packet Analyzer", "Automation Bot"], icon: FolderGit2 },
    { title: "Revenue Opportunities", points: ["IoT Prototyping", "Student Workshops", "Consulting"], icon: Coins },
  ],
  C: [
    { title: "Core Courses", points: ["Python", "Linear Algebra", "Probability"], icon: GraduationCap },
    { title: "Emerging Technologies", points: ["LLM Apps", "Agentic AI", "Computer Vision"], icon: Cpu },
    { title: "Certifications", points: ["TensorFlow Developer", "Azure AI-900", "IBM ML"], icon: Award },
    { title: "Internships", points: ["ML Intern", "Data Intern", "Research Assistant"], icon: Briefcase },
    { title: "Projects", points: ["Resume Ranker", "Chatbot", "Vision Classifier"], icon: FolderGit2 },
    { title: "Revenue Opportunities", points: ["AI Automation Service", "Model Fine-tuning", "Prompt Engineering"], icon: Coins },
  ],
  D: [
    { title: "Core Courses", points: ["Operating Systems", "Linux", "Distributed Systems"], icon: GraduationCap },
    { title: "Emerging Technologies", points: ["Kubernetes", "Platform Engineering", "MLOps"], icon: Cpu },
    { title: "Certifications", points: ["CKA", "Docker Associate", "Terraform Associate"], icon: Award },
    { title: "Internships", points: ["DevOps Intern", "SRE Intern", "Cloud Ops Intern"], icon: Briefcase },
    { title: "Projects", points: ["CI/CD Pipeline", "K8s Deployment", "Monitoring Stack"], icon: FolderGit2 },
    { title: "Revenue Opportunities", points: ["Cloud Migration", "Infra Templates", "DevOps Mentoring"], icon: Coins },
  ],
  E: [
    { title: "Core Courses", points: ["UI/UX Basics", "Human Computer Interaction", "Frontend"], icon: GraduationCap },
    { title: "Emerging Technologies", points: ["Design Systems", "AR UI", "No-code Prototyping"], icon: Cpu },
    { title: "Certifications", points: ["Google UX", "Figma Advanced", "Interaction Design"], icon: Award },
    { title: "Internships", points: ["Product Design Intern", "UX Intern", "UI Intern"], icon: Briefcase },
    { title: "Projects", points: ["Mobile App Redesign", "Design System Kit", "Usability Audit"], icon: FolderGit2 },
    { title: "Revenue Opportunities", points: ["UI Kit Sales", "Freelance Design", "Branding Services"], icon: Coins },
  ],
  F: [
    { title: "Core Courses", points: ["DSA", "Aptitude", "System Design Basics"], icon: GraduationCap },
    { title: "Emerging Technologies", points: ["AI Interviews", "Automated Prep", "Coding Analytics"], icon: Cpu },
    { title: "Certifications", points: ["NPTEL Elite", "LeetCode Badges", "Hackathon Wins"], icon: Award },
    { title: "Internships", points: ["T1 Startup", "T2 Product", "T3 Enterprise"], icon: Briefcase },
    { title: "Projects", points: ["Interview Tracker", "ATS Resume Builder", "Mock Interview App"], icon: FolderGit2 },
    { title: "Revenue Opportunities", points: ["Career Coaching", "Template Sales", "Course Creation"], icon: Coins },
  ],
};

const nodeLabelMap: Record<string, string> = {
  A: "Web",
  B: "Systems",
  C: "AI/ML",
  D: "Cloud",
  E: "UI/UX",
  F: "Placement",
};

const GlowNode = ({ data }: NodeProps<Node<MapNodeData>>) => {
  const isCenter = data.isCenter;

  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.2 }}
      className={`relative cursor-pointer rounded-full border text-center shadow-sm transition-shadow ${
        isCenter
          ? "h-28 w-28 border-primary/40 bg-primary/10 text-foreground"
          : "h-20 w-20 border-node-pathway/40 bg-node-pathway-soft text-node-pathway"
      } ${data.isActive ? "ring-2 ring-primary/40 shadow-md" : "hover:shadow-md"}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/15 blur-sm" />
      <Handle type="target" position={Position.Top} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Left} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Right} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Bottom} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Top} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Left} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Right} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Bottom} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <div className="relative flex h-full w-full flex-col items-center justify-center px-1">
        <p className="text-sm font-bold md:text-base">{data.label}</p>
        {data.subtitle && <p className="text-[10px] text-muted-foreground">{data.subtitle}</p>}
      </div>
    </motion.div>
  );
};

const nodeTypes: NodeTypes = {
  glowNode: GlowNode,
};

const CareerRoadmapDashboard = () => {
  const [activeNode, setActiveNode] = useState<string>("A");

  const nodes = useMemo<Node<MapNodeData>[]>(
    () => {
      const centerPoint = { x: 430, y: 245 };
      const centerSize = 112;
      const outerSize = 80;
      const radius = 185;
      const orbitIds: Array<keyof typeof nodeLabelMap> = ["A", "B", "C", "D", "E", "F"];

      const orbitNodes: Node<MapNodeData>[] = orbitIds.map((id, index) => {
        const angle = (-Math.PI / 2) + (index * (2 * Math.PI / orbitIds.length));
        const x = centerPoint.x + radius * Math.cos(angle) - outerSize / 2;
        const y = centerPoint.y + radius * Math.sin(angle) - outerSize / 2;

        return {
          id,
          type: "glowNode",
          position: { x, y },
          data: { label: nodeLabelMap[id], subtitle: id, isActive: activeNode === id },
          draggable: false,
        };
      });

      return [
        {
          id: "center",
          type: "glowNode",
          position: {
            x: centerPoint.x - centerSize / 2,
            y: centerPoint.y - centerSize / 2,
          },
          data: { label: "B.Tech", subtitle: "(CSE)", isCenter: true },
          draggable: false,
        },
        ...orbitNodes,
      ];
    },
    [activeNode],
  );

  const edges = useMemo<Edge[]>(
    () =>
      ["A", "B", "C", "D", "E", "F"].map((id) => ({
        id: `edge-center-${id}`,
        source: "center",
        target: id,
        type: "smoothstep",
        animated: false,
        style: {
          stroke: "hsl(var(--border))",
          strokeWidth: 2,
          strokeDasharray: "7 7",
          strokeLinecap: "round",
          opacity: 0.9,
        },
      })),
    [],
  );

  const cards = curriculumByNode[activeNode] || curriculumByNode.A;

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-card p-4 text-card-foreground shadow-sm md:p-6">
      <div className="pointer-events-none absolute -top-28 left-1/3 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold md:text-3xl">Interactive Career Roadmap</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Futuristic dashboard view · click pathway nodes to reveal curriculum options.
        </p>

        <div className="mt-4 h-[420px] overflow-hidden rounded-xl border bg-muted/20 md:h-[500px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            onNodeClick={(_, node) => {
              if (node.id !== "center") setActiveNode(node.id);
            }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable
            zoomOnDoubleClick={false}
            className="bg-[radial-gradient(circle_at_center,hsl(var(--background)),hsl(var(--muted)/0.25))]"
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={24} size={1} color="hsl(var(--border))" />
          </ReactFlow>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            Selected Path: {nodeLabelMap[activeNode]} ({activeNode})
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.18 }}
                className="rounded-2xl border bg-background/70 p-4 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center gap-2">
                  <card.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {card.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CareerRoadmapDashboard;
