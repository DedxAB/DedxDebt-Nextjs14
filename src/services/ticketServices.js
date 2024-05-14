import { baseUrl } from "@/utils/constants";

export const fetchAllTicketsByUserId = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/api/loan-ticket/user/${userId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    return response.json();
  } catch (error) {
    console.log(error.message + " from fetchAllTicketsByUserId\n");
  }
};
