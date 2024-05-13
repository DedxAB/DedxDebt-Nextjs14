import mongoose from "mongoose";

const loanTicketSchema = new mongoose.Schema(
  {
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a lender ID"],
    },
    borrowerName: {
      type: String,
      required: [true, "Please provide the borrower's name"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    borrowerAddress: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, "Address must not exceed 100 characters"],
    },
    borrowerContactDetails: {
      borrowerEmail: {
        type: String,
        required: [true, "Please provide the borrower's email"],
        trim: true,
        lowercase: true,
        match: [
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          "Please provide a valid email",
        ],
      },
      borrowerPhoneNumber: {
        type: String,
        required: false,
        trim: [true, "Phone number must not have spaces"],
        match: [
          /^(\+\d{1,3}[- ]?)?[6789]\d{9}$/,
          "Please provide a valid phone number",
        ],
      },
    },
    loanAmount: {
      type: Number,
      required: [true, "Please provide the loan amount"],
      min: [1, "Loan amount must be at least 1"],
    },
    loanReason: {
      type: String,
      required: false,
      trim: true,
      maxlength: [100, "Reason must not exceed 100 characters"],
    },
    loanDate: {
      type: Date,
      required: [true, "Please provide the loan date"],
      default: Date.now,
    },
    reminderSent: {
      type: Boolean,
      required: false,
      default: false,
    },
    paybackStatus: {
      type: String,
      required: [true, "Please provide the loan status"],
      enum: ["pending", "paid", "partiallyPaid"],
      default: "pending",
    },
    paymentsBack: [
      {
        paybackDate: {
          type: Date,
          required: [true, "Please provide the payment date"],
          default: Date.now,
        },
        paybackAmount: {
          type: Number,
          required: [true, "Please provide the payment amount"],
          min: [0, "payment amount must not be less than 0"],
        },
      },
    ],
  },
  { timestamps: true }
);

const LoanTicket =
  mongoose.models.LoanTicket || mongoose.model("LoanTicket", loanTicketSchema);

export default LoanTicket;
