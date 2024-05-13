"use client";

import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function LoanTicketForm({ lenderId, currentUserData }) {
  const [paybackStatus, setPaybackStatus] = useState("pending");
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [borrowerPhoneNumber, setBorrowerPhoneNumber] = useState("");
  const [borrowerAddress, setBorrowerAddress] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanDate, setLoanDate] = useState(Date);
  const [loanReason, setLoanReason] = useState("");
  const [paybackAmount, setPaybackAmount] = useState(0);
  const [paybackDate, setPaybackDate] = useState(Date);

  const router = useRouter();

  const PostLoanTicket = async (e) => {
    e.preventDefault();
    // console.log(loanDate, paybackDate);
    const toastId = toast.loading("Creating Loan Ticket..");
    try {
      const res = await fetch("/api/loan-ticket", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          lender: lenderId,
          borrowerName,
          borrowerAddress,
          borrowerEmail,
          borrowerPhoneNumber,
          loanAmount,
          loanDate,
          loanReason,
          paybackStatus,
          paybackAmount,
          paybackDate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      toast.success("Loan Ticket created successfully", {
        id: toastId,
      });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  };
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="lender">Your Email 🌟</Label>
          <Input
            type="text"
            id="lender"
            name="lender"
            placeholder={currentUserData?.email || "dedxdebt@dedxdebt.com"}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="borrowerName">Borrower Name 🌟</Label>
          <Input
            onChange={(e) => setBorrowerName(e.target.value)}
            value={borrowerName}
            type="text"
            placeholder="Enter borrower name"
            id="borrowerName"
            autoComplete="off"
            name="borrowerName"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Borrower Email 🌟</Label>
          <Input
            onChange={(e) => setBorrowerEmail(e.target.value)}
            value={borrowerEmail}
            type="email"
            placeholder="Enter borrower email"
            id="email"
            autoComplete="off"
            name="borrowerEmail"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phoneNumber">Borrower Phone Number</Label>
          <Input
            onChange={(e) => setBorrowerPhoneNumber(e.target.value)}
            value={borrowerPhoneNumber}
            type="text"
            placeholder="Enter borrower phone number (optional)"
            id="phoneNumber"
            autoComplete="off"
            name="borrowerPhoneNumber"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="address">Borrower Address</Label>
          <Textarea
            onChange={(e) => setBorrowerAddress(e.target.value)}
            value={borrowerAddress}
            placeholder="Enter borrower address (optional)"
            id="address"
            autoComplete="off"
            name="borrowerAddress"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="loanAmount">Loan Amount 🌟</Label>
          <Input
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            value={loanAmount}
            type="number"
            placeholder="Enter loan amount"
            id="loanAmount"
            autoComplete="off"
            name="loanAmount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Loan Date 🌟</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal",
                  !loanDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {loanDate ? format(loanDate, "PPPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={loanDate}
                onSelect={setLoanDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="loanReason">Loan Reason</Label>
          <Textarea
            onChange={(e) => setLoanReason(e.target.value)}
            value={loanReason}
            placeholder="Enter loan reason (optional)"
            id="loanReason"
            autoComplete="off"
            name="loanReason"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="paymentAmount">Payback Amount</Label>
          <Input
            onChange={(e) => setPaybackAmount(Number(e.target.value))}
            value={paybackAmount}
            type="number"
            placeholder="Enter payment amount (optional)"
            id="paymentAmount"
            autoComplete="off"
            name="paymentAmount"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Payback Status 🌟</Label>
          <Select
            onValueChange={(newValue) => setPaybackStatus(newValue)}
            defaultValue={paybackStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Share with" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="pending" className={`cursor-pointer`}>
                  👨‍🎤&nbsp;Pending
                </SelectItem>
                <SelectItem value="partiallyPaid" className={`cursor-pointer`}>
                  💳&nbsp;Partially Paid
                </SelectItem>
                <SelectItem value="paid" className={`cursor-pointer`}>
                  💰&nbsp;Paid
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Payback Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal",
                  !paybackDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {paybackDate ? (
                  format(paybackDate, "PPPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={paybackDate}
                onSelect={setPaybackDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-2">
        <p className="text-gray-500 text-sm">
          You can add more payback details later.
        </p>
      </div>

      <div className="">
        <p>
          Before you create a loan ticket, make sure you have the
          borrower&apos;s consent to share their contact details with us.
        </p>
      </div>
      <div className="mt-5 mb-28">
        <Button
          onClick={PostLoanTicket}
          className="bg-primary text-white font-bold"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}