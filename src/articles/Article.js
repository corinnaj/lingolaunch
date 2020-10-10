import React from "react";

import { Container, Typography } from "@material-ui/core";

export const Article = ({ title, children }) => {
  return (
    <Container>
      <Typography variant="h3">{title}</Typography>
      <div style={{ fontSize: "1.1rem" }}>{children}</div>
      <div style={{ height: "2rem" }}></div>
    </Container>
  );
};
