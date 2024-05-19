import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import { validateReturnStatus } from "@/validations/ticket.validation";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { ticketId } = params;
  const { paybackStatus, paybackAmount, paybackDate } = await req.json();

  const error = validateReturnStatus({
    paybackStatus,
    paybackAmount,
    paybackDate,
  });
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    // Update the payback status
    await dbConnect();
    const updatedTicket = await LoanTicket.findByIdAndUpdate(
      ticketId,
      {
        paybackStatus,
        ...(paybackAmount && {
          $push: { paymentsBack: { paybackAmount, paybackDate } },
        }),
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
