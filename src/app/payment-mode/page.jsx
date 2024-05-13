import LenderPaymentMode from "@/components/LenderPaymentMode";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PaymentMode() {
  const user = await currentUser();
  const userData = await fetchUserByClerkId(user?.id);
  const userInfo = userData?.data ? userData?.data : "";
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  //   console.log(userInfo);
  return (
    <>
      <h2>Payment Mode</h2>
      <LenderPaymentMode userInfo={userInfo} />
    </>
  );
}
