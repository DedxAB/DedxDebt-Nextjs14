export const userValidation = (
  clerkId,
  name,
  email,
  phoneNumber,
  username,
  image,
  address
) => {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const phoneRegex = /^(\+\d{1,3}[- ]?)?[6789]\d{9}$/;

  let error = "";
  if (!clerkId || typeof clerkId !== "string") {
    error = "Please provide a clerk ID";
    return error;
  }
  if (
    !name ||
    name.length < 3 ||
    name.length > 50 ||
    typeof name !== "string"
  ) {
    error =
      "Name must be at least 3 characters long and not exceed 50 characters";
    return error;
  }
  if (!email || !email.match(emailRegex) || typeof email !== "string") {
    error = "Please provide a valid email";
    return error;
  }
  if (phoneNumber && !phoneNumber.match(phoneRegex)) {
    error = "Please provide a valid phone number";
    return error;
  }
  if (
    username &&
    (username.length < 3 || username.length > 30) &&
    typeof username !== "string"
  ) {
    error =
      "Username must be at least 3 characters long and not exceed 30 characters";
    return error;
  }
  if (!image || typeof image !== "string") {
    error = "Please provide a valid image";
    return error;
  }
  if (address && address.length > 150 && typeof address !== "string") {
    error = "Address must not exceed 150 characters";
    return error;
  }
};
