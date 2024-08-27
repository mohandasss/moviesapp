import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

/**
 * Components and layouts...
 */
import { MaxWidthLayout, NavbarFooterIncluded, TopSection } from "layouts";
import { Pagination, MovieCard } from "components";
import { getSearchedMovie } from "services/api";
import { useSearchProvider } from "contexts/searchContext";

const SearchMovie = () => {
  const [popularMovies, setPopularMovies] = useState();
  const [selectedPage, setSelectedPage] = useState(1);
  const { searchedKey, updateSearchedKey } = useSearchProvider();
  const searchInputRef = useRef(null); // Reference for the search input

  /**
   * For pagination...
   */
  const moviesPerPage = 20;
  const numberOfRecordsVisited = (selectedPage - 1) * moviesPerPage;
  const totalPagesCalculated = Math.ceil(
    popularMovies?.total_results / moviesPerPage
  );

  const handlePageChange = (providedPage) => {
    setSelectedPage(providedPage);
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateSearchedKey(searchInputRef.current.value);
      setSelectedPage(1); // Reset to the first page on new search
    }
  };

  useEffect(() => {
    (async function () {
      if (searchedKey) {
        const {
          results: popularMoviesResults,
          total_pages,
          total_results,
        } = await getSearchedMovie(searchedKey, selectedPage);
        popularMoviesResults &&
          setPopularMovies({
            popularMoviesResults,
            total_pages,
            total_results,
          });
      }
    })();
  }, [selectedPage, searchedKey]);

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              {`Searched : ${searchedKey}`}
            </h2>
            <div className="flex bg-gray-800 overflow-hidden rounded-md">
              <input
                type="text"
                className="px-8 py-3 border-none outline-none bg-transparent"
                placeholder="Search any movie..."
                ref={searchInputRef} // Set the ref here
                onKeyDown={handleKeyDown} // Add the keydown event handler
              />
              <button
                className="bg-green-500 px-5 text-gray-900"
                onClick={() => {
                  updateSearchedKey(searchInputRef.current.value);
                  setSelectedPage(1); // Reset to the first page on new search
                }}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 md:gap-10">
            {popularMovies?.popularMoviesResults
              .slice(
                numberOfRecordsVisited,
                numberOfRecordsVisited + moviesPerPage
              )
              ?.map((singlePopularMovie) => {
                return (
                  <MovieCard
                    key={singlePopularMovie.id}
                    singlePopularMovie={singlePopularMovie}
                  />
                );
              })}
          </div>
          <div>
            <Pagination
              totalPagesCalculated={totalPagesCalculated}
              handlePageChange={handlePageChange}
            />
          </div>
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default SearchMovie;
