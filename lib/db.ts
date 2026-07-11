import mongoose, { Mongoose } from "mongoose";

//import logger from "./logger";
//import "@/database";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    //logger.info("Using existing mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devflow",
      })
      .then((result) => {
        //logger.info("Connected to MongoDB");
        console.log("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        // logger.error("Error connecting to MongoDB", error);
        console.error("Error connecting to MongoDB", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
export function getDBStatus() {
  // mongoose.connection.readyState returns a number indicating connection state:
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const states: Record<number, string> = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  const statusNum = mongoose.connection.readyState;

  return {
    code: statusNum,
    message: states[statusNum] || "Unknown",
    isConnected: statusNum === 1,
  };
}

export default dbConnect;
