import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ViewColumn from "@material-ui/icons/ViewColumn";
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
import moment from "moment";
import TrainingScheduleDetail from "../trainings/TrainingScheduleDetail";

const ThisMonthTrainings = () => {
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

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/thismonthtraining")
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

  /* const fetchParticipants = (schedule_id) => {
    axios
      .post("http://127.0.0.1:8000/api/trainees/participant", schedule_id)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  const columns = [
    {
      title: "TRAINING TITLE",
      field: "training_title",
      cellStyle: {
        minWidth: 200,

        margin: 0,
        borderSpacing: 0,
      },
    },
    {
      title: "TYPE",
      field: "training_type",
      cellStyle: {
        width: "10%",

        padding: 0,
        margin: 0,
        borderSpacing: 0,
      },
      headerStyle: {
        minWidth: 10,
        padding: 0,
        margin: 0,
      },
      lookup: { Internal: "Internal", External: "External" },
    },

    {
      title: "VALIDITY",
      field: "validity",

      cellStyle: {
        padding: 0,
        margin: 0,
        borderSpacing: 0,
      },
      render: (row) => (
        <span>
          {" "}
          {row["validity"] !== null
            ? row["validity"] + " Months"
            : "No Expiration"}
        </span>
      ),
    },

    {
      title: "COST",
      field: "cost",

      cellStyle: {
        minWidth: 10,
        padding: 0,
        margin: 0,
        borderSpacing: 0,
      },
      render: (row) => <span>&#8358;{row["cost"]}</span>,
    },

    {
      title: "START DATE",
      field: "training_start_date",
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
      render: (row) => <span> {formatDate(row["training_start_date"])}</span>,
    },
    {
      title: "END DATE",
      field: "training_end_date",
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
      render: (row) => <span> {formatDate(row["training_end_date"])}</span>,
    },

    {
      title: "VENUE",
      field: "venue",
      cellStyle: {
        minWidth: 200,

        padding: 0,
        margin: 0,
        borderSpacing: 0,
      },
    },
  ];

  return (
    <>
      {!isLoading ? (
        <MaterialTable
          columns={columns}
          data={schedule}
          title="Training Scheduled for this month"
          icons={tableIcons}
          options={{
            search: true,
            sorting: true,
            exportButton: true,

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
          detailPanel={[
            {
              tooltip: "Show Participants",
              render: (rowData) => {
                return (
                  <TrainingScheduleDetail schedule_id={rowData.schedule_id} />
                );
              },
            },
          ]}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ThisMonthTrainings;
