import { currentUser } from "@clerk/nextjs/server";
import ProfileButton from "./ProfileButton";
import Link from "next/link";

export default async function BottomNavbar() {
  const user = await currentUser();
  // console.log(user);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="px-2 py-1 border rounded-full cursor-pointer hover:border-primary">
          <Link href={`/`}>Home</Link>
        </div>
        <div className="px-2 py-1 border rounded-full cursor-pointer hover:border-primary">
          Search
        </div>
        {/* <SignIn> */}
        <div className="px-2 py-1 border rounded-full cursor-pointer hover:border-primary">
          <Link href={`/create-ticket`}>Create Ticket</Link>
        </div>
        {/* </SignIn> */}
        {user && (
          <>
            <div className="cursor-pointer">
              <ProfileButton userImage={user?.imageUrl} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
