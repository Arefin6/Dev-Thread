"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "../../database/Account.model";
import User from "../../database/User.model";

import action from "../handlers/action";
import handleError from "../handlers/error";
import { NotFoundError } from "../http-errors";
import { SignInSchema, SignUpSchema } from "../validations";

import { isRedirectError } from "next/dist/client/components/redirect-error"; // or "next/navigation"

export async function signUpWithCredentials(
  params: AuthCredentials,
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email }], {
      session,
    });

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }

  // NextAuth Sign-In Step
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return handleError(new Error(res.error)) as ErrorResponse;
    }

    return { success: true };
  } catch (error) {
    // ⚠️️ CRITICAL: Rethrow Next.js redirect errors so NextAuth can navigate
    if (isRedirectError(error)) {
      throw error;
    }
    return handleError(error) as ErrorResponse;
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">,
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!existingAccount) throw new NotFoundError("Account");

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password,
    );

    if (!passwordMatch) throw new Error("Password does not match");

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
