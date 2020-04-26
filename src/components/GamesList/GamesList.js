import React from "react";
import GameItem from "./GameItem";
import "./GamesList.css";

const GamesList = ({ gamesList, searchData }) => {
  const games = gamesList
    .filter((data) => {
      if (searchData !== null) {
        return String(data.title)
          .toLowerCase()
          .includes(searchData.toLowerCase());
      }
      return data;
    })
    .map((data, index) => {
      return <GameItem key={index} game={data} />;
    });
  return <div className="games-list">{games}</div>;
};

export default GamesList;
