const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  ASK_QUESTION: "/ask-question",
  COLLECTION: "/collection",
  QUESTION: (id: string) => `/questions/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
  TAGS: "/tags",
  TAG: (id: string) => `/tags/${id}`,
  SIGN_IN_WITH_OAUTH: "/signin-with-oauth",
};
export default ROUTES;
