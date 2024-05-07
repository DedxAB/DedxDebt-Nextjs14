import dbConnect from "@/db/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const { userId } = params;
  try {
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
