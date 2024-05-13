import dbConnect from "@/db/mongodb";
import User from "@/models/user.model";
import { userValidation } from "@/validations/user.validation";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { clerkId, name, email, phoneNumber, username, image, address } =
    await req.json();
  await dbConnect();

  const error = userValidation(
    clerkId,
    name,
    email,
    phoneNumber,
    username,
    image,
    address
  );
  if (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }

  try {
    const user = await currentUser();
    // check username is already exists or not
    const isExistUsername = await User.findOne({ username: username });

    if (isExistUsername && isExistUsername?._doc?.clerkId !== user.id) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

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
