import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  CardActions,
  CardActionArea,
  CardMedia,
  Box,
  Chip,
  Snackbar,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useFetch } from "use-http";
import MapComponent from "../../MapComponent";
import CloseIcon from "@material-ui/icons/Close";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import MailIcon from "@material-ui/icons/Mail";

const AddListing = ({ status = "PENDING" }) => {
  const { register, handleSubmit, errors, control } = useForm(); // react hooks
  const { get, response } = useFetch("http://localhost:3001");
  const [listings, setListings] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popContacts, setPopContacts] = useState(null);

  useEffect(() => {
    const addUser = async () => {
      const result = await get(`/listing?status=${status}`);
      if (response.ok) {
        if (response.status === 200) {
          setListings(result);
        } else {
          // error snackbar
          console.log(result);
        }
      } else {
        console.log(result);
      }
    };
    addUser();
  }, [status]);

  const buyListing = async (itemId, status) => {
    const result = await get(`/listing/${itemId}/${status}`);
    if (response.ok) {
      if (response.status === 200) {
        setOpen(true);
        setListings(listings.filter((l) => l.item_id !== itemId));
      }
    } else {
      console.log(result);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const contactBtnClick = (event, { email, phone }) => {
    console.log(email);
    setPopContacts({ email: email, phone: phone });
    setAnchorEl(event.target);
  };

  return (
    <>
      {listings.map((listing) => (
        <Grid item xs={8}>
          <Card style={{ maxWidth: "75%" }}>
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

            <CardActions>
              {status === "PENDING" && (
                <>
                  <Button
                    style={{ color: "#0284FE" }}
                    size="small"
                    color="primary"
                    onClick={() => buyListing(listing.item_id, "accept")}
                  >
                    Buy
                  </Button>
                  <Button
                    style={{ color: "#0284FE" }}
                    size="small"
                    color="primary"
                    onClick={() => buyListing(listing.item_id, "reject")}
                  >
                    Reject
                  </Button>
                </>
              )}
              <Button
                style={{ color: "#0284FE" }}
                size="small"
                color="primary"
                onClick={(event) => contactBtnClick(event, listing)}
              >
                Contact
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      {/* 
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Note archived"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div> */}
      {anchorEl && (
        <Popover
          open={anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={popContacts.email} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PhoneInTalkIcon />
              </ListItemIcon>
              <ListItemText primary={popContacts.phone} />
            </ListItem>
          </List>
        </Popover>
      )}
    </>
  );
};

export default AddListing;
