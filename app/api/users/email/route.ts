import User from "@/database/User.model";
import dbConnect from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

// api/users/email
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    const validatedData = UserSchema.partial().safeParse({ email });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("User Not Found");
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
