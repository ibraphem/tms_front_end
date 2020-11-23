import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import moment from "moment";

const TraineeCert = ({ id }) => {
  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
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

  const [trainingCert, setTrainingCert] = useState([]);

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

  const columns = [
    {
      title: "Training Title",
      field: "training_title",
      cellStyle: {
        width: 500,
        minWidth: 500,
      },
      headerStyle: {
        width: 500,
        minWidth: 500,
      },
    },
    {
      title: "Start Date",
      field: "training_start_date",
      render: (row) => <span> {formatDate(row["training_start_date"])}</span>,
    },
    {
      title: "End Date",
      field: "training_end_date",
      render: (row) => <span> {formatDate(row["training_end_date"])}</span>,
    },
    {
      title: "Expiry Date",
      field: "expiry_date",
      render: (row) => (
        <span>
          {" "}
          {row["expiry_date"] === null ||
          row["training_title"].includes("INITIAL")
            ? "No Expiration"
            : formatDate(row["expiry_date"])}
        </span>
      ),
    },
    {
      title: "Cost",
      field: "cost",
      render: (row) => <span>&#8358;{row["cost"]}</span>,
    },
  ];

  let today = new Date();
  let twoMonthtime = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 2,
    new Date().getDate()
  );

  return (
    <>
      <MaterialTable
        columns={columns}
        title="Training records"
        data={trainingCert}
        icons={tableIcons}
        options={{
          search: true,
          sorting: true,

          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.expiry_date === null ||
              rowData["training_title"].includes("INITIAL")
                ? "green"
                : today >= new Date(rowData.expiry_date)
                ? "red"
                : new Date(rowData.expiry_date) <= twoMonthtime
                ? "#cccc00"
                : "green",
          }),

          exportButton: true,
          headerStyle: {
            color: "#FFF",
            fontWeight: "bolder",
            fontSize: "15px",
            paddingLeft: "10px",
            backgroundColor: "#000",
          },
        }}
        style={{
          fontSize: "0.9rem",
          textAlign: "center",
          color: "white",
        }}
      />
    </>
  );
};

export default TraineeCert;
