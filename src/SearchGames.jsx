import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";

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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    width: "100%",
  },
  menuBtn: {
    padding: theme.spacing(0, 16, 0, 0),
  },
}));

export default function SearchGames(props) {
  const classes = useStyles();
  let [inputString, setVal] = React.useState("");

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

  const handleChange = (event) => {
    setVal(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuClick = (event, index) => {
    console.log(event.currentTarget);
    setSelectedIndex(index);
    console.log(index);
    handleClose();
  };

  const ASC = "RatingsASC";
  const DSC = "RatingsDSC";
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Games Arena
          </Typography>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.menuBtn}
          >
            <SortIcon /> Sort
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem key={ASC} selected={selectedIndex} onClick={onMenuClick}>
              Sort by Rating ASC
            </MenuItem>
            <MenuItem key={DSC} selected={selectedIndex} onClick={onMenuClick}>
              Sort by Rating DSC
            </MenuItem>
          </Menu>
          <div className={classes.search}>
            <Input
              value={inputString}
              placeholder="Search…"
              onChange={handleChange}
              onKeyDown={onEnter}
              startAdornment={
                <IconButton onClick={search}>
                  {" "}
                  <SearchIcon />
                </IconButton>
              }
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
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
