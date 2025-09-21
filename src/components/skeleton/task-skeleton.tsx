import { Card, CardContent } from "../ui/card";
import { Skeleton } from "./skeleton";

export function TaskSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-10 w-full sm:w-1/2" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="w-full">
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
