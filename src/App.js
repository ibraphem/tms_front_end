import React, { useState } from "react";
import Login from "./components/auth/Login";
import axios from "axios";

import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from "./components/layouts/NavBar";
import Header from "./components/layouts/Header";
import Register from "./components/auth/Register";
import ActiveStaffs from "./components/trainees/ActiveStaffs";
import ExitedStaffs from "./components/trainees/ExitedStaffs";
import TrainingSchedule from "./components/trainings/TrainingSchedule";
import ScheduleTraining from "./components/trainings/ScheduleTraining";
import TrainingRecords from "./components/trainings/TrainingRecords";
import Instructor from "./components/instructors/Instructor";
import InternalTrainingReport from "./components/reports/InternalTrainingReport";
import InternalTrainingCostReport from "./components/reports/InternalTrainingCostReport";
import ExternalTrainingCostReport from "./components/reports/ExternalTrainingCostReport";
import TrainingRequests from "./components/trainingRequests/TrainingRequests";

const App = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iserror, setIserror] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    let formData = {
      email: email,
      password: password,
    };

    axios
      .post("http://127.0.0.1:8000/api/user/login", formData)
      .then((response) => {
        setIserror(false);

        localStorage.setItem("userToken", response.data.token);
        history.push("/dashboard");
      })

      .catch((error) => {
        setIserror(true);
        setAlertMessage("Incorrect Login Credential");
        console.log(error);
      });
  };

  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route
        exact
        path="/"
        render={(props) => (
          <Login
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onSubmit={login}
            iserror={iserror}
            alertMessage={alertMessage}
          />
        )}
      />

      <>
        <Header />
        <NavBar />
        <ProtectedRoute
          exact
          path="/dashboard"
          component={Dashboard}
          email={email}
          password={password}
        />
        <ProtectedRoute
          exact
          path="/trainees/active"
          component={ActiveStaffs}
        />
        <ProtectedRoute
          exact
          path="/trainees/exited"
          component={ExitedStaffs}
        />
        {/* <ProtectedRoute
          exact
          path="/trainings/courses"
          component={Courses}
          email={email}
          password={password}
        /> */}
        <ProtectedRoute
          exact
          path="/trainings/schedule"
          component={TrainingSchedule}
        />
        <ProtectedRoute
          exact
          path="/scheduleform"
          component={ScheduleTraining}
        />
        <ProtectedRoute
          exact
          path="/trainingrecords"
          component={TrainingRecords}
        />
        <ProtectedRoute exact path="/instructors" component={Instructor} />

        <ProtectedRoute
          exact
          path="/internal/report"
          component={InternalTrainingReport}
        />

        <ProtectedRoute
          exact
          path="/internal/training/cost"
          component={InternalTrainingCostReport}
        />

        <ProtectedRoute
          exact
          path="/external/training/cost"
          component={ExternalTrainingCostReport}
        />

        <ProtectedRoute
          exact
          path="/training/request"
          component={TrainingRequests}
        />

        {/*     <Footer /> */}
      </>
    </Switch>
  );
};

export default withRouter(App);
