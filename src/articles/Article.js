import React from "react";

import { Container, Typography } from "@material-ui/core";
import "../App.css";

export const Article = ({ title, children, image }) => {
  return (
    <Container>
      <img className="coverImage" src={image} />
      <Typography variant="h3">{title}</Typography>
      <div style={{ fontSize: "1.1rem" }}>{children}</div>
      <div style={{ height: "2rem" }}></div>
    </Container>
  );
};
