import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET(_req, { params }) {
  const { userId } = params;
  await dbConnect();
  try {
    const notes = await LoanTicket.find({ lender: userId}).populate("lender");
    if (!notes) {
      return NextResponse.json(
        { message: "No loan ticket found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Loan ticket found", data: notes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
