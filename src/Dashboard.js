import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

import { blue, deepOrange, deepPurple } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import TranslateIcon from "@material-ui/icons/Translate";
import bundeseagle from "./bundeseagle.svg";
import ProgressBarExample from "./ProgressBar.js";
import { CameraEnhance } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "5px",
  },
  section: {
    padding: theme.spacing(1),
    margin: "3rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  avatar_root: {
    "& > *": {
      fontSize: 10,
      padding: theme.spacing(0.65),
      margin: theme.spacing(1),
      width: theme.spacing(11),
      height: theme.spacing(11),
    },
  },
  wordRow: {
    display: "flex",
    alignItems: "center",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div
      style={{
        backgroundImage: `url(${bundeseagle})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom left",
        minHeight: "140vh",
      }}
    >
      <div className={classes.section}>
        <Typography className={classes.title} color="textSecondary">
          Word of the Day
        </Typography>
        <div className={classes.wordRow}>
          <Typography variant="h5">Ge{bull}sund{bull}heit</Typography>
          <div style={{ fontSize: "2rem", marginLeft: "0.5rem" }}>🤧</div>
        </div>
        <Typography className={classes.pos} color="textSecondary">
          noun
        </Typography>

        {false && <><div className={classes.wordRow}>
          <Typography variant="h5">Ap{bull}fel</Typography>
          <div style={{ fontSize: "2rem", marginLeft: "0.5rem" }}>🍏</div>
        </div>
          <Typography className={classes.pos} color="textSecondary">
            noun, fruit
        </Typography>
        </>}
      </div>

      <div className={classes.section}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Tips for Tipping
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Tipping in Germany and tipping in some other countries, such as the United States, are totally different. In Germany, waitresses are paid more and so the tips are smaller compared to the USA. Nevertheless, the 5-10% rule of thumb still applies.{" "}
              <Link to="/articles/tipping">Read More...</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className={classes.section}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="body1">Your Progress:</Typography>
            <ProgressBarExample />
          </CardContent>
        </Card>
      </div>

      <div className={classes.section}>
        <div
          className={classes.avatar_root}
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Fab
            color="primary"
            component={Link}
            to="./shopping"
            className="icon-button"
          >
            <ShoppingCartIcon />
            Shopping List
          </Fab>
          <Fab
            color="secondary"
            to="/articles"
            component={Link}
            className="icon-button"
          >
            <MusicNoteIcon />
            Learn About Culture
          </Fab>
          <Fab
            color="primary"
            component={Link}
            to="/vocab"
            className="icon-button"
          >
            <SpellcheckIcon />
            Check Your Vocab
          </Fab>
          <Fab
            color="secondary"
            component={Link}
            to="/translate"
            className="icon-button"
          >
            <TranslateIcon />
            Translate
          </Fab>
          <Fab component={Link} to="/picture-game" className="icon-button">
            <CameraEnhance />
            Picture Game
          </Fab>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
