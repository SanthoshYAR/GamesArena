import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import logo from "./images/editors-choice.jpg";
import Rating from "@material-ui/lab/Rating";

function GamesComponent(props) {
  const useStyles = makeStyles({
    root: {
      width: 450,
      margin: 20,
    },
  });
  const classes = useStyles();
  let image;
  if (props.item.editors_choice == "Y") {
    image = (
      <img
        style={{ float: "right" }}
        src={logo}
        width="100px"
        height="100px"
      ></img>
    );
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        {image}
        <Typography
          noWrap={true}
          variant="h4"
          component="h2"
          gutterBottom
          title={props.item.title}
          className={classes.title}
          color="primary"
        >
          {props.item.title}
        </Typography>
        <Typography gutterBottom color="secondary">
          Available on: {props.item.platform}
        </Typography>

        <Typography variant="h5" gutterBottom>
          Genre: {props.item.genre}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Rating
            name="read-only"
            value={props.item.score / 2}
            max={5}
            precision={0.1}
            readOnly
          />
          <b> &nbsp; {props.item.score}</b>
        </div>
      </CardContent>
    </Card>
  );
}
export default GamesComponent;
