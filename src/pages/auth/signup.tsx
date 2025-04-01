import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { registerUserService } from "./auth-service";
import { SignUpFormValues, signUpSchema } from "~/lib/schemas";

export default function SignUp() {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: SignUpFormValues) {
    try {
      setServerError(null);
      const response = await registerUserService(values);

      // If successful, store the token and navigate
      if (response && response.jwt) {
        localStorage.setItem("token", response.jwt);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      }
    } catch (error: any) {
      // Handle API errors
      if (error.response?.data?.error) {
        setServerError(error.response.data.error.message);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {serverError && (
                <div className="text-sm font-medium text-destructive text-center">
                  {serverError}
                </div>
              )}

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
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
          </form>
        </Form>
      </Card>
    </div>
  );
}
