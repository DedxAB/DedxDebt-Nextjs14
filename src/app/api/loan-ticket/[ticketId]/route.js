import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(_req, { params }) {
  const { ticketId } = params;
  try {
    await dbConnect();
    const loanTicket = await LoanTicket.findById(ticketId).populate("lender");
    if (!loanTicket) {
      return NextResponse.json(
        { error: "Loan ticket not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: loanTicket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
