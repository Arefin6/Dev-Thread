interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}
interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}
interface GetQuestionParams {
  questionId: string;
}
