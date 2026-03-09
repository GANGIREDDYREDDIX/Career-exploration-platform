import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Code,
  ExternalLink,
  GraduationCap,
  Layers,
  Megaphone,
  Palette,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Youtube,
} from "lucide-react";
import {
  ReactFlow,
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  NodeProps,
  NodeTypes,
  Position,
  Handle,
} from "@xyflow/react";
import { motion } from "framer-motion";
import "@xyflow/react/dist/style.css";
import Navbar from "@/components/layout/Navbar";
import { getCareerById, careers } from "@/data/mockData";
import curriculumDataJson from "@/data/curriculum.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import type { CurriculumBranch, CurriculumData, PathRoadmap } from "@/types/curriculum";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, BarChart3, Palette, Megaphone, Layers,
};

type ExplorerNodeData = {
  label: string;
  type: "root" | "path" | "skill" | "resource";
  pathId?: string;
  linkedPathId?: string;
  marker?: string;
  isActive?: boolean;
  isMatched?: boolean;
};

const platformClassMap: Record<string, string> = {
  Coursera: "bg-blue-100 text-blue-700",
  YouTube: "bg-red-100 text-red-700",
  GitHub: "bg-slate-100 text-slate-700",
  NPTEL: "bg-emerald-100 text-emerald-700",
  Other: "bg-muted text-muted-foreground",
};

const platformIcon = (platform: string) => {
  if (platform === "YouTube") return <Youtube className="h-4 w-4" />;
  if (platform === "GitHub") return <Code className="h-4 w-4" />;
  return <BookOpen className="h-4 w-4" />;
};

