import dbConnect from "@/db/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const { clerkId } = params;
  await dbConnect();
  try {
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "user found", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
