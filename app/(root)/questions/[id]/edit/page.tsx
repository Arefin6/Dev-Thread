import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/questionAction";

const EditQuestion = async ({ params }: RouteParams) => {
  const { id } = await params;
  console.log("EditQuestion params:", id);
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect(ROUTES.SIGNIN);

  const { data: question, success } = await getQuestion({ questionId: id });
  console.log("EditQuestion question:", question, "success:", success);

  // if (!success) return notFound();

  //   if (question?.author._id.toString() !== session?.user?.id)
  //     redirect(ROUTES.QUESTION(id));

  return (
    <main>
      <QuestionForm question={question} isEdit />
    </main>
  );
};

export default EditQuestion;
