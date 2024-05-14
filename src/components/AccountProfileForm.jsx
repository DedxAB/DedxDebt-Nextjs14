"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { usePathname, useRouter } from "next/navigation";

export default function AccountProfileForm({ userData, btnText }) {
  const [name, setName] = useState(userData?.name);
  const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber);
  const [username, setUsername] = useState(userData?.username);
  const [address, setAddress] = useState(userData?.address);
  const pathname = usePathname();
  const router = useRouter();

  const postUserFormData = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Saving your data...");

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: userData?.clerkId,
          name,
          email: userData?.email,
          phoneNumber,
          username,
          image: userData?.image,
          address,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.success("Data saved successfully", {
        id: toastId,
      });

      if (pathname === "/profile/edit") {
        router.push("/profile");
      }
      if (pathname === "/onboarding") {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={userData.email}
            id="email"
            disabled
            autoComplete="off"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            value={phoneNumber}
            id="phoneNumber"
            placeholder="+91 xxxxxxxxxx (Optional)"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            value={username}
            id="username"
            placeholder="username... (Optional)"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            value={address}
            id="address"
            placeholder="Address... 150 character (Optional)"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="my-5">
        <Button onClick={postUserFormData}>{btnText}</Button>
      </div>
    </>
  );
}
