import AccountProfileForm from "@/components/AccountProfileForm";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();

  const data = await fetchUserByClerkId(user?.id);
  const currentUserData = data?.data ? data?.data : null;

  // if the user is already onboarded then redirect to dashboard
  if (currentUserData?.onboarded) {
    redirect("/dashboard");
  }
  // this data comes from mongoDB
  const userInfo = {
    name: currentUserData?.name,
    email: currentUserData?.email,
    phoneNumber: currentUserData?.phoneNumber,
    username: currentUserData?.username,
    image: currentUserData?.image,
    address: currentUserData?.address,
  };

  // here we are creating a new object with the data from mongoDB and Clerk
  const userData = {
    clerkId: user?.id,
    name: userInfo?.name || user?.fullName,
    email: userInfo?.email || user?.emailAddresses[0].emailAddress,
    phoneNumber: userInfo?.phoneNumber || "",
    username: userInfo?.username || user?.username || "",
    image: userInfo?.image || user?.imageUrl,
    address: userInfo?.address || "",
  };

  return (
    <>
      <div className="mt-5">
        <h2>Onboarding</h2>
        <p>Complete your profile to continue..</p>
      </div>

      <AccountProfileForm userData={userData} btnText={"Save"} />
    </>
  );
}

/*
      _User {
    id: 'user_2gCHnvxW62eXxyYJE1LLLOif2iI',
    passwordEnabled: false,
    totpEnabled: false,
    backupCodeEnabled: false,
    twoFactorEnabled: false,
    banned: false,
    createdAt: 1715194809090,
    updatedAt: 1715250973342,
    imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ0NIbnZVMEMxMFNEWnA1RlpNODZKTzVBbmgifQ',
    hasImage: true,
    primaryEmailAddressId: 'idn_2gCHnN4D0LD6vFbhkOYtp0Vg0F8',        
    primaryPhoneNumberId: null,
    primaryWeb3WalletId: null,
    lastSignInAt: 1715250973320,
    externalId: null,
    username: null,
    firstName: 'Arnab',
    lastName: 'Bhoumik',
    publicMetadata: {},
    privateMetadata: {},
    unsafeMetadata: {},
    emailAddresses: [
      _EmailAddress {
        id: 'idn_2gCHnN4D0LD6vFbhkOYtp0Vg0F8',
        emailAddress: 'arnab.iguniverse@gmail.com',
        verification: [_Verification],
        linkedTo: [Array]
      }
    ],
    phoneNumbers: [],
    web3Wallets: [],
    externalAccounts: [
      _ExternalAccount {
        id: 'idn_2gCHnPWAqkuiDN591kEsm7Bipkm',
        provider: undefined,
        identificationId: undefined,
        externalId: undefined,
        approvedScopes: 'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
        emailAddress: 'arnab.iguniverse@gmail.com',
        firstName: undefined,
        lastName: undefined,
        imageUrl: '',
        username: '',
        publicMetadata: {},
        label: null,
        verification: [_Verification]
      }
    ],
    lastActiveAt: 1715194809087,
    createOrganizationEnabled: true,
  }

*/
