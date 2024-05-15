"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";

export default function UpdateTicketForm({ note }) {
  const lenderName = note?.lender?.name;
  const lenderEmail = note?.lender?.email;
  const borrowerName = note?.borrowerName;
  const borrowerAddress = note?.borrowerAddress;
  const borrowerEmail = note?.borrowerContactDetails?.borrowerEmail;
  const borrowerPhoneNumber = note?.borrowerContactDetails?.borrowerPhoneNumber;
  const loanAmount = note?.loanAmount;
  const loanReason = note?.loanReason;
  const loanDate = note?.loanDate;

  // Only these field values can be updated
  const [newBorrowerAddress, setNewBorrowerAddress] = useState(borrowerAddress);
  const [newLoanAmount, setNewLoanAmount] = useState(loanAmount);
  const [newLoanReason, setNewLoanReason] = useState(loanReason);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="lenderName">Your Name</Label>
        <Input id="lenderName" value={lenderName} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lenderEmail">Your Email</Label>
        <Input id="lenderEmail" value={lenderEmail} disabled />
      </div>
      <div>
        <p>
          <span className="font-semibold">Note:</span> If you want to update
          your name then visit the profile section.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="borrowerName">Borrower Name</Label>
        <Input id="borrowerName" value={borrowerName} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="borrowerEmail">Borrower Email</Label>
        <Input id="borrowerEmail" value={borrowerEmail} disabled />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="borrowerAddress">Borrower Address</Label>
        <Textarea
          id="borrowerAddress"
          value={borrowerAddress}
          placeholder="Enter the new address (Optional)"
          onChange={(e) => setNewBorrowerAddress(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="borrowerPhoneNumber">Borrower Phone Number</Label>
        <Input
          id="borrowerPhoneNumber"
          value={borrowerPhoneNumber}
          disabled
          placeholder="Phone number (Optional)"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="loanAmount">Loan Amount</Label>
        <Input
          id="loanAmount"
          value={newLoanAmount}
          type="number"
          onChange={(e) =>
            setNewLoanAmount(e.target.value < 1 ? 1 : Number(e.target.value))
          }
          className="font-semibold"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="loanReason">Loan Reason</Label>
        <Textarea
          id="loanReason"
          value={newLoanReason}
          placeholder="Loan reason (Optional)"
          onChange={(e) => setNewLoanReason(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="loanDate">Loan Date</Label>
        <Input id="loanDate" value={format(loanDate, "PPPP")} disabled />
      </div>
    </div>
  );
}
