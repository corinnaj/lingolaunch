import React from "react";
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
// import bundeseagle from "./bundeseagle.svg";
// import pheasant from "./green-pheasant.svg";
import VocabProgressBar from "./ProgressBar.js";

const theme = createTheme();
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

function Dashboard({ isJapanese }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  // const logo = bundeseagle;

  return (
    <div
      style={{
        // backgroundImage: `url(${logo})`,
        // backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "bottom left",
        // minHeight: "140vh",
      }}
    >

      <div className={classes.section}>
        <Typography>
          Word of the Day
        </Typography>
        {!isJapanese && (
          <>
            <div className={classes.wordRow}>
              <Typography variant="h5">
                Ge{bull}sund{bull}heit
              </Typography>
              <div style={{ fontSize: "2rem", marginLeft: "0.5rem" }}>🤧</div>
            </div>
            <Typography className={classes.pos} color="textSecondary">
              noun
            </Typography>
          </>
        )}
      </div>

      <div className={classes.section}>
        <Card elevation={4}>
          <CardContent>
            <Typography component={'span'} variant="body1">
              <p>Your first German Words!</p>
            </Typography>
            <VocabProgressBar />
          </CardContent>
        </Card>
      </div>

      {!isJapanese && (
        <>
          <div className={classes.section}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Article of the Day {bull} Tips for Tipping
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Tipping in Germany and tipping in some other countries, such
                  as the United States, are totally different. In Germany,
                  waitresses are paid more and so the tips are smaller compared
                  to the USA. Nevertheless, the 5-10% rule of thumb still
                  applies. <Link to="/articles/tipping">Read More...</Link>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {isJapanese && (
        <>
          <div className={classes.section}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Article of the Day {bull} Bowing Culture
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  The bow is an integral part of Japanese society. It is used to
                  greet when meeting, to get attention, to show gratitude, to
                  express sympathy, or to convey an apology. While doing
                  business in Japan as a Westerner, you would not be expected to
                  bow. <Link to="/articles/tipping">Read More...</Link>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </>
      )}

    {/*  <div className={classes.section}>*/}
    {/*    <div*/}
    {/*      className={classes.avatar_root}*/}
    {/*      style={{*/}
    {/*        alignItems: "center",*/}
    {/*        display: "flex",*/}
    {/*        flexWrap: "wrap",*/}
    {/*        justifyContent: "center",*/}
    {/*      }}*/}
    {/*    >*/}
    {/*      <Fab*/}
    {/*        color="primary"*/}
    {/*        component={Link}*/}
    {/*        to="./shopping"*/}
    {/*        className="icon-button"*/}
    {/*      >*/}
    {/*        <ShoppingCartIcon />*/}
    {/*        Shopping List*/}
    {/*      </Fab>*/}
    {/*      <Fab*/}
    {/*        color="secondary"*/}
    {/*        to="/articles"*/}
    {/*        component={Link}*/}
    {/*        className="icon-button"*/}
    {/*      >*/}
    {/*        <MusicNoteIcon />*/}
    {/*        Learn About Culture*/}
    {/*      </Fab>*/}
    {/*      <Fab*/}
    {/*        color="primary"*/}
    {/*        component={Link}*/}
    {/*        to="/vocab"*/}
    {/*        className="icon-button"*/}
    {/*      >*/}
    {/*        <SpellcheckIcon />*/}
    {/*        Check Your Vocab*/}
    {/*      </Fab>*/}
    {/*      <Fab*/}
    {/*        color="secondary"*/}
    {/*        component={Link}*/}
    {/*        to="/translate"*/}
    {/*        className="icon-button"*/}
    {/*      >*/}
    {/*        <TranslateIcon />*/}
    {/*        Translate*/}
    {/*      </Fab>*/}
    {/*      <Fab component={Link} to="/picture-game" className="icon-button">*/}
    {/*        <CameraEnhance />*/}
    {/*        Picture Game*/}
    {/*      </Fab>*/}
    {/*    </div>*/}
    {/*  </div>*/}
    </div>
  );
}

export default Dashboard;
