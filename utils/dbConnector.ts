import mongoose from "mongoose";

let isConnected = false;

export const dbConnector = async () => {
  console.log("MOngoDB connectring ...");
  mongoose?.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected !");

    return;
  }

  //const MONGODB_URI = "mongodb://localhost:27017/fms";

  const MONGODB_URI =
    "mongodb+srv://princebak:princebak@bakil-free-cluster.oejtkcq.mongodb.net/fms?retryWrites=true&w=majority";

  try {
    await mongoose?.connect(MONGODB_URI, {
      dbName: "fms",
    });
    isConnected = true;
    console.log("MongoDB connected !");
  } catch (error) {
    console.log("MongoDB Connection Error >> ", error);
  }
};
