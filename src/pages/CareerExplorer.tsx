import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Code, BarChart3, Palette, Megaphone, Layers, TrendingUp, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PathwayTree from "@/components/explorer/PathwayTree";
import DetailsPanel from "@/components/explorer/DetailsPanel";
import { getCareerById, careers } from "@/data/mockData";
import { TreeNode } from "@/types/career";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, BarChart3, Palette, Megaphone, Layers,
};

const CareerExplorer = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const career = getCareerById(careerId || "");
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

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
      <div className="flex flex-1">
        {/* Tree panel */}
        <div className="flex-1 overflow-auto border-r p-5 lg:max-w-[55%]">
          <p className="mb-4 text-sm text-muted-foreground">{career.overview}</p>
          <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">Pathways</h3>
          <PathwayTree
            nodes={career.tree}
            selectedId={selectedNode?.id || null}
            onSelect={setSelectedNode}
          />
        </div>

        {/* Details panel */}
        <div className="hidden w-[45%] overflow-auto bg-card lg:block">
          <DetailsPanel node={selectedNode} />
        </div>
      </div>

      {/* Mobile details drawer */}
      {selectedNode && (
        <div className="fixed inset-x-0 bottom-0 z-40 max-h-[60vh] overflow-auto rounded-t-2xl border-t bg-card shadow-2xl lg:hidden">
          <div className="flex justify-center py-2">
            <button
              onClick={() => setSelectedNode(null)}
              className="h-1 w-10 rounded-full bg-muted-foreground/30"
            />
          </div>
          <DetailsPanel node={selectedNode} />
        </div>
      )}
    </div>
  );
};

export default CareerExplorer;
