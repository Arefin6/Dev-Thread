"use client";

import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/authActions";
import { SignUpSchema } from "@/lib/validations";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
