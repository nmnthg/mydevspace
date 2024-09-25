import { Container, Grid } from "@mui/material";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Portfolio from "./pages/Porfolio/Portfolio";
import Profile from "./components/Profile/Profile";
import Resume from "./pages/Resume/Resume";

function App() {
  return (
    <Router>
      <Container>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            lg={3}
            md={4}
            style={{ backgroundColor: "blue" }}
          >
            <Profile />
          </Grid>
          <Grid item xs style={{ backgroundColor: "red" }}>
            <Header />
            <Routes>
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/" element={<Resume />} />
            </Routes>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;
