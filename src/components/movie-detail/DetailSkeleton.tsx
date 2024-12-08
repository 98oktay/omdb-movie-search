import BackButton from "./BackButton";

export default function DetailSkeleton() {
  return (
    <div className="min-h-screen ">
      <div className="movie-detail-container">
        <BackButton />
        <div className="movie-detail-card">
          <div className="movie-detail-flex-layout">
            <div className="md:w-1/3 movie-detail-animate-pulse-box"></div>
            <div className="movie-detail-details-section">
              {[...Array(10)].map((_, idx) => (
                <div
                  key={idx}
                  className="movie-detail-animate-pulse-box h-4 w-full mb-4"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
