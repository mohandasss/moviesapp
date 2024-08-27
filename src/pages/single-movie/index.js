import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MaxWidthLayout,
  NavbarFooterIncluded,
  OtherSection,
  TopSection,
  MovieContainer,
} from "layouts";
import { getSingleMovie, getSingleMovieCredits, getSimilarMovies } from "services/api";
import { truncateString } from "utils/truncateString";
import { extractImgPoster } from "utils/extractImg";
import { BsStarFill } from "react-icons/bs";
import Loader from "../../routes/searchRoute/Loader "; // Assuming you have a Loader component

const SingleMovie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const [singleMovieCredits, setSingleMovieCredits] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const [loading, setLoading] = useState(true); // Loading state
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true); // Set loading to true at the start of data fetch
    (async function () {
      try {
        const result = await getSingleMovie(movieId);
        const creditResult = await getSingleMovieCredits(movieId);
        const { results: similarMoviesResult } = await getSimilarMovies(movieId);
        
        if (result) setSingleMovie(result);
        if (creditResult) setSingleMovieCredits(creditResult);
        if (similarMoviesResult) setSimilarMovies(similarMoviesResult.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    })();
  }, [movieId]);

  if (loading) return <Loader />; // Show loader when loading is true

  if (!singleMovie) return null;

  return (
    <NavbarFooterIncluded>
      <div
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8953956582633054) 0%, rgba(0,0,0,0.7469362745098039) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
        className="min-h-[60vh] w-full flex items-center py-28 md:py-36 space-y-10"
      >
        <MaxWidthLayout>
          <div className="grid grid-cols-1 md:grid-cols-[28%_70%] gap-[2%]">
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={extractImgPoster(singleMovie.poster_path)}
                alt={singleMovie.title}
                className="rounded-md shadow-lg"
              />
            </div>
            <div className="self-center space-y-5">
              <h1 className="text-center md:text-left custom-movie-title">
                {singleMovie.title}
              </h1>
              <p className="flex items-center space-x-2">
                <span className="text-2xl text-yellow-500">
                  <BsStarFill />
                </span>
                <span className="pt-1">{singleMovie.vote_average}</span>
              </p>
              <p className="leading-7">
                {truncateString(singleMovie.overview)}
              </p>
            </div>
          </div>
        </MaxWidthLayout>
      </div>

      <TopSection>
        <MaxWidthLayout>
          <div className="grid grid-cols-1 md:grid-cols-[76%_20%] gap-[4%]">
            <div className="space-y-8">
              <h2 className="custom-section-title">All Casts</h2>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                {singleMovieCredits.cast.slice(0, 16).map((singleCast) => {
                  return (
                    <div key={singleCast.id} className="space-y-2">
                      <div className="max-h-[320px] overflow-hidden rounded-md">
                        {singleCast.profile_path ? (
                          <img
                            src={extractImgPoster(singleCast.profile_path)}
                            className="object-cover w-full h-full rounded-md"
                          />
                        ) : (
                          <div className="h-[320px] rounded-md bg-gray-100"></div>
                        )}
                      </div>
                      <h2>{singleCast.original_name}</h2>
                      <p>{singleCast.character}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="custom-minor-title">Genres</h2>
                <div className="flex flex-row flex-wrap">
                  {singleMovie.genres.map((singleGenre) => {
                    return (
                      <p
                        key={singleGenre.id}
                        className="px-5 py-2 mx-1 my-1 border border-gray-500 rounded-md"
                      >
                        {singleGenre.name}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Release Date</h2>
                <p>{singleMovie.release_date}</p>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Rating</h2>
                <p>{singleMovie.vote_average}</p>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Popularity</h2>
                <p>{singleMovie.popularity}</p>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Revenue</h2>
                <p>{singleMovie.revenue}</p>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Status</h2>
                <p>{singleMovie.status}</p>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Runtime</h2>
                <p>{singleMovie.runtime}</p>
              </div>

              <div className="space-y-2">
                <h2 className="custom-minor-title">Tagline</h2>
                <p>{singleMovie.tagline}</p>
              </div>
            </div>
          </div>
        </MaxWidthLayout>
      </TopSection>
      <OtherSection>
        {similarMovies && (
          <MovieContainer
            sectionTitle="Similar Movies"
            moviesList={similarMovies}
          />
        )}
      </OtherSection>
    </NavbarFooterIncluded>
  );
};

export default SingleMovie;
