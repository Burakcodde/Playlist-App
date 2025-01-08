const clientId = "732b2560f50d43e885796edcb30e1ebb"; // Spotify Client ID'nizi buraya ekleyin
const redirectUri = "http://localhost:3000/"; // Redirect URI'nizi buraya ekleyin

// Kullanıcıyı yetkilendirme sayfasına yönlendirmek için URL oluşturma
const getAuthUrl = () => {
  const scopes = "playlist-modify-public playlist-modify-private";
  return `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
};

// Spotify API ile arama yapmak
const searchTracks = async (term) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();

    if (data.tracks && data.tracks.items) {
      return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error searching for tracks:", error);
    return [];
  }
};

// Çalma listesini Spotify'a kaydetmek
const savePlaylistToSpotify = async (accessToken, playlistName, trackUris) => {
  try {
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          description: "My custom playlist created with Jammming app",
          public: true,
        }),
      }
    );

    if (!createPlaylistResponse.ok) {
      throw new Error("Failed to create playlist");
    }

    const createPlaylistData = await createPlaylistResponse.json();

    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${createPlaylistData.id}/tracks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      }
    );

    if (!addTracksResponse.ok) {
      throw new Error("Failed to add tracks to playlist");
    }

    const addTracksData = await addTracksResponse.json();
    return addTracksData;
  } catch (error) {
    console.error("Error saving playlist to Spotify:", error);
  }
};

export { getAuthUrl, savePlaylistToSpotify, searchTracks };
