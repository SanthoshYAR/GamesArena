import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GamesList from "./GamesList";

export default function App() {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <GamesList />
      </Box>
    </Container>
  );
}
