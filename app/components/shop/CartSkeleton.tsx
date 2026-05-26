import { Skeleton } from "../ui/skeleton/Skeleton";

export function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-500">
      {/* Left Rail Skeleton */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white border border-slate-100 rounded-sm p-6 space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="w-16 h-20 rounded-sm" /> {/* Image */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" /> {/* Title */}
                <Skeleton className="h-3 w-1/4" /> {/* Stock status */}
              </div>
              <Skeleton className="h-8 w-20" /> {/* Qty control */}
              <Skeleton className="h-4 w-16" />   {/* Total price */}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Summary Skeleton */}
      <div className="lg:col-span-4 bg-white border border-slate-100 rounded-sm p-8 space-y-6">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}