import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, "Please provide a clerk ID"],
      unique: [true, "Clerk ID already exists"],
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: [true, "Name must not have spaces"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
      trim: [true, "Email must not have spaces"],
      lowercase: [true, "Email must be in lowercase"],
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "Please provide a valid email",
      ],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "Username already exists"],
      trim: [true, "Username must not have spaces"],
      lowercase: [true, "Username must be in lowercase"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username must not exceed 50 characters"],
    },
    image: {
      type: String,
      required: false,
      trim: [true, "Image must not have spaces"],
      lowercase: [true, "Google image must be in lowercase"],
    },
    address: {
      type: String,
      required: false,
      trim: [true, "Address must not have spaces"],
      lowercase: [true, "Address must be in lowercase"],
      minlength: [3, "Address must be at least 3 characters long"],
      maxlength: [100, "Address must not exceed 100 characters"],
    },
    onboarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
