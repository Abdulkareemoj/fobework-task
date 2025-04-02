import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/theme-toggle";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src={logo || "/placeholder.svg"}
              alt="Task Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-primary">Task</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
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
          <Button asChild className="hidden md:inline-flex">
            <Link to="/auth/signin">Sign In</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 bg-background border-t">
            <Link
              to="#features"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Features
            </Link>
            <Link
              to="#demo"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Demo
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Testimonials
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <Button asChild className="w-full mt-2">
              <Link to="/auth/signin" onClick={closeMenu}>
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
