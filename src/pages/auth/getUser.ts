import axios from "axios";
import { getAuthToken } from "./get-token";

const baseUrl = import.meta.env.VITE_STRAPI_BASE_URL;

if (!baseUrl) {
  throw new Error("STRAPI_BASE_URL is not defined");
}

export async function getUser() {
  const authToken = await getAuthToken();
  if (!authToken) {
    return null;
  }

  try {
    const response = await axios.get(`${baseUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}
