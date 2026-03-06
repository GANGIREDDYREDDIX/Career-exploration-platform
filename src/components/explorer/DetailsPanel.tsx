import { TreeNode } from "@/types/career";
import { BookOpen, Award, Play, FileText, Wrench, ExternalLink, Clock, BarChart3, Tag, Zap, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const typeLabels: Record<string, string> = {
  pathway: "Pathway",
  "sub-path": "Sub-path",
  skill: "Skill",
  resource: "Resource",
};

const resourceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  video: Play, course: BookOpen, certification: Award, article: FileText, project: Wrench,
};

interface DetailsPanelProps {
  node: TreeNode | null;
}

const DetailsPanel = ({ node }: DetailsPanelProps) => {
  if (!node) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <GitBranch className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">Select a node</h3>
        <p className="mt-2 text-sm text-muted-foreground">Click any node in the pathway tree to see details here.</p>
      </div>
    );
  }

  const ResourceIcon = node.resourceType ? resourceIcons[node.resourceType] || BookOpen : null;

  return (
    <div className="animate-slide-in-right p-6">
      {/* Type badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
          node.type === "skill" ? "bg-node-skill-soft text-node-skill"
            : node.type === "resource" ? "bg-node-course-soft text-node-course"
            : "bg-node-pathway-soft text-node-pathway"
        }`}>
          {node.type === "skill" && <Zap className="h-3 w-3" />}
          {node.type === "resource" && ResourceIcon && <ResourceIcon className="h-3 w-3" />}
          {(node.type === "pathway" || node.type === "sub-path") && <GitBranch className="h-3 w-3" />}
          {typeLabels[node.type]}
          {node.resourceType && ` · ${node.resourceType}`}
        </span>
      </div>

      <h2 className="font-heading text-xl font-bold text-foreground">{node.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.description}</p>

      {/* Metadata */}
      <div className="mt-5 space-y-3">
        {node.difficulty && (
          <div className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Difficulty:</span>
            <span className="font-medium capitalize text-foreground">{node.difficulty}</span>
          </div>
        )}
        {node.level && (
          <div className="flex items-center gap-2 text-sm">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Level:</span>
            <span className="font-medium capitalize text-foreground">{node.level}</span>
          </div>
        )}
        {node.duration && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium text-foreground">{node.duration}</span>
          </div>
        )}
        {node.provider && (
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Provider:</span>
            <span className="font-medium text-foreground">{node.provider}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {node.tags && node.tags.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Tag className="h-3 w-3" />
            Tags
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {node.tags.map(tag => (
              <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {node.type === "resource" && node.url && (
        <div className="mt-6">
          <Button className="w-full gap-2">
            {node.sourceType === "external" ? (
              <>Open Resource <ExternalLink className="h-4 w-4" /></>
            ) : (
              <>Start Learning <Play className="h-4 w-4" /></>
            )}
          </Button>
          {node.sourceType === "external" && (
            <p className="mt-2 text-center text-xs text-muted-foreground">Opens in a new tab</p>
          )}
        </div>
      )}

      {/* Children summary */}
      {node.children && node.children.length > 0 && (
        <div className="mt-6 rounded-lg border bg-muted/30 p-4">
          <p className="text-xs font-medium text-muted-foreground">Contains</p>
          <p className="mt-1 text-sm text-foreground">
            {node.children.filter(c => c.type === "skill").length} skills,{" "}
            {node.children.filter(c => c.type === "resource").length} resources,{" "}
            {node.children.filter(c => c.type === "sub-path" || c.type === "pathway").length} sub-paths
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailsPanel;
