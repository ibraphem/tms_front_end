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

const InstructorCourse = ({ id }) => {
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

  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/instructorcourses/${id}`)
      .then((response) => {
        if (mounted) {
          setInstructorCourses(response.data);
        }
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  const columns = [
    {
      title: "COURSE TITLE",
      field: "course_title",
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
      title: "LICENCE EXPIRY DATE",
      field: "licence_expiry_date",
      type: "date",
      render: (row) => <span> {formatDate(row["licence_expiry_date"])}</span>,
    },
  ];

  let today = new Date();
  let twoMonthtime = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 2,
    new Date().getDate()
  );

  const handleRowUpdate = (newData, oldData, resolve) => {
    //   let exp_DATE = newData.licence_expiry_date;
    let licence_expiry_date = new Date(newData.licence_expiry_date)
      .toISOString()
      .slice(0, 10);

    const formData = {
      instructor_id: id,
      licence_expiry_date: licence_expiry_date,
      course_title: newData.course_title,
    };

    axios
      .put(
        `http://127.0.0.1:8000/api/instructorcourse/update/${oldData.id}`,
        formData
      )
      .then((response) => {
        setInstructorCourses(response.data);
        resolve();
      })
      .catch((error) => {
        console.log(error);

        resolve();
      });
  };

  const handleRowAdd = (newData, resolve) => {
    //  let exp_DATE = newData.licence_expiry_date;
    let course_title = newData.course_title;
    //  console.log(course_title);
    let licence_expiry_date = new Date(newData.licence_expiry_date)
      .toISOString()
      .slice(0, 10);

    const formData = {
      licence_expiry_date: licence_expiry_date,
      course_title: course_title,
      instructor_id: id,
    };

    // console.log(exp_DATE);

    //  console.log(formData.course_title);

    axios
      .post(`http://127.0.0.1:8000/api/instructorcourse/store`, formData)
      .then((response) => {
        setInstructorCourses(response.data);
        resolve();
      })
      .catch((error) => {
        console.log(error);

        resolve();
      });
  };

  return (
    <div>
      <MaterialTable
        columns={columns}
        data={instructorCourses}
        icons={tableIcons}
        options={{
          search: true,
          sorting: true,
          rowStyle: (rowData) => ({
            backgroundColor:
              rowData.licence_expiry_date === null
                ? "green"
                : today >= new Date(rowData.licence_expiry_date)
                ? "red"
                : new Date(rowData.licence_expiry_date) <= twoMonthtime
                ? "#cccc00"
                : "green",
          }),

          exportButton: false,
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
    </div>
  );
};

export default InstructorCourse;
