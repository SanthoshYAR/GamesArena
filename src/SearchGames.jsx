import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginLeft: 5,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
  },
  menuOpt: {
    padding: theme.spacing(0, 16, 0, 0),
  },
  select: {
    paddingRight: "10px",
  },
}));

export default function SearchGames(props) {
  const classes = useStyles();
  const [inputString, setVal] = React.useState("");
  const [sortBy, setMenuVal] = React.useState("None");

  const ASC = "RatingsASC";
  const DSC = "RatingsDSC";
  const None = "None";

  const search = (event, target) => {
    //setVal(event.target.value);
    console.log({ inputString });
    props.onSearch(inputString);
  };
  const onEnter = (event) => {
    if (event.keyCode == 13) {
      props.onSearch(inputString);
    }
  };

  const handleInputChange = (event) => {
    setVal(event.target.value);
  };

  const handleMenuChange = (event) => {
    setMenuVal(event.target.value);
    console.log(event.target.value);
    props.onSort(event.target.value);
    //console.log(sortBy);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Games Arena
          </Typography>
          <span className={classes.menuOpt}>
            <InputLabel>Sort by Ratings</InputLabel>
            <Select
              className={classes.select}
              value={sortBy}
              onChange={handleMenuChange}
            >
              <MenuItem value={None}>None</MenuItem>
              <MenuItem value={ASC}>Rating ASC</MenuItem>
              <MenuItem value={DSC}>Rating DSC</MenuItem>
            </Select>
          </span>

          <div className={classes.search}>
            <Input
              value={inputString}
              placeholder="Search…"
              onChange={handleInputChange}
              onKeyDown={onEnter}
              startAdornment={
                <IconButton onClick={search}>
                  {" "}
                  <SearchIcon />
                </IconButton>
              }
              classeName={classes.input}
              inputProps={{
                "aria-label": "search",
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
