import { baseUrl } from "@/utils/constants";

export const fetchAllUser = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/user`, {
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

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/${userId}`, {
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


// This function will be used to fetch a user by email But it is not implemented in the backend yet
export const fetchUserByEmail = async (email) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/email/${email}`, {
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
