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
import CurriculumDistribution from "./CurriculumDistribution";
import "@xyflow/react/dist/style.css";

type MapNodeData = {
  label: string;
  subtitle?: string;
  isCenter?: boolean;
  isActive?: boolean;
  rotation?: number;
  color?: string;
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

const nodeColorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
  A: { bg: "bg-gradient-to-br from-orange-50 to-amber-50", border: "border-orange-200", text: "text-orange-600", accent: "from-orange-300 to-amber-300" },
  B: { bg: "bg-gradient-to-br from-violet-50 to-purple-50", border: "border-violet-200", text: "text-violet-600", accent: "from-violet-300 to-purple-300" },
  C: { bg: "bg-gradient-to-br from-pink-50 to-rose-50", border: "border-pink-200", text: "text-pink-600", accent: "from-pink-300 to-rose-300" },
  D: { bg: "bg-gradient-to-br from-cyan-50 to-teal-50", border: "border-cyan-200", text: "text-cyan-600", accent: "from-cyan-300 to-teal-300" },
  E: { bg: "bg-gradient-to-br from-sky-50 to-blue-50", border: "border-sky-200", text: "text-sky-600", accent: "from-sky-300 to-blue-300" },
  F: { bg: "bg-gradient-to-br from-emerald-50 to-green-50", border: "border-emerald-200", text: "text-emerald-600", accent: "from-emerald-300 to-green-300" },
};

const GlowNode = ({ data }: NodeProps<Node<MapNodeData>>) => {
  const isCenter = data.isCenter;
  const colors = data.color ? nodeColorMap[data.color] : null;

  if (isCenter) {
    return (
      <motion.div
        whileHover={{ scale: 1.08, rotate: 5 }}
        animate={{ 
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 15px rgba(125, 211, 252, 0.3)",
            "0 0 30px rgba(186, 230, 253, 0.4)",
            "0 0 15px rgba(125, 211, 252, 0.3)",
          ]
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0.3 },
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative cursor-pointer rounded-full border-3 border-sky-200 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 text-center shadow-lg"
        style={{ width: 160, height: 160 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 to-transparent"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -inset-2 rounded-full bg-gradient-to-r from-sky-200 via-blue-200 to-indigo-200 opacity-40 blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <Handle type="target" position={Position.Top} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="target" position={Position.Left} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="target" position={Position.Right} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="target" position={Position.Bottom} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="source" position={Position.Top} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="source" position={Position.Left} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="source" position={Position.Right} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <Handle type="source" position={Position.Bottom} className="!h-0 !w-0 !border-0 !bg-transparent" />
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <motion.p 
            className="text-2xl font-black uppercase tracking-wide text-sky-700 drop-shadow-sm"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {data.label}
          </motion.p>
          <p className="text-sm font-bold text-blue-600 drop-shadow-sm">{data.subtitle}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -8, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      animate={data.isActive ? {
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 4px 20px rgba(125, 211, 252, 0.2)",
          "0 8px 30px rgba(125, 211, 252, 0.3)",
          "0 4px 20px rgba(125, 211, 252, 0.2)",
        ]
      } : {}}
      transition={{ 
        scale: { duration: 0.3, ease: "easeOut" },
        y: { duration: 0.3, ease: "easeOut" },
        rotate: { duration: 0.3, ease: "easeOut" },
        boxShadow: { duration: 2, repeat: Infinity }
      }}
      className={`group relative cursor-pointer rounded-2xl border-2 shadow-md hover:shadow-lg transition-all backdrop-blur-sm ${
        colors ? `${colors.bg} ${colors.border}` : "bg-muted border-border"
      } ${data.isActive ? "ring-3 ring-sky-200 z-10" : ""}`}
      style={{
        width: 160,
        height: 80,
      }}
    >
      <motion.div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        animate={data.isActive ? { opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {data.isActive && (
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sky-200 to-blue-200 opacity-40 blur-lg"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <Handle type="target" position={Position.Top} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Left} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Right} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Bottom} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Top} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Left} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Right} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Bottom} className="!h-0 !w-0 !border-0 !bg-transparent" />
      <div className="relative flex h-full w-full items-center justify-center px-4">
        <div className="text-center">
          <p className={`text-lg font-black tracking-tight ${colors ? colors.text : "text-foreground"} drop-shadow-sm`}>
            {data.label}
          </p>
          <p className="text-xs font-bold opacity-70 mt-0.5">{data.subtitle}</p>
        </div>
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
      const centerSize = 160;
      const radius = 240;
      const orbitIds: Array<keyof typeof nodeLabelMap> = ["A", "B", "C", "D", "E", "F"];

      const orbitNodes: Node<MapNodeData>[] = orbitIds.map((id, index) => {
        const angle = (-Math.PI / 2) + (index * (2 * Math.PI / orbitIds.length));
        const x = centerPoint.x + radius * Math.cos(angle) - 80;
        const y = centerPoint.y + radius * Math.sin(angle) - 40;

        return {
          id,
          type: "glowNode",
          position: { x, y },
          data: { 
            label: nodeLabelMap[id], 
            subtitle: id, 
            isActive: activeNode === id,
            color: id,
          },
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
        type: "straight",
        animated: activeNode === id,
        style: {
          stroke: activeNode === id 
            ? "rgb(125, 211, 252)" 
            : "rgb(229, 231, 235)",
          strokeWidth: activeNode === id ? 2.5 : 1.5,
          opacity: activeNode === id ? 0.7 : 0.4,
        },
      })),
    [activeNode],
  );

  const cards = curriculumByNode[activeNode] || curriculumByNode.A;

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-sky-50/70 via-blue-50/50 to-indigo-50/70 p-6 shadow-lg md:p-8">
      <motion.div 
        className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="pointer-events-none absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.4, 0.6]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-r from-sky-100/30 to-blue-100/30 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <motion.h2 
              className="text-3xl font-black bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent md:text-4xl"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Interactive Career Roadmap
            </motion.h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              Click any pathway to explore curriculum and opportunities
            </p>
          </div>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="hidden md:block h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-300 to-blue-300 shadow-md flex items-center justify-center"
          >
            <span className="text-2xl">🚀</span>
          </motion.div>
        </div>

        <motion.div 
          className="mt-6 h-[440px] overflow-hidden rounded-2xl border-2 border-sky-200 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/40 shadow-md md:h-[520px]"
          whileHover={{ boxShadow: "0 10px 40px rgba(125, 211, 252, 0.2)" }}
        >
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
            className="bg-transparent"
            proOptions={{ hideAttribution: true }}
          >
            <Background 
              gap={16} 
              size={1.5} 
              color="rgba(125, 211, 252, 0.15)" 
            />
          </ReactFlow>
        </motion.div>

        {/* Curriculum Distribution */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CurriculumDistribution />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {cards.map((card, index) => {
              const colors = nodeColorMap[activeNode];
              return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -8, scale: 1.03, rotateY: 5 }}
                className="group relative rounded-2xl border-2 border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-sky-50/30 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  style={{ backgroundSize: "200% 200%" }}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <motion.div 
                      className={`rounded-xl bg-gradient-to-br ${colors?.accent || 'from-teal-500 to-orange-500'} p-3 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <card.icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h3 className="font-black text-slate-800 text-lg">{card.title}</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm font-medium text-slate-600">
                    {card.points.map((point, i) => (
                      <motion.li 
                        key={point} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 + i * 0.05 }}
                      >
                        <motion.span 
                          className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${colors?.accent || 'from-teal-500 to-orange-500'}`}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CareerRoadmapDashboard;
