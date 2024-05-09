import dbConnect from "@/db/mongodb";
import PaymentDetails from "@/models/paymentDetails.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { lender, upiId, upiNumber, accountNumber, ifsc } = await req.json();
  try {
    await dbConnect();
    const paymentDetails = await PaymentDetails.create({
      lender,
      paymentMethod: {
        upiId: upiId ? [upiId] : [],
        upiNumber: upiNumber ? [upiNumber] : [],
        bankAccount: accountNumber && ifsc ? [{ accountNumber, ifsc }] : [],
      },
    });
    return NextResponse.json(
      { message: "Payment details added successfully", data: paymentDetails },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET(_req, { params }) {
//   const { lender } = params;
//   try {
//     await dbConnect();
//     const paymentDetails = await PaymentDetails.findOne({
//       lender,
//     });
//     if (!paymentDetails) {
//       return NextResponse.json(
//         { error: "Payment details not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       { message: "Here are your payment details", data: paymentDetails },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await dbConnect();
    const paymentDetails = await PaymentDetails.find().populate("lender");
    if (!paymentDetails) {
      return NextResponse.json(
        { error: "Payment details not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Here are the all payment details", data: paymentDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
