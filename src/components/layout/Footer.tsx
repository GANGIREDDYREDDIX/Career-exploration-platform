import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">Pathwise</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Discover your career path. Explore skills, courses, and certifications to reach your goals.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">All Careers</Link></li>
            <li><Link to="/" className="hover:text-foreground">Categories</Link></li>
            <li><Link to="/" className="hover:text-foreground">Skills</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Courses</Link></li>
            <li><Link to="/" className="hover:text-foreground">Certifications</Link></li>
            <li><Link to="/" className="hover:text-foreground">Articles</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">About</Link></li>
            <li><Link to="/" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/" className="hover:text-foreground">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pathwise. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
