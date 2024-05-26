"use client";

import { useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import ReturnAmountCard from "./ReturnAmountCard";
import { Checkbox } from "./ui/checkbox";
import { sendReturnAmountEmail } from "@/actions/email.action";

const UpdateStatusForm = ({ ticket, currentUserData }) => {
  // console.log(ticket);
  // console.log(currentUserData);
  const paybackStatus = ticket?.paybackStatus;
  const paybackAmountArray = ticket?.paymentsBack; // Array of Payback Amounts

  // Calculate the total payback amount
  let totalPaybackAmount = 0;
  paybackAmountArray.forEach((p) => {
    totalPaybackAmount += p.paybackAmount;
  });

  // Calculate the left amount to be paid
  const leftAmount = ticket?.loanAmount - totalPaybackAmount;

  const [newPaybackAmount, setNewPaybackAmount] = useState(0);
  const [newPaybackDate, setNewPaybackDate] = useState(new Date());
  const [newPaybackStatus, setNewPaybackStatus] = useState(paybackStatus);
  const [isUpiIdChecked, setIsUpiIdChecked] = useState(false);
  const [isUpiNumberChecked, setIsUpiNumberChecked] = useState(false);
  const [isBankAccountChecked, setIsBankAccountChecked] = useState(false);
  const [isContactNumberChecked, setIsContactNumberChecked] = useState(false);

  const router = useRouter();

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

  const lenderPhoneNumber = isContactNumberChecked
    ? currentUserData?.phoneNumber
    : "";

  const handleUpdatePayback = async (e) => {
    e.preventDefault();

    // Update the payback status
    const toastId = toast.loading("Updating return status...");
    try {
      const res = await fetch(
        `/api/loan-ticket/${ticket?._id}/update-payback`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            paybackStatus: newPaybackStatus,
            paybackAmount: newPaybackAmount,
            paybackDate: newPaybackDate,
          }),
        }
      );
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.success("Return status updated successfully", {
        id: toastId,
      });

      // Send email to the borrower if the return amount is greater than 0
      if (newPaybackAmount > 0) {
        // Now send the reuturn amount notification to the borrower's email
        const toastId2 = toast.loading("Sending email to borrower...");
        await sendReturnAmountEmail({
          lenderName: currentUserData?.name,
          lenderEmail: currentUserData?.email,
          lenderPhoneNumber,
          borrowerName: ticket?.borrowerName,
          borrowerEmail: ticket?.borrowerContactDetails?.borrowerEmail,
          loanAmount: ticket?.loanAmount,
          loanReason: ticket?.loanReason,
          loanDate: ticket?.loanDate,
          paymentMethod,
          ticketId: ticket?._id,
          paybackAmount: newPaybackAmount,
          paybackDate: newPaybackDate,
        });
        toast.success("Email sent successfully", {
          id: toastId2,
        });
      }

      router.push(`/ticket/${ticket?._id}/details`);
    } catch (error) {
      toast.error(error, {
        id: toastId,
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="my-3 flex flex-wrap gap-3 border px-5 py-3 rounded-md">
        {paybackAmountArray.length > 0 ? (
          paybackAmountArray.map((p, index) => {
            return (
              <ReturnAmountCard
                key={index}
                p={p}
                index={index}
                paybackStatus={paybackStatus}
              />
            );
          })
        ) : (
          <div className="text-muted-foreground">
            No return amount added yet
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 my-5">
        <div className="flex flex-col gap-3">
          <Label>Return Status</Label>
          <Select
            onValueChange={(newValue) => setNewPaybackStatus(newValue)}
            defaultValue={newPaybackStatus}
          >
            <SelectTrigger>
              <SelectValue placeholder="Amount Back Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
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
        <div className="flex flex-col gap-3">
          <Label htmlFor="paybackAmount">
            Amount (
            <span className="text-primary font-semibold">₹{leftAmount}</span>{" "}
            left)
          </Label>
          <Input
            id="paybackAmount"
            value={newPaybackAmount}
            type="number"
            onChange={(e) =>
              setNewPaybackAmount(
                e.target.value > leftAmount
                  ? leftAmount
                  : e.target.value && parseInt(e.target.value)
              )
            } // Limit the amount to be less than the left amount to be paid and should be a number only
            className="font-semibold"
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
                  !newPaybackDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newPaybackDate ? (
                  dayjs(newPaybackDate).format("MMM D, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newPaybackDate}
                onSelect={setNewPaybackDate}
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
      <div className="my-3 flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleUpdatePayback}>Update</Button>
      </div>
    </>
  );
};

export default UpdateStatusForm;
