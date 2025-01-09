import React from "react";
import "./Tracklist.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => {
          return (
            <div key={track.id} className="Track">
              <div className="Track-information">
                <h3>{track.name}</h3>
                <p>
                  {track.artist} | {track.album}
                </p>
                {track.preview_url && (
                  <audio controls className="Track-preview">
                    <source src={track.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
              <button
                className="Track-action"
                onClick={() => this.props.onAdd(track)}
              >
                +
              </button>
              <button
                className="Track-action"
                onClick={() => this.props.onRemove(track)}
              >
                -
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TrackList;