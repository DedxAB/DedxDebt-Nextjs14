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

const UpdateStatusForm = ({ ticket }) => {
  const paybackStatus = ticket?.paybackStatus;
  const paybackAmountArray = ticket?.paymentsBack; // Array of Payback Amounts

  // Calculate the total payback amount
  let totalPaybackAmount = 0;
  paybackAmountArray.forEach((p) => {
    totalPaybackAmount += p.paybackAmount;
  });

  // Calculate the left amount to be paid
  const leftAmount = ticket?.loanAmount - totalPaybackAmount;

  const [newPaybackAmount, setNewPaybackAmount] = useState(1);
  const [newPaybackDate, setNewPaybackDate] = useState(new Date());
  const [newPaybackStatus, setNewPaybackStatus] = useState(paybackStatus);

  const router = useRouter();

  const handleUpdatePayback = async (e) => {
    e.preventDefault();

    if (!newPaybackAmount || newPaybackAmount < 1) {
      toast.error("Return amount should be atleast Rs. 1");
      return;
    }

    // Update the payback status
    const toastId = toast.loading("Updating return status...");
    try {
      const res = await fetch(`/api/loan-ticket/${ticket?._id}/update-payback`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          paybackStatus: newPaybackStatus,
          paybackAmount: newPaybackAmount,
          paybackDate: newPaybackDate,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.success("Return status updated successfully", {
        id: toastId,
      });
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
      <div className="flex flex-wrap gap-3 my-5">
        {paybackAmountArray.length > 0 &&
          paybackAmountArray.map((p, index) => {
            return (
              <div key={index} className="flex flex-wrap items-center gap-2">
                <div className="flex flex-col gap-2">
                  <h1>Return Amount {index + 1}</h1>
                  <p
                    className={`${
                      paybackStatus === "pending"
                        ? "bg-red-200"
                        : paybackStatus === "partiallyPaid"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    } text-black font-semibold px-3 py-1 rounded-md text-center`}
                  >
                    Rs. {p.paybackAmount}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <h1>Return Date {index + 1}</h1>
                  <p
                    className={`${
                      paybackStatus === "pending"
                        ? "bg-red-200"
                        : paybackStatus === "partiallyPaid"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    } text-black font-semibold px-3 py-1 rounded-md`}
                  >
                    {dayjs(p.paybackDate).format("MMM D, YYYY")}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-3">
          <Label htmlFor="paybackAmount">
            Return Amount (
            <span className="text-primary font-semibold">Rs. {leftAmount}</span>{" "}
            left to be paid)
          </Label>
          <Input
            id="paybackAmount"
            value={newPaybackAmount}
            type="number"
            onChange={(e) =>
              setNewPaybackAmount(
                e.target.value > leftAmount
                  ? leftAmount
                  : parseInt(e.target.value)
              )
            }
            className="font-semibold"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Return Amount Date 🌟</Label>
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
                  dayjs(newPaybackDate).format("dddd MMM D, YYYY")
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
        <div className="flex flex-col gap-3">
          <Label>Amount Return Status 🌟</Label>
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
                  👨‍🎤&nbsp; Pending
                </SelectItem>
                <SelectItem value="partiallyPaid" className={`cursor-pointer`}>
                  💳&nbsp; Partially Paid
                </SelectItem>
                <SelectItem value="paid" className={`cursor-pointer`}>
                  💰&nbsp; Fully Paid
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
