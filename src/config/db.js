import dns from "node:dns";
import mongoose from "mongoose";

// Some routers/ISPs refuse Node's SRV DNS queries (mongodb+srv:// lookups)
// even though the OS resolver handles them fine — force a public resolver.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}
