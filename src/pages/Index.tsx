import { Link } from "react-router-dom";
import { Search, ArrowRight, Compass, BookOpen, GitBranch, Award, Code, BarChart3, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareerCard from "@/components/career/CareerCard";
import CategoryChip from "@/components/career/CategoryChip";
import { careers, categories } from "@/data/mockData";

const steps = [
  { icon: Compass, title: "Explore Careers", desc: "Browse career categories and discover roles that match your interests." },
  { icon: GitBranch, title: "Map Your Path", desc: "Visualize pathways, sub-paths, and milestones for your chosen career." },
  { icon: BookOpen, title: "Start Learning", desc: "Access courses, certifications, and resources to build your skills." },
];

const floatingNodes = [
  { icon: Code, label: "Frontend", x: "right-[8%]", y: "top-[15%]", color: "bg-primary/10 text-primary border-primary/20", delay: "0s" },
  { icon: BarChart3, label: "Analytics", x: "right-[22%]", y: "top-[55%]", color: "bg-node-course-soft text-node-course border-node-course/20", delay: "0.5s" },
  { icon: Award, label: "Certified", x: "right-[5%]", y: "top-[70%]", color: "bg-node-cert-soft text-node-cert border-node-cert/20", delay: "1s" },
  { icon: Zap, label: "Skills", x: "right-[30%]", y: "top-[25%]", color: "bg-node-skill-soft text-node-skill border-node-skill/20", delay: "1.5s" },
  { icon: Layers, label: "Product", x: "right-[15%]", y: "top-[42%]", color: "bg-node-pathway-soft text-node-pathway border-node-pathway/20", delay: "0.8s" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-accent/6 blur-3xl" />

        <div className="container relative z-10 py-24 lg:py-32">
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-node-course animate-pulse" />
                5 career paths · 50+ resources · Free to explore
              </div>
              <h1 className="font-heading text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Map your
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    career path
                  </span>
                  <span className="absolute -bottom-1 left-0 h-3 w-full bg-primary/10 rounded-sm -skew-x-3" />
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Explore roles, visualize pathways, and discover the exact courses and certifications you need — all in one interactive roadmap.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search careers, skills, courses..." className="h-12 rounded-xl bg-card pl-10 text-sm shadow-sm" />
                </div>
                <Button size="lg" className="h-12 rounded-xl px-6 shadow-sm">
                  Explore Careers
                </Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">Popular:</span>
                {[
                  { label: "Frontend Developer", id: "frontend-developer" },
                  { label: "Data Analyst", id: "data-analyst" },
                  { label: "UX Designer", id: "ui-ux-designer" },
                  { label: "Product Manager", id: "product-manager" },
                ].map(t => (
                  <Link
                    key={t.id}
                    to={`/explore/${t.id}`}
                    className="rounded-lg border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/20"
                  >
                    {t.label}
                  </Link>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-10 flex gap-8 border-t pt-6">
                {[
                  { value: "5+", label: "Career Paths" },
                  { value: "15+", label: "Pathways" },
                  { value: "50+", label: "Resources" },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating nodes */}
            <div className="relative hidden h-[480px] lg:block">
              {floatingNodes.map((node, i) => (
                <div
                  key={i}
                  className={`absolute ${node.x} ${node.y} flex items-center gap-2.5 rounded-xl border ${node.color} px-4 py-3 shadow-lg backdrop-blur-sm`}
                  style={{ animation: `float ${3 + i * 0.4}s ease-in-out infinite`, animationDelay: node.delay }}
                >
                  <node.icon className="h-5 w-5" />
                  <span className="text-sm font-semibold">{node.label}</span>
                </div>
              ))}
              {/* Connecting lines SVG */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 480" fill="none">
                <path d="M300 240 Q400 120 480 80" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
                <path d="M300 240 Q200 300 150 350" stroke="hsl(var(--secondary))" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
                <path d="M300 240 Q450 280 500 340" stroke="hsl(var(--node-course))" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
                <path d="M300 240 Q350 180 420 140" stroke="hsl(var(--node-skill))" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
                <path d="M300 240 Q380 220 440 210" stroke="hsl(var(--node-pathway))" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.15" />
                {/* Center node */}
                <circle cx="300" cy="240" r="8" fill="hsl(var(--primary))" opacity="0.6" />
                <circle cx="300" cy="240" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.2" />
                <circle cx="300" cy="240" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.1" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t bg-card/50">
        <div className="container py-16">
          <h2 className="font-heading text-2xl font-bold">Browse by Category</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map(cat => (
              <CategoryChip key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Careers */}
      <section className="container py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold">Featured Careers</h2>
            <p className="mt-1 text-sm text-muted-foreground">Explore popular career paths and start your journey.</p>
          </div>
          <Link to="/careers" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careers.slice(0, 6).map(career => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-card/50">
        <div className="container py-16">
          <h2 className="text-center font-heading text-2xl font-bold">How It Works</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Three steps to your next career move.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-2xl bg-primary p-10 text-center lg:p-16">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">
            Ready to explore your future?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Start mapping your career path today — it's free.
          </p>
          <Button variant="secondary" size="lg" className="mt-6" asChild>
            <Link to="/explore/frontend-developer">
              Start Exploring <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
