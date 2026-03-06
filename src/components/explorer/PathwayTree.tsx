import { useState } from "react";
import { ChevronRight, GitBranch, GitMerge, Zap, BookOpen, Award, FileText, Play, Wrench, ExternalLink } from "lucide-react";
import { TreeNode } from "@/types/career";

const typeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; colorClass: string; bgClass: string; label: string }> = {
  pathway: { icon: GitBranch, colorClass: "text-node-pathway", bgClass: "bg-node-pathway-soft", label: "Pathway" },
  "sub-path": { icon: GitMerge, colorClass: "text-node-pathway", bgClass: "bg-node-pathway-soft", label: "Sub-path" },
  skill: { icon: Zap, colorClass: "text-node-skill", bgClass: "bg-node-skill-soft", label: "Skill" },
  resource: { icon: BookOpen, colorClass: "text-node-course", bgClass: "bg-node-course-soft", label: "Resource" },
};

const resourceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  video: Play, course: BookOpen, certification: Award, article: FileText, project: Wrench,
};

interface PathwayTreeProps {
  nodes: TreeNode[];
  selectedId: string | null;
  onSelect: (node: TreeNode) => void;
  depth?: number;
}

const PathwayTree = ({ nodes, selectedId, onSelect, depth = 0 }: PathwayTreeProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className={depth > 0 ? "ml-5 border-l border-border pl-4" : ""}>
      {nodes.map(node => {
        const config = typeConfig[node.type] || typeConfig.pathway;
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedIds.has(node.id);
        const isSelected = selectedId === node.id;
        const Icon = node.type === "resource" && node.resourceType
          ? resourceIconMap[node.resourceType] || config.icon
          : config.icon;

        return (
          <div key={node.id} className="animate-fade-in">
            <button
              onClick={() => {
                onSelect(node);
                if (hasChildren) toggle(node.id);
              }}
              className={`group mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all ${
                isSelected
                  ? "bg-primary/10 ring-1 ring-primary/20"
                  : "hover:bg-muted/60"
              }`}
            >
              {hasChildren && (
                <ChevronRight
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                />
              )}
              {!hasChildren && <span className="w-4" />}
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${config.bgClass}`}>
                <Icon className={`h-3.5 w-3.5 ${config.colorClass}`} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-card-foreground">{node.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{config.label}
                  {node.difficulty && ` · ${node.difficulty}`}
                  {node.sourceType === "external" && (
                    <ExternalLink className="ml-1 inline h-3 w-3" />
                  )}
                </span>
              </div>
              {node.tags && node.tags.length > 0 && (
                <span className="hidden rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground lg:block">
                  {node.tags[0]}
                </span>
              )}
            </button>

            {hasChildren && isExpanded && (
              <PathwayTree
                nodes={node.children!}
                selectedId={selectedId}
                onSelect={onSelect}
                depth={depth + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PathwayTree;
