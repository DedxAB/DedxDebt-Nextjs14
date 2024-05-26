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
import { sendEmail } from "@/actions/email.action";
import dayjs from "dayjs";
import { Checkbox } from "./ui/checkbox";

export default function LoanTicketForm({ lenderId, currentUserData }) {
  const [paybackStatus, setPaybackStatus] = useState("pending");
  const [borrowerName, setBorrowerName] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [borrowerPhoneNumber, setBorrowerPhoneNumber] = useState("");
  const [borrowerAddress, setBorrowerAddress] = useState("");
  const [loanAmount, setLoanAmount] = useState(1);
  const [loanDate, setLoanDate] = useState(new Date());
  const [loanReason, setLoanReason] = useState("");
  const [paybackAmount, setPaybackAmount] = useState(0);
  const [paybackDate, setPaybackDate] = useState(new Date());

  const [isUpiIdChecked, setIsUpiIdChecked] = useState(false);
  const [isUpiNumberChecked, setIsUpiNumberChecked] = useState(false);
  const [isBankAccountChecked, setIsBankAccountChecked] = useState(false);
  const [isContactNumberChecked, setIsContactNumberChecked] = useState(false);

  const router = useRouter();

  const paymentMode = currentUserData?.paymentModes?.paymentMethod;
  const contactNumber = currentUserData?.phoneNumber;

  const upiId = paymentMode?.upiId;
  const upiNumber = paymentMode?.upiNumber;
  const bankAccount = paymentMode?.bankAccount;

  // Create payment method object to add the selected payment mode and send it to the borrower email
  const paymentMethod = {};
  if (isUpiIdChecked) {
    paymentMethod.upiId = upiId;
  }
  if (isUpiNumberChecked) {
    paymentMethod.upiNumber = upiNumber;
  }
  if (isBankAccountChecked) {
    paymentMethod.bankAccount = bankAccount;
  }

  // console.log(currentUserData);

  const postLoanTicket = async (e) => {
    e.preventDefault();

    // check if borrower email and confirm email are the same
    if (borrowerEmail !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }
    // atleast one payment mode should be selected
    if (!isUpiIdChecked && !isUpiNumberChecked && !isBankAccountChecked) {
      toast.error("Please select a payment mode");
      return;
    }

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
      const data = await res.json();
      const ticketId = data?.data?._id;
      // console.log(ticketId);
      toast.success("Loan Ticket created successfully", {
        id: toastId,
      });

      const toastId2 = toast.loading("Sending email to borrower..");
      // send email to borrower
      const lenderName = currentUserData?.name;
      const lenderEmail = currentUserData?.email;

      const lenderPhoneNumber = isContactNumberChecked
        ? currentUserData?.phoneNumber
        : "";
      await sendEmail({
        lenderName,
        lenderEmail,
        lenderPhoneNumber,
        borrowerName,
        borrowerEmail,
        loanAmount,
        loanDate,
        loanReason,
        paymentMethod,
        ticketId,
      });

      toast.success("Email sent to borrower", {
        id: toastId2,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-3">
          <Label htmlFor="lender">Your Email</Label>
          <Input
            type="text"
            id="lender"
            name="lender"
            placeholder={currentUserData?.email || "dedxdebt@dedxdebt.com"}
            disabled
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="borrowerName">Borrower Name</Label>
          <Input
            onChange={(e) => setBorrowerName(e.target.value)}
            value={borrowerName}
            type="text"
            placeholder="Enter borrower name"
            id="borrowerName"
            name="borrowerName"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Borrower Email</Label>
          <Input
            onChange={(e) => setBorrowerEmail(e.target.value)}
            value={borrowerEmail}
            type="email"
            placeholder="Enter borrower email"
            id="email"
            name="borrowerEmail"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirmEmail">Confirm Email</Label>
          <Input
            onChange={(e) => setConfirmEmail(e.target.value)}
            value={confirmEmail}
            type="email"
            placeholder="Enter same email to confirm"
            id="confirmEmail"
            autoComplete="off"
            name="confirmEmail"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="phoneNumber">Borrower Phone Number</Label>
          <Input
            onChange={(e) => setBorrowerPhoneNumber(e.target.value)}
            value={borrowerPhoneNumber}
            type="text"
            placeholder="Phone No. (optional)"
            id="phoneNumber"
            name="borrowerPhoneNumber"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="address">Borrower Address</Label>
          <Textarea
            onChange={(e) => setBorrowerAddress(e.target.value)}
            value={borrowerAddress}
            placeholder="Address (optional)"
            id="address"
            name="borrowerAddress"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="loanAmount">₹Amount</Label>
          <Input
            onChange={(e) =>
              setLoanAmount(e.target.value && parseInt(e.target.value))
            }
            value={loanAmount}
            type="number"
            placeholder="Enter loan amount"
            id="loanAmount"
            autoComplete="off"
            name="loanAmount"
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
                  !loanDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {loanDate ? (
                  dayjs(loanDate).format("MMM DD, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
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
        <div className="flex flex-col gap-3">
          <Label htmlFor="loanReason">Reason</Label>
          <Textarea
            onChange={(e) => setLoanReason(e.target.value)}
            value={loanReason}
            placeholder="(optional)"
            id="loanReason"
            autoComplete="off"
            name="loanReason"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="paymentAmount">Return Amount</Label>
          <Input
            onChange={(e) =>
              setPaybackAmount(e.target.value && parseInt(e.target.value))
            }
            value={paybackAmount}
            type="number"
            placeholder="Enter return amount (optional)"
            id="paymentAmount"
            autoComplete="off"
            name="paymentAmount"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Return Amount Date</Label>
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
                  dayjs(paybackDate).format("MMM DD, YYYY")
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
        <div className="flex flex-col gap-3">
          <Label>Return Amount Status</Label>
          <Select
            onValueChange={(newValue) => setPaybackStatus(newValue)}
            // defaultValue={paybackStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Amount Back Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Amount Return Status</SelectLabel>
                <SelectItem value="pending" className={`cursor-pointer`}>
                  Pending
                </SelectItem>
                <SelectItem value="partiallyPaid" className={`cursor-pointer`}>
                  Partially Paid
                </SelectItem>
                <SelectItem value="paid" className={`cursor-pointer`}>
                  Fully Paid
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <p className="text-gray-500 text-sm">
          You can add more return details later.
        </p>
      </div>

      <div>
        <p>
          Before you create a loan ticket, make sure you have the
          borrower&apos;s consent to share their contact details with us.
        </p>
        <p className="my-3">
          <span className="font-semibold text-primary">Note : </span>
          Please verify the borrower&apos;s email address cause we will send an
          email to the borrower with the debt details.
        </p>
      </div>

      <>
        <h2 className="text-primary font-semibold">Payment Mode:</h2>
        {paymentMode ? (
          <p>Select the payment mode you want to share with the borrower</p>
        ) : (
          <p>
            You have not added any payment mode yet. Please add a payment mode
            in profile to proceed.
          </p>
        )}
        {paymentMode && (
          <div className="border rounded-md px-4 py-2 my-3">
            {upiId && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="upiId"
                  checked={isUpiIdChecked}
                  onCheckedChange={(checked) => setIsUpiIdChecked(checked)}
                />
                <Label htmlFor="upiId" className="font-normal text-base">
                  {upiId} <span className="text-primary">(UPI id)</span>
                </Label>
              </div>
            )}
            {upiNumber && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="upiNumber"
                    checked={isUpiNumberChecked}
                    onCheckedChange={(checked) =>
                      setIsUpiNumberChecked(checked)
                    }
                  />
                  <Label htmlFor="upiNumber" className="font-normal text-base">
                    {upiNumber}{" "}
                    <span className="text-primary">(UPI number)</span>
                  </Label>
                </div>
              </>
            )}

            {/* Account number is Main here  */}
            {bankAccount?.accountNumber && (
              <div className="flex items-start space-x-2 my-1">
                <Checkbox
                  id="accountNumber"
                  checked={isBankAccountChecked}
                  onCheckedChange={(checked) =>
                    setIsBankAccountChecked(checked)
                  }
                />
                <div className="border rounded-md px-4 py-1">
                  {bankAccount?.bankName && (
                    <div>Bank Name: {bankAccount.bankName}</div>
                  )}
                  {bankAccount?.accountNumber && (
                    <div>Account Number: {bankAccount.accountNumber}</div>
                  )}
                  {bankAccount?.ifsc && <div>IFSC: {bankAccount.ifsc}</div>}
                  {bankAccount?.accountHolderName && (
                    <div>
                      Account Holder Name: {bankAccount.accountHolderName}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <>
          {contactNumber ? (
            <>
              <h2>Want to send your number as contact details?</h2>
              <div className="flex items-center space-x-2 border rounded-md px-4 py-1 my-1">
                <Checkbox
                  id="sendNumber"
                  checked={isContactNumberChecked}
                  onCheckedChange={(checked) =>
                    setIsContactNumberChecked(checked)
                  }
                />
                <Label htmlFor="sendNumber" className="font-normal text-base">
                  {contactNumber}
                </Label>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-semibold">
                Want to send your number as contact details?
              </h2>
              <p>You can add a contact number in profile.</p>
            </>
          )}
        </>
      </>

      <div className="flex items-center justify-end mt-5 mb-28">
        <Button onClick={postLoanTicket} disabled={!paymentMode}>
          Publish
        </Button>
      </div>
    </div>
  );
}
