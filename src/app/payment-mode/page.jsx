import LenderPaymentMode from "@/components/LenderPaymentMode";
import {
  fetchUserByClerkId,
  fetchUserPaymentMode,
} from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PaymentMode() {
  const user = await currentUser();

  // Fetch user data by clerk id
  const userData = await fetchUserByClerkId(user?.id);

  const userInfo = userData?.data ? userData?.data : null;

  // Fetch user payment method by lender id (User id)
  const userPaymentMethod = await fetchUserPaymentMode(userInfo?._id);

  const paymentMode = userPaymentMethod?.data
    ? userPaymentMethod?.data
    : null;

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  } 
  return (
    <>
      <h2>Payment Mode</h2>
      <LenderPaymentMode userInfo={userInfo} paymentMode={paymentMode} />
    </>
  );
}
