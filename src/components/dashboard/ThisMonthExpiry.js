import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import moment from "moment";

const ThisMonthExpiry = () => {
  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),

    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const [expiredTraining, setExpiredTraining] = useState([]);
  const [month, setMonth] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://tmsapi.db/api/expiry")
      .then((response) => {
        setExpiredTraining(response.data.this_month_expiry);
        setMonth(response.data.thisMonth);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let mon = moment(month, "M").format("MMMM");
  // console.log(mon);

  const columns = [
    {
      title: "TRAINING TITLE",
      field: "training_title",
      cellStyle: {
        minWidth: 250,

        margin: 0,
        borderSpacing: 0,
      },
    },

    {
      title: "TRAINEE",
      field: "surname",
      editable: "never",
      cellStyle: {
        width: 150,
        minWidth: 150,
      },
      render: (row) => (
        <span>
          {row["first_name"]} {row["surname"]}
        </span>
      ),
    },

    {
      title: "EXPIRY DATE",
      field: "expiry_date",
      type: "date",
      cellStyle: {
        minWidth: 113,
        padding: 0,
        margin: 0,
        borderSpacing: 0,
      },
      headerStyle: {
        minWidth: 10,
        padding: 0,
        margin: 0,
      },
      render: (row) => <span> {formatDate(row["expiry_date"])}</span>,
    },
  ];

  return (
    <div>
      {!isLoading ? (
        <MaterialTable
          columns={columns}
          title={`${mon}`}
          data={expiredTraining}
          icons={tableIcons}
          options={{
            search: true,
            sorting: true,

            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              margin: 0,
              textAlign: "left",
            },
          }}
          style={{
            fontSize: "0.9rem",
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ThisMonthExpiry;
