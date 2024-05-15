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
import { format, parse } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateStatusForm = ({ note }) => {
  const paybackStatus = note?.paybackStatus;
  const paybackAmountArray = note?.paymentsBack; // Array of Payback Amounts

  // Calculate the total payback amount
  let totalPaybackAmount = 0;
  paybackAmountArray.forEach((p) => {
    totalPaybackAmount += p.paybackAmount;
  });

  // Calculate the left amount to be paid
  const leftAmount = note?.loanAmount - totalPaybackAmount;

  const [newPaybackAmount, setNewPaybackAmount] = useState(1);
  const [newPaybackDate, setNewPaybackDate] = useState(Date);
  const [newPaybackStatus, setNewPaybackStatus] = useState(paybackStatus);

  const router = useRouter();

  const handleUpdatePayback = async (e) => {
    e.preventDefault();

    if (newPaybackAmount < 1) {
      toast.error("Payback amount should be atleast Rs. 1");
      return;
    }

    // Update the payback status
    const toastId = toast.loading("Updating Payback Status...");
    try {
      const res = await fetch(`/api/loan-ticket/${note._id}/update-payback`, {
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
      toast.success("Payback status updated successfully", {
        id: toastId,
      });
      router.back();
      router.refresh();
    } catch (error) {
      toast.error("Failed to update payback status", {
        id: toastId,
      });
    }
  };

  return (
    <>
      {paybackAmountArray.length > 0 &&
        paybackAmountArray.map((p, index) => {
          return (
            <div key={index} className="flex items-center gap-2 my-3">
              <div className="flex flex-col gap-2">
                <h1>Payback Amount {index + 1}</h1>
                <p
                  className={`${
                    paybackStatus === "pending"
                      ? "bg-red-200"
                      : paybackStatus === "partiallyPaid"
                      ? "bg-yellow-200"
                      : "bg-green-200"
                  } text-black font-semibold px-4 py-2 rounded-md text-center`}
                >
                  Rs. {p.paybackAmount}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Payback Date {index + 1}</h1>
                <p
                  className={`${
                    paybackStatus === "pending"
                      ? "bg-red-200"
                      : paybackStatus === "partiallyPaid"
                      ? "bg-yellow-200"
                      : "bg-green-200"
                  } text-black font-semibold px-4 py-2 rounded-md`}
                >
                  {format(p.paybackDate, "PPPP")}
                </p>
              </div>
            </div>
          );
        })}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="paybackAmount">
            Payback Amount (
            <span className="text-primary font-semibold">Rs. {leftAmount}</span>{" "}
            left to be paid)
          </Label>
          <Input
            id="paybackAmount"
            value={newPaybackAmount}
            type="number"
            onChange={(e) =>
              setNewPaybackAmount(
                e.target.value < 1
                  ? 1
                  : parseInt(e.target.value) > leftAmount
                  ? leftAmount
                  : parseInt(e.target.value)
              )
            }
            className="font-semibold"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Payback Date 🌟</Label>
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
                  format(newPaybackDate, "PPPP")
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
        <div className="flex flex-col gap-2">
          <Label>Payback Status 🌟</Label>
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
                  👨‍🎤&nbsp;Pending
                </SelectItem>
                <SelectItem value="partiallyPaid" className={`cursor-pointer`}>
                  💳&nbsp;Partially Paid
                </SelectItem>
                <SelectItem value="paid" className={`cursor-pointer`}>
                  💰&nbsp;Fully Paid
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
        <Button onClick={handleUpdatePayback}>Update Payback</Button>
      </div>
    </>
  );
};

export default UpdateStatusForm;
