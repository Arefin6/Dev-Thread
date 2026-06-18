const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  QUESTION: (id: string) => `/question/${id}`,
  TAG: (id: string) => `/tags/${id}`,
};
export default ROUTES;
