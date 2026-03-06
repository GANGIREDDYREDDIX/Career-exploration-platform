import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareerCard from "@/components/career/CareerCard";
import CategoryChip from "@/components/career/CategoryChip";
import { careers, categories } from "@/data/mockData";

const CareersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filtered = selectedCategory
    ? careers.filter(c => c.category === selectedCategory)
    : careers;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <h1 className="font-heading text-3xl font-bold">All Careers</h1>
        <p className="mt-2 text-muted-foreground">Explore all available career paths and find the right one for you.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              !selectedCategory ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              category={cat}
              selected={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(career => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage;
