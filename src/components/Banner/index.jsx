import React from 'react'
import { Container, Typography, Button, Grid } from "@material-ui/core";
import "./style.css";

const Banner = (props) => {
  return (
    <div className="banner">
      <Container>
        <Grid container spacing={4}>
          <Grid className="brand" item sm={6}>
            <img src={props.imagem} alt="Brand-tv" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
