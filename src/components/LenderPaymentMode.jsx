"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function LenderPaymentMode({ userInfo }) {
  const { _id, name } = userInfo;
  const [upiId, setUpiId] = useState("");
  const [upiNumber, setUpiNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    // if (!upiId || !upiNumber || !accountNumber || !ifsc) {
    //   return toast.error("All fields are required");
    // }

    const toastId = toast.loading("Sending your details...");
    try {
      const res = await fetch("/api/payment-mode", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          lender: _id,
          upiId,
          upiNumber,
          accountNumber,
          ifsc,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }
      toast.success("Payment details added successfully", { id: toastId });
      // setUpiId("");
      // setUpiNumber("");
      // setAccountNumber("");
      // setIfsc("");
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-5">
        <div>
          <Label htmlFor="lender">Your Name</Label>
          <Input
            type="text"
            id="lender"
            name="lender"
            disabled
            placeholder={`${name}`}
          />
        </div>
        <div>
          <Label htmlFor="upiId">UPI ID</Label>
          <Input
            type="text"
            id="upiId"
            name="upiId"
            onChange={(e) => setUpiId(e.target.value)}
            value={upiId}
          />
        </div>
        <div>
          <Label htmlFor="upiNumber">UPI Number</Label>
          <Input
            type="text"
            id="upiNumber"
            name="upiNumber"
            onChange={(e) => setUpiNumber(e.target.value)}
            value={upiNumber}
          />
        </div>
        <div>
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            type="text"
            id="accountNumber"
            name="accountNumber"
            onChange={(e) => setAccountNumber(e.target.value)}
            value={accountNumber}
          />
        </div>
        <div>
          <Label htmlFor="ifsc">IFSC</Label>
          <Input
            type="text"
            id="ifsc"
            name="ifsc"
            onChange={(e) => setIfsc(e.target.value)}
            value={ifsc}
          />
        </div>
      </div>
      <div>
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </>
  );
}
