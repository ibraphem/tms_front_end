import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [count, setCount] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [thisMonth, setThisMonth] = useState([]);
  const [nextMonth, setNextMonth] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/count")
      .then((response) => {
        console.log(response.data);
        setCount(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://127.0.0.1:8000/api/expiry")
      .then((response) => {
        console.log(response.data);
        setThisMonth(response.data.this_month_expiry);
        setNextMonth(response.data.next_month_expiry);
        setIsLoading(false);
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
                    <a href="#">Home</a>
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
                {/* Map card */}
                <div className="card bg-gradient-danger">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Training Expiring This Month
                    </h3>
                    {/* card tools */}
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-card-widget="collapse"
                        data-toggle="tooltip"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                    {/* /.card-tools */}
                  </div>
                  <div className="card-body">
                    <div
                      id="world-map"
                      style={{ height: 250, width: "100%" }}
                    />
                  </div>
                  {/* /.card-body*/}
                </div>
              </section>

              <section className="col-lg-6 connectedSortable">
                {/* Map card */}
                <div className="card bg-gradient-success">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      <i className="fas fa-map-marker-alt mr-1" />
                      Training Expiring This Month
                    </h3>
                    {/* card tools */}
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        data-card-widget="collapse"
                        data-toggle="tooltip"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                    {/* /.card-tools */}
                  </div>
                  <div className="card-body">
                    <div
                      id="world-map"
                      style={{ height: 250, width: "100%" }}
                    />
                  </div>
                  {/* /.card-body*/}
                </div>
              </section>

              {/* right col */}
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
