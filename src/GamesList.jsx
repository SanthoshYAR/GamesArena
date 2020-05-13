import React from "react";
import GamesComponent from "./GamesComponent";
import Pagination from "@material-ui/lab/Pagination";
import SearchGames from "./SearchGames";
import GridList from "@material-ui/core/GridList";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      sortResults: [],
      IsResultsSorted: false,
      sortOrder: "",
      dataLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://starlord.hackerearth.com/gamesarena"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ dataLoaded: true });
        if (data.length) {
          let games = data.splice(1, data.length);
          let gamesInPage = games.slice(0, this.state.perPage);
          let count = Math.ceil(games.length / 10);
          this.setState({
            games: games,
            gamesInPage: gamesInPage,
            count: count,
          });
          console.log(this.state);
        }
      })
      .catch(console.log);
  }
  handleChange = (event, value) => {
    let {
      games,
      searchResults,
      IsResultsFiltered,
      IsResultsSorted,
      perPage,
      sortOrder,
    } = this.state;
    this.setState({ selectedPage: value });
    console.log(value);
    let startIndex = (value - 1) * perPage;
    let lastIndex = value * perPage;
    let gamesInPage = IsResultsFiltered ? searchResults : games;
    gamesInPage = IsResultsSorted
      ? gamesInPage.slice().sort(this.dynamicsort("score", sortOrder))
      : gamesInPage;
    gamesInPage = gamesInPage.slice(startIndex, lastIndex);
    this.setState({
      gamesInPage: gamesInPage,
    });
  };

  searchInGames = (val) => {
    let { games, sortOrder } = this.state;
    let flag = false;
    let search = [];
    let count = 0;
    val = val.toLowerCase();
    flag = val.length > 0 ? true : false;
    search = games.filter(
      (item) =>
        item.title.toLowerCase().indexOf(val) > -1 ||
        item.platform.toLowerCase().indexOf(val) > -1
    );
    console.log(search);
    count = Math.ceil(search.length / 10);
    search = this.state.IsResultsSorted
      ? search.sort(this.dynamicsort("score", sortOrder))
      : search;

    this.setState({
      searchResults: search,
      gamesInPage: search.slice(0, this.state.perPage),
      count: count,
      IsResultsFiltered: flag,
      selectedPage: 1,
    });
  };
  dynamicsort = (property, order) => {
    var sort_order = 1;
    if (order === "RatingsDSC") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  };
  sortGames = (val) => {
    let sorted = [];
    let flag = false;
    let { games, perPage, IsResultsFiltered, searchResults } = this.state;
    let count = 0;
    let order;
    let input = [];
    input = IsResultsFiltered ? searchResults : games;

    sorted =
      val != "None"
        ? input.slice().sort(this.dynamicsort("score", val))
        : input; //slice  before sort will not the changes the original array
    flag = val != "None" ? true : false;
    console.log(sorted);
    count = Math.ceil(sorted.length / 10);
    this.setState({
      searchResults: sorted,
      gamesInPage: sorted.slice(0, perPage),
      count: count,
      IsResultsSorted: flag,
      sortOrder: val,
      selectedPage: 1,
    });
  };

  render() {
    let { count, gamesInPage, dataLoaded } = this.state;
    console.log(this.state);

    return (
      <div>
        <SearchGames onSort={this.sortGames} onSearch={this.searchInGames} />
        {!dataLoaded ? (
          <Backdrop open={!dataLoaded} style={{ color: "white" }}>
            <CircularProgress color="white" />
          </Backdrop>
        ) : (
          <React.Fragment>
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
                    defaultPage={1}
                    page={this.state.selectedPage}
                    onChange={this.handleChange}
                  />
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default GamesList;
