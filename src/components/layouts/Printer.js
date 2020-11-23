import React from "react";
import ReactToPrint from "react-to-print";
import Cert from "../trainees/Cert";
import PrintIcon from "@material-ui/icons/Print";
import { IconButton } from "@material-ui/core";

class Printer extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <IconButton aria-label="Print">
              <PrintIcon />
            </IconButton>
          )}
          content={() => this.componentRef}
        />
        <Cert
          ref={(el) => (this.componentRef = el)}
          id={this.props.id}
          first_name={this.props.first_name}
          surname={this.props.surname}
        />
      </div>
    );
  }
}

export default Printer;
