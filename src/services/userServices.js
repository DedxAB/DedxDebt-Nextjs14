import { baseUrl } from "@/utils/constants";

export const fetchUserByClerkId = async (clerkId) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/clerk/${clerkId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};
