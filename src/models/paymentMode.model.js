import mongoose from "mongoose";

const paymentModeSchema = new mongoose.Schema(
  {
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
    paymentMethod: {
      upiId: [
        {
          type: String,
          required: false,
          trim: true,
          lowercase: [true, "UPI ID must be in lowercase"],
        },
      ],
      upiNumber: [
        {
          type: String,
          required: false,
          trim: true,
        },
      ],
      bankAccount: [
        {
          accountNumber: {
            type: String,
            required: false,
          },
          ifsc: {
            type: String,
            required: false,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

// Custom validator to ensure at least one payment method is provided
function atLeastOnePaymentMethod(value) {
  return (
    (value.upiId && value.upiId.length > 0) ||
    (value.upiNumber && value.upiNumber.length > 0) ||
    (value.bankAccount && value.bankAccount.length > 0)
  );
}

// Apply the custom validator to the paymentMethod field
paymentModeSchema.pre("validate", function (next) {
  if (!atLeastOnePaymentMethod(this.paymentMethod)) {
    next(new Error("Please provide at least one payment method"));
  } else {
    next();
  }
});

const PaymentMode =
  mongoose.models.PaymentMode ||
  mongoose.model("PaymentMode", paymentModeSchema);

export default PaymentMode;
