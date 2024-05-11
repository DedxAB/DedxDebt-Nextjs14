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

  // creating a new plain object because the activeUser object has a toJSON method which is not supported in Client Components
  // Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported.
  const userData = {
    clerkId: activeUser?.clerkId,
    name: activeUser?.name,
    email: activeUser?.email,
    phoneNumber: activeUser?.phoneNumber,
    username: activeUser?.username,
    image: activeUser?.image,
    address: activeUser?.address,
  };

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
