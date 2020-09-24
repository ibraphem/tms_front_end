import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SuccessAlert = ({ message }) => {
  const classes = useStyles();
  const [show, setShow] = useState(true);

  return (
    <>
      <Fade in={show} timeout={{ enter: 5000, exit: 4000 }}>
        <div className={classes.root}>
          <Alert severity="success">{message}</Alert>
        </div>
      </Fade>
    </>
  );
};

export default SuccessAlert;
