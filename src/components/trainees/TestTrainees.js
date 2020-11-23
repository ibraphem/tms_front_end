import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PrintIcon from "@material-ui/icons/Print";
import { IconButton } from "@material-ui/core";
import Printer from "../layouts/Printer";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    margin: "2px",
  },
  rowColor: {
    color: "#fff",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#000",
    color: "#fff",
  },
  body: {
    backgroundColor: "#000",
    color: "#fff",
  },
}))(TableCell);

const TestTrainees = ({ id }) => {
  const [trainingCert, setTrainingCert] = useState([]);

  const classes = useStyles();

  let today = new Date();
  let twoMonthtime = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 2,
    new Date().getDate()
  );

  const formatDate = (date) => {
    if (date !== "" && date !== null) {
      return moment(date).format("MMM DD YYYY");
    } else {
      return "No expiration";
    }
  };

  const print = () => {
    window.print();
  };

  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://tmsapi.db/api/showtrainings/${id}`)
      .then((response) => {
        if (mounted) {
          setTrainingCert(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  console.log(trainingCert);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan="4" align="center">
              Training Title
            </StyledTableCell>
            <StyledTableCell align="center">
              <IconButton aria-label="Print" onClick={print}>
                <PrintIcon style={{ color: "#fff" }} />
              </IconButton>
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell>Training Title</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>Expiry Date</StyledTableCell>
            <StyledTableCell>Cost</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainingCert.map((trainingCer) => (
            <TableRow
              key={trainingCer.id}
              style={
                trainingCer.expiry_date === null ||
                trainingCer.training_title.includes("INITIAL")
                  ? { background: "green" }
                  : today >= new Date(trainingCer.expiry_date)
                  ? { background: "red" }
                  : new Date(trainingCer.expiry_date) <= twoMonthtime
                  ? { background: "#cccc00" }
                  : { background: "green" }
              }
            >
              <TableCell
                component="th"
                scope="row"
                className={classes.rowColor}
              >
                {trainingCer.training_title}
              </TableCell>
              <TableCell align="right" className={classes.rowColor}>
                {formatDate(trainingCer.training_start_date)}
              </TableCell>
              <TableCell align="right" className={classes.rowColor}>
                {formatDate(trainingCer.training_end_date)}
              </TableCell>
              <TableCell align="right" className={classes.rowColor}>
                {formatDate(trainingCer.expiry_date)}
              </TableCell>
              <TableCell align="right" className={classes.rowColor}>
                &#8358;{trainingCer.cost}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestTrainees;
