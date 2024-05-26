import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full my-14 flex items-center justify-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
