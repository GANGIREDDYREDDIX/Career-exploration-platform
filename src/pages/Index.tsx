import { Link } from "react-router-dom";
import { Search, ArrowRight, Compass, BookOpen, GitBranch, Award, Code, BarChart3, Zap, Layers, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareerCard from "@/components/career/CareerCard";
import CategoryChip from "@/components/career/CategoryChip";
import CareerRoadmapDashboard from "@/components/career/CareerRoadmapDashboard";
import CurriculumDistribution from "@/components/career/CurriculumDistribution";
import { careers, categories } from "@/data/mockData";
import { motion } from "framer-motion";

const steps = [
  { icon: Compass, title: "Explore Careers", desc: "Browse career categories and discover roles that match your interests.", color: "from-sky-500 to-blue-500" },
  { icon: GitBranch, title: "Map Your Path", desc: "Visualize pathways, sub-paths, and milestones for your chosen career.", color: "from-blue-500 to-indigo-500" },
  { icon: BookOpen, title: "Start Learning", desc: "Access courses, certifications, and resources to build your skills.", color: "from-indigo-500 to-purple-500" },
];

const floatingNodes = [
  { icon: Code, label: "Frontend", x: "right-[8%]", y: "top-[15%]", color: "from-sky-400 to-blue-400", delay: 0 },
  { icon: BarChart3, label: "Analytics", x: "right-[22%]", y: "top-[55%]", color: "from-blue-400 to-indigo-400", delay: 0.5 },
  { icon: Award, label: "Certified", x: "right-[5%]", y: "top-[70%]", color: "from-indigo-400 to-purple-400", delay: 1 },
  { icon: Zap, label: "Skills", x: "right-[30%]", y: "top-[25%]", color: "from-cyan-400 to-sky-400", delay: 1.5 },
  { icon: Layers, label: "Product", x: "right-[15%]", y: "top-[42%]", color: "from-violet-400 to-blue-400", delay: 0.8 },
];

const features = [
  { icon: Target, title: "Clear Direction", desc: "Get personalized career paths based on your goals", color: "from-sky-400 to-blue-500" },
  { icon: GitBranch, title: "Interactive Maps", desc: "Visual roadmaps showing every step of your journey", color: "from-blue-400 to-indigo-500" },
  { icon: Sparkles, title: "Curated Resources", desc: "Handpicked courses, certifications, and guides", color: "from-indigo-400 to-purple-500" },
  { icon: TrendingUp, title: "Career Growth", desc: "Track your progress and achieve your milestones", color: "from-purple-400 to-pink-500" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50/30 to-blue-50/30">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-sky-200/40 to-blue-200/40 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="pointer-events-none absolute -right-20 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-cyan-200/30 to-sky-200/30 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative z-10 py-20 lg:py-28">
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <motion.div 
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-sky-200 bg-gradient-to-r from-sky-50 to-blue-50 px-5 py-2 text-sm font-semibold text-sky-700 backdrop-blur-sm shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                5 career paths · 50+ resources · Free to explore
              </motion.div>
              
              <motion.h1 
                className="font-heading text-5xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Navigate Your
                <br />
                <span className="relative inline-block mt-2">
                  <motion.span 
                    className="relative z-10 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Career Journey
                  </motion.span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 h-4 w-full bg-gradient-to-r from-sky-300 to-blue-300 rounded-lg opacity-30 blur-sm"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-lg leading-relaxed text-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Discover your perfect career path with interactive roadmaps, expert guidance, and curated resources. Start your journey today.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input 
                    placeholder="Search careers, skills, courses..." 
                    className="h-14 rounded-2xl border-2 border-sky-200 bg-white pl-12 text-base shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all" 
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-14 rounded-2xl px-8 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-200 transition-all hover:shadow-xl hover:shadow-sky-300 font-semibold"
                >
                  Explore Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-6 flex flex-wrap items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-sm font-medium text-slate-500">Popular:</span>
                {[
                  { label: "Frontend Dev", id: "frontend-developer" },
                  { label: "Data Analyst", id: "data-analyst" },
                  { label: "UX Designer", id: "ui-ux-designer" },
                  { label: "Product Manager", id: "product-manager" },
                ].map((t, idx) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  >
                    <Link
                      to={`/explore/${t.id}`}
                      className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all hover:border-sky-300 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:text-sky-700 hover:shadow-md"
                    >
                      {t.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats row */}
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border-2 border-sky-100 bg-gradient-to-br from-white to-sky-50/50 p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { value: "5+", label: "Career Paths" },
                  { value: "15+", label: "Pathways" },
                  { value: "50+", label: "Resources" },
                ].map((stat, idx) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="font-heading text-3xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — floating nodes with animations */}
            <motion.div 
              className="relative hidden h-[520px] lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {floatingNodes.map((node, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${node.x} ${node.y} group cursor-pointer`}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: [0, -15, 0],
                  }}
                  transition={{
                    opacity: { delay: node.delay + 0.5, duration: 0.4 },
                    scale: { delay: node.delay + 0.5, duration: 0.4 },
                    y: { 
                      delay: node.delay + 1,
                      duration: 3 + i * 0.4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className={`flex items-center gap-3 rounded-2xl border-2 border-white bg-gradient-to-br ${node.color} px-5 py-3.5 shadow-lg backdrop-blur-sm transition-all group-hover:shadow-xl`}>
                    <div className="rounded-xl bg-white/90 p-2 shadow-sm">
                      <node.icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-sm">{node.label}</span>
                  </div>
                </motion.div>
              ))}
              
              {/* Center pulse effect */}
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="h-32 w-32 rounded-full bg-gradient-to-r from-sky-300 to-blue-300 blur-2xl" />
              </motion.div>
              
              {/* Connecting lines SVG with animation */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 520" fill="none">
                <motion.path 
                  d="M300 260 Q400 140 480 100" 
                  stroke="url(#gradient1)" 
                  strokeWidth="2" 
                  strokeDasharray="8 6" 
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M300 260 Q450 300 500 360" 
                  stroke="url(#gradient2)" 
                  strokeWidth="2" 
                  strokeDasharray="8 6" 
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M300 260 Q350 200 420 160" 
                  stroke="url(#gradient3)" 
                  strokeWidth="2" 
                  strokeDasharray="8 6" 
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.4, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M300 260 Q380 240 440 230" 
                  stroke="url(#gradient4)" 
                  strokeWidth="2" 
                  strokeDasharray="8 6" 
                  opacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.6, ease: "easeInOut" }}
                />
                
                <defs>
                  <linearGradient id="gradient1" x1="300" y1="260" x2="480" y2="100">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="300" y1="260" x2="500" y2="360">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="300" y1="260" x2="420" y2="160">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                  <linearGradient id="gradient4" x1="300" y1="260" x2="440" y2="230">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                
                {/* Center node */}
                <motion.circle 
                  cx="300" 
                  cy="260" 
                  r="10" 
                  fill="url(#centerGradient)"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle 
                  cx="300" 
                  cy="260" 
                  r="20" 
                  fill="none" 
                  stroke="#0ea5e9" 
                  strokeWidth="2" 
                  opacity="0.3"
                  animate={{ r: [20, 30, 20], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <defs>
                  <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Roadmap */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CareerRoadmapDashboard />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-sky-100 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">
        <div className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Why Choose Career Compass</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to plan and execute your career journey successfully</p>
          </motion.div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl border-2 border-sky-100 bg-white p-8 shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                <div className="relative">
                  <motion.div 
                    className={`inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-4 shadow-lg mb-5`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-50 to-white">
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-black text-slate-900">Browse by Category</h2>
            <p className="mt-2 text-slate-600">Explore career paths across different domains</p>
          </motion.div>
          <motion.div 
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <CategoryChip category={cat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Careers */}
      <section className="container py-20">
        <motion.div 
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="font-heading text-4xl font-black text-slate-900">Featured Careers</h2>
            <p className="mt-2 text-lg text-slate-600">Explore popular career paths and start your journey</p>
          </div>
          <Link to="/careers" className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 px-5 py-3 text-sm font-bold text-sky-700 transition-all hover:from-sky-100 hover:to-blue-100 hover:shadow-md sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {careers.slice(0, 6).map((career, idx) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <CareerCard career={career} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-sky-100 bg-gradient-to-br from-sky-50/50 via-blue-50/30 to-indigo-50/50">
        <div className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl font-black bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">How It Works</h2>
            <p className="mt-3 text-lg text-slate-600">Three simple steps to navigate your career journey</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="relative group"
              >
                <div className="text-center rounded-3xl border-2 border-sky-100 bg-white p-10 shadow-sm group-hover:shadow-xl transition-all">
                  <motion.div 
                    className="absolute -top-8 left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-xl"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div className="mt-8">
                    <span className="inline-block rounded-full bg-gradient-to-r ${step.color} px-4 py-1 text-xs font-bold text-white mb-4">Step {i + 1}</span>
                    <h3 className="font-heading text-xl font-black text-slate-900">{step.title}</h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-sky-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <motion.div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 p-12 text-center shadow-2xl lg:p-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="inline-block h-12 w-12 text-yellow-300 mb-4" />
              <h2 className="font-heading text-4xl font-black text-white sm:text-5xl">
                Ready to Navigate Your Future?
              </h2>
              <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of professionals mapping their career paths. Start your journey today — completely free.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                className="h-14 rounded-2xl px-10 bg-white text-blue-600 hover:bg-blue-50 shadow-xl font-bold text-lg group" 
                asChild
              >
                <Link to="/explore/frontend-developer">
                  Start Exploring Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 rounded-2xl px-10 border-2 border-white text-white hover:bg-white/10 font-bold text-lg" 
                asChild
              >
                <Link to="/careers">
                  Browse Careers
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
