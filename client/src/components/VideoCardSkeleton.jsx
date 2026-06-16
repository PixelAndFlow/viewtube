export default function VideoCardSkeleton() {
  return (
    <div className="video-card video-card-skeleton" aria-hidden="true">
      <div className="skeleton-block skeleton-thumb" />
      <div className="video-card-body">
        <div className="skeleton-block skeleton-avatar" />
        <div className="video-card-meta-col">
          <div className="skeleton-block skeleton-line skeleton-line-title" />
          <div className="skeleton-block skeleton-line skeleton-line-title short" />
          <div className="skeleton-block skeleton-line skeleton-line-meta" />
          <div className="skeleton-block skeleton-line skeleton-line-meta short" />
        </div>
      </div>
    </div>
  );
}

export function VideoGridSkeleton({ count = 8 }) {
  return (
    <div className="video-grid">
      {Array.from({ length: count }, (_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}
