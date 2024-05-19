"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function UpdateTicketForm({ ticket }) {
  const lenderName = ticket?.lender?.name;
  const lenderEmail = ticket?.lender?.email;
  const borrowerName = ticket?.borrowerName;
  const borrowerAddress = ticket?.borrowerAddress;
  const borrowerEmail = ticket?.borrowerContactDetails?.borrowerEmail;
  const borrowerPhoneNumber =
    ticket?.borrowerContactDetails?.borrowerPhoneNumber;
  const loanAmount = ticket?.loanAmount;
  const loanReason = ticket?.loanReason;
  const loanDate = ticket?.loanDate;

  const router = useRouter();

  // Only these field values can be updated
  const [newBorrowerName, setNewBorrowerName] = useState(borrowerName);
  const [newBorrowerAddress, setNewBorrowerAddress] = useState(borrowerAddress);
  const [newBorrowerEmail, setNewBorrowerEmail] = useState(borrowerEmail);
  const [confirmBorrowerEmail, setConfirmBorrowerEmail] = useState("");
  const [newBorrowerPhoneNumber, setNewBorrowerPhoneNumber] =
    useState(borrowerPhoneNumber);
  const [newLoanAmount, setNewLoanAmount] = useState(loanAmount);
  const [newLoanDate, setNewLoanDate] = useState(loanDate);
  const [newLoanReason, setNewLoanReason] = useState(loanReason);

  // Function to handle the form submission
  const handleSubmitUpdateForm = async (e) => {
    e.preventDefault();

    if (newBorrowerEmail !== confirmBorrowerEmail) {
      return toast.error("Emails do not match");
    }

    const toastId = toast.loading("Updating ticket...");

    // Call the API to update the ticket
    try {
      const res = await fetch(`/api/loan-ticket/${ticket?._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          borrowerName: newBorrowerName,
          borrowerEmail: newBorrowerEmail,
          borrowerAddress: newBorrowerAddress,
          borrowerPhoneNumber: newBorrowerPhoneNumber,
          loanAmount: newLoanAmount,
          loanDate: newLoanDate,
          loanReason: newLoanReason,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.success("Ticket updated successfully", { id: toastId });
      router.push(`/ticket/${ticket?._id}/details`);
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
        <div className="flex flex-col gap-3">
          <Label htmlFor="lenderName">Your Name</Label>
          <Input id="lenderName" value={lenderName} disabled />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="lenderEmail">Your Email</Label>
          <Input id="lenderEmail" value={lenderEmail} disabled />
        </div>
        <div>
          <p>
            <span className="font-semibold text-primary">Note :</span> If you
            want to update your name then visit the profile section.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="borrowerName">Borrower Name</Label>
          <Input
            id="borrowerName"
            value={newBorrowerName}
            placeholder="Enter the new name"
            onChange={(e) => setNewBorrowerName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="borrowerEmail">Borrower Email</Label>
          <Input
            id="borrowerEmail"
            value={newBorrowerEmail}
            placeholder="Enter the new email"
            onChange={(e) => setNewBorrowerEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirmBorrowerEmail">Confirm Email</Label>
          <Input
            id="confirmBorrowerEmail"
            value={confirmBorrowerEmail}
            placeholder="Enter the same email to confirm"
            onChange={(e) => setConfirmBorrowerEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="borrowerAddress">Borrower Address</Label>
          <Textarea
            id="borrowerAddress"
            value={newBorrowerAddress}
            placeholder="Enter the new address (Optional)"
            onChange={(e) => setNewBorrowerAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="borrowerPhoneNumber">Borrower Phone Number</Label>
          <Input
            id="borrowerPhoneNumber"
            value={newBorrowerPhoneNumber}
            onChange={(e) => setNewBorrowerPhoneNumber(e.target.value)}
            placeholder="Phone number (Optional)"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="loanAmount">₹Amount</Label>
          <Input
            id="loanAmount"
            value={newLoanAmount}
            type="number"
            onChange={(e) =>
              setNewLoanAmount(e.target.value && parseInt(e.target.value))
            }
            className="font-semibold"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="loanReason">Reason</Label>
          <Textarea
            id="loanReason"
            value={newLoanReason}
            placeholder="Reason (Optional)"
            onChange={(e) => setNewLoanReason(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Borrowed Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal",
                  !newLoanDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newLoanDate ? (
                  dayjs(newLoanDate).format("MMM DD, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newLoanDate}
                onSelect={setNewLoanDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmitUpdateForm}>Update Ticket</Button>
      </div>
    </>
  );
}
