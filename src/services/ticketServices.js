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

export const fetchTicketById = async (ticketId) => {
  try {
    const res = await fetch(`${baseUrl}/api/loan-ticket/${ticketId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }
    return res.json();
  } catch (error) {
    console.log(error.message + " from fetchTicketById\n");
  }
};
