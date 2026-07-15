import { connectDB } from "@/lib/mongodb";
import { NextRequest } from "next/server";

async function POST(req: NextRequest) {
  try {
    await connectDB();
    
  } catch (error) {}
}
