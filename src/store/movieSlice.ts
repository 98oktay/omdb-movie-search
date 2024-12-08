import * as api from "@/services/api";
import { Movie, MovieDetails } from "@/types/movie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MovieState {
  movies: Movie[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  selectedMovie: MovieDetails | null;
  currentPage: number;
  searchTerm: string;
  selectedType: string;
  selectedYear: string;
}

const initialState: MovieState = {
  movies: [],
  totalResults: 0,
  loading: false,
  error: null,
  selectedMovie: null,
  currentPage: 1,
  searchTerm: "Pokemon",
  selectedType: "",
  selectedYear: "",
};

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({
    searchTerm,
    page,
    type,
    year,
  }: {
    searchTerm: string;
    page: number;
    type?: string;
    year?: string;
  }) => {
    const response = await api.searchMovies(searchTerm, page, type, year);
    return response;
  }
);

export const getMovieDetails = createAsyncThunk(
  "movies/getDetails",
  async (imdbId: string) => {
    const response = await api.getMovieDetails(imdbId);
    return response;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
      state.currentPage = 1;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.selectedMovie = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.Search || [];
        state.totalResults = parseInt(action.payload.totalResults) || 0;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSelectedType,
  setSelectedYear,
  setCurrentPage,
} = movieSlice.actions;
export default movieSlice.reducer;
