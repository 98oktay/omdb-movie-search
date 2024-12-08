import {
  setSearchTerm,
  setSelectedType,
  setSelectedYear,
} from "@/store/movieSlice";
import { RootState } from "@/store/store";
import { Search } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchFilters: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, selectedType, selectedYear } = useSelector(
    (state: RootState) => state.movies
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white/5 p-4 rounded-3xl md:rounded-full shadow-md space-y-4 md:mt-10">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center">
        <div className="w-full md:flex-1 relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            placeholder="Search movies..."
            className="w-full pl-10 pr-4 py-3 border rounded-3xl 
          text-white
          bg-transparent
          focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="w-full md:w-[200px]">
          <select
            value={selectedType}
            onChange={(e) => dispatch(setSelectedType(e.target.value))}
            className="w-full p-2 border bg-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-700"
          >
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">TV Series</option>
            <option value="episode">Episodes</option>
          </select>
        </div>

        <div className="w-full md:w-[200px]">
          <select
            value={selectedYear}
            onChange={(e) => dispatch(setSelectedYear(e.target.value))}
            className="w-full p-2 border bg-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-700"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
