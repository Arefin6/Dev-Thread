"use clint";

import { AskQuestionSchema } from "@/lib/validations";
import { Form } from "@base-ui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Field } from "../ui/field";

const QuestionForm = () => {
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleCreateQuestion = () => {};

  return (
    <form>
      <h2>Form</h2>
    </form>
  );
};

export default QuestionForm;
