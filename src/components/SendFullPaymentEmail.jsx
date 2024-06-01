"use client";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { sendFullPaidEmail } from "@/actions/email.action";
import { useRouter } from "next/navigation";

export default function SendFullPaymentEmail({ ticket }) {
  const [message, setMessage] = useState("");

  const router = useRouter();

  // Extracting the required data from the ticket
  const borrowerEmail = ticket?.borrowerContactDetails?.borrowerEmail;
  const borrowerName = ticket?.borrowerName;
  const ticketId = ticket?._id;
  const lenderEmail = ticket?.lender?.email;

  // console.log(ticket);
  // console.log(borrowerEmail, borrowerName, ticketId, lenderEmail);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending Email...");
    try {
      const res = await fetch(
        `/api/loan-ticket/${ticketId}/send-reminder-true`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            reminderSent: true,
          }),
        }
      );
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      await sendFullPaidEmail({
        borrowerEmail,
        borrowerName,
        ticketId,
        lenderEmail,
        message,
      });
      toast.success("Email sent successfully", { id: toastId });
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      router.refresh();
      setMessage("");
    }
  };

  return (
    <>
      <div className="mt-5 mb-2">
        <Textarea
          placeholder="Enter your message here i.e. Thank you for paying the full amount."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button onClick={handleSubmit}>Mail Full Payment</Button>
      </div>
    </>
  );
}
