"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LenderPaymentMode({ userInfo, paymentMode }) {
  const { _id, name } = userInfo;
  // console.log(paymentMode);
  const [upiId, setUpiId] = useState(paymentMode?.paymentMethod?.upiId || "");
  const [upiNumber, setUpiNumber] = useState(
    paymentMode?.paymentMethod?.upiNumber || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    paymentMode?.paymentMethod?.bankAccount?.accountNumber || ""
  );
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState(
    paymentMode?.paymentMethod?.bankAccount?.ifsc || ""
  );

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accountNumber !== confirmAccountNumber) {
      return toast.error("Account number does not match");
    }

    const toastId = toast.loading("Updating your details...");
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
      router.back();
      router.refresh();
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
            type="password"
            id="accountNumber"
            name="accountNumber"
            onChange={(e) => setAccountNumber(e.target.value)}
            value={accountNumber}
          />
        </div>
        <div>
          <Label htmlFor="confirmAccount">Confirm account number</Label>
          <Input
            type="text"
            id="confirmAccount"
            name="confirmAccount"
            onChange={(e) => setConfirmAccountNumber(e.target.value)}
            value={confirmAccountNumber}
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
      <div className="my-5">
        <p>
          <span className="font-semibold">Note:</span> Please make sure you
          provide the correct details as it will be used for receiving payments.
          Your payment details will be sent to the borrower mailing address.
        </p>
      </div>
      <div>
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </>
  );
}
