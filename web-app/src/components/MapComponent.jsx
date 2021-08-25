import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationOnSharpIcon from "@material-ui/icons/LocationOnSharp";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MapComponent = ({
  setLocation,
  location,
  viewOnly = false,
  ...props
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onMarkerClick = (e, map, { latLng }) => {
    console.log({ lat: latLng.lat(), lng: latLng.lng() });
    setMarker({ lat: latLng.lat(), lng: latLng.lng() });
  };
  const okBtnClick = () => {
    setLocation(marker);
    setOpen(false);
  };

  useEffect(() => {
    const loc = location();
    if (loc.lat !== "" && loc.lng !== "") {
      const numericLatLng = {
        lat: Number.parseFloat(loc.lat),
        lng: Number.parseFloat(loc.lng),
      };
      console.log(numericLatLng);
      setMarker(numericLatLng);
      setCenter(numericLatLng);
    }
  }, [open]);

  return (
    <>
      <Grid item>
        <Button
          aria-label="add location"
          variant="contained"
          onClick={handleOpen}
          style={{
            padding: "8px 12px",
            minWidth: "48px",
            backgroundColor: "#0284FE",
            color: "white",
          }}
        >
          <LocationOnSharpIcon />
        </Button>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div style={{ height: "500px", width: "500px" }}>
          <AppBar position="static" color="white">
            <Toolbar edge="end">
              {!viewOnly && (
                <Button
                  color="primary"
                  variant="outlined"
                  disabled={!marker}
                  onClick={okBtnClick}
                >
                  Ok
                </Button>
              )}
              <Button color="primary" variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>

          <Map
            google={props.google}
            zoom={14}
            style={{ height: "500px", width: "500px" }}
            onClick={!viewOnly ? onMarkerClick : undefined}
            disableDefaultUI={true}
            initialCenter={center ? center : undefined}
          >
            {marker && <Marker name={"Current location"} position={marker} />}
          </Map>
        </div>
      </Modal>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCUV1i6rgIsj1sD05k_AWO1igbHZS1I6sY",
})(MapComponent);
