import React from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import useFetch from "use-http";
import { NavLink, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  bgPattern: {
    backgroundImage: "url('/assets/img/bg-pattern.png')",
    backgroundRepeat: "repeat",
    minHeight: "100vh",
  },
});
const SignIn = ({ setLoggedIn }) => {
  const { control, handleSubmit, reset } = useForm();
  const history = useHistory();
  const classes = useStyles();
  const { post, response } = useFetch("http://localhost:3001");

  const getRouteFromAccType = (type) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "FARMER":
        return "/farmer";
      case "ADMIN":
        return "/admin";
      case "KEELLS":
        return "/keells";
      case "DOA":
        return "/doa";
    }
  };
  const onSubmit = (values) => {
    console.log(values);
    const signIn = async () => {
      const result = await post("/signin", values);
      if (response.ok) {
        console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("data", JSON.stringify(result.data));
        history.push(`/dashboard${getRouteFromAccType(result.data.type)}`);
        setLoggedIn(true);
        reset();
      } else {
        switch (response.status) {
          case 400:
            console.log("invalid un and pw");
            break;
          case 500:
            console.log("error");
            break;
          default:
            console.log(response.body);
        }
      }
    };
    signIn();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.bgPattern}
      >
        <Grid item lg={3} md={6} sm={7} xs={12}>
          <Card elevation={8} style={{ borderRadius: "25px" }}>
            <CardContent style={{ padding: "25px" }}>
              <Grid item container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{
                      textAlign: "center",
                      fontWeight: "semibold",
                      margin: "10px 0",
                    }}
                  >
                    Sign In
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={
                      <TextField
                        label="NIC"
                        placeholder="Enter your NIC number"
                        fullWidth={true}
                        required
                      />
                    }
                    control={control}
                    name="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={
                      <TextField
                        label="Password"
                        placeholder="Enter Password"
                        type="password"
                        fullWidth={true}
                        required
                      />
                    }
                    control={control}
                    name="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        style={{ color: "#0284FE", margin: "10px 0" }}
                        name="checkedB"
                      />
                    }
                    label="Remember Me"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth={true}
                    variant="contained"
                    style={{
                      backgroundColor: "#0284FE",
                      textTransform: "none",
                      color: "white",
                      margin: "20px 0",
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography>
                    <NavLink to="/">Forgot password?</NavLink>
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography>
                    Don't have an account?&nbsp;
                    <NavLink to="/signup">Sign Up</NavLink>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};
export default SignIn;
