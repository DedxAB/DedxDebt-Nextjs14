import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import User from "@/models/user.model";
import { validateLoanTicket } from "@/validations/ticket.validation";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  const {
    lender,
    borrowerName,
    borrowerAddress,
    borrowerEmail,
    borrowerPhoneNumber,
    loanAmount,
    loanDate,
    loanReason,
    paybackStatus,
    paybackAmount,
    paybackDate,
  } = await req.json();

  // Validate the input data
  const error = validateLoanTicket(
    borrowerName,
    borrowerEmail,
    loanAmount,
    lender
  );
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    const newLoanTicket = await LoanTicket.create({
      lender,
      borrowerName,
      borrowerAddress,
      borrowerContactDetails: {
        borrowerEmail,
        borrowerPhoneNumber,
      },
      loanAmount,
      loanDate: loanDate || Date.now(), // Use provided loanDate or default to current date
      loanReason,
      reminderSent: false, // Set to false by default, can be updated later
      paybackStatus,
      paymentsBack: paybackAmount
        ? [{ paybackAmount, paybackDate: paybackDate || Date.now() }]
        : [],
    });

    // Update the lender's loanTickets array with the new ticket ID and also here we can use addToSet method to avoid duplicates
    await User.findByIdAndUpdate(
      { _id: lender },
      {
        $push: { loanTickets: newLoanTicket._id },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Ticket created Successfully", data: newLoanTicket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
