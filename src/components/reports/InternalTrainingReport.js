import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: theme.spacing(11),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const InternalTrainingReport = () => {
  const classes = useStyles();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [internalTrainingReport, setInternalTrainingReport] = useState([]);

  const fetchTo = (e) => {
    setTo(e.target.value);
  };

  const fetchFrom = (e) => {
    setFrom(e.target.value);
  };

  const fetchReport = (e) => {
    e.preventDefault();
    //  console.log("from: " + from);
    //  console.log("to: " + to);

    const formData = {
      from: from,
      to: to,
    };

    axios
      .get(`http://127.0.0.1:8000/api/internal/report/`, formData)
      .then((response) => {
        console.log(response.data);
        setInternalTrainingReport(response.data);
      });
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Internal Training Report</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Internal</a>
                </li>
                <li className="breadcrumb-item active">Report</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">{/* /.card-header */}</div>
              <Paper className={classes.paper}>
                <form onSubmit={fetchReport}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="from"
                        label="FROM"
                        type="date"
                        required={true}
                        fullWidth
                        onChange={fetchFrom}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="to"
                        label="TO"
                        type="date"
                        required={true}
                        fullWidth
                        onChange={fetchTo}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                        fullWidth
                        className={classes.button}
                      >
                        Fetch Report
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default InternalTrainingReport;
