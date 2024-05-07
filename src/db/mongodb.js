import mongoose from "mongoose";

const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState == 1) {
    console.log("MongoDB is already connected");
    return;
  }
  if (connectionState == 2) {
    console.log("MongoDB is connecting...");
    return;
  }
  if (connectionState == 3) {
    console.log("MongoDB is disconnecting");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
    throw new Error("Error connecting to MongoDB");
  }
};

export default dbConnect;
