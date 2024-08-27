import React, { useState, useEffect } from "react";
import { SearchMovie } from "pages";
import Loader from "./Loader "; // Assuming you have a Loader component

const SearchRoute = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or any other async operation
    const fetchData = async () => {
      // Simulating a fetch delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />; // Render the loader while loading is true
  }

  return (
    <>
      <SearchMovie />
    </>
  );
};

export default SearchRoute;
