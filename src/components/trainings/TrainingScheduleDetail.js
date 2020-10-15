import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    margin: "2px",
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#000",
    color: "#fff",
  },
  body: {
    backgroundColor: "#000",
    color: "#fff",
  },
}))(TableCell);

const TrainingScheduleDetail = ({ schedule_id }) => {
  // console.log(schedule_id);
  const [participants, setParticipants] = useState([]);

  const [selectTrainees, setSelectTrainees] = useState([]);
  const [trainees, setTrainees] = useState([]);

  const classes = useStyles();

  const toTrainees = () => {
    let mounted = true;
    axios
      .get(`http://127.0.0.1:8000/api/addparticipant/${schedule_id}`)
      .then((response) => {
        if (mounted) {
          setTrainees(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let mounted = true;

    axios
      .get(
        `http://127.0.0.1:8000/api/trainingschedule/participants/${schedule_id}`
      )
      .then((response) => {
        if (mounted) {
          setParticipants(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // toTrainees();

    axios
      .get(`http://127.0.0.1:8000/api/addparticipant/${schedule_id}`)
      .then((response) => {
        if (mounted) {
          setTrainees(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      mounted = false;
    };
  }, [schedule_id]);

  const submit = (e) => {
    e.preventDefault();

    //  console.log(selectTrainees);
    const selected_trainee_arr = [];
    for (let i = 0; i < selectTrainees.length; i++) {
      selected_trainee_arr.push(selectTrainees[i].id);
    }

    const formData = {
      trainees: selected_trainee_arr,
      schedule_id: schedule_id,
    };

    //console.log(formData);

    if (formData.trainees === undefined || formData.trainees.length < 1) {
      alert("You must select at least one trainee to add");
    } else {
      axios
        .post(`http://127.0.0.1:8000/api/scheduleparticipant/add`, formData)
        .then((response) => {
          setParticipants(response.data);
          setSelectTrainees([]);
          toTrainees();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let trainee = [];
  for (let i = 0; i < trainees.length; i++) {
    trainee.push(trainees[i]);
  }

  const changeStatus = (event) => {
    let id = event.target.value;

    axios
      .put(`http://127.0.0.1:8000/api/schedule/${id}/${schedule_id}`)
      .then((response) => {
        setParticipants(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteParticipant = (e) => {
    let id = e.currentTarget.value;

    axios
      .delete(`http://127.0.0.1:8000/api/participant/${id}/${schedule_id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })

      .then((response) => {
        setParticipants(response.data);
        toTrainees();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* const test = (e) => {
    console.log(e.target.value);
  }; */

  // console.log(participants);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="30px">&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Staff ID</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Surname</StyledTableCell>
            <StyledTableCell width="100px">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="delete"
                  onClick={deleteParticipant}
                  value={participant.id}
                  disabled={participant.training_status === 1 ? true : false}
                >
                  <DeleteIcon style={{ color: "#fff" }} />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                {participant.staff_id}
              </StyledTableCell>

              <StyledTableCell align="center">
                {participant.first_name}
              </StyledTableCell>
              <StyledTableCell align="center">
                {participant.surname}
              </StyledTableCell>
              <TableCell>
                <FormControlLabel
                  control={
                    <Switch
                      checked={participant.training_status === 1 ? true : false}
                      color="primary"
                      onChange={changeStatus}
                      value={participant.id}
                    />
                  }
                  label={
                    participant.training_status === 1 ? "Completed" : "Pending"
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan="5">
              <form onSubmit={submit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={9}>
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
                      value={selectTrainees}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Select trainees"
                          placeholder="trainees"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      size="large"
                      fullWidth
                    >
                      Add Participant
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TrainingScheduleDetail;
