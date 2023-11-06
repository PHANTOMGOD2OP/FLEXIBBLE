"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
type Props = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}: Props) => {
  const router = useRouter();
  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }
    const newParams = currentParams.toString();
    const newPathName = `${window.location.pathname}?${newParams}`;
    router.push(newPathName);
  };
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasNextPage && (
        <Button title="next" handleClick={() => handleNavigation("next")} />
      )}
      {hasPreviousPage && (
        <Button
          title="First page"
          handleClick={() => handleNavigation("first")}
        />
      )}
    </div>
  );
};

export default LoadMore;
