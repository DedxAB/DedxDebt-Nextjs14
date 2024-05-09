import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();

  const data = await fetchUserByClerkId(user?.id);
  let currentUserData = data?.data ? data.data : null;

  if (!currentUserData?.onborded) {
    redirect("/onboarding");
  }

  return <div>Create Ticket</div>;
}
