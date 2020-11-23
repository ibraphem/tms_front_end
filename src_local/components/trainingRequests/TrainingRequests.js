import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";

const TrainingRequests = () => {
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

  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/trainingrequest")
      .then((response) => {
        setRequest(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRowAdd = (newData, resolve) => {
    let request_date = new Date(newData.request_date)
      .toISOString()
      .slice(0, 10);

    const formData = {
      request_date: request_date,
      staff: newData.staff,
      training_title: newData.training_title,
    };
    axios
      .post("http://127.0.0.1:8000/api/request/store", formData)
      .then((response) => {
        setRequest(response.data);
        resolve();
        setAlertMessage(["Request added succesfully   "]);
        setIserror(false);
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
        resolve();
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    let request_date = new Date(newData.request_date)
      .toISOString()
      .slice(0, 10);

    const formData = {
      request_date: request_date,
      staff: newData.staff,
      training_title: newData.training_title,
    };
    axios
      .put(`http://127.0.0.1:8000/api/request/update/${oldData.id}`, formData)
      .then((response) => {
        // console.log(response.data);
        setRequest(response.data);
        setAlertMessage(["Request Updated Successfully  "]);
        setIserror(false);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
        resolve();
        // setAlertMessage(["Trainee up   "]);
      });
  };

  const columns = [
    {
      title: "REQUEST DATE",
      field: "request_date",
      type: "date",
    },
    {
      title: "STAFF",
      field: "staff",
    },
    {
      title: "TRAINING TITLE",
      field: "training_title",
    },
  ];

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Training Requests</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <span href="#">Training</span>
                </li>
                <li className="breadcrumb-item active">Requests</li>
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

              <div className="card-header">
                <h3 className="card-title">
                  {iserror ? <ErrorAlert message={alertMessage} /> : null}
                  {iserror === false ? (
                    <SuccessAlert message={alertMessage} />
                  ) : null}
                </h3>
              </div>
              {/* /.card-header */}

              {!isLoading ? (
                <MaterialTable
                  columns={columns}
                  data={request}
                  title="Training Request Table"
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
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                      }),
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        handleRowAdd(newData, resolve);
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

export default TrainingRequests;
