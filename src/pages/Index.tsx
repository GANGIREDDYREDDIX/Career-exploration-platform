import { Link } from "react-router-dom";
import { Search, ArrowRight, Compass, BookOpen, GitBranch, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareerCard from "@/components/career/CareerCard";
import CategoryChip from "@/components/career/CategoryChip";
import { careers, categories } from "@/data/mockData";
import heroImage from "@/assets/hero-illustration.png";

const steps = [
  { icon: Compass, title: "Explore Careers", desc: "Browse career categories and discover roles that match your interests." },
  { icon: GitBranch, title: "Map Your Path", desc: "Visualize pathways, sub-paths, and milestones for your chosen career." },
  { icon: BookOpen, title: "Start Learning", desc: "Access courses, certifications, and resources to build your skills." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container relative z-10 py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Award className="h-3.5 w-3.5 text-primary" />
                5 career paths · 50+ resources
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Discover Your
                <span className="block text-primary"> Career Path</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                Explore career pathways, map your skills, and find the courses and certifications you need to reach your goals.
              </p>
              <div className="mt-8 flex max-w-md gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search careers, skills, courses..." className="pl-10" />
                </div>
                <Button>Search</Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                Popular:
                {["Frontend Developer", "Data Analyst", "UX Design"].map(t => (
                  <Link key={t} to="/explore/frontend-developer" className="rounded-md bg-muted px-2 py-1 hover:bg-muted/80">
                    {t}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <img src={heroImage} alt="Career pathway visualization" className="w-full rounded-2xl" />
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
