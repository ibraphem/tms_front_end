import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
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

const TrainingRecords = () => {
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

  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/trainingrecords")
      .then((response) => {
        setRecords(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "Full Name",
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
      title: "TRAINING",
      field: "training_title",
      editable: "never",
      cellStyle: {
        width: 300,
        minWidth: 300,
      },
    },
    {
      title: "START DATE",
      field: "training_start_date",
      editable: "never",
      render: (row) => <span> {formatDate(row["training_start_date"])}</span>,
    },
    {
      title: "END DATE",
      field: "training_end_date",
      editable: "never",
      render: (row) => <span> {formatDate(row["training_end_date"])}</span>,
    },
    {
      title: "EXPIRY DATE",
      field: "expiry_date",
      editable: "never",
      render: (row) => (
        <span>
          {" "}
          {row["expiry_date"] !== null
            ? formatDate(row["expiry_date"])
            : "No Expiration"}
        </span>
      ),
    },
    {
      title: "SENT DATE",
      field: "sent_date",
      type: "date",
      render: (row) => (
        <span>
          {" "}
          {row["sent_date"] !== null ? formatDate(row["sent_date"]) : ""}
        </span>
      ),
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    let s_date = newData.sent_date;
    let sent_date = new Date(newData.sent_date).toISOString().slice(0, 10);

    const formData = {
      sent_date: sent_date,
    };

    //  console.log(s_date);

    if (s_date === null) {
      alert("Please pick a date");
      resolve();
      // setRecords(records);
    } else {
      axios
        .put(
          `http://127.0.0.1:8000/api/sendcertificate/${oldData.id}`,
          formData
        )
        .then((response) => {
          setRecords(response.data);
          resolve();
        })
        .catch((error) => {
          console.log(error);

          resolve();
        });
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Training Records</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <span href="#">Training</span>
                </li>
                <li className="breadcrumb-item active">Records</li>
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
              {/* /.card */}

              {/* /.card-header */}

              {!isLoading ? (
                <MaterialTable
                  columns={columns}
                  data={records}
                  title="Training Records Table"
                  icons={tableIcons}
                  options={{
                    search: true,
                    sorting: true,
                    exportButton: true,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                  style={{
                    fontSize: "0.9rem",
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                      }),
                  }}
                />
              ) : (
                <CircularProgress />
              )}

              {/* /.card-body */}

              {/* /.card */}
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

export default TrainingRecords;
