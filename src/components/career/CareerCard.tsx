import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Code, BarChart3, Palette, Megaphone, Layers } from "lucide-react";
import { Career } from "@/types/career";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, BarChart3, Palette, Megaphone, Layers,
};

interface CareerCardProps {
  career: Career;
}

const CareerCard = ({ career }: CareerCardProps) => {
  const Icon = iconMap[career.icon] || Code;

  return (
    <Link
      to={`/explore/${career.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-node-course/10 px-2.5 py-1 text-xs font-medium text-node-course">
          <TrendingUp className="h-3 w-3" />
          {career.growthRate}
        </div>
      </div>
      <h3 className="font-heading text-lg font-semibold text-card-foreground">{career.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted-foreground line-clamp-2">{career.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{career.salaryRange}</span>
        <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Explore <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
};

export default CareerCard;
