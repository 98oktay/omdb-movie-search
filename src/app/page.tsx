"use client";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import SearchFilters from "@/components/SearchFilters";
import { searchMovies, setCurrentPage } from "@/store/movieSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Movies: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    loading,
    error,
    currentPage,
    totalResults,
    searchTerm,
    selectedType,
    selectedYear,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(
      searchMovies({
        searchTerm,
        page: currentPage,
        type: selectedType,
        year: selectedYear,
      })
    );
  }, [dispatch, searchTerm, currentPage, selectedType, selectedYear]);

  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(setCurrentPage(page));
    dispatch(
      searchMovies({ searchTerm, page, type: selectedType, year: selectedYear })
    );
  };

  if (error) {
    return <div className="movie-list-error-message">{error}</div>;
  }

  return (
    <div className="movie-list-container">
      <SearchFilters />

      {loading ? (
        <div className="movie-list-loading">
          <Loader2 className="movie-list-loading-icon" />
        </div>
      ) : (
        <>
          <div className="movie-list-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {totalResults > 0 && (
            <div className="movie-list-pagination-container">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {totalResults === 0 && (
            <div className="movie-list-no-results">
              No movies found. Try adjusting your search criteria.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
