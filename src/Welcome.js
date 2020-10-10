import React from "react";

import bundeseagle from "./bundeseagle.svg";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Welcome = () => {
  return (
    <div
      style={{
        padding: "4rem",
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        style={{ marginBottom: "1rem", lineHeight: "1" }}
      >
        Get to know the German Language
      </Typography>
      <Typography variant="h4">with Billi the Bundesadler</Typography>
      <img src={bundeseagle} style={{ margin: "3rem 0", width: "100%" }} />
      <Button
        component={Link}
        to="/"
        variant="contained"
        style={{
          background: "linear-gradient(45deg, #9af30b 30%, #d6d329 90%)",
          borderRadius: 3,
          border: 0,
          color: "white",
          height: 48,
          padding: "0 30px",
          fontWeight: "bold",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        }}
      >
        Let's go!
      </Button>
    </div>
  );
};
