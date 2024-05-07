import dbConnect from "@/db/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, username, googleImage, address } = await req.json();
  try {
    await dbConnect();
    const newUser = await User.create({
      name,
      email,
      username,
      googleImage,
      address,
    });
    return NextResponse.json({ data: newUser }, { status: 201 });
  } catch (error) {
    console.log(`Error name: ${error.name} and message: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
