import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <div class="float-right d-none d-sm-inline-block">
          <strong>
            <i>Powered By IT Unit</i>
          </strong>
        </div>
        {/* Right navbar links */}
      </nav>
    </div>
  );
};

export default Footer;
