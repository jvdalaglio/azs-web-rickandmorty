export default function EpisodesSkeleton(): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow-md p-4 animate-pulse space-y-4"
        >
          <div className="h-5 w-1/2 bg-muted rounded"></div>
          <div className="h-4 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-10 w-full bg-muted rounded mt-2"></div>
        </div>
      ))}
    </div>
  );
}
