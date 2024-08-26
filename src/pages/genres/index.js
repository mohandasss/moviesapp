import React, { useEffect, useState } from "react";

/**
 * Components and layouts...
 */
import { MaxWidthLayout, NavbarFooterIncluded, TopSection } from "layouts";
import { getMovieGenres } from "services/api";
import { Link } from "react-router-dom";
import { PATH } from "constants/paths";

/**
 * Images...
 */

const People = () => {
  const [allGenres, setAllGenres] = useState([]);
  const [hoveredGenreId, setHoveredGenreId] = useState(null);

  useEffect(() => {
    (async function () {
      const { genres: allGenresResults } = await getMovieGenres();
      if (allGenresResults) setAllGenres(allGenresResults);
    })();
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredGenreId(id);
  };

  const handleMouseLeave = () => {
    setHoveredGenreId(null);
  };

  return (
    <NavbarFooterIncluded>
      <MaxWidthLayout>
        <TopSection>
          <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-5 md:justify-between">
            <h2 className="text-3xl uppercase font-AtypDisplayBold">
              Available Genres
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {allGenres.map((singleGenre) => {
              const isHovered = singleGenre.id === hoveredGenreId;

              const cardStyle = {
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.2953956582633054) 0%, rgba(0,0,0,0.2469362745098039) 50%, rgba(0,0,0,0.6) 100%), url(/images/genres/${singleGenre.name}.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                textAlign: "center",
                padding: "80px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.3s ease", // Smooth scaling transition
                transform: isHovered ? "scale(1.05)" : "scale(1)", // Scale effect on hover
              };

              return (
                <Link
                  key={singleGenre.id}
                  to={`${PATH.GENRE}/${singleGenre.id}`}
                  style={{ pointerEvents: "none" }} // Disable clicking
                >
                  <div
                    style={cardStyle}
                    onMouseEnter={() => handleMouseEnter(singleGenre.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h2 className="custom-minor-title">{singleGenre.name}</h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </TopSection>
      </MaxWidthLayout>
    </NavbarFooterIncluded>
  );
};

export default People;
