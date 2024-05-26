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
  // console.log(userData);

  // this data comes from mongoDB and this is the payment mode data
  const paymentMode = userData?.paymentModes?.paymentMethod;

  // this data comes from mongoDB and clerk
  const userInfo = {
    name: userData?.name || user?.fullName,
    email: userData?.email || user?.emailAddresses[0].emailAddress,
    phoneNumber: userData?.phoneNumber,
    username: userData?.username,
    image: userData?.image || user?.imageUrl,
    address: userData?.address,
  };

  // console.log(userData);

  let shortName = userInfo?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="">
      <div>
        <h2>Profile</h2>
        <p>View and edit your profile</p>
      </div>
      <div className="border rounded-md px-4 py-2 my-3">
        <>
          <Avatar>
            <AvatarImage src={userInfo?.image} alt={userInfo?.name} />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </>
        <>
          <p>Name: {userInfo?.name}</p>
          <p>Email: {userInfo?.email}</p>
          <p>Phone: {userInfo?.phoneNumber}</p>
          <p>Username: {userInfo?.username}</p>
          <p>Address: {userInfo?.address}</p>
        </>
      </div>
      <div className="my-3 flex justify-end items-center">
        <Link href={"/profile/edit"}>
          <Button>Edit Profile</Button>
        </Link>
      </div>

      {!paymentMode ? (
        <>
          <div className="border rounded-md px-4 py-2">
            <p>No Payment Mode Added. Add Payment Mode to create a ticket.</p>
          </div>
        </>
      ) : (
        <div className="border rounded-md px-4 py-2">
          {paymentMode?.upiId && <div>UPI ID: {paymentMode?.upiId}</div>}
          {paymentMode?.upiNumber && (
            <div>UPI Number: {paymentMode?.upiNumber}</div>
          )}

          {/* Account number is Main here  */}
          {paymentMode?.bankAccount?.accountNumber && (
            <div className="border rounded-md px-4 py-1 my-1">
              {paymentMode?.bankAccount?.bankName && (
                <div>Bank Name: {paymentMode?.bankAccount.bankName}</div>
              )}
              {paymentMode?.bankAccount?.accountNumber && (
                <div>
                  Account Number: {paymentMode?.bankAccount.accountNumber}
                </div>
              )}
              {paymentMode?.bankAccount?.ifsc && (
                <div>IFSC: {paymentMode?.bankAccount.ifsc}</div>
              )}
              {paymentMode?.bankAccount?.accountHolderName && (
                <div>
                  Account Holder Name:{" "}
                  {paymentMode?.bankAccount.accountHolderName}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <div className="my-3 flex justify-end items-center">
        <Link href={"/payment-mode"}>
          <Button>Update Payment Mode</Button>
        </Link>
      </div>
    </div>
  );
}
