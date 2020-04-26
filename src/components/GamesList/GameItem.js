import React from "react";

const GameItem = ({ game }) => {
  return (
    <div className="ui cards">
      <div className="card">
        <div className="content" style={{ background: "#eee" }}>
          <div className="header">{game.title}</div>
          <div className="meta">Platform: {game.platform}</div>
        </div>
        <div className="content">
          <div className="extra">Score: {game.score}</div>
          <div className="description">Genre: {game.genre}</div>
          <div className="description">
            {game.editors_choice === "Y" ? (
              <div>
                Editor's Choice: <i className="trophy icon"></i>{" "}
              </div>
            ) : null}
          </div>
          <div className="meta">Release year: {game.release_year}</div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
