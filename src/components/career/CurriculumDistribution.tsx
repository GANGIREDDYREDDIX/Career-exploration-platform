import { motion } from "framer-motion";
import { 
  Code, 
  Cpu, 
  BookOpen, 
  Layers, 
  Route, 
  Lightbulb, 
  GraduationCap, 
  Languages, 
  Award,
  Zap,
  FlaskConical,
  Briefcase,
  Users,
  Presentation
} from "lucide-react";

interface CurriculumCard {
  title: string;
  code: string;
  courses: number;
  credits: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

const curriculumData: CurriculumCard[] = [
  { title: "Programming Courses", code: "PROG", courses: 7, credits: 26, color: "from-purple-500 to-purple-600", icon: Code },
  { title: "Technology Courses", code: "TECH", courses: 16, credits: 43, color: "from-slate-700 to-slate-800", icon: Cpu },
  { title: "Basic Science", code: "BSC", courses: 9, credits: 25, color: "from-blue-500 to-blue-600", icon: FlaskConical },
  { title: "Engineering Minor", code: "EM", courses: 6, credits: 18, color: "from-orange-500 to-orange-600", icon: Layers },
  { title: "Pathway Courses", code: "PWE", courses: 4, credits: 13, color: "from-emerald-500 to-emerald-600", icon: Route },
  { title: "Capstone Project", code: "PRJ", courses: 2, credits: 10, color: "from-red-500 to-red-600", icon: Lightbulb },
  { title: "Open Minor", code: "OEM", courses: 4, credits: 9, color: "from-amber-500 to-amber-600", icon: BookOpen },
  { title: "Language Courses", code: "LCS", courses: 2, credits: 6, color: "from-slate-600 to-slate-700", icon: Languages },
  { title: "Department Elective", code: "DE", courses: 2, credits: 5, color: "from-green-500 to-green-600", icon: GraduationCap },
  { title: "Aptitude Elective", code: "EEA", courses: 1, credits: 3, color: "from-purple-600 to-purple-700", icon: Award },
  { title: "Engineering Science", code: "ESC", courses: 1, credits: 3, color: "from-teal-500 to-teal-600", icon: Zap },
  { title: "Summer Training", code: "TCS", courses: 1, credits: 3, color: "from-yellow-500 to-yellow-600", icon: Briefcase },
  { title: "Community Project", code: "PRC", courses: 1, credits: 2, color: "from-cyan-500 to-cyan-600", icon: Users },
  { title: "Seminar", code: "SMN", courses: 1, credits: 1, color: "from-gray-500 to-gray-600", icon: Presentation },
];

const CurriculumDistribution = () => {
  const totalCourses = curriculumData.reduce((sum, item) => sum + item.courses, 0);
  const totalCredits = curriculumData.reduce((sum, item) => sum + item.credits, 0);

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-white via-sky-50/30 to-blue-50/30 p-8 shadow-xl md:p-12">
      {/* Background decorations */}
      <motion.div 
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/40 to-blue-200/40 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl font-black bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            B.Tech Curriculum Distribution
          </h2>
          <p className="text-lg text-slate-600 mb-6">Comprehensive breakdown of courses and credits</p>
          
          {/* Summary Stats */}
          <motion.div 
            className="inline-flex items-center gap-8 rounded-2xl border-2 border-sky-200 bg-white px-8 py-4 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <p className="text-3xl font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">{totalCourses}</p>
              <p className="text-sm font-semibold text-slate-600 mt-1">Total Courses</p>
            </div>
            <div className="h-12 w-px bg-sky-200" />
            <div className="text-center">
              <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{totalCredits}</p>
              <p className="text-sm font-semibold text-slate-600 mt-1">Total Credits</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Curriculum Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {curriculumData.map((item, index) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative"
            >
              <motion.div 
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-6 shadow-lg transition-all group-hover:shadow-2xl`}
                whileHover={{ rotate: 1 }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                <motion.div 
                  className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                />

                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="h-6 w-6 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-white mb-2 leading-tight">
                    {item.title}
                  </h3>

                  {/* Code Badge */}
                  <div className="inline-block rounded-lg bg-white/20 px-3 py-1 text-sm font-bold text-white/90 backdrop-blur-sm mb-4">
                    {item.code}
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 text-white/90">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Number of Courses:</span>
                      <span className="font-bold text-lg">{item.courses}</span>
                    </div>
                  </div>

                  {/* Credits - Prominent */}
                  <motion.div 
                    className="mt-4 pt-4 border-t border-white/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-white/80">Credits</span>
                      <span className="text-4xl font-black text-white drop-shadow-lg">
                        {item.credits}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-slate-500 italic">
            * Curriculum structure may vary by specialization and academic year
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CurriculumDistribution;
