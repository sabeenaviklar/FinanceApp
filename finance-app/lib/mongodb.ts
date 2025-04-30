// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URL;

// export async function connectDB() {
//     if (mongoose.connection.readyState >= 1) return;
//     try {
//       await mongoose.connect(MONGODB_URI, {
//         dbName: "finance-tracker", // optional if it's in the URI
//       });
//       console.log("✅ MongoDB connected");
//     } catch (error) {
//       console.error("❌ MongoDB connection error:", error);
//     }
//   }

// export async function connectDB() {
//     if (mongoose.connection.readyState >= 1) return;
//     return mongoose.connect(MONGODB_URI, {
//       dbName: "finance-tracker",
//     });
//   }


// app/api/test-db/route.ts
// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db(); // default database
//     const collections = await db.listCollections().toArray();

//     return NextResponse.json({
//       status: "connected",
//       collections: collections.map((col) => col.name),
//     });
//   } catch (error) {
//     return NextResponse.json({ status: "error", error: error.message });
//   }
// }

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

// Check if we’re running in a Node.js environment with globalThis available
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Use a global variable to preserve the client across hot reloads in development
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the value is preserved across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // In production, no need to use global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

