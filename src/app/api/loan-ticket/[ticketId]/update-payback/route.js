import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  await dbConnect();
  const { ticketId } = params;
  const { paybackStatus, paybackAmount, paybackDate } = await req.json();

  try {
    // Update the payback status
    const updatedTicket = await LoanTicket.findByIdAndUpdate(
      ticketId,
      {
        paybackStatus,
        $push: {
          paymentsBack: { paybackAmount, paybackDate },
        },
      },
      { new: true }
    );
    return NextResponse.json(
      { message: "Payback status updated successfully", data: updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
