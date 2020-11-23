import React, { Component } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import "./Cert.css";

class Cert extends Component {
  state = {
    trainingCert: [],
  };

  formatDate = (date) => {
    if (date !== "" && date !== null) {
      return moment(date).format("MMM DD YYYY");
    } else {
      return "No expiration";
    }
  };

  today = new Date();
  twoMonthtime = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 2,
    new Date().getDate()
  );

  componentDidMount() {
    axios
      .get(`http://tmsapi.db/api/showtrainings/${this.props.id}`)
      .then((response) => {
        this.setState({
          trainingCert: response.data,
        });
      });
  }

  render() {
    console.log(this.state.trainingCert);
    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead className="tablehead">
            <TableRow>
              <TableCell colSpan="5" align="center" className="tablecell">
                <h3>{`${this.props.first_name} ${this.props.surname} TRAINING RECORDS`}</h3>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="tablecell">TRAINING TITLE </TableCell>
              <TableCell className="tablecell">START DATE</TableCell>
              <TableCell className="tablecell">END DATE</TableCell>
              <TableCell className="tablecell">EXPIRY DATE</TableCell>
              <TableCell className="tablecell">COST</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.trainingCert.map((trainingCer) => (
              <TableRow
                key={trainingCer.id}
                style={
                  trainingCer.expiry_date === null ||
                  trainingCer.training_title.includes("INITIAL")
                    ? { background: "green" }
                    : this.today >= new Date(trainingCer.expiry_date)
                    ? { background: "red" }
                    : new Date(trainingCer.expiry_date) <= this.twoMonthtime
                    ? { background: "#cccc00" }
                    : { background: "green" }
                }
              >
                <TableCell className="tablecell" component="th" scope="row">
                  {trainingCer.training_title}
                </TableCell>
                <TableCell align="right" className="tablecell">
                  {this.formatDate(trainingCer.training_start_date)}
                </TableCell>
                <TableCell className="tablecell" align="right">
                  {this.formatDate(trainingCer.training_end_date)}
                </TableCell>
                <TableCell className="tablecell" align="right">
                  {this.formatDate(trainingCer.expiry_date)}
                </TableCell>
                <TableCell className="tablecell" align="right">
                  &#8358;{trainingCer.cost}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default Cert;
