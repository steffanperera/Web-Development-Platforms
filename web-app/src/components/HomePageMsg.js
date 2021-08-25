import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
    marginBottom: 12,
  },
  bgPattern: {
    backgroundImage: "url('/assets/img/bg-pattern.png')",
    backgroundRepeat: "repeat",
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{ minHeight: "100vh", display: "flex" }}
      justify="center"
      className={`${classes.bgPattern}`}
    >
      <Grid
        item
        style={{
          flexGrow: "1",
          backgroundColor: "rgba(255,255,255)",
        }}
        xs={11}
        sm={10}
        md={9}
      >
        <Grid
          item
          container
          style={{ minHeight: "100%" }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Card align="center" elevation={0} className={`${classes.root}`}>
              <CardContent>
                <Typography
                  variant="h3"
                  component="h3"
                  style={{ fontWeight: "semibold" }}
                  className={classes.pos}
                >
                  Self Agribusiness System by Keells
                </Typography>
                <br />
                <Typography variant="h5" component="h5" className={classes.pos}>
                  Together with the Department of Agriculture
                </Typography>
                <br />
                <Typography className={classes.pos} color="textSecondary">
                  Self Agribusiness System by Keells is an online platform that
                  helps farmers to feed and sell crops
                  <br />
                  directly to John Keells Group Supermarkets.
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <NavLink to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    style={{
                      backgroundColor: "#0284FE",
                      textTransform: "none",
                      marginRight: "14px",
                      color: "white",
                    }}
                  >
                    Get Started Now
                  </Button>
                </NavLink>
                <Button variant="outlined" style={{ textTransform: "none" }}>
                  Learn More 😋
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
