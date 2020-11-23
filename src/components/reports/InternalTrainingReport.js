import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

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

  tableTitle: {
    textAlign: "center",
    color: "green",
  },
  table: {
    borderSpacing: 0,
  },
  tableRow: {
    padding: "0px",
    fontSize: "13px",
    lineHeight: "10px",
  },

  divFont: {
    fontSize: "13px",
  },
  dtext: {
    textAlign: "center",
  },
  hr: {
    height: "2px",
    backgroundColor: "green",
  },
}));

const InternalTrainingReport = () => {
  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const classes = useStyles();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [internalTrainingReports, setInternalTrainingReports] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [absentTrainees, setAbsentTrainees] = useState([]);
  const [monthName, setMonthName] = useState("");

  const fetchReport = (e) => {
    e.preventDefault();

    axios
      .get(`http://tmsapi.db/api/internal/report/${year}/${month}`)
      .then((response) => {
        console.log(response.data);
        setShowFilter(false);
        setShowReport(true);
        setInternalTrainingReports(response.data);
      });

    axios
      .get(`http://tmsapi.db/api/absent/trainees/${year}/${month}`)
      .then((response) => {
        //   console.log(response.data);

        setShowReport(true);
        setAbsentTrainees(response.data);
      });
  };

  const print = () => {
    window.print();
  };

  const show_filter = () => {
    setShowFilter(true);
  };

  let i = 1;
  let j = 1;
  let k = 1;

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Internal Training Report (Monthly)</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="#" onClick={show_filter}>
                    {showFilter ? "" : "Show Filter"}
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="#" onClick={print}>
                    {showFilter ? "" : "Print"}
                  </Link>
                </li>
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
              {showFilter ? (
                <Paper className={classes.paper}>
                  <form onSubmit={fetchReport}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          id="combo-box-demo"
                          size="small"
                          options={months}
                          getOptionLabel={(option) => option.title}
                          onChange={(event, value) => {
                            setMonth(value.value);
                            setMonthName(value.title);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Month"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          label="Year"
                          type="number"
                          fullWidth
                          size="small"
                          value={year}
                          onChange={(event, value) => {
                            setYear(event.target.value);
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
              ) : (
                ""
              )}
              {showReport ? (
                <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h5 className={classes.tableTitle}>
                              <b>
                                TRAINING REPORT FOR THE MONTH OF {monthName}{" "}
                                {year}
                              </b>
                            </h5>
                          </div>
                          {internalTrainingReports.length > 0 ? (
                            <div className="card-body">
                              <table
                                id="example2"
                                className="table table-bordered table-hover"
                              >
                                <thead>
                                  <tr>
                                    <th width="10px">S/N</th>
                                    <th width="300px">TRAINING TITLES</th>
                                    <th width="140px">TRAINING DATES</th>
                                    <th>TOTAL SCHEDULED</th>
                                    <th>STUDENTS PRESENT</th>
                                    <th>STUDENTS ABSENT</th>
                                    <th width="200px">INSTRUCTORS</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {internalTrainingReports.map(
                                    (internalTrainingReport) => (
                                      <tr
                                        className={classes.tableRow}
                                        key={internalTrainingReport.id}
                                      >
                                        <td>{i++}</td>
                                        <td>
                                          {
                                            internalTrainingReport.training_title
                                          }
                                        </td>
                                        <td>
                                          {" "}
                                          {formatDate(
                                            internalTrainingReport.training_start_date
                                          )}
                                        </td>
                                        <td>
                                          {" "}
                                          {internalTrainingReport.present +
                                            internalTrainingReport.absent}
                                        </td>
                                        <td>
                                          {internalTrainingReport.present}
                                        </td>
                                        <td>{internalTrainingReport.absent}</td>
                                        <td>
                                          {internalTrainingReport.full_name}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <br />
                              {absentTrainees.length > 0 ? (
                                <>
                                  <div className="card-header">
                                    <h6 className={classes.tableTitle}>
                                      <b>
                                        NAMES OF ABSENTEES FOR {monthName}{" "}
                                        {year} SCHEDULED TRAININGS
                                      </b>
                                    </h6>
                                  </div>
                                  <table
                                    id="example2"
                                    className="table table-bordered table-hover"
                                  >
                                    <thead>
                                      <tr>
                                        <th width="5px">S/N</th>
                                        <th>NAME</th>
                                        <th>TRAINING TITLES</th>
                                        <th>REASONS FOR ABSENCE </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {absentTrainees.map((absentTrainee) => (
                                        <tr
                                          key={absentTrainee.id}
                                          className={classes.tableRow}
                                        >
                                          <td>{k++}</td>
                                          <td>{`${absentTrainee.first_name} ${absentTrainee.surname}`}</td>
                                          <td>
                                            {absentTrainee.training_title}
                                          </td>
                                          <td>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </>
                              ) : (
                                ""
                              )}

                              <br />
                              {internalTrainingReports.map(
                                (internalTrainingReport) => (
                                  <div
                                    className="callout callout-success"
                                    key={internalTrainingReport.id}
                                  >
                                    {internalTrainingReport.sch_students ===
                                    1 ? (
                                      <p className={classes.divFont}>
                                        {internalTrainingReport.absent === 1 ? (
                                          <>
                                            {j++}.{" "}
                                            {
                                              internalTrainingReport.training_title
                                            }{" "}
                                            was scheduled for 1 personnel. The
                                            personnel scheduled for this
                                            training was absent.
                                          </>
                                        ) : (
                                          <>
                                            {j++}.{" "}
                                            {
                                              internalTrainingReport.training_title
                                            }{" "}
                                            was facilitated for 1 personnel. The
                                            personnel scheduled for this
                                            training was present.
                                          </>
                                        )}
                                      </p>
                                    ) : (
                                      <p className={classes.divFont}>
                                        {internalTrainingReport.absent === 1 ? (
                                          <>
                                            {j++}.{" "}
                                            {
                                              internalTrainingReport.training_title
                                            }{" "}
                                            was scheduled for{" "}
                                            {internalTrainingReport.present +
                                              internalTrainingReport.absent}{" "}
                                            personnel.{" "}
                                            {internalTrainingReport.present}{" "}
                                            personnel attended and{" "}
                                            {internalTrainingReport.absent} was
                                            absent.
                                          </>
                                        ) : internalTrainingReport.absent > 1 &&
                                          internalTrainingReport.present > 0 ? (
                                          <>
                                            {j++}.{" "}
                                            {
                                              internalTrainingReport.training_title
                                            }{" "}
                                            was successfully scheduled for{" "}
                                            {internalTrainingReport.present +
                                              internalTrainingReport.absent}{" "}
                                            personnel.{" "}
                                            {internalTrainingReport.present}{" "}
                                            attended and{" "}
                                            {internalTrainingReport.absent} were
                                            absent.
                                          </>
                                        ) : internalTrainingReport.absent ===
                                          0 ? (
                                          <>
                                            {j++}.{" "}
                                            {
                                              internalTrainingReport.training_title
                                            }{" "}
                                            was successfully scheduled for{" "}
                                            {internalTrainingReport.present +
                                              internalTrainingReport.absent}{" "}
                                            personnel. All personnel scheduled
                                            for this training were present.
                                          </>
                                        ) : internalTrainingReport.absent > 1 &&
                                          internalTrainingReport.present < 1 ? (
                                          <>
                                            {j++}.{" "}
                                            {
                                              internalTrainingReport.training_title
                                            }{" "}
                                            was scheduled for{" "}
                                            {internalTrainingReport.present +
                                              internalTrainingReport.absent}{" "}
                                            personnel. None of the personnel
                                            attended.
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    )}
                                  </div>
                                )
                              )}
                              <br />
                              <br />
                              <div className="col-sm-4">
                                <hr className={classes.hr} />
                                <h6 className={classes.dtext}>
                                  {" "}
                                  <b>Training Personnel</b>
                                </h6>
                              </div>
                            </div>
                          ) : (
                            <div className="card-header">
                              <p className={classes.tableTitle}>
                                No training was recorded for the selected month
                                and year
                              </p>
                            </div>
                          )}

                          {/* /.card-body */}
                        </div>
                        {/* /.card */}
                        {/* /.card */}
                      </div>
                      {/* /.col */}
                    </div>
                    {/* /.row */}
                  </div>
                  {/* /.container-fluid */}
                </section>
              ) : (
                ""
              )}
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

const months = [
  { title: "JANUARY", value: 1 },
  { title: "FEBRUARY", value: 2 },
  { title: "MARCH", value: 3 },
  { title: "APRIL", value: 4 },
  { title: "MAY", value: 5 },
  { title: "JUNE", value: 6 },
  { title: "JULY", value: 7 },
  { title: "AUGUST", value: 8 },
  { title: "SEPTEMBER", value: 9 },
  { title: "OCTOBER", value: 10 },
  { title: "NOVEMBER", value: 11 },
  { title: "DECEMBER", value: 12 },
];
