import { Movie, MovieDetails } from "@/types/movie";
import axios from "axios";

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export const searchMovies = async (
  searchTerm: string,
  page: number = 1,
  type?: string,
  year?: string
) => {
  const params = {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
    s: searchTerm,
    page,
    ...(type && { type }),
    ...(year && { y: year }),
  };

  const response = await axios.get<SearchResponse>(
    process.env.NEXT_PUBLIC_API_BASE_URL as string,
    { params }
  );
  return response.data;
};

export const getMovieDetails = async (imdbId: string) => {
  const params = {
    apikey: process.env.NEXT_PUBLIC_API_KEY,
    i: imdbId,
    plot: "full",
  };

  const response = await axios.get<MovieDetails>(
    process.env.NEXT_PUBLIC_API_BASE_URL as string,
    { params }
  );
  return response.data;
};
