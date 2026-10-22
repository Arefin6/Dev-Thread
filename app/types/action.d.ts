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

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}
