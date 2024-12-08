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
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Search movies..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => dispatch(setSelectedType(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">TV Series</option>
            <option value="episode">Episodes</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => dispatch(setSelectedYear(e.target.value))}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
