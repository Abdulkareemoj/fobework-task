import { useState } from "react";
import { useNavigate, Link } from "react-router";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { loginUser } from "./auth-actions";
import { schemaLogin } from "../../lib/schemas";
import MainLayout from "../layout";

// Infer the type from the schema
type SignInFormValues = z.infer<typeof schemaLogin>;

export default function SignIn() {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: SignInFormValues) {
    setServerError(null);
    const result = await loginUser(values, navigate);

    if (!result.success) {
      setServerError(result.message);
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to sign in to your account
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
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email or username"
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
                          placeholder="Enter your password"
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
                  {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between w-full">
                  <Link
                    to="/auth/forgot-password"
                    className="hover:text-primary"
                  >
                    Forgot Password?
                  </Link>
                  <Link to="/auth/signup" className="hover:text-primary">
                    Don&apos;t have an account?
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
}
