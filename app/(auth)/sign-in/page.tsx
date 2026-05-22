/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AuthForm from "@/components/forms/AuthForm";
//import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      handleSubmit={async (data) => {
        console.log("Form Data:", data);
        return { success: true, message: "Logged in successfully" };
      }}
    />
  );
};

export default SignIn;
