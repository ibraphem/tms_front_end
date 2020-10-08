import React, { useState } from "react";
import Login from "./components/auth/Login";
import axios from "axios";

import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from "./components/layouts/NavBar";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import ActiveStaffs from "./components/trainees/ActiveStaffs";
import ExitedStaffs from "./components/trainees/ExitedStaffs";
import Courses from "./components/trainings/Courses";
import TrainingSchedule from "./components/trainings/TrainingSchedule";
import ScheduleTraining from "./components/trainings/ScheduleTraining";
import TrainingRecords from "./components/trainings/TrainingRecords";
import Instructor from "./components/instructors/Instructor";
import InternalTrainingReport from "./components/reports/InternalTrainingReport";
import InternalTrainingCostReport from "./components/reports/InternalTrainingCostReport";
import ExternalTrainingCostReport from "./components/reports/ExternalTrainingCostReport";

const App = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log("Login Successfull");
        // console.log(response.data);
        localStorage.setItem("userToken", response.data.token);
        history.push("/dashboard");
      })

      .catch((error) => {
        alert("Incorrect Login credential");
        console.log(error);
      });
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <Login
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onSubmit={login}
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
          email={email}
          password={password}
        />
        <ProtectedRoute
          exact
          path="/trainees/exited"
          component={ExitedStaffs}
          email={email}
          password={password}
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
          email={email}
          password={password}
        />
        <ProtectedRoute
          exact
          path="/scheduleform"
          component={ScheduleTraining}
          email={email}
          password={password}
        />
        <ProtectedRoute
          exact
          path="/trainingrecords"
          component={TrainingRecords}
          email={email}
          password={password}
        />
        <ProtectedRoute
          exact
          path="/instructors"
          component={Instructor}
          email={email}
          password={password}
        />

        <ProtectedRoute
          exact
          path="/internal/report"
          component={InternalTrainingReport}
          email={email}
          password={password}
        />

        <ProtectedRoute
          exact
          path="/internal/training/cost"
          component={InternalTrainingCostReport}
          email={email}
          password={password}
        />

        <ProtectedRoute
          exact
          path="/external/training/cost"
          component={ExternalTrainingCostReport}
          email={email}
          password={password}
        />

        <Footer />
      </>
    </Switch>
  );
};

export default withRouter(App);
