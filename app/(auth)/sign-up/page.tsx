"use client";

import AuthForm from "@/components/forms/AuthForm";
//import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      handleSubmit={async (data) => {
        console.log("Form Data:", data);
        return { success: true, message: "Logged in successfully" };
      }}
    />
  );
};

export default SignUp;
