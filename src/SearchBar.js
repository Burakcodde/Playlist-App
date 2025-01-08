import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Kullanıcı girişini yakalama
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Arama düğmesine tıklanıldığında çağrılır
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Şarkı, sanatçı veya albüm ara..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Ara</button>
    </div>
  );
};

export default SearchBar;
