import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CircularProgress, Grid, Paper } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import SuccessAlert from "../alerts/SuccessAlert";
import ErrorAlert from "../alerts/ErrorAlert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: theme.spacing(11),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const TrainingScheduleForm = () => {
  const [trainees, setTrainees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trainings, setTrainings] = useState([]);
  const [selectTrainees, setSelectTrainees] = useState([]);
  const [validity, setValidity] = useState("");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [selectInstructor, setSelectInstructor] = useState([]);
  const [cost, setCost] = useState("");
  const [venue, setVenue] = useState("");
  const [selectedValue, setSelectedValue] = React.useState("Internal");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState([]);
  const [inactive, setInactive] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const history = useHistory();

  const classes = useStyles();

  const onChangeVenue = (e) => {
    setVenue(e.target.value);
  };

  const onChangeCost = (e) => {
    setCost(e.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTrainingTitleChange = (e) => {
    setTrainingTitle(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const onchangeValidity = (e) => {
    setValidity(e.target.value);
  };

  const schedule = (e) => {
    e.preventDefault();

    //    console.log("waa");
    const selected_trainee_arr = [];
    for (let i = 0; i < selectTrainees.length; i++) {
      selected_trainee_arr.push(selectTrainees[i].id);
    }

    const formData = {
      trainees: selected_trainee_arr,
      training: trainingTitle,
      validity: validity,
      instructor: selectInstructor,
      training_date: selectedDate,
      end_date: endDate,
      venue: venue,
      cost: cost,
      training_type: selectedValue,
    };

    console.log(formData.training_type);

    //   console.log(formData);

    let errorList = [];
    if (formData.trainees === undefined || formData.trainees.length < 1) {
      errorList.push("Please select trainees.   ");
      setIserror(true);
    }

    if (formData.instructor === undefined || formData.instructor.length < 1) {
      errorList.push("Please select an instructor.  ");
      setIserror(true);
    }

    if (errorList.length < 1) {
      //no error
      axios
        .post("http://127.0.0.1:8000/api/trainingschedule/store", formData)
        .then((response) => {
          console.log(response.data);
          setInactive(true);

          history.push("/trainings/schedule");
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(["Oops, something went wrong!!!   "]);
          setIserror(true);
        });
    } else {
      setAlertMessage(errorList);
      setIserror(true);
    }
  };

  //console.log(selectTraining);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/trainee")
      .then((response) => {
        setIsLoading(true);
        setTrainees(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://127.0.0.1:8000/api/courses")
      .then((response) => {
        setIsLoading(true);
        setTrainings(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://127.0.0.1:8000/api/instructor")
      .then((response) => {
        setInstructors(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let trainee = [];
  for (let i = 0; i < trainees.length; i++) {
    trainee.push(trainees[i]);
  }

  let training = [];
  for (let i = 0; i < trainings.length; i++) {
    training.push(trainings[i]);
  }

  return (
    <>
      <h3 className="card-title">
        {iserror ? <ErrorAlert message={alertMessage} /> : null}
        {iserror === false ? <SuccessAlert message={alertMessage} /> : null}
      </h3>

      {!isLoading ? (
        <form onSubmit={schedule}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Autocomplete
                    multiple
                    id="size-small-outlined-multi"
                    size="small"
                    options={trainee}
                    required={true}
                    getOptionLabel={(option) =>
                      `${option.first_name} ${option.surname}`
                    }
                    onChange={(event, value) => {
                      setSelectTrainees(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select trainees"
                        placeholder="trainees"
                      />
                    )}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={instructors}
                    getOptionLabel={(option) => option.full_name}
                    onChange={(event, value) => setSelectInstructor(value.id)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Instructor"
                        variant="outlined"
                      />
                    )}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <TextField
                    id="training"
                    label="Enter Training Title"
                    variant="outlined"
                    size="small"
                    required={true}
                    fullWidth
                    onChange={handleTrainingTitleChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <b>Internal Training</b>
                  <GreenRadio
                    checked={selectedValue === "INTERNAL"}
                    onChange={handleChange}
                    value="INTERNAL"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "INTERNAL" }}
                  />
                  &nbsp;&nbsp;&nbsp;<b>External Training</b>
                  <Radio
                    checked={selectedValue === "EXTERNAL"}
                    onChange={handleChange}
                    value="EXTERNAL"
                    color="default"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "EXTERNAL" }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <TextField
                    id="start_date"
                    label="Training Start Date"
                    type="date"
                    required={true}
                    fullWidth
                    onChange={handleDateChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <TextField
                    id="end_date"
                    label="Training End Date"
                    type="date"
                    required={true}
                    fullWidth
                    onChange={handleEndDateChange}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <TextField
                    id="standard-basic"
                    label="Venue"
                    fullWidth
                    required={true}
                    onChange={onChangeVenue}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <TextField
                    id="standard-basic"
                    label="Validity"
                    type="number"
                    fullWidth
                    onChange={onchangeValidity}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          Month(s){" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.paper}>
                  <TextField
                    id="standard-basic"
                    label="Cost / Personel"
                    type="number"
                    fullWidth
                    onChange={onChangeCost}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#8358;
                        </InputAdornment>
                      ),
                    }}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  fullWidth
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  disabled={inactive}
                >
                  Schedule Training
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}></Grid>
            </Grid>
          </div>
        </form>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default TrainingScheduleForm;
