import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-grow">
      <div className="container space-y-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton className="aspect-poster" />
          ))}
        </div>
      </div>
    </div>
  );
}
