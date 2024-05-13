"use client";
import { sendEmail } from "@/actions/email.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SendEmail() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    // console.log(email);
    const borrowerName = "xed aab";
    const text = "Email from DedxDebt";
    //   const
    await sendEmail(email, borrowerName, text);
    toast.success("Email sent successfully");
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" name="email" />
    </form>
  );
}
