"use client";
import BackButton from "@/components/movie-detail/BackButton";
import DetailSkeleton from "@/components/movie-detail/DetailSkeleton";
import { getMovieDetails } from "@/store/movieSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Calendar, Clock, Film, Star, Users, Video } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedMovie } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(getMovieDetails(id));
    }
  }, [dispatch, id]);

  if (!selectedMovie) {
    return <DetailSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <div className="movie-detail-container">
        <BackButton />
        <div className="movie-detail-card">
          <div className="movie-detail-flex-layout">
            <div className="md:w-1/3">
              {selectedMovie.Poster !== "N/A" && (
                <img
                  src={selectedMovie.Poster}
                  alt={selectedMovie.Title}
                  className="movie-detail-poster"
                />
              )}
            </div>

            <div className="movie-detail-details-section">
              <h1 className="movie-detail-title">{selectedMovie.Title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="movie-detail-icon movie-detail-icon-text-yellow">
                  <Star className="w-5 h-5 mr-1 fill-current" />
                  <span className="font-semibold">
                    {selectedMovie.imdbRating}
                  </span>
                </div>

                <div className="movie-detail-icon">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{selectedMovie.Runtime}</span>
                </div>

                <div className="movie-detail-icon">
                  <Calendar className="w-5 h-5 mr-1" />
                  <span>{selectedMovie.Released}</span>
                </div>

                <div className="movie-detail-icon">
                  <Film className="w-5 h-5 mr-1" />
                  <span>{selectedMovie.Genre}</span>
                </div>
              </div>

              <p className="movie-detail-text-content">{selectedMovie.Plot}</p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Video className="movie-detail-section-icon" />
                  <div>
                    <h3 className="movie-detail-section-header">Director</h3>
                    <p className="movie-detail-section-subtext">
                      {selectedMovie.Director}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="movie-detail-section-icon" />
                  <div>
                    <h3 className="movie-detail-section-header">Cast</h3>
                    <p className="movie-detail-section-subtext">
                      {selectedMovie.Actors}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
