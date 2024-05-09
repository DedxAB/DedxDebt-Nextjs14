"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function OnboardingForm({ userData }) {
  const [name, setName] = useState(userData.name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [username, setUsername] = useState(userData.username);
  //   const [image, setImage] = useState(userData.image);
  const [address, setAddress] = useState(userData.address);

  const postUserFormData = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Saving your data..");
    const data = {
      name,
      phoneNumber,
      username,
      address,
    };

    //   try {

    //   } catch (error) {

    //   }

    console.log(data);
    toast.success("Data saved successfully", {
      id: toastId,
    });
  };

  return (
    <>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" value={userData.email} id="email" disabled />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            value={phoneNumber}
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            value={address}
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Button onClick={postUserFormData}>Submit</Button>
      </div>
    </>
  );
}
