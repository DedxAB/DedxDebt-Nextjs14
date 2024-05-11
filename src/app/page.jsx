import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/onboarding");
  }
  return (
    <div className="flex items-center gap-5">
      <h1>Hello, world!</h1>
    </div>
  );
}
