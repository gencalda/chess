export function SkeletonList({
  itemCount = 10,
  className,
}: {
  itemCount: number;
  className?: string;
}) {
  return (
    <ul className={`animate-pulse divide-y divide-gray-200 pt-4 ${className}`}>
      {[...Array(itemCount)].map((_, idx) => (
        <li className="animate-pulse py-2" key={idx}>
          <div className="h-6 bg-gray-200 rounded w-1/3" />
        </li>
      ))}
    </ul>
  );
}
