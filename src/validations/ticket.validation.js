export const validateLoanTicket = ({
  lender,
  borrowerName,
  borrowerAddress,
  borrowerEmail,
  borrowerPhoneNumber,
  loanAmount,
  loanDate,
  loanReason,
  paybackStatus,
  paybackAmount,
  paybackDate,
}) => {
  let error = "";
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?[6789]\d{9}$/;

  // required fields for loan ticket
  if (!lender || typeof lender !== "string") {
    error = "Please provide the lender's name";
    return error;
  }

  // required fields for loan ticket
  if (
    !borrowerName ||
    borrowerName.length < 3 ||
    borrowerName.length > 50 ||
    typeof borrowerName !== "string"
  ) {
    error = "Name must be provided between 3 and 50 characters long";
    return error;
  }

  // required fields for loan ticket
  if (
    !borrowerEmail ||
    !emailRegex.test(borrowerEmail) ||
    typeof borrowerEmail !== "string"
  ) {
    error = "Please provide a valid email";
    return error;
  }

  // Optional fields for loan ticket
  if (borrowerPhoneNumber && !phoneNumberRegex.test(borrowerPhoneNumber)) {
    error = "Please provide a valid phone number";
    return error;
  }

  // Optional fields for loan ticket
  if (
    borrowerAddress &&
    (borrowerAddress.length < 3 || borrowerAddress.length > 100)
  ) {
    error = "Address must be between 3 and 100 characters long";
    return error;
  }

  // Optional fields for loan ticket
  if (loanReason && (loanReason.length < 3 || loanReason.length > 100)) {
    error = "Loan reason must be between 3 and 100 characters long";
    return error;
  }

  // required fields for loan ticket
  if (!loanAmount || loanAmount <= 0 || isNaN(loanAmount)) {
    error = "Borrowed amount must be at least 1";
    return error;
  }

  // Optional fields for loan ticket
  if (loanDate && isNaN(new Date(loanDate).getTime())) {
    error = "Please provide a valid date";
    return error;
  }

  // Optional fields for loan ticket
  if (paybackAmount && (paybackAmount < 0 || isNaN(paybackAmount))) {
    error = "Return amount must not less than 0";
    return error;
  }

  // Optional fields for loan ticket
  if (paybackDate && isNaN(new Date(paybackDate).getTime())) {
    error = "Please provide a valid date";
    return error;
  }
};

export const validateUpdateTicket = ({
  borrowerName,
  borrowerEmail,
  borrowerAddress,
  borrowerPhoneNumber,
  loanAmount,
  loanDate,
  loanReason,
}) => {
  let error = "";
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (
    !borrowerName ||
    borrowerName.length < 3 ||
    borrowerName.length > 50 ||
    typeof borrowerName !== "string"
  ) {
    error = "Name must be provided between 3 and 50 characters long";
    return error;
  }
  if (
    !borrowerEmail ||
    !emailRegex.test(borrowerEmail) ||
    typeof borrowerEmail !== "string"
  ) {
    error = "Please provide a valid email";
    return error;
  }

  // Optional fields for loan ticket
  if (
    borrowerAddress &&
    (borrowerAddress.length < 3 || borrowerAddress.length > 100)
  ) {
    error = "Address must be between 3 and 100 characters long";
    return error;
  }

  // Optional fields for loan ticket
  if (
    borrowerPhoneNumber &&
    (borrowerPhoneNumber.length < 10 || borrowerPhoneNumber.length > 15)
  ) {
    error = "Please provide a valid phone number";
    return error;
  }

  // Required fields for loan ticket
  if (!loanAmount || loanAmount < 1 || isNaN(loanAmount)) {
    error = "Borrowed amount must be at least 1";
    return error;
  }

  // Required fields for loan ticket
  if (!loanDate || isNaN(new Date(loanDate).getTime())) {
    error = "Please provide a valid date";
    return error;
  }

  // Optional fields for loan ticket
  if (loanReason && (loanReason.length < 3 || loanReason.length > 100)) {
    error = "Loan reason must be between 3 and 100 characters long";
    return error;
  }
};

export const validateReturnStatus = ({
  paybackStatus,
  paybackAmount,
  paybackDate,
}) => {
  let error = "";

  if (!paybackStatus || typeof paybackStatus !== "string") {
    error = "Please provide the payback status";
    return error;
  }
  if (!paybackAmount || paybackAmount < 1 || isNaN(paybackAmount)) {
    error = "Return amount must not less than 1";
    return error;
  }

  // Optional fields for loan ticket
  if (paybackDate && isNaN(new Date(paybackDate).getTime())) {
    error = "Please provide a valid date";
    return error;
  }
};
