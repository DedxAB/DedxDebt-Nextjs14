import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function page() {
  // get current user from clerk
  const user = await currentUser();
  if (!user) {
    return null;
  }
  // fetch user data from mongoDB
  const data = await fetchUserByClerkId(user?.id);
  let userData = data?.data ? data?.data : null;

  // this data comes from mongoDB
  const userInfo = {
    name: userData?.name || user?.fullName,
    email: userData?.email || user?.emailAddresses[0].emailAddress,
    phoneNumber: userData?.phoneNumber,
    username: userData?.username,
    image: userData?.image || user?.imageUrl,
    address: userData?.address,
  };

  return (
    <div className="">
      <div>
        <h2>Profile</h2>
        <p>View and edit your profile</p>
      </div>
      <div>
        <Avatar>
          <AvatarImage src={userInfo?.image} alt={userInfo?.name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p>Name: {userInfo?.name}</p>
        <p>Email: {userInfo?.email}</p>
        <p>Phone: {userInfo?.phoneNumber}</p>
        <p>Username: {userInfo?.username}</p>
        <p>Address: {userInfo?.address}</p>
      </div>
      <div>
        <Link href={"/profile/edit"}>
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
}
