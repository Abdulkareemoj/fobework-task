import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { LoginUserAction } from "./auth-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { ZodErrors } from "~/components/ZodErrors";

export default function SignIn() {
  const [formState, setFormState] = useState({
    zodErrors: null,
    strapiErrors: null,
    data: null,
    message: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newState = await LoginUserAction(formState, formData, navigate);
    setFormState(newState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email or Username</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Enter your email or username"
                required
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between w-full">
              <Link to="/forgot-password" className="hover:text-primary">
                Forgot Password?
              </Link>
              <Link to="/signup" className="hover:text-primary">
                Don&apos;t have an account?
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
