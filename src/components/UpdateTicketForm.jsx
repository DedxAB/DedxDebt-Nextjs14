"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { format } from "date-fns";
import dayjs from "dayjs";

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

  // Only these field values can be updated
  const [newBorrowerAddress, setNewBorrowerAddress] = useState(borrowerAddress);
  const [newLoanAmount, setNewLoanAmount] = useState(loanAmount);
  const [newLoanReason, setNewLoanReason] = useState(loanReason);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-5">
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
        <Label htmlFor="loanAmount">Borrowed Amount</Label>
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="loanReason">Reason</Label>
        <Textarea
          id="loanReason"
          value={newLoanReason}
          placeholder="Loan reason (Optional)"
          onChange={(e) => setNewLoanReason(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="loanDate">Loan Date</Label>
        <Input
          id="loanDate"
          value={dayjs(loanDate).format("MMM DD, YYYY")}
          disabled
        />
      </div>
    </div>
  );
}
