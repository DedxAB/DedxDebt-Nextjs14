import dbConnect from "@/db/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { clerkId, name, email, phoneNumber, username, image, address } =
    await req.json();
  await dbConnect();
  try {
    await User.findOneAndUpdate(
      { clerkId: clerkId },
      {
        clerkId,
        name,
        image,
        email,
        phoneNumber,
        username,
        address,
        onboarded: true,
      },
      { new: true, upsert: true, runValidators: true }
    );
    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
