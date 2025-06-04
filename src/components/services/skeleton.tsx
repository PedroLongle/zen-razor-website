export default function ServicesSkeleton() {
  // Create an array of 3 items for the skeleton
  const skeletonItems = Array.from({ length: 3 }, (_, index) => index);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
      {skeletonItems.map((index) => (
        <div 
          key={index} 
          className="border border-border rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-video bg-accent/20 relative overflow-hidden" />
          
          <div className="p-6">
            {/* Title and price skeleton */}
            <div className="flex justify-between items-center mb-3">
              <div className="h-6 bg-accent/20 rounded w-2/3" />
              <div className="h-6 bg-accent/20 rounded w-16" />
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-accent/20 rounded w-full" />
              <div className="h-4 bg-accent/20 rounded w-5/6" />
            </div>
            
            {/* Button skeleton */}
            <div className="h-4 bg-accent/20 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
} 