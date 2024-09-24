import { Container, Grid } from "@mui/material";
import React from "react";
import './App.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Portfolio from "./pages/Porfolio/Portfolio";
import Profile from "./components/Profile/Profile";
import Resume from "./pages/Resume/Resume";

function App() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={12} lg={3} md={4} style={{backgroundColor: "blue"}}>
          <Profile />
        </Grid>
        <Grid item xs={12} sm={12} lg={9} md={8} style={{ backgroundColor: "red" }}>
          <Header />
          <Portfolio />
          <Resume />
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
