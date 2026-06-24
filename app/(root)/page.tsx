import QuestionCard from "@/components/Cards/QuestionCard";
import HomeFilter from "@/components/fillters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default async function Home() {
  const sampleQuestions: Question[] = [
    {
      _id: "q1",
      title: "How to fix N+1 query bottlenecks in a MERN stack feed component?",
      content:
        "I am building a social timeline feed and noticed my API latency spikes drastically when checking user interactions inside a loop. What is the most efficient way to map and resolve this data in bulk on the server?",
      tags: [
        { _id: "t1", name: "mongodb", questions: 1420 },
        { _id: "t2", name: "node.js", questions: 3500 },
        { _id: "t3", name: "performance", questions: 890 },
      ],
      author: {
        _id: "u101",
        name: "Alex Dev",
        //avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex",
      },
      createdAt: new Date("2026-06-20T10:30:00Z"),
      upvotes: 42,
      downvotes: 1,
      answers: 5,
      views: 312,
    },
    {
      _id: "q2",
      title:
        "Why does the Two-Pointer 3Sum solution hit a Memory Limit Exceeded error?",
      content:
        "My C++ array sorting and while-loop algorithm keeps crashing the compiler with an MLE fault on specific edge cases like long duplicate streaks of zeros. Am I failing to increment pointers properly upon a matching triplet?",
      tags: [
        { _id: "t4", name: "cpp", questions: 2150 },
        { _id: "t5", name: "dsa", questions: 4110 },
        { _id: "t6", name: "leetcode", questions: 1820 },
      ],
      author: {
        _id: "u102",
        name: "Sam Codes",
        //avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sam",
      },
      createdAt: new Date("2026-06-23T14:15:00Z"),
      upvotes: 18,
      downvotes: 0,
      answers: 2,
      views: 145,
    },
    {
      _id: "q3",
      title:
        "Optimizing PostgreSQL indexing strategies for deep subqueries and joins",
      content:
        "We are migrating from an unstructured schema to a highly relational PostgreSQL setup. When writing heavy nested joins across thousands of users, which composite unique indexes offer the best query plan optimization?",
      tags: [
        { _id: "t7", name: "postgresql", questions: 2890 },
        { _id: "t8", name: "backend", questions: 5200 },
        { _id: "t9", name: "database", questions: 3100 },
      ],
      author: {
        _id: "u103",
        name: "Elena Systems",
        //avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Elena",
      },
      createdAt: new Date("2026-06-24T08:00:00Z"),
      upvotes: 56,
      downvotes: 2,
      answers: 8,
      views: 620,
    },
  ];
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
          <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
            Ask a Question
          </Link>
        </Button>
      </section>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.HOME}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          iconPosition="left"
          otherClasses="flex-1"
        />

        {/* <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        /> */}
      </section>

      <HomeFilter />

      <div className="mt-10 flex w-full flex-col gap-6">
        {sampleQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>

      {/* <Pagination page={page} isNext={isNext || false} /> */}
    </>
  );
}
