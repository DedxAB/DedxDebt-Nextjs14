export const paymentModeValidation = ({
  lender,
  upiId,
  upiNumber,
  bankName,
  accountNumber,
  ifsc,
  accountHolderName,
}) => {
  let error = "";

  // Check lender is provided or not
  if (!lender) {
    return (error = "Please provide a user ID");
  } 

  // Check for payment methods. At least one payment method should be provided
  if (!upiId && !upiNumber && !accountNumber) {
    return (error = "Please provide at least one payment method (UPI or Bank)");
  }

  // If account number is provided, then all bank details should be provided
  if (accountNumber && ( !accountHolderName || !bankName || !ifsc)) {
    return (error = "Please provide all bank account details");
  }

  
  if (upiId && typeof upiId !== "string") {
    return (error = "UPI ID must be a string");
  }
  if (upiNumber && typeof upiNumber !== "string") {
    return (error = "UPI Number must be a string");
  }
  if (accountHolderName && typeof accountHolderName !== "string") {
    return (error = "Account Holder Name must be a string");
  }
  if (bankName && typeof bankName !== "string") {
    return (error = "Bank Name must be a string");
  }
  if (accountNumber && typeof accountNumber !== "string") {
    return (error = "Account Number must be a string");
  }
  if (ifsc && typeof ifsc !== "string") {
    return (error = "IFSC must be a string");
  }
};
