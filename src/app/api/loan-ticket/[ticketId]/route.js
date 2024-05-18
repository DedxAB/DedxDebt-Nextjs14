import dbConnect from "@/db/mongodb";
import LoanTicket from "@/models/loanTicket.model";
import PaymentMode from "@/models/paymentMode.model";
import User from "@/models/user.model";
import { validateUpdateTicket } from "@/validations/ticket.validation";
import { NextResponse } from "next/server";

// Get the ticket
export async function GET(_req, { params }) {
  const { ticketId } = params;
  try {
    await dbConnect();
    const loanTicket = await LoanTicket.findById(ticketId).populate({
      path: "lender",
      populate: { path: "paymentModes" },
    });
    if (!loanTicket) {
      return NextResponse.json(
        { error: "Loan ticket not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Here is you loan-ticket", data: loanTicket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete the ticket
export async function DELETE(_req, { params }) {
  const { ticketId } = params;
  try {
    await dbConnect();
    const deletedTicket = await LoanTicket.findByIdAndDelete(ticketId);
    if (!deletedTicket) {
      return NextResponse.json(
        { error: "Loan ticket not found" },
        { status: 404 }
      );
    }

    // Delete the ticket from the lender's ticket list
    await User.findByIdAndUpdate(
      deletedTicket?.lender,
      {
        $pull: { loanTickets: deletedTicket?._id },
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Loan ticket deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Patch the ticket
export async function PATCH(req, { params }) {
  const { ticketId } = params;
  const {
    borrowerName,
    borrowerEmail,
    borrowerAddress,
    borrowerPhoneNumber,
    loanAmount,
    loanDate,
    loanReason,
  } = await req.json();

  const error = validateUpdateTicket({
    borrowerName,
    borrowerEmail,
    borrowerAddress,
    borrowerPhoneNumber,
    loanAmount,
    loanDate,
    loanReason,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    await dbConnect();
    const updatedTicket = await LoanTicket.findByIdAndUpdate(
      ticketId,
      {
        borrowerName,
        borrowerAddress,
        borrowerContactDetails: {
          borrowerEmail,
          borrowerPhoneNumber,
        },
        loanAmount,
        loanReason,
        loanDate,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Ticket updated successfully", data: updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
