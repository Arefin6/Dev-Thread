import dbConnect, { getDBStatus } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Explicitly trigger or await the database setup
    await dbConnect();

    // 2. Fetch the current runtime connection status
    const status = getDBStatus();

    if (status.isConnected) {
      return NextResponse.json(
        {
          status: "UP",
          database: status.message,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        {
          status: "DOWN",
          database: status.message,
        },
        { status: 503 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "ERROR",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
