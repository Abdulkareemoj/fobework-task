import { useState } from "react";
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
import { Link } from "react-router";
import { forgotPasswordService } from "./auth-service";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "~/lib/schemas";

export default function ForgotPassword() {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({
    type: null,
    message: null,
  });

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      await forgotPasswordService(values.email);
      setStatus({
        type: "success",
        message: "Password reset instructions have been sent to your email.",
      });
      form.reset();
    } catch (error: any) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.error?.message ||
          "An error occurred. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {status.message && (
                <div
                  className={`text-sm font-medium text-center ${
                    status.type === "success"
                      ? "text-green-600"
                      : "text-destructive"
                  }`}
                >
                  {status.message}
                </div>
              )}

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

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
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
        </Form>
      </Card>
    </div>
  );
}
