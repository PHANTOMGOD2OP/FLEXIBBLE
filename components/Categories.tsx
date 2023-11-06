"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryFilters } from "@/constants";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const handleTag = (tag: string) => {
    router.push(`${pathName}?category=${tag}`);
  };
  // mx-auto max-w-screen-xl
  return (
    <div className="flexBetween w-full gap-5 flex-wrap ">
      <ul className="flex gap-5 overflow-auto">
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            }px-4 py-3 rounded-lg capitalize whitespace-nowrap `}
            onClick={() => handleTag(filter)}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
