import axios from "axios";

const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;

if (!baseUrl) {
  throw new Error("STRAPI_BASE_URL is not defined");
}

export async function registerUserService(userData) {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await axios.post(url.href, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Registration Service Error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}

export async function loginUserService(userData) {
  const url = new URL("/api/auth/local", baseUrl);
  console.log(`Login URL: ${url.href}`);
  try {
    const response = await axios.post(url.href, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Login Response:", response.data); // Log the response data
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Login Service Error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}

export async function forgotPasswordService(email) {
  const url = new URL("/api/auth/forgot-password", baseUrl);

  try {
    const response = await axios.post(
      url.href,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Forgot Password Service Error:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}
