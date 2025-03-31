import { z } from "zod";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import {
  registerUserService,
  loginUserService,
  forgotPasswordService,
} from "./auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: import.meta.env.VITE_HOST ?? "localhost",
  secure: import.meta.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const RegisterUserAction = (prevState, formData) => {
  const navigate = useNavigate();
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  Cookies.set("jwt", responseData.jwt, config);
  navigate()("/dashboard");
};

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export const LoginUserAction = (prevState, formData) => {
  const navigate = useNavigate();
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  Cookies.set("jwt", responseData.jwt);
  navigate("/dashboard");
};

export const LogoutAction = () => {
  const navigate = useNavigate();
  Cookies.set("jwt", "", { ...config, maxAge: 0 });
  navigate()("/");
};

export const ForgotPasswordAction = (prevState, formData) => {
  const navigate = useNavigate();
  const email = formData.get("email");

  if (!email) {
    return {
      ...prevState,
      zodErrors: { email: ["Please enter a valid email address"] },
      message: "Missing Fields. Failed to Send Reset Link.",
    };
  }
  navigate()("/");
  const responseData = forgotPasswordService(email);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }
};
