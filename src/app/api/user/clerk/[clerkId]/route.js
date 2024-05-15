import dbConnect from "@/db/mongodb";
import PaymentMode from "@/models/paymentMode.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const { clerkId } = params;
  await dbConnect();
  try {
    const user = await User.findOne({ clerkId: clerkId }).populate(
      "paymentModes"
    );
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "user founded", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