const MindMapNode = ({ data }: NodeProps<Node<ExplorerNodeData>>) => {
  const dataType = data.type || "skill";
  const baseClass =
    dataType === "root"
      ? "border-primary/30 bg-primary/10 text-primary"
      : dataType === "path"
        ? "border-node-pathway/30 bg-node-pathway-soft text-node-pathway"
        : "border-node-skill/30 bg-node-skill-soft text-node-skill";

  return (
    <motion.div
      initial={{ opacity: 0.8, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative min-w-[150px] rounded-xl border px-3 py-2 text-center shadow-sm ${baseClass} ${data.isActive ? "ring-2 ring-primary/40" : ""} ${data.isMatched ? "shadow-lg" : ""}`}
    >
      {data.marker && (
        <span className="absolute -left-2 -top-2 inline-flex h-5 w-5 items-center justify-center rounded-full border bg-background text-[10px] font-bold text-foreground">
          {data.marker}
        </span>
      )}
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-primary/70" />
      <p className="text-xs font-semibold md:text-sm">{data.label}</p>
      {(dataType === "path" || data.linkedPathId) && (
        <p className="mt-1 text-[10px] opacity-80">Click to open roadmap</p>
      )}
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-primary/70" />
    </motion.div>
  );
};

const nodeTypes: NodeTypes = {
  curriculumNode: MindMapNode,
};

const singleSelectGroups = new Set(["sem", "internships", "projects", "placements"]);

const CareerExplorer = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const career = getCareerById(careerId || "");
  const curriculumData = curriculumDataJson as CurriculumData;

  const [selectedBranchId, setSelectedBranchId] = useState<string>(curriculumData.branches[0]?.id || "");
  const [selectedPathId, setSelectedPathId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    core: [],
    sem: [],
    pedagogy: [],
    certs: [],
    internships: [],
    projects: [],
    placements: [],
  });

  const toggleOption = (group: keyof typeof selectedOptions, value: string) => {
    setSelectedOptions((prev) => {
      const current = prev[group] || [];
      const exists = current.includes(value);

      if (singleSelectGroups.has(group)) {
        return {
          ...prev,
          [group]: exists ? [] : [value],
        };
      }

      return {
        ...prev,
        [group]: exists ? current.filter((item) => item !== value) : [...current, value],
      };
    });
  };

  const selectedBranch = useMemo<CurriculumBranch | undefined>(
    () => curriculumData.branches.find((b) => b.id === selectedBranchId),
    [curriculumData.branches, selectedBranchId],
  );

  useEffect(() => {
    if (!selectedBranch) return;
    setSelectedPathId((prev) => prev || selectedBranch.paths[0]?.id || "");
  }, [selectedBranch]);

  useEffect(() => {
    if (!selectedBranch || !selectedPathId) return;
    const storageKey = `cc-progress-${selectedBranch.id}-${selectedPathId}`;
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      setCompletedCourses(new Set());
      return;
    }
    try {
      const parsed = JSON.parse(raw) as string[];
      setCompletedCourses(new Set(parsed));
    } catch {
      setCompletedCourses(new Set());
    }
  }, [selectedBranch, selectedPathId]);

  const selectedPath = useMemo<PathRoadmap | undefined>(() => {
    if (!selectedBranch) return undefined;
    return selectedBranch.paths.find((p) => p.id === selectedPathId) || selectedBranch.paths[0];
  }, [selectedBranch, selectedPathId]);

  const flowNodes = useMemo<Node<ExplorerNodeData>[]>(() => {
    if (!selectedBranch) return [];
    const query = searchTerm.trim().toLowerCase();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pathMarkerMap = new Map<string, string>();
    const nodePathMap = new Map<string, string>();

    selectedBranch.paths.forEach((path, index) => {
      pathMarkerMap.set(path.id, alphabet[index] || `${index + 1}`);
    });

    selectedBranch.mindMapNodes.forEach((node) => {
      if (node.pathId) nodePathMap.set(node.id, node.pathId);
    });

    let updated = true;
    while (updated) {
      updated = false;
      selectedBranch.mindMapEdges.forEach((edge) => {
        const sourcePathId = nodePathMap.get(edge.source);
        if (sourcePathId && !nodePathMap.has(edge.target)) {
          nodePathMap.set(edge.target, sourcePathId);
          updated = true;
        }
      });
    }

    return selectedBranch.mindMapNodes.map((node) => {
      const isMatched =
        !query ||
        node.label.toLowerCase().includes(query) ||
        (node.pathId ? selectedBranch.paths.find((p) => p.id === node.pathId)?.title.toLowerCase().includes(query) : false);

      const linkedPathId = node.pathId || nodePathMap.get(node.id);

      return {
        id: node.id,
        type: "curriculumNode",
        position: node.position,
        data: {
          label: node.label,
          type: node.type,
          pathId: node.pathId,
          linkedPathId,
          marker: node.pathId ? pathMarkerMap.get(node.pathId) : undefined,
          isActive: linkedPathId === selectedPath?.id,
          isMatched,
        },
      };
    });
  }, [selectedBranch, selectedPath?.id, searchTerm]);

  const flowEdges = useMemo<Edge[]>(() => {
    if (!selectedBranch) return [];
    return selectedBranch.mindMapEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "hsl(var(--muted-foreground))", opacity: 0.4 },
    }));
  }, [selectedBranch]);

  const filteredSections = useMemo(() => {
    if (!selectedPath) return [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) return selectedPath.sections;

    return selectedPath.sections
      .map((section) => {
        const sectionMatches =
          section.title.toLowerCase().includes(query) || section.summary.toLowerCase().includes(query);
        if (sectionMatches) return section;

        const skills = section.skills.filter((skill) => skill.toLowerCase().includes(query));
        const courses = section.courses.filter((course) =>
          `${course.title} ${course.provider} ${course.platform}`.toLowerCase().includes(query),
        );

        return {
          ...section,
          skills,
          courses,
        };
      })
      .filter((section) => section.skills.length > 0 || section.courses.length > 0);
  }, [searchTerm, selectedPath]);

  const summaryData = useMemo(() => {
    const fallbackSkills = selectedPath?.sections.flatMap((section) => section.skills).slice(0, 6) || [];

    return {
      packageMin: selectedPath?.packageRange?.min || "₹3 LPA",
      packageMax: selectedPath?.packageRange?.max || "₹20 LPA",
      coreCourses: selectedPath?.coreCourses || fallbackSkills,
      semesterMapping:
        selectedPath?.semesterMapping || [
          { semester: "Sem 1-2", focus: "Fundamentals" },
          { semester: "Sem 3-4", focus: "Core courses" },
          { semester: "Sem 5-6", focus: "Advanced practice" },
          { semester: "Sem 7-8", focus: "Internship + placements" },
        ],
      pedagogy: selectedPath?.pedagogy || ["Project-based", "Hands-on", "Mentored learning"],
      certificationCourses: selectedPath?.certificationCourses || selectedPath?.resources.map((r) => r.label).slice(0, 4) || [],
      internships:
        selectedPath?.internships || [
          { tier: "T1", role: "Entry Intern", selectionOption: "Aptitude + basics" },
          { tier: "T2", role: "Core Intern", selectionOption: "Project + interview" },
          { tier: "T3", role: "Specialized Intern", selectionOption: "Domain round" },
        ],
      projectTracks:
        selectedPath?.projectTracks ||
        selectedPath?.resources
          .filter((resource) => resource.platform === "GitHub")
          .map((resource, index) => ({
            title: `Project Track ${index + 1}`,
            githubUrl: resource.url,
            selectionOption: index === 0 ? "Starter" : "Advanced",
          })) || [],
      placementOpportunities: selectedPath?.placementOpportunities || ["Product companies", "Service companies", "Startups"],
    };
  }, [selectedPath]);

  const filteredSummary = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return summaryData;

    const filterByQuery = (item: string) => item.toLowerCase().includes(query);

    return {
      ...summaryData,
      coreCourses: summaryData.coreCourses.filter(filterByQuery),
      semesterMapping: summaryData.semesterMapping.filter(
        (item) => filterByQuery(item.semester) || filterByQuery(item.focus),
      ),
      pedagogy: summaryData.pedagogy.filter(filterByQuery),
      certificationCourses: summaryData.certificationCourses.filter(filterByQuery),
      internships: summaryData.internships.filter(
        (item) => filterByQuery(item.tier) || filterByQuery(item.role) || filterByQuery(item.selectionOption || ""),
      ),
      projectTracks: summaryData.projectTracks.filter(
        (item) => filterByQuery(item.title) || filterByQuery(item.selectionOption || ""),
      ),
      placementOpportunities: summaryData.placementOpportunities.filter(filterByQuery),
    };
  }, [searchTerm, summaryData]);

  const totalCourses = useMemo(() => {
    if (!selectedPath) return 0;
    return selectedPath.sections.reduce((acc, section) => acc + section.courses.length, 0);
  }, [selectedPath]);

  const completedCount = useMemo(() => {
    if (!selectedPath) return 0;
    const allCourseIds = selectedPath.sections.flatMap((section) => section.courses.map((course) => course.id));
    return allCourseIds.filter((id) => completedCourses.has(id)).length;
  }, [completedCourses, selectedPath]);

  const progressValue = totalCourses === 0 ? 0 : Math.round((completedCount / totalCourses) * 100);

  const totalSelectedOptions = useMemo(
    () => Object.values(selectedOptions).reduce((acc, items) => acc + items.length, 0),
    [selectedOptions],
  );

  const onToggleCourse = (courseId: string, checked: boolean) => {
    if (!selectedBranch || !selectedPath) return;
    const next = new Set(completedCourses);
    if (checked) next.add(courseId);
    else next.delete(courseId);
    setCompletedCourses(next);
    localStorage.setItem(`cc-progress-${selectedBranch.id}-${selectedPath.id}`, JSON.stringify(Array.from(next)));
  };

  if (!career) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">Career not found</h1>
          <p className="mt-2 text-muted-foreground">Try exploring one of our featured careers.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {careers.map(c => (
              <Link key={c.id} to={`/explore/${c.id}`} className="rounded-lg border bg-card px-4 py-2 text-sm hover:bg-muted">
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[career.icon] || Code;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-5">
          {/* Breadcrumbs */}
          <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/" className="hover:text-foreground">Careers</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{career.title}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-muted">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">{career.title}</h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{career.salaryRange}</span>
                <span className="flex items-center gap-0.5 text-node-course">
                  <TrendingUp className="h-3 w-3" /> {career.growthRate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer */}
      <div className="container flex-1 py-5">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">{career.overview}</p>
          <div className="flex flex-wrap gap-2">
            {curriculumData.branches.map((branch) => (
              <Button
                key={branch.id}
                variant={branch.id === selectedBranchId ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedBranchId(branch.id);
                  setSelectedPathId(branch.paths[0]?.id || "");
                }}
              >
                {branch.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills, courses, providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xl"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-[52vh] min-h-[380px] md:h-[60vh]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mind-map Explorer</CardTitle>
                <CardDescription>{selectedBranch?.description}</CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-72px)] p-2">
                <ReactFlow
                  nodes={flowNodes}
                  edges={flowEdges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.2 }}
                  onNodeClick={(_, node) => {
                    const pathId = (node.data as ExplorerNodeData).linkedPathId;
                    if (pathId) setSelectedPathId(pathId);
                  }}
                  className="rounded-lg bg-muted/20"
                  proOptions={{ hideAttribution: true }}
                >
                  <Controls />
                  <Background gap={18} size={1} />
                </ReactFlow>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Card className="h-[52vh] min-h-[380px] overflow-auto md:h-[60vh]">
              <CardHeader>
                <CardTitle className="text-lg">{selectedPath?.title || "Select a path"}</CardTitle>
                <CardDescription>{selectedPath?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-lg border bg-muted/30 p-3">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">
                      {completedCount}/{totalCourses} courses · {progressValue}%
                    </span>
                  </div>
                  <Progress value={progressValue} />
                </div>

                {selectedPath && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedPath.resources.map((resource) => (
                      <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${platformClassMap[resource.platform] || platformClassMap.Other}`}
                      >
                        {platformIcon(resource.platform)} {resource.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}

                <Accordion type="multiple" className="w-full">
                  {filteredSections.map((section) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AccordionItem value={section.id} className="mb-2 rounded-lg border px-3">
                        <AccordionTrigger className="text-left hover:no-underline">
                          <div>
                            <p className="font-semibold">{section.title}</p>
                            <p className="text-xs text-muted-foreground">{section.summary}</p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {section.skills.map((skill) => (
                              <span key={skill} className="rounded-full bg-node-skill-soft px-2 py-1 text-xs text-node-skill">
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="space-y-2">
                            {section.courses.map((course) => {
                              const checked = completedCourses.has(course.id);
                              return (
                                <div key={course.id} className="flex items-start gap-2 rounded-md border p-2">
                                  <Checkbox
                                    className="mt-1"
                                    checked={checked}
                                    onCheckedChange={(value) => onToggleCourse(course.id, value === true)}
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className={`text-sm font-medium ${checked ? "line-through text-muted-foreground" : ""}`}>
                                        {course.title}
                                      </p>
                                      <span className={`rounded-full px-2 py-0.5 text-[10px] ${platformClassMap[course.platform] || platformClassMap.Other}`}>
                                        {course.platform}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {course.provider} · {course.duration} · {course.level}
                                    </p>
                                  </div>
                                  <a href={course.url} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>

                {filteredSections.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">No matching courses or skills found.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-4"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Curriculum Mapper</CardTitle>
              <CardDescription>
                Structured plan for {selectedPath?.title || "selected path"} including core courses, semesters, projects, and placements.
              </CardDescription>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  {totalSelectedOptions} options selected
                </span>
                {Object.entries(selectedOptions).map(([group, values]) =>
                  values.slice(0, 2).map((value) => (
                    <span key={`${group}-${value}`} className="rounded-full bg-muted px-2 py-1 text-muted-foreground">
                      {value}
                    </span>
                  )),
                )}
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" /> Package Range (Probable)
                </div>
                <p className="text-sm text-muted-foreground">
                  {filteredSummary.packageMin} to {filteredSummary.packageMax}
                </p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="h-4 w-4 text-primary" /> Core Courses
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {filteredSummary.coreCourses.map((course) => (
                    <button
                      type="button"
                      key={course}
                      onClick={() => toggleOption("core", course)}
                      className={`rounded-full px-2 py-1 text-xs transition-colors ${
                        selectedOptions.core.includes(course)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/70"
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="h-4 w-4 text-primary" /> Sem Mapping
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  {filteredSummary.semesterMapping.map((item) => (
                    <button
                      type="button"
                      key={`${item.semester}-${item.focus}`}
                      onClick={() => toggleOption("sem", `${item.semester}: ${item.focus}`)}
                      className={`w-full rounded-md border px-2 py-1 text-left transition-colors ${
                        selectedOptions.sem.includes(`${item.semester}: ${item.focus}`)
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-transparent hover:border-border hover:bg-muted/40"
                      }`}
                    >
                      <span className="font-semibold text-foreground">{item.semester}:</span> {item.focus}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <ClipboardList className="h-4 w-4 text-primary" /> Pedagogy
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {filteredSummary.pedagogy.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => toggleOption("pedagogy", item)}
                        className={`w-full rounded-md px-2 py-1 text-left transition-colors ${
                          selectedOptions.pedagogy.includes(item)
                            ? "bg-primary/10 text-foreground"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        • {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <BookOpen className="h-4 w-4 text-primary" /> Certification Courses
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {filteredSummary.certificationCourses.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => toggleOption("certs", item)}
                        className={`w-full rounded-md px-2 py-1 text-left transition-colors ${
                          selectedOptions.certs.includes(item)
                            ? "bg-primary/10 text-foreground"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        • {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="h-4 w-4 text-primary" /> Internships (T1-T6)
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  {filteredSummary.internships.map((item) => {
                    const value = `${item.tier} · ${item.role}`;
                    return (
                      <button
                        type="button"
                        key={`${item.tier}-${item.role}`}
                        onClick={() => toggleOption("internships", value)}
                        className={`w-full rounded-md px-2 py-1 text-left transition-colors ${
                          selectedOptions.internships.includes(value)
                            ? "bg-primary/10 text-foreground"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        <span className="font-semibold text-foreground">{item.tier}</span> · {item.role}
                        {item.selectionOption ? ` · ${item.selectionOption}` : ""}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border p-3 md:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Code className="h-4 w-4 text-primary" /> Projects (GitHub)
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {filteredSummary.projectTracks.map((project) => {
                    const isSelected = selectedOptions.projects.includes(project.title);
                    return (
                    <button
                      type="button"
                      key={`${project.title}-${project.githubUrl}`}
                      onClick={() => toggleOption("projects", project.title)}
                      className={`rounded-md border p-2 text-left text-xs transition-colors ${
                        isSelected ? "border-primary bg-primary/10" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-foreground">{project.title}</p>
                          <p className="mt-1 text-muted-foreground">{project.selectionOption || "Selection option available"}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex text-primary underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open GitHub
                      </a>
                    </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Rocket className="h-4 w-4 text-primary" /> Placement Opportunities
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {filteredSummary.placementOpportunities.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => toggleOption("placements", item)}
                        className={`w-full rounded-md px-2 py-1 text-left transition-colors ${
                          selectedOptions.placements.includes(item)
                            ? "bg-primary/10 text-foreground"
                            : "hover:bg-muted/40"
                        }`}
                      >
                        • {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerExplorer;
