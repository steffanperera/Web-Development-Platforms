import { Card, CardContent, Grid, TextField, Button } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "use-http";

const AddDoA = () => {
  const { handleSubmit, errors, control, reset } = useForm(); // react hooks
  const { post, response } = useFetch("http://localhost:3001");
  const onSubmit = (val) => {
    const addUser = async () => {
      const result = await post("/doa/add", val);
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
                <b>DoA Account Creation</b>
                <Controller
                  as={TextField}
                  required
                  name="doa_id"
                  label="DoA ID"
                  placeholder="Enter DoA ID number"
                  fullWidth="true"
                  error={errors.doa_id}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.doa_id && errors.doa_id.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  required
                  name="doa_name"
                  label="Name"
                  placeholder="Enter name"
                  fullWidth="true"
                  error={errors.doa_name}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.doa_name && errors.doa_name.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  required
                  name="doa_phone"
                  label="Phone"
                  placeholder="Enter contact number"
                  fullWidth="true"
                  error={errors.doa_phone}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.doa_phone && errors.doa_phone.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={TextField}
                  required
                  name="doa_email"
                  label="Email"
                  placeholder="Enter email address"
                  fullWidth="true"
                  error={errors.doa_email}
                  control={control}
                  rules={{ required: "This field is required" }}
                  helperText={errors.doa_email && errors.doa_email.message}
                  style={{ margin: "4px 0" }}
                />
              </Grid>

              <Grid item container>
                <Grid item xs={6}>
                  <Controller
                    as={TextField}
                    required
                    name="doa_password"
                    label="Password"
                    placeholder="Enter Password"
                    fullWidth="true"
                    error={errors.doa_password}
                    control={control}
                    rules={{ required: "This field is required" }}
                    helperText={
                      errors.doa_password && errors.doa_password.message
                    }
                    style={{ margin: "4px 0" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                    fullWidth="true"
                    style={{ margin: "4px 0" }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth="true"
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

export default AddDoA;
