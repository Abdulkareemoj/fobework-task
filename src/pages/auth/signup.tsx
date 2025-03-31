import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { RegisterUserAction } from "./auth-actions";
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

export default function SignUp() {
  const [formState, setFormState] = useState({
    zodErrors: null,
    data: null,
    message: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newState = await RegisterUserAction(formState, formData, navigate);
    setFormState(newState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        {" "}
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
              />
              <ZodErrors error={formState?.zodErrors?.username} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              to="/signin"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Already have an account? Sign In
            </Link>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
