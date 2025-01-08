import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import { searchTracks, savePlaylistToSpotify, getAuthUrl } from "./Spotify";
import "./App.css";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Yeni Çalma Listesi");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("access_token");

    if (!token && hash) {
      token = new URLSearchParams(hash.substring(1)).get("access_token");
      window.location.hash = "";
      window.localStorage.setItem("access_token", token);
    }

    // Eğer token yoksa, kullanıcıyı yetkilendirme sayfasına yönlendir
    if (!token) {
      window.location.href = getAuthUrl();
    } else {
      setAccessToken(token);
    }
  }, []);

  const search = async (term) => {
    const results = await searchTracks(term);
    setSearchResults(results);
  };

  const addTrack = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prev) =>
      prev.filter((savedTrack) => savedTrack.id !== track.id)
    );
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    await savePlaylistToSpotify(accessToken, playlistName, trackUris);
    setPlaylistName("Yeni Çalma Listesi");
    setPlaylistTracks([]);
  };

  return (
    <div className="App">
      <h1>Jammming</h1>
      <SearchBar onSearch={search} />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
};

export default App;
