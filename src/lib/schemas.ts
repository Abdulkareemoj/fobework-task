import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  identifier: z.string().min(1, {
    message: "Email or username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
