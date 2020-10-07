import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: theme.spacing(9),
  },

  tableTitle: {
    textAlign: "center",
    color: "green",
  },

  divider: {
    backgroundColor: "#e0e0d1",
  },
  table: {
    borderSpacing: 0,
  },
  tableRow: {
    padding: "0px",
    fontSize: "13px",
    lineHeight: "10px",
  },
  noTraining: {
    textAlign: "center",
  },
  divFont: {
    fontSize: "13px",
  },
}));

const InternalTrainingCostReport = () => {
  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const classes = useStyles();
  const [value, setValue] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [firstMonths, setFirstMonths] = useState([]);
  const [secondMonths, setSecondMonths] = useState([]);
  const [thirdMonths, setThirdMonths] = useState([]);
  const [firstMonthSums, setFirstMonthSums] = useState([]);
  const [firstMonthCounts, setFirstMonthCounts] = useState([]);
  const [secondMonthsums, setSecondMonthsums] = useState([]);
  const [secondMonthCounts, setSecondMonthCounts] = useState([]);
  const [thirdMonthSums, setThirdMonthSums] = useState([]);
  const [thirdMonthCounts, setThirdMonthCounts] = useState([]);
  const [totalSums, setTotalSums] = useState([]);
  const [totalCounts, setTotalCounts] = useState([]);
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchReport = (e) => {
    e.preventDefault();

    setIsLoading(true);
    //  console.log(value);
    //   console.log(year);

    axios
      .get(`http://127.0.0.1:8000/api/internal/report/cost/${value}/${year}`)
      .then((response) => {
        console.log(response.data);
        setShowFilter(false);
        setShowReport(true);
        setFirstMonths(response.data.a_result);
        setFirstMonthSums(response.data.a_sum);
        setFirstMonthCounts(response.data.a_count);
        setSecondMonths(response.data.b_result);
        setSecondMonthsums(response.data.b_sum);
        setSecondMonthCounts(response.data.b_count);
        setThirdMonths(response.data.c_result);
        setThirdMonthSums(response.data.c_sum);
        setThirdMonthCounts(response.data.c_count);
        setTotalSums(response.data.t_sum);
        setTotalCounts(response.data.t_count);
        setIsLoading(false);
      });
  };

  let date = new Date();
  let i = 1;

  const print = () => {
    window.print();
  };

  const show_filter = () => {
    setShowFilter(true);
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-8">
              <h1>INTERNAL TRAINING COST REPORT (QUATERLY)</h1>
            </div>
            <div className="col-sm-4">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#" onClick={show_filter}>
                    {showFilter ? "" : "Show Filter"}
                  </a>
                </li>
                <li className="breadcrumb-item active">
                  <a href="#" onClick={print}>
                    {showFilter ? "" : "Print"}
                  </a>
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
                      <Grid item xs={12} sm={5}>
                        <Autocomplete
                          id="combo-box-demo"
                          size="small"
                          options={quaters}
                          getOptionLabel={(option) => option.title}
                          onChange={(event, value) => setValue(value.value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Option"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
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
                <>
                  {!isLoading ? (
                    <section className="content">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-12">
                            <div className="card">
                              <div className="card-header">
                                <h5 className={classes.tableTitle}>
                                  {value === "first" ? (
                                    <b>
                                      INTERNAL TRAINING CONDUCTED DURING THE
                                      FIRST QUARTER (JANUARY - MARCH, {year})
                                    </b>
                                  ) : value === "second" ? (
                                    <b>
                                      INTERNAL TRAINING CONDUCTED DURING THE
                                      SECOND QUARTER (APRIL - JUNE, {year})
                                    </b>
                                  ) : value === "third" ? (
                                    <b>
                                      INTERNAL TRAINING CONDUCTED DURING THE
                                      THIRD QUARTER (JULY - SEPTEMBER, {year})
                                    </b>
                                  ) : (
                                    <b>
                                      INTERNAL TRAINING CONDUCTED DURING THE
                                      FOURTH QUARTER (OCTOBER - DECEMBER, {year}
                                      )
                                    </b>
                                  )}
                                </h5>
                              </div>
                              {/* /.card-header */}
                              <div className="card-body">
                                <table
                                  className={classes.table}
                                  id="example2"
                                  className="table table-bordered table-hover"
                                >
                                  <thead>
                                    <tr>
                                      <th width="5px">S/N</th>
                                      <th>TITLE OF TRAININGS</th>
                                      <th width="200px">DATES</th>
                                      <th width="50px">NO OF PERSONNEL</th>
                                      <th width="50px">COST PER PERSONNEL</th>
                                      <th>TOTAL COST</th>
                                    </tr>
                                  </thead>

                                  <>
                                    <tbody>
                                      {firstMonths.length > 0 ? (
                                        <>
                                          {firstMonths.map((firstMonth) => (
                                            <tr
                                              key={firstMonth.id}
                                              className={classes.tableRow}
                                            >
                                              <td>{i++}</td>
                                              <td>{firstMonth.course}</td>
                                              <td>
                                                {" "}
                                                {formatDate(
                                                  firstMonth.training_start_date
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                  firstMonth.training_end_date
                                                )}
                                              </td>
                                              <td>{firstMonth.present}</td>
                                              <td>&#8358;{firstMonth.cost}</td>
                                              <td>
                                                &#8358;
                                                {firstMonth.cost *
                                                  firstMonth.present}
                                              </td>
                                            </tr>
                                          ))}
                                          <tr className={classes.tableRow}>
                                            <th colSpan="3">Total</th>
                                            <th>
                                              {firstMonthCounts[0].attendee}
                                            </th>
                                            <th>&nbsp;</th>
                                            <th>
                                              &#8358;{firstMonthSums[0].cost}
                                            </th>
                                          </tr>
                                          <tr className={classes.tableRow}>
                                            <td
                                              colSpan="6"
                                              className={classes.divider}
                                            >
                                              &nbsp;
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <>
                                          <tr className={classes.tableRow}>
                                            {value === "first" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>JANUARY</b>
                                              </td>
                                            ) : value === "second" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>APRIL</b>
                                              </td>
                                            ) : value === "third" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>JULY</b>
                                              </td>
                                            ) : (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>OCTOBER</b>
                                              </td>
                                            )}
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="6"
                                              className={classes.noTraining}
                                            >
                                              No training was recorded for the
                                              month
                                            </td>
                                          </tr>
                                        </>
                                      )}

                                      {secondMonths.length > 1 ? (
                                        <>
                                          {secondMonths.map((secondMonth) => (
                                            <tr
                                              key={secondMonth.id}
                                              className={classes.tableRow}
                                            >
                                              <td>{i++}</td>
                                              <td>{secondMonth.course}</td>
                                              <td>
                                                {" "}
                                                {formatDate(
                                                  secondMonth.training_start_date
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                  secondMonth.training_end_date
                                                )}
                                              </td>
                                              <td>{secondMonth.present}</td>
                                              <td>&#8358;{secondMonth.cost}</td>
                                              <td>
                                                &#8358;
                                                {secondMonth.cost *
                                                  secondMonth.present}
                                              </td>
                                            </tr>
                                          ))}
                                          <tr className={classes.tableRow}>
                                            <th colSpan="3">Total</th>
                                            <th>
                                              {secondMonthCounts[0].attendee}
                                            </th>
                                            <th>&nbsp;</th>
                                            <th>
                                              &#8358;{secondMonthsums[0].cost}
                                            </th>
                                          </tr>
                                          <tr className={classes.tableRow}>
                                            <td
                                              colSpan="6"
                                              className={classes.divider}
                                            >
                                              &nbsp;
                                            </td>
                                          </tr>
                                        </>
                                      ) : (
                                        <>
                                          <tr className={classes.tableRow}>
                                            {value === "first" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>FEBRUARY</b>
                                              </td>
                                            ) : value === "second" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>MAY</b>
                                              </td>
                                            ) : value === "third" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>AUGUST</b>
                                              </td>
                                            ) : (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b> NOVEMBER</b>
                                              </td>
                                            )}
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="6"
                                              className={classes.noTraining}
                                            >
                                              No training was recorded for the
                                              month
                                            </td>
                                          </tr>
                                        </>
                                      )}

                                      {thirdMonths.length > 0 ? (
                                        <>
                                          {thirdMonths.map((thirdMonth) => (
                                            <tr
                                              key={thirdMonth.id}
                                              className={classes.tableRow}
                                            >
                                              <td>{i++}</td>
                                              <td>{thirdMonth.course}</td>
                                              <td>
                                                {" "}
                                                {formatDate(
                                                  thirdMonth.training_start_date
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                  thirdMonth.training_end_date
                                                )}
                                              </td>
                                              <td>{thirdMonth.present}</td>
                                              <td>&#8358;{thirdMonth.cost}</td>
                                              <td>
                                                &#8358;
                                                {thirdMonth.cost *
                                                  thirdMonth.present}
                                              </td>
                                            </tr>
                                          ))}
                                          <tr className={classes.tableRow}>
                                            <th colSpan="3">Total</th>
                                            <th>
                                              {thirdMonthCounts[0].attendee}
                                            </th>
                                            <th>&nbsp;</th>
                                            <th>
                                              &#8358;{thirdMonthSums[0].cost}
                                            </th>
                                          </tr>
                                        </>
                                      ) : (
                                        <>
                                          <tr className={classes.tableRow}>
                                            {value === "first" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>MARCH</b>
                                              </td>
                                            ) : value === "second" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>JUNE</b>
                                              </td>
                                            ) : value === "third" ? (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b>SEPTEMBER</b>
                                              </td>
                                            ) : (
                                              <td
                                                colSpan="6"
                                                className={classes.divider}
                                              >
                                                <b> DECEMBER</b>
                                              </td>
                                            )}
                                          </tr>
                                          <tr>
                                            <td
                                              colSpan="6"
                                              className={classes.noTraining}
                                            >
                                              No training was recorded for the
                                              month
                                            </td>
                                          </tr>
                                        </>
                                      )}
                                    </tbody>
                                  </>
                                </table>
                                <br />
                                <br />
                                <div className="callout callout-success">
                                  <p className={classes.divFont}>
                                    Total number of internal trainings conducted
                                    during the {value} quarter = <b>{i - 1}</b>
                                  </p>
                                  <p className={classes.divFont}>
                                    Total spent on internal trainings during the{" "}
                                    {value} quarter ={" "}
                                    <b>&#8358;{totalSums[0].cost}</b>
                                  </p>
                                </div>
                              </div>

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
                </>
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

export default InternalTrainingCostReport;

const quaters = [
  { title: "FIRST QUATER (January - March)", value: "first" },
  { title: "SECOND QUATER (April - June)", value: "second" },
  { title: "THIRD QUATER (July - September)", value: "third" },
  { title: "FOURTH QUATER (October - December)", value: "fourth" },
];
