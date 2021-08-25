import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "use-http";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  bgPattern: {
    backgroundImage: "url('/assets/img/bg-pattern.png')",
    backgroundRepeat: "repeat",
    minHeight: "100vh",
  },
  borderRadiusAndPadding: {
    borderRadius: "25px",
    padding: "15px",
  },
});

const AddListing = () => {
  const { handleSubmit, errors, control, reset, getValues } = useForm(); // react hooks

  const classes = useStyles();

  const { post, response } = useFetch("http://localhost:3001");

  const onSubmit = (val) => {
    delete val["confirmPassword"];
    const addUser = async () => {
      const result = await post("/farmer/add", val);
      if (response.ok) {
        console.log("success");
        reset();
      }
    };
    addUser();
  };

  return (
    <Grid
      item
      container
      className={classes.bgPattern}
      justify="center"
      alignItems="center"
    >
      <Grid item lg={3} md={6} sm={7} xs={12}>
        <Card elevation={8} className={classes.borderRadiusAndPadding}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid item container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ fontWeight: "semibold" }}
                  >
                    Sign Up
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="nic"
                    label="NIC"
                    placeholder="Enter your NIC number"
                    fullWidth={true}
                    error={errors.nic}
                    control={control}
                    rules={{ required: "This field is required" }}
                    helperText={errors.nic && errors.nic.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="name"
                    label="Name"
                    placeholder="Enter your Name"
                    fullWidth={true}
                    error={errors.name}
                    control={control}
                    rules={{ required: "This field is required" }}
                    helperText={errors.name && errors.name.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="phone"
                    label="Phone"
                    placeholder="Enter your contact number"
                    fullWidth={true}
                    error={errors.phone}
                    control={control}
                    rules={{
                      required: "This field is required",
                      pattern: {
                        value: /^\d+$/,
                        message: "Phone number can only be numeric",
                      },
                    }}
                    helperText={errors.phone && errors.phone.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="email"
                    label="Email"
                    placeholder="Enter your Email Address"
                    fullWidth={true}
                    error={errors.email}
                    control={control}
                    rules={{ required: "This field is required" }}
                    helperText={errors.email && errors.email.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter Password"
                    fullWidth={true}
                    error={errors.password}
                    control={control}
                    rules={{ required: "This field is required" }}
                    helperText={errors.password && errors.password.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    fullWidth={true}
                    rules={{
                      validate: (val) =>
                        val === getValues("password")
                          ? true
                          : "Passwords do not match",
                    }}
                    error={errors.confirmPassword}
                    control={control}
                    helperText={
                      errors.confirmPassword && errors.confirmPassword.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: "#0284FE",
                      textTransform: "none",
                      color: "white",
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{ textAlign: "center" }}>
                    Already have an account?&nbsp;
                    <NavLink to="/signin">Sign In</NavLink>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddListing;
