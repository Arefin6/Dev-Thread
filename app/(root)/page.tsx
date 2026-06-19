import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default async function Home() {
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
        // route={ROUTES.HOME}
        // imgSrc="/icons/search.svg"
        // placeholder="Search questions..."
        // iconPosition="left"
        // otherClasses="flex-1"
        />
        <p>Fillters</p>
        {/* <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        /> */}
      </section>

      {/* <HomeFilter /> */}

      <div className="mt-10 flex w-full flex-col gap-6">
        <h2>Question 1</h2>
        <h2>Question 2</h2>
        <h2>Question 3</h2>
      </div>

      {/* <Pagination page={page} isNext={isNext || false} /> */}
    </>
  );
}
