import dbConnect from "@/db/mongodb";
import PaymentMode from "@/models/paymentMode.model";
import User from "@/models/user.model";
import { paymentModeValidation } from "@/validations/paymentMode.validation";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const {
    lender,
    upiId,
    upiNumber,
    accountHolderName,
    bankName,
    accountNumber,
    ifsc,
  } = await req.json();

  // console.log(lender, upiId, upiNumber, accountNumber, ifsc);

  // Validation
  const error = paymentModeValidation({
    lender,
    upiId,
    upiNumber,
    accountHolderName,
    bankName,
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
            accountHolderName,
            bankName,
            accountNumber,
            ifsc,
          },
        },
      },
      { new: true, upsert: true }
    );

    if (paymentMode) {
      await User.findByIdAndUpdate(
        { _id: lender },
        {
          $push: {
            paymentModes: paymentMode._id,
          },
        },
        { new: true }
      );
    }

    return NextResponse.json(
      { message: "Payment details updated successfully", data: paymentMode },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
