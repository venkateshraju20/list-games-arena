import React from "react";
import axios from "axios";
import { Menu, Dropdown } from "semantic-ui-react";

import SearchBar from "./SearchBar/SearchBar";
import GamesList from "./GamesList/GamesList";
import { FETCH_GAMES_ARENA } from "./endpoint";

class App extends React.Component {
  state = {
    searchData: null,
    listGames: [],
  };

  async componentDidMount() {
    const response = await axios.get(FETCH_GAMES_ARENA);
    this.setState({ listGames: response.data });
  }

  onSearchSubmit = (term) => {
    this.setState({ searchData: term });
  };

  onSortByPlatformAsc = () => {
    var sortByPlatform = this.state.listGames.sort((a, b) =>
      a.platform.localeCompare(b.platform)
    );
    this.setState({ listGames: sortByPlatform.reverse() });
  };

  onSortByPlatformDesc = () => {
    var sortByPlatform = this.state.listGames.sort((a, b) =>
      a.platform.localeCompare(b.platform)
    );
    this.setState({ listGames: sortByPlatform });
  };

  onSortByScoreToHigh = () => {
    var score = this.state.listGames.sort((a, b) => a.score - b.score);
    this.setState({ listGames: score.reverse() });
  };

  onSortByScoreToLow = () => {
    var score = this.state.listGames.sort((a, b) => a.score - b.score);
    this.setState({ listGames: score });
  };

  render() {
    const { listGames, searchData } = this.state;
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <h2 style={{ textAlign: "center" }}>Games Arena</h2>
        <SearchBar onSubmit={this.onSearchSubmit} />

        {listGames.length === 0 ? (
          <div
            className="ui active centered inline loader"
            style={{ marginTop: "50px" }}
          ></div>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <Menu secondary>
              <Dropdown item text="Sort By Score">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="sort numeric down"
                    text="Low to high"
                    onClick={this.onSortByScoreToLow}
                  />
                  <Dropdown.Item
                    icon="sort numeric up"
                    text="High to low"
                    onClick={this.onSortByScoreToHigh}
                  />
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown item text="Sort By Platform">
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="sort alphabet down"
                    text="Sort by asc"
                    onClick={this.onSortByPlatformAsc}
                  />
                  <Dropdown.Item
                    icon="sort alphabet up"
                    text="Sort by desc"
                    onClick={this.onSortByPlatformDesc}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
            <GamesList gamesList={listGames} searchData={searchData} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
