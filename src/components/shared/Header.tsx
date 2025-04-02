import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/theme-toggle";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link to="/">
          {" "}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Task Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-primary">Task</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="#features"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            to="#demo"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Demo
          </Link>
          <Link
            to="#testimonials"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            to="#pricing"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild>
            <Link to="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
