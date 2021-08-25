import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "use-http";
import MapComponent from "../../MapComponent";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: "0px",
    marginBottom: "0px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddListing = ({ farmerId, editData }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [imgPreview, setImgPreview] = useState(null);
  const {
    handleSubmit,
    errors,
    control,
    reset,
    setValue,
    getValues,
  } = useForm(); // react hooks
  const { post, response } = useFetch("http://localhost:3001");

  const onSubmit = (val) => {
    console.log("farmer id", farmerId);
    if (!editMode) val.farmer_id = farmerId;

    let formData = new FormData();
    Object.entries(val).forEach(([key, value]) => formData.append(key, value));
    formData.append("item_image", files[0]);

    const addUser = async () => {
      const result = await post("/listing/add", formData);
      if (response.ok) {
        console.log(result);
        reset();
      } else {
        console.log(result);
      }
    };

    const updateUser = async () => {
      const result = await post(`/listing/${editData.item_id}`, formData);
      if (response.ok) {
        console.log(result);
        reset();
      } else {
        console.log(result);
      }
    };

    if (editMode) {
      console.log(val);
      updateUser();
    } else {
      addUser();
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setImgPreview(e.target.result);
      };
      reader.readAsDataURL(files[0]); // convert to base64 string
    }
  }, [files]);

  useEffect(() => {
    if (editData) {
      console.log(editData);
      reset(editData);
      setImgPreview(`http://localhost:3001/images/${editData.item_image}`);
      setEditMode(true);
    }
  }, [editData]);

  const setLocation = (location) => {
    console.log(location);
    setValue("item_lat", `${location.lat}`);
    setValue("item_lon", `${location.lng}`);
  };

  const getLocation = () => {
    const { item_lat, item_lon } = getValues(["item_lat", "item_lon"]);
    return { lat: item_lat, lng: item_lon };
  };

  return (
    <>
      {/* {response.status === 200 && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={true}
          autoHideDuration={3000}
          message="Note archived"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit">
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      )} */}

      <Grid item sm={7} justify="center">
        <Card variant="outlined" style={{ borderRadius: "25px" }}>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid item container spacing={2} style={{ padding: "12px" }}>
                <b>List an item</b>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth={true}>
                    <InputLabel id="itemType">Item Type</InputLabel>
                    <Controller
                      as={
                        <Select
                          required
                          labelId="itemType"
                          label="Item Type"
                          fullWidth={true}
                          error={errors.item_type}
                          rules={{ required: "This field is required" }}
                        >
                          <MenuItem value="organic_veg">
                            Organic Vegetable
                          </MenuItem>
                          <MenuItem value="non_organic_veg">
                            Non Organic Vegetable
                          </MenuItem>
                          <MenuItem value="organic_fruit">
                            Organic Fruit
                          </MenuItem>
                          <MenuItem value="non_organic_fruit">
                            Non Organic Fruit
                          </MenuItem>
                        </Select>
                      }
                      control={control}
                      name="item_type"
                      defaultValue=""
                    />
                    <FormHelperText error={errors.item_type ? true : false}>
                      {errors.item_type && errors.item_type.message}{" "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="item_name"
                    label="Item Name"
                    fullWidth={true}
                    control={control}
                    error={errors.item_name}
                    rules={{ required: "This field is required" }}
                    helperText={errors.item_name && errors.item_name.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="item_quantity"
                    label="Quantity"
                    fullWidth={true}
                    control={control}
                    error={errors.item_quantity}
                    rules={{ required: "This field is required" }}
                    helperText={
                      errors.item_quantity && errors.item_quantity.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    as={TextField}
                    required
                    name="item_description"
                    label="Description"
                    fullWidth={true}
                    control={control}
                    error={errors.item_description}
                    rules={{ required: "This field is required" }}
                    helperText={
                      errors.item_description && errors.item_description.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        setFiles([...event.target.files]);
                      }}
                    />
                  </Button>
                  {imgPreview && (
                    <img
                      src={imgPreview}
                      style={{ maxWidth: "50%", maxHeight: "350px" }}
                      alt="Preview"
                    />
                  )}
                </Grid>
                <Grid item container>
                  <Box display="flex" flexGrow={1}>
                    <Grid item xs={6}>
                      <Controller
                        as={
                          <TextField
                            required
                            label="lat"
                            fullWidth={true}
                            error={errors.item_lat}
                            rules={{ required: "This field is required" }}
                            helperText={
                              errors.item_lat && errors.item_lat.message
                            }
                          />
                        }
                        control={control}
                        name="item_lat"
                        defaultValue=""
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        as={
                          <TextField
                            required
                            label="lon"
                            fullWidth={true}
                            error={errors.item_name}
                            rules={{ required: "This field is required" }}
                            helperText={
                              errors.item_lon && errors.item_lon.message
                            }
                          />
                        }
                        control={control}
                        name="item_lon"
                        defaultValue=""
                      />
                    </Grid>
                  </Box>
                  <Box display="flex" flexShrink={1}>
                    <MapComponent
                      setLocation={setLocation}
                      location={getLocation}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth="true"
                    style={{
                      backgroundColor: "#0284FE",
                      textTransform: "none",
                      color: "white",
                      margin: "20px 0",
                    }}
                  >
                    {editMode ? "Update" : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default AddListing;
