import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  CardActions,
  CardActionArea,
  CardMedia,
  makeStyles,
  Box,
  Chip,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useFetch } from "use-http";
import MapComponent from "../../MapComponent";

const AddListing = () => {
  const { register, handleSubmit, errors, control } = useForm(); // react hooks
  const { get, response } = useFetch("http://localhost:3001");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const addUser = async () => {
      const result = await get("/listing");
      if (response.ok) {
        setListings(result);
      }
    };
    addUser();
  }, []);

  return (
    <>
      {listings.map((listing) => (
        <Grid item xs={8}>
          <Card>
            <CardActionArea>
              <Box display="flex" flexDirection="row">
                <CardMedia
                  style={{
                    height: "auto",
                    maxHeight: "250px",
                    width: "40%",
                  }}
                  image={`http://localhost:3001/images/${listing.item_image}`}
                  title="Carrot"
                />
                <Box flexGrow={1}>
                  <CardContent>
                    <Typography variant="h6" component="h5">
                      {listing.item_name}
                    </Typography>
                    <Chip
                      label={listing.item_type}
                      style={{ fontSize: "0.9em", height: "24px" }}
                    />
                    <Chip
                      label={listing.item_status}
                      style={{
                        fontSize: "0.9em",
                        height: "24px",
                        backgroundColor:
                          listing.item_status === "ACCEPTED"
                            ? "#55efc4"
                            : listing.item_status === "REJECTED"
                            ? "#ff7675"
                            : "#ffeaa7",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {listing.item_description}
                    </Typography>
                    <MapComponent
                      viewOnly={true}
                      location={() => ({
                        lat: listing.item_lat,
                        lng: listing.item_lon,
                      })}
                    />
                  </CardContent>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default AddListing;
