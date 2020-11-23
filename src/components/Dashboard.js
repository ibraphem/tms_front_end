import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ThisMonthExpiry from "./dashboard/ThisMonthExpiry";
import NextMonthExpiry from "./dashboard/NextMonthExpiry";
import ThisMonthTrainings from "./dashboard/ThisMonthTrainings";

const Dashboard = () => {
  const [count, setCount] = useState("");

  useEffect(() => {
    axios
      .get("http://tmsapi.db/api/count")
      .then((response) => {
        console.log(response.data);
        setCount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <span>Home</span>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-4 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{count.active_trainee_count}</h3>
                    <p>Active Trainees</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <Link to="/trainees/active" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-4 col-6">
                {/* small box */}
                <div className="small-box bg-primary">
                  <div className="inner">
                    <h3>{count.exited_trainee_count}</h3>
                    <p>Exited Trainees</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <Link to="/trainees/exited" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-4 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{count.instructor_count}</h3>
                    <p>Instructors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <Link to="/instructors" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              {/* ./col */}

              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row">
              <section className="col-lg-6 connectedSortable">
                <ThisMonthExpiry />
                {/* Map card */}
                <div className="card bg-gradient-danger">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Training Expiring This Month
                    </h3>
                  </div>
                </div>
              </section>

              <section className="col-lg-6 connectedSortable">
                <NextMonthExpiry />
                {/* Map card */}
                <div className="card bg-gradient-warning">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Training Expiring Next Month
                    </h3>
                  </div>
                </div>
              </section>
            </div>

            <div className="row">
              <section className="col-lg-12 connectedSortable">
                <ThisMonthTrainings />
                {/* Map card */}
              </section>
            </div>
            {/* /.row (main row) */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
};

export default Dashboard;
