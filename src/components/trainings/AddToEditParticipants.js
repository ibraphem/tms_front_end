import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

const AddToEditParticipants = ({
  schedule_id,
  submit,
  handleTraineeChange,
}) => {
  const classes = useStyles();

  const [trainees, setTrainees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://tmsapi.db/api/trainee")
      .then((response) => {
        setIsLoading(true);
        setTrainees(response.data);
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

  return (
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
            onChange={handleTraineeChange}
            //  value={selectTrainees}
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
  );
};

export default AddToEditParticipants;
