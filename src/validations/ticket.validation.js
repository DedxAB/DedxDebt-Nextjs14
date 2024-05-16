export const validateLoanTicket = (
  borrowerName,
  borrowerEmail,
  loanAmount,
  lender
) => {
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
  if (!loanAmount || loanAmount <= 0 || isNaN(loanAmount)) {
    error = "Loan amount must be at least 1";
    return error;
  }
  if (!lender || typeof lender !== "string") {
    error = "Please provide the lender's name";
    return error;
  }
};
