"use client";
import Image from "next/image";
import { Input } from "../ui/input";

const LocalSearch = ({ iconPosition = "left" }) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4`}
    >
      {iconPosition === "left" && (
        <Image
          src="/icons/search.svg"
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={"Search.."}
        // value={searchQuery}
        //onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {/* {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={15}
          height={15}
          alt="Search"
          className="cursor-pointer"
        />
      )} */}
    </div>
  );
};

export default LocalSearch;
