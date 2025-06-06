export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse h-4 bg-gray-200 rounded w-1/3 ${className}`}
    />
  );
}
