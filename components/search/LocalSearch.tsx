"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  iconPosition?: "left" | "right";
  otherClasses?: string;
}

const LocalSearch = ({
  route,
  imgSrc,
  placeholder,
  iconPosition = "left",
  otherClasses,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);

  // Keep input state in sync if URL query parameter changes externally (e.g. back button)
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Debounce input updates and sync to URL
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentQuery = searchParams.get("query") || "";

      if (searchQuery) {
        // Only push if the search query actually changed
        if (searchQuery !== currentQuery) {
          const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "query",
            value: searchQuery,
          });

          router.push(newUrl, { scroll: false });
        }
      } else {
        // Remove 'query' key if input is cleared and query exists in URL
        if (currentQuery && pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500); // 500ms debounce gives a smoother typing experience

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, route, pathname, router]); // ❌ Omitted searchParams to break loop

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          width={15}
          height={15}
          alt="Search"
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
