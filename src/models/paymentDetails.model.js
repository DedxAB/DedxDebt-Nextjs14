import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema(
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
          unique: [true, "UPI ID already exists"],
          trim: true,
          lowercase: [true, "UPI ID must be in lowercase"],
        },
      ],
      upiNumber: [
        {
          type: String,
          required: false,
          unique: [true, "UPI number already exists"],
        },
      ],
      bankAccount: [
        {
          accountNumber: {
            type: String,
            required: false,
            unique: [true, "Account number already exists"],
          },
          ifsc: {
            type: String,
            required: false,
            unique: [true, "IFSC code already exists"],
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
paymentDetailsSchema
  .path("paymentMethod")
  .validate(atLeastOnePaymentMethod, "At least one payment method is required");

const PaymentDetails =
  mongoose.models.PaymentDetails ||
  mongoose.model("PaymentDetails", paymentDetailsSchema);

export default PaymentDetails;
