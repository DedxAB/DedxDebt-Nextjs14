"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { sendApologyMail } from "@/actions/email.action";

export default function ApologyForm({ ticket }) {
  const [apologyMessage, setApologyMessage] = useState("");

  const borrowerName = ticket?.borrowerName;
  const borrowerEmail = ticket?.borrowerContactDetails?.borrowerEmail;

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending mail...");
    try {
      // Send mail to the borrower
      await sendApologyMail({
        borrowerName,
        borrowerEmail,
        apologyMessage,
      });
      toast.success("Mail sent successfully", { id: toastId });
    } catch (error) {
      toast.error("Error sending mail", { id: toastId });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            value={ticket?.borrowerName}
            name="borrowerName"
            disabled
          />
        </div>
        <div className="flex flex-col gap-3">
          <Input
            type="email"
            name="borrowerEmail"
            value={ticket?.borrowerContactDetails?.borrowerEmail}
            disabled
          />
        </div>
      </div>
      <>
        <Textarea
          id="message"
          rows="5"
          placeholder="Leave a message for the borrower... (Optional)"
          value={apologyMessage}
          onChange={(e) => setApologyMessage(e.target.value)}
        />
      </>
      <>
        <h1 className="my-2">
          <span className="font-semibold text-primary">Note : </span>Make sure
          to update the borrower mail after this action.
        </h1>
      </>
      <div className="flex items-center justify-end my-3">
        <Button onClick={handleSubmitForm}>Send Mail</Button>
      </div>
    </>
  );
}
