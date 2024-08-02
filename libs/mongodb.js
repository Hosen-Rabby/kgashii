import mongoose from "mongoose";

const connetMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connetMongoDB;
