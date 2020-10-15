import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";

import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import ImportExportIcon from "@material-ui/icons/ImportExport";
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
import TraineeCert from "./TraineeCert";

const ExitedStaffs = () => {
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

  const [trainees, setTrainees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  const handleActive = (rowData) => {
    axios
      .put(`http://127.0.0.1:8000/api/trainee/active/${rowData.id}`)
      .then((response) => {
        console.log(response.data);
        setTrainees(response.data);
        setAlertMessage(["Trainee is active again "]);
        setIserror(false);
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/exitedtrainee")
      .then((response) => {
        setTrainees(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "STAFF ID",
      field: "staff_id",
    },
    {
      title: "FIRSTNAME",
      field: "first_name",
    },
    {
      title: "SURNAME",
      field: "surname",
    },
  ];

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Exited Staffs</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <span>Trainees</span>
                </li>
                <li className="breadcrumb-item active">Exited</li>
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
                  data={trainees}
                  title="Exited Trainees Table"
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
                  detailPanel={[
                    {
                      tooltip: "Show Name",
                      render: (rowData) => {
                        return <TraineeCert id={rowData.id} />;
                      },
                    },
                  ]}
                  actions={[
                    {
                      icon: () => <ImportExportIcon />,
                      tooltip: "Make trainee active again",
                      onClick: (event, rowData) => {
                        handleActive(rowData);
                      },
                    },
                  ]}
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

export default ExitedStaffs;
