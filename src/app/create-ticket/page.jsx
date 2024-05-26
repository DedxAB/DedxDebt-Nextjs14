import LoanTicketForm from "@/components/LoanTicketForm";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();

  // fetch user data from the database
  const data = await fetchUserByClerkId(user?.id);
  let currentUserData = data?.data ? data?.data : null;

  if (!currentUserData?.onboarded) {
    redirect("/onboarding"); // redirect to onboarding page
  }

  const paymentMode = currentUserData?.paymentModes?.paymentMethod;

  if (!paymentMode) {
    redirect("/profile");
  }

  return (
    <div>
      <div>
        <h2>Create a new loan ticket</h2>
        <p>Fill the form below to create a new loan ticket</p>
      </div>
      <div>
        <LoanTicketForm
          lenderId={currentUserData?._id}
          currentUserData={currentUserData}
        />
      </div>
    </div>
  );
}
