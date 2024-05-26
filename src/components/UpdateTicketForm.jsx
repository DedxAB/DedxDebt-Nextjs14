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
import { Checkbox } from "./ui/checkbox";
import { sendUpdatedTicketEmail } from "@/actions/email.action";

export default function UpdateTicketForm({ ticket, currentUserData }) {
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
  const [isChecked, setIsChecked] = useState(false);
  const [customEmailMessage, setCustomEmailMessage] = useState("");
  const [isUpiIdChecked, setIsUpiIdChecked] = useState(false);
  const [isUpiNumberChecked, setIsUpiNumberChecked] = useState(false);
  const [isBankAccountChecked, setIsBankAccountChecked] = useState(false);
  const [isContactNumberChecked, setIsContactNumberChecked] = useState(false);

  // Payment mode
  const paymentMode = currentUserData?.paymentModes?.paymentMethod;

  const upiId = paymentMode?.upiId;
  const upiNumber = paymentMode?.upiNumber;
  const bankAccount = paymentMode?.bankAccount;

  // lender contact number
  const contactNumber = currentUserData?.phoneNumber;

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

  // Function to handle the form submission
  const handleSubmitUpdateForm = async (e) => {
    e.preventDefault();

    // Check if the borrower email is valid
    if (newBorrowerEmail !== confirmBorrowerEmail) {
      return toast.error("Emails do not match");
    }

    // Check if any payment mode is selected
    if (!isUpiIdChecked && !isUpiNumberChecked && !isBankAccountChecked) {
      toast.error("Please select a payment mode");
      return;
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

      const lenderPhoneNumber = isContactNumberChecked
        ? currentUserData?.phoneNumber
        : "";

      // Now send an email to the borrower if the checkbox is checked
      if (isChecked) {
        const toastId2 = toast.loading("Sending email to the borrower...");
        await sendUpdatedTicketEmail({
          lenderName,
          lenderEmail,
          lenderPhoneNumber,
          borrowerName: newBorrowerName,
          borrowerEmail: newBorrowerEmail,
          loanAmount: newLoanAmount,
          loanReason: newLoanReason,
          loanDate: newLoanDate,
          customEmailMessage,
          paymentMethod,
          ticketId: ticket?._id,
        });
        toast.success("Email sent to the borrower", { id: toastId2 });
      }

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
      <div className="my-4">
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
      </div>
      <div className="my-4">
        <p className="my-3">
          <span className="font-semibold text-primary">Note :</span> Every
          updates will be notified to the borrower via email.
        </p>

        <div className="my-3 space-x-2 flex items-center">
          <Checkbox
            id="notifyBorrower"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked)}
          />
          <Label htmlFor="notifyBorrower" className="font-normal text-base">
            Notify the borrower via email.
          </Label>
        </div>

        <Textarea
          placeholder="Add a message to the borrower which will be sent along with the mail (Optional)."
          value={customEmailMessage}
          onChange={(e) => setCustomEmailMessage(e.target.value)}
          disabled={!isChecked}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmitUpdateForm} disabled={!paymentMode}>
          Update Ticket
        </Button>
      </div>
    </>
  );
}
