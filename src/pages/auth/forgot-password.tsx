import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { ForgotPasswordAction } from "./auth-actions";
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

export default function ForgotPassword() {
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
    // Replace this with your actual forgot password action
    const newState = await ForgotPasswordAction(formState, formData, navigate);
    setFormState(newState);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
              <ZodErrors error={formState?.zodErrors?.email} />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              to="/signin"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Remember your password? Sign In
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
