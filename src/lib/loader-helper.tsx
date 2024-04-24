import { Skeleton } from "@/components/ui/skeleton";

export const renderLoader = () => {
  return (
    <>
      {Array.from([1, 2, 3, 4]).map((a, i) => {
        return (
          <div key={i} className="rounded-lg w-full h-[72px] mb-4">
            <Skeleton className="w-full h-full" />
          </div>
        );
      })}
    </>
  );
};
