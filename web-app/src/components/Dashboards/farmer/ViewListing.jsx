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
  Modal,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "use-http";
import MapComponent from "../../MapComponent";
import AddListing from "./AddListing";

const useStyles = makeStyles({
  scrollableWrapper: {
    height: "100vh",
    overflow: "hidden",
  },
  scrollableContainer: {
    overflow: "auto",
    height: "calc(100% - 64px)",
    marginTop: "64px",
  },
});
const ViewListing = () => {
  const { delete: deleteRoute, get, response } = useFetch(
    "http://localhost:3001"
  );
  const [listings, setListings] = useState([]);
  const [edit, setEdit] = useState(null);

  const classes = useStyles();
  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("data"));
    const addUser = async () => {
      const result = await get(`/listing/?farmerId=${id}`);
      if (response.ok) {
        setListings(result);
      }
    };
    addUser();
  }, []);

  const DeleteItem = (val) => {
    const addUser = async () => {
      const result = await deleteRoute(`/listing/${val}`);
      if (response.ok) {
        console.log("success");
      }
      console.log(result);
    };
    addUser();
  };

  return (
    <>
      {edit && (
        <Modal open={edit !== null} onClose={() => setEdit(null)}>
          <AddListing editData={edit} />
        </Modal>
      )}
      <Grid item xs={12} className={classes.scrollableWrapper}>
        <Grid
          item
          container
          spacing={2}
          className={classes.scrollableContainer}
          direction="row"
          justify="center"
        >
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
                {listing.item_status === "PENDING" && (
                  <CardActions>
                    <Grid item xs={6}>
                      <Button
                        style={{ color: "#0284FE" }}
                        size="small"
                        color="primary"
                        fullWidth
                        onClick={() => setEdit(listing)}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={() => DeleteItem(listing.item_id)}
                        style={{ color: "#0284FE" }}
                        size="small"
                        color="primary"
                        fullWidth
                      >
                        Delete
                      </Button>
                    </Grid>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ViewListing;
