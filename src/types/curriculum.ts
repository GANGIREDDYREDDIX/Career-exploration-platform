export type BranchNodeType = "root" | "path" | "skill" | "resource";

export interface MindMapNode {
  id: string;
  label: string;
  type: BranchNodeType;
  position: {
    x: number;
    y: number;
  };
  pathId?: string;
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
}

export interface CurriculumCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  platform: "Coursera" | "YouTube" | "GitHub" | "NPTEL" | "Other";
  url: string;
}

export interface RoadmapSection {
  id: string;
  title: string;
  summary: string;
  skills: string[];
  courses: CurriculumCourse[];
}

export interface PathRoadmap {
  id: string;
  title: string;
  description: string;
  resources: Array<{
    label: string;
    platform: "Coursera" | "YouTube" | "GitHub" | "NPTEL" | "Other";
    url: string;
  }>;
  sections: RoadmapSection[];
}

export interface CurriculumBranch {
  id: string;
  name: string;
  description: string;
  mindMapNodes: MindMapNode[];
  mindMapEdges: MindMapEdge[];
  paths: PathRoadmap[];
}

export interface CurriculumData {
  branches: CurriculumBranch[];
}
