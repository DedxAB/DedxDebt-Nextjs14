import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { ticketId } = params;
  const { reminderSent } = await req.json();
  try {
    await dbConnect();
    const updatedTicket = await LoanTicket.findByIdAndUpdate(
      ticketId,
      { reminderSent },
      { new: true }
    );
    return NextResponse.json(
      { message: "Reminder added successfully.", data: updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
