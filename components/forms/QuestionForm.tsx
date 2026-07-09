"use client";
import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import TagCard from "../Cards/TagCard";
import { Button } from "../ui/button";
import { useRef, useTransition } from "react";
import { RefreshCcw } from "lucide-react";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";

interface Params {
  question?: Question;
  isEdit?: boolean;
}

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const QuestionForm = ({ question, isEdit = false }: Params) => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };
  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const updatedTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", updatedTags);
    if (updatedTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
    }
  };
  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      className="flex w-full flex-col gap-10"
      onSubmit={form.handleSubmit(handleCreateQuestion)}
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
              />
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>
              <Editor
                value={field.value}
                fieldChange={field.onChange}
                editorRef={editorRef}
              />
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="flex w-full flex-col"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  placeholder="Add tags..."
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                />
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field?.value?.map((tag: string) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <FieldDescription className="body-regular mt-2.5 text-light-500">
                Add up to 5 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-16 flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="primary-gradient w-fit !text-light-900 cursor-pointer"
        >
          {isPending ? (
            <>
              <RefreshCcw className="mr-2 size-4 animate-spin" />
              <span>Submitting</span>
            </>
          ) : (
            <>{isEdit ? "Edit" : "Ask a Question"}</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
