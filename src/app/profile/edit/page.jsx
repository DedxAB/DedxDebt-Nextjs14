import AccountProfileForm from "@/components/AccountProfileForm";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditProfile() {
  const user = await currentUser();
  const data = await fetchUserByClerkId(user?.id);
  const activeUser = data?.data ? data?.data : null;

  if (!activeUser?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="">
      <div>
        <h2>Edit Profile</h2>
        <p>Edit your profile here...</p>
      </div>
      <AccountProfileForm userData={activeUser} btnText={"Update"} />
    </div>
  );
}
