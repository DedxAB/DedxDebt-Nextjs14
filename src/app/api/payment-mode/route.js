import dbConnect from "@/db/mongodb";
import PaymentMode from "@/models/paymentMode.model";
import { paymentModeValidation } from "@/validations/paymentMode.validation";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { lender, upiId, upiNumber, accountNumber, ifsc } = await req.json();

  // console.log(lender, upiId, upiNumber, accountNumber, ifsc);

  // Validation
  const error = paymentModeValidation({
    lender,
    upiId,
    upiNumber,
    accountNumber,
    ifsc,
  });
  if (error) return NextResponse.json({ error }, { status: 400 });

  try {
    const paymentMode = await PaymentMode.findOneAndUpdate(
      { lender },
      {
        lender,
        paymentMethod: {
          upiId,
          upiNumber,
          bankAccount: {
            accountNumber,
            ifsc,
          },
        },
      },
      { new: true, upsert: true }
    );
    return NextResponse.json(
      { message: "Payment details updated successfully", data: paymentMode },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
