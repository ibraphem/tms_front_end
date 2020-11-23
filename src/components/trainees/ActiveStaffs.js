import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import InfoIcon from "@material-ui/icons/Info";
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
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import TraineeCert from "./TraineeCert";
import Printer from "../layouts/Printer";

const ActiveStaffs = () => {
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

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.staff_id === undefined) {
      errorList.push("Please enter staff ID   ");
      setIserror(true);
    }
    if (newData.first_name === undefined) {
      errorList.push("Please enter first name   ");
      setIserror(true);
    }
    if (newData.surname === undefined) {
      errorList.push("Please enter  surname   ");
      setIserror(true);
    }
    if (newData.department_id === undefined) {
      errorList.push("Please select a station, unit or department  ");
      setIserror(true);
    }
    if (errorList.length < 1) {
      //no error
      axios
        .post("http://tmsapi.db/api/trainee/store", newData)
        .then((response) => {
          setTrainees(response.data);
          resolve();
          setAlertMessage(["Trainee added succesfully   "]);
          setIserror(false);
        })
        .catch((error) => {
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
          resolve();
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    //  console.log(newData);
    let errorList = [];
    if (newData.staff_id === "") {
      //alert("oooo");
      errorList.push("Staff ID can't be empty   ");
      setIserror(true);
    }
    if (newData.first_name === "") {
      errorList.push("Firstname can't be empty   ");
      setIserror(true);
    }
    if (newData.surname === "") {
      errorList.push("surname can't be empty  ");
      setIserror(true);
    }
    if (newData.department_id === "") {
      errorList.push("Please select a station, unit or department  ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      axios
        .post(`http://tmsapi.db/api/trainee/update/${oldData.id}`, newData)
        .then((response) => {
          // console.log(response.data);
          setTrainees(response.data);
          setAlertMessage(["Trainee Record Updated Successfully  "]);
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
    } else {
      setAlertMessage(errorList);
      setIserror(true);
      resolve();
    }
  };

  /* const handleRowDelete = (oldData, resolve) => {
    axios
      .delete(`http://tmsapi.db/api/trainee/delete/${oldData.id}`)
      .then((response) => {
        // console.log(response.data);
        setTrainees(response.data);
        setAlertMessage(["Trainee Record Deleted Successfully  "]);
        setIserror(false);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
        resolve();
      });
  }; */

  const handleExit = (rowData) => {
    axios
      .get(`http://tmsapi.db/api/trainee/exit/${rowData.id}`)
      .then((response) => {
        console.log(response.data);
        setTrainees(response.data);
        setAlertMessage(["Trainee exited successfully  "]);
        setIserror(false);
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
      });
  };

  const [trainees, setTrainees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://tmsapi.db/api/trainee")
      .then((response) => {
        setTrainees(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://tmsapi.db/api/department")
      .then((response) => {
        setDepartments(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const units = {};
  departments.map((department) => {
    const { id, station } = department;
    units[id] = station;
  });

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
    {
      title: "DEPT/UNIT/STATION",
      field: "department_id",
      lookup: units,
    },
  ];

  console.log(units);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Active Staffs</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <span>Trainees</span>
                </li>
                <li className="breadcrumb-item active">Active</li>
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
                  title="Active Trainees Table"
                  icons={tableIcons}
                  options={{
                    search: true,
                    sorting: true,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                  detailPanel={[
                    {
                      tooltip: "Show Name",
                      render: (rowData) => {
                        return (
                          <Printer
                            id={rowData.id}
                            first_name={rowData.first_name}
                            surname={rowData.surname}
                          />
                        );
                      },
                    },
                  ]}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                      }),
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        handleRowAdd(newData, resolve);
                      }),
                    /*        onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        handleRowDelete(oldData, resolve);
                      }), */
                  }}
                  actions={[
                    {
                      icon: () => <InfoIcon />,
                      tooltip: "Exit Trainee",
                      onClick: (event, rowData) => {
                        handleExit(rowData);
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

export default ActiveStaffs;
