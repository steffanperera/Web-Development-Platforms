import { Card, CardContent, Grid, TextField, Button } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "use-http";

const AddKeells = () => {
  const { handleSubmit, errors, control, reset } = useForm(); // react hooks
  const { post, response } = useFetch("http://localhost:3001");
  const onSubmit = (val) => {
    const addUser = async () => {
      const result = await post("/keells/add", val);
      if (response.ok) {
        console.log(result);
        reset();
      } else console.log(response);
    };
    addUser();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid item sm={8}>
        <Card variant="outlined">
          <CardContent>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <b>Keells Account Creation</b>
                <Controller
                  as={TextField}
                  required
                  name="k_id"
                  label="Keells ID"
                  placeholder="Enter Keells Id number"
                  fullWidth
                  error={errors.k_id}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.k_id && errors.k_id.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  required
                  name="k_name"
                  label="Name"
                  placeholder="Enter name"
                  fullWidth
                  error={errors.k_name}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.k_name && errors.k_name.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  required
                  name="k_phone"
                  label="Phone"
                  placeholder="Enter contact number"
                  fullWidth="true"
                  error={errors.k_phone}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.k_phone && errors.k_phone.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  required
                  name="k_email"
                  label="Email"
                  placeholder="Enter email address"
                  fullWidth
                  error={errors.k_email}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.k_email && errors.k_email.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item container>
                <Grid item xs={6}>
                  <Controller
                    as={TextField}
                    required
                    name="k_password"
                    label="Password"
                    placeholder="Enter Password"
                    fullWidth
                    error={errors.k_password}
                    control={control}
                    rules={{ required: "This field is required" }}
                    helperText={errors.k_password && errors.k_password.message}
                    style={{ margin: "4px 0" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    fullWidth
                    style={{ margin: "4px 0" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  style={{
                    backgroundColor: "#0284FE",
                    textTransform: "none",
                    color: "white",
                    margin: "25px 0",
                  }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </form>
  );
};

export default AddKeells;
