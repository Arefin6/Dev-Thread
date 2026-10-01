/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import {
  Path,
  UseFormReturn,
  FieldValues,
  useForm,
  Resolver,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
// 1. Swap old shadcn form imports for the new Base UI field primitives
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Assuming these props match your current dynamic form setup
interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>; // Replace 'any' with the actual schema type
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

export default function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: AuthFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const router = useRouter();
  const handleSubmit: SubmitHandler<T> = async (data) => {
    // console.log("fuck", data);
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success(
        `Successfully ${formType === "SIGN_IN" ? "signed in" : "signed up"}!`,
      );
      router.push(ROUTES.HOME);
    } else {
      toast.error("An error occurred. Please try again.", {
        description: result?.error?.message || "Unknown error",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      {Object.keys(defaultValues).map((fieldName) => {
        // Look up errors for this dynamic field inside react-hook-form's state
        const fieldError = form.formState.errors[fieldName];

        return (
          <Field
            key={fieldName}
            //name={fieldName}
            //invalid={!!fieldError}
            className="flex w-full flex-col gap-2.5"
          >
            <FieldLabel className="paragraph-medium text-dark400_light700">
              {fieldName === "email"
                ? "Email Address"
                : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            </FieldLabel>

            <FieldGroup>
              <Input
                type={fieldName === "password" ? "password" : "text"}
                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                // Directly attach react-hook-form's register configuration
                {...form.register(fieldName as Path<T>)}
              />
            </FieldGroup>

            {/* This natively acts as your old FormMessage */}
            <FieldError>{fieldError?.message as string}</FieldError>
          </Field>
        );
      })}

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signing In..." // Fixed small typo here "Signin In..." -> "Signing In..."
            : "Signing Up..."
          : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.SIGNUP}
            className="paragraph-semibold primary-text-gradient"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGNIN}
            className="paragraph-semibold primary-text-gradient"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
}
