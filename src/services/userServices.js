import { baseUrl } from "@/utils/constants";

export const fetchUserByClerkId = async (clerkId) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/clerk/${clerkId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    return response.json();
  } catch (error) {
    console.log(`${error.message} from fetchUserByClerkId \n`);
  }
};

export const fetchUserPaymentMode = async (lenderId) => {
  try {
    const response = await fetch(`${baseUrl}/api/payment-mode/${lenderId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    return response.json();
  } catch (error) {
    console.log(`${error} from fetchUserPaymentMode\n`);
  }
};
