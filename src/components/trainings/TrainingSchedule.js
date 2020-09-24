import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AddIcon from "@material-ui/icons/Add";
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
import { useHistory } from "react-router-dom";
import TrainingScheduleDetail from "./TrainingScheduleDetail";
import ErrorAlert from "../alerts/ErrorAlert";
import SuccessAlert from "../alerts/SuccessAlert";
import moment from "moment";

const TrainingSchedule = () => {
  const history = useHistory();
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

  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/trainingschedule")
      .then((response) => {
        if (mounted) {
          setSchedule(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (date) => {
    return moment(date).format("MMM DD YYYY");
  };

  const redirectToScheduleForm = () => {
    history.push("/scheduleform");
  };

  const fetchParticipants = (schedule_id) => {
    axios
      .post("http://127.0.0.1:8000/api/trainees/participant", schedule_id)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "TRAINING TITLE",
      field: "course",
      editable: "never",
      cellStyle: {
        width: 200,
        minWidth: 220,
      },
    },
    {
      title: "INSTRUCTOR",
      field: "full_name",
      editable: "never",
    },
    {
      title: "START DATE",
      field: "training_start_date",
      type: "date",
      cellStyle: {
        width: 115,
        minWidth: 115,
      },
      render: (row) => <span> {formatDate(row["training_start_date"])}</span>,
    },
    {
      title: "END DATE",
      field: "training_end_date",
      type: "date",
      cellStyle: {
        width: 115,
        minWidth: 115,
      },
      render: (row) => <span> {formatDate(row["training_end_date"])}</span>,
    },
    {
      title: "TYPE",
      field: "training_type",

      lookup: { Internal: "Internal", External: "External" },
    },
    {
      title: "COST",
      field: "cost",
      type: "numeric",

      render: (row) => <span>&#8358;{row["cost"]}</span>,
    },
    {
      title: "TRAINING VENUE",
      field: "venue",
      cellStyle: {
        width: 200,
        minWidth: 200,
      },
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    let training_start_date = new Date(newData.training_start_date)
      .toISOString()
      .slice(0, 10);
    let training_end_date = new Date(newData.training_end_date)
      .toISOString()
      .slice(0, 10);

    const formData = {
      training_date: training_start_date,
      end_date: training_end_date,
      //   instructor_id: newData.instructor_id,
      training_type: newData.training_type,
      venue: newData.venue,
      cost: newData.cost,
    };

    let errorList = [];
    if (formData.training_start_date === "") {
      errorList.push("Training start date can't be empty   ");
      setIserror(true);
    }
    if (formData.training_end_date === "") {
      errorList.push("Training end date can't be empty  ");
      setIserror(true);
    }
    if (formData.training_type === "") {
      errorList.push("Please choose from the training type options  ");
      setIserror(true);
    }
    if (formData.venue === "") {
      errorList.push("Venue can't be empty  ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      axios
        .put(
          `http://127.0.0.1:8000/api/schedul/update/${oldData.schedule_id}`,
          formData
        )
        .then((response) => {
          setSchedule(response.data);
          setAlertMessage(["Training Schedule Updated Successfully  "]);
          setIserror(false);
          resolve();
        })
        .catch((error) => {
          console.log(error);
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

  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData.schedule_id);
    axios
      .delete(
        `http://127.0.0.1:8000/api/schedule/delete/${oldData.schedule_id}`
      )
      .then((response) => {
        setSchedule(response.data);
        setAlertMessage(["Training Schedule was Deleted Successfully  "]);
        setIserror(false);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(["Oops, something went wrong!!!   "]);
        setIserror(true);
        resolve();
      });
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Training Schedule</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Training</a>
                </li>
                <li className="breadcrumb-item active">Schedule</li>
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
              <div className="card-header">
                <h3 className="card-title">
                  {iserror ? <ErrorAlert message={alertMessage} /> : null}
                  {iserror === false ? (
                    <SuccessAlert message={alertMessage} />
                  ) : null}
                </h3>
              </div>

              {!isLoading ? (
                <MaterialTable
                  columns={columns}
                  data={schedule}
                  title="Scheduled Training Table"
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
                  detailPanel={[
                    {
                      tooltip: "Show Participants",
                      render: (rowData) => {
                        return (
                          <TrainingScheduleDetail
                            schedule_id={rowData.schedule_id}
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

                    /*      onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        handleRowDelete(oldData, resolve);
                      }), */
                  }}
                  actions={[
                    {
                      icon: () => <AddIcon />,
                      tooltip: "Schedule Training",
                      onClick: (event, rowData) => {
                        redirectToScheduleForm();
                      },
                      isFreeAction: true,
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

export default TrainingSchedule;
