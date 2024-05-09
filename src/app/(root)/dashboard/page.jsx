import { currentUser } from "@clerk/nextjs/server";

export default async function page() {
  const user = await currentUser();
  // console.log(user?.id);  
  return <div>page</div>;
}
