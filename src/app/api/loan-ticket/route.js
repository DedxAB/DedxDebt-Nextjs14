import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    lender,
    borrowerName,
    borrowerAddress,
    borrowerEmail,
    borrowerPhoneNumber,
    loanAmount,
    loanReason,
    paybackStatus,
    paybackAmount,
  } = await req.json();
  try {
    await dbConnect();

    const newLoanTicket = await LoanTicket.create({
      lender,
      borrowerName,
      borrowerAddress,
      borrowerContactDetails: { borrowerEmail, borrowerPhoneNumber },
      loanAmount,
      loanReason,
      reminderSent: false,
      paybackStatus,
      paymentsBack: [{ paybackAmount }],
    });

    return NextResponse.json(
      { message: "Ticket created Successfully", data: newLoanTicket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
