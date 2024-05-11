import { baseUrl } from "@/utils/constants";

// This function will be used to fetch all tickets but it is not implemented in the backend yet
export const fetchAllTicket = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/loan-ticket`, {
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

// Fetch ticket by id
export const fetchTicketById = async (ticketId) => {
  try {
    const response = await fetch(`${baseUrl}/api/loan-ticket/${ticketId}`, {
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

// fetch ticket by user id who created the ticket but it is not implemented in the backend yet
export const fetchTicketByUserId = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/api/loan-ticket/user/${userId}`, {
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

export const fetchAllTicketsByUserId = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/api/loan-ticket/user/${userId}`, {
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
