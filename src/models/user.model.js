import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
      trim: true,
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
      trim: true,
      lowercase: [true, "Username must be in lowercase"],
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username must not exceed 50 characters"],
    },
    googleImage: {
      type: String,
      required: false,
      trim: true,
      lowercase: [true, "Google image must be in lowercase"],
    },
    address: {
      type: String,
      required: false,
      trim: true,
      lowercase: [true, "Address must be in lowercase"],
      minlength: [3, "Address must be at least 3 characters long"],
      maxlength: [100, "Address must not exceed 100 characters"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
