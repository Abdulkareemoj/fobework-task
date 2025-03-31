import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import { LogoutAction } from "../pages/auth/auth-actions";
import { ArrowRight, LogOut } from "lucide-react";
import { getUser } from "../pages/auth/getUser";
import { Link, useNavigate } from "react-router";

const LoginBtn = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(); // Fetch user logic
      setUser(userData);
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    setUser(null);
    LogoutAction();
    navigate("/auth/signin");
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/support">Support</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Logout <LogOut className="ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>Sign In to make an Appointment</span>
      <ArrowRight />
      <Button variant="outline">
        <Link to="/signin">Sign in</Link>
      </Button>
    </div>
  );
};

export default LoginBtn;
