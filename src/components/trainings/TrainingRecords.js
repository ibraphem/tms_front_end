import React, { forwardRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

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
  const [open, setOpen] = useState(false);
  const [sentDate, setSentDate] = useState("");
  const [sentCert, setSentCert] = useState([]);

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid green",
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    sendButton: {
      marginTop: "5px",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://tmsapi.db/api/trainingrecords")
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
          {row["expiry_date"] === null ||
          row["training_title"].includes("INITIAL")
            ? "No Expiration"
            : formatDate(row["expiry_date"])}
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

  const handleOpen = (data) => {
    setSentCert(data);
    setOpen(true);
  };

  // console.log(sentCert);

  const handleClose = (data) => {
    setOpen(false);
  };

  const handleSentDate = (e) => {
    setSentDate(e.target.value);
  };

  const sendToRegistry = (e) => {
    e.preventDefault();
    const sent_cert_arr = [];
    for (let i = 0; i < sentCert.length; i++) {
      sent_cert_arr.push(sentCert[i].id);
    }

    //  console.log(sent_cert_arr);
    const formData = {
      sentCert: sent_cert_arr,
      sentDate: sentDate,
    };

    axios
      .post("http://tmsapi.db/api/sendcertificate", formData)
      .then((response) => {
        // console.log(response.data);
        setOpen(false);
        setRecords(response.data);
      });
  };

  //console.log(sentDate);

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
                    selection: true,
                    exportButton: false,
                    headerStyle: {
                      backgroundColor: "#01579b",
                      color: "#FFF",
                    },
                  }}
                  style={{
                    fontSize: "0.9rem",
                  }}
                  actions={[
                    {
                      tooltip: "Send certificate to registry",
                      icon: () => <SendIcon />,
                      onClick: (evt, data) => {
                        handleOpen(data);
                      },
                    },
                  ]}
                />
              ) : (
                <CircularProgress />
              )}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">Select Sent Date</h2>
                    {/*  <p id="transition-modal-description">
                      react-transition-group animates me.
              </p> */}
                    <form onSubmit={sendToRegistry}>
                      <TextField
                        id="sent_date"
                        variant="outlined"
                        //   label="Training End Date"
                        type="date"
                        required={true}
                        fullWidth
                        onChange={handleSentDate}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        //  onClick={sendToRegistry}
                        required={true}
                        className={classes.sendButton}
                      >
                        Submit
                      </Button>
                    </form>
                  </div>
                </Fade>
              </Modal>

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
