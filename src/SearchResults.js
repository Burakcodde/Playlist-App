import React from "react";
import Tracklist from "./Tracklist";

const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Arama Sonuçları</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
};

export default SearchResults;
