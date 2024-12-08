import { Movie } from "@/types/movie";
import { Calendar, Film } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.imdbID}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster"
            }
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2">
            {movie.Title}
          </h3>
          <div className="mt-2 flex items-center text-sm text-gray-600 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{movie.Year}</span>
            </div>
            <div className="flex items-center">
              <Film className="w-4 h-4 mr-1" />
              <span className="capitalize">{movie.Type}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
