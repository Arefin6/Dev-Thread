import Account from "@/database/Account.model";
import dbConnect from "@/lib/db";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

// api/account/provider
export async function POST(request: Request) {
  try {
    await dbConnect();
    const { providerAccountId } = await request.json();

    const validatedData = AccountSchema.partial().safeParse({
      providerAccountId,
    });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const account = await Account.findOne({ providerAccountId });
    if (!account) throw new Error("Account Not Found");
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
