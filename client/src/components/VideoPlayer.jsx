export default function VideoPlayer({ videoId }) {
  return (
    <div className="watch-player-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
