import { Monitor, Palette, Megaphone, BarChart3, Briefcase, DollarSign } from "lucide-react";
import { CareerCategory } from "@/types/career";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, Palette, Megaphone, BarChart3, Briefcase, DollarSign,
};

interface CategoryChipProps {
  category: CareerCategory;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ category, selected, onClick }: CategoryChipProps) => {
  const Icon = iconMap[category.icon] || Monitor;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {category.label}
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">{category.count}</span>
    </button>
  );
};

export default CategoryChip;
