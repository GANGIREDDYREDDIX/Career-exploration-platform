export type NodeType = 'pathway' | 'sub-path' | 'skill' | 'resource';
export type ResourceType = 'video' | 'course' | 'certification' | 'article' | 'project';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type SourceType = 'internal' | 'external';

export interface TreeNode {
  id: string;
  title: string;
  type: NodeType;
  description: string;
  children?: TreeNode[];
  // Resource-specific
  resourceType?: ResourceType;
  sourceType?: SourceType;
  url?: string;
  duration?: string;
  difficulty?: Difficulty;
  tags?: string[];
  provider?: string;
  // Skill-specific
  level?: Difficulty;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  salaryRange: string;
  growthRate: string;
  icon: string;
  relatedCareerIds: string[];
  tree: TreeNode[];
}

export interface CareerCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
}
