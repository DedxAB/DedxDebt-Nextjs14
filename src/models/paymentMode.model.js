import mongoose from "mongoose";

const paymentModeSchema = new mongoose.Schema(
  {
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
    paymentMethod: {
      upiId: {
        type: String,
        required: false,
        trim: true,
        lowercase: [true, "UPI ID must be in lowercase"],
      },
      upiNumber: {
        type: String,
        required: false,
        trim: true,
      },
      bankAccount: {
        accountHolderName: {
          type: String,
          required: false,
        },
        bankName: {
          type: String,
          required: false,
        },
        accountNumber: {
          type: String,
          required: false,
        },
        ifsc: {
          type: String,
          required: false,
        },
      },
    },
  },
  { timestamps: true }
);

const PaymentMode =
  mongoose.models.PaymentMode ||
  mongoose.model("PaymentMode", paymentModeSchema);

export default PaymentMode;
