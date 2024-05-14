import dbConnect from "@/db/mongodb";
import PaymentMode from "@/models/paymentMode.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  await dbConnect();
  const { lenderId } = params;
  try {
    const paymentMode = await PaymentMode.findOne({ lender: lenderId });
    if (!paymentMode) {
      return NextResponse.json(
        { error: "Payment mode not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { data: paymentMode, message: "Payment mode found" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
