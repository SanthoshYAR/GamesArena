import React from "react";
import GamesComponent from "./GamesComponent";
import Pagination from "@material-ui/lab/Pagination";
import SearchGames from "./SearchGames";
import GridList from "@material-ui/core/GridList";

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      gamesInPage: [],
      selectedPage: 1,
      count: 0,
      perPage: 10,
      IsResultsFiltered: false,
      searchResults: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com/gamesarena")
      .then((res) => res.json())
      .then((data) => {
        let games = data.splice(1, data.length);
        let gamesInPage = games.slice(0, this.state.perPage);

        this.setState({
          games: games,
          gamesInPage: gamesInPage,
          count: Math.ceil(games.length / 10),
        });
        console.log(this.state);
      })
      .catch(console.log);
  }
  handleChange = (event, value) => {
    //this.setState({ selectedPage: value });
    //console.log(value);
    let startIndex = (value - 1) * this.state.perPage;
    let lastIndex = value * this.state.perPage;
    let gamesInPage = this.state.IsResultsFiltered
      ? this.state.searchResults.slice(startIndex, lastIndex)
      : this.state.games.slice(startIndex, lastIndex);
    this.setState({
      gamesInPage: gamesInPage,
    });
  };

  searchInGames = (val) => {
    let search = [];
    let count = 0;
    val = val.toLowerCase();
    search = this.state.games.filter(
      (item) =>
        item.title.toLowerCase().indexOf(val) > -1 ||
        item.platform.toLowerCase().indexOf(val) > -1
    );
    console.log(search);
    count = Math.ceil(search.length / 10);
    this.setState({
      searchResults: search,
      gamesInPage: search.slice(0, this.state.perPage),
      count: count,
      IsResultsFiltered: true,
    });
  };

  render() {
    let { count, gamesInPage } = this.state;
    console.log(this.state);

    return (
      <div>
        <SearchGames onSearch={this.searchInGames} />
        {gamesInPage.length == 0 ? (
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            No results to display
          </h3>
        ) : (
          <React.Fragment>
            <GridList style={{ justifyContent: "center" }}>
              {gamesInPage.map((item) => (
                <GamesComponent item={item}></GamesComponent>
              ))}
            </GridList>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={count}
                color="primary"
                onChange={this.handleChange}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default GamesList;
