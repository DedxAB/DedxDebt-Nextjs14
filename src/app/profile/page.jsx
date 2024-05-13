import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  fetchUserByClerkId,
  fetchUserPaymentMode,
} from "@/services/userServices";
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

  // this data comes from mongoDB and clerk
  const userInfo = {
    name: userData?.name || user?.fullName,
    email: userData?.email || user?.emailAddresses[0].emailAddress,
    phoneNumber: userData?.phoneNumber,
    username: userData?.username,
    image: userData?.image || user?.imageUrl,
    address: userData?.address,
  };

  // user payment mode
  const userPaymentMode = await fetchUserPaymentMode(userData?._id);
  const paymentMode = userPaymentMode?.data ? userPaymentMode?.data : null;

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
      <div>
        <h2>Your Payment Mode</h2>
        <p>UPI ID : {paymentMode?.paymentMethod?.upiId}</p>
        <p>UPI Number : {paymentMode?.paymentMethod?.upiNumber}</p>
        <p>
          Bank Account :{" "}
          {paymentMode?.paymentMethod?.bankAccount?.accountNumber}
        </p>
        <p>IFSC : {paymentMode?.paymentMethod?.bankAccount?.ifsc}</p>
      </div>
      <div>
        <Link href={"/payment-mode"}>
          <Button variant="outline">Update Payment Mode</Button>
        </Link>
      </div>
    </div>
  );
}
