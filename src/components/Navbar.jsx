import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { Button } from "./ui/button";
import { SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import ProfileButton from "./ProfileButton";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between w-full">
        <Link href={`/`}>DedxDebt</Link>
        <div className="flex items-center justify-between gap-5">
          <ToggleTheme />
          <SignedOut>
            <Link href={`/sign-in`}>
              <Button>Sign in</Button>
            </Link>
          </SignedOut>
          <div className="items-center hidden sm:flex">
            {user && (
              <div className="flex items-center justify-between gap-4">
                <Link href={`/create-ticket`}>
                  <Button>Create Ticket</Button>
                </Link>
                <ProfileButton
                  userImage={user?.imageUrl}
                  currentUserName={user?.fullName}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
