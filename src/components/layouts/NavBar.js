import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <div style={{ backgroundColor: "#fff" }}>
          <a href="index3.html" className="brand-link">
            <img
              src="dist/img/logo.png"
              alt="AdminLTE Logo"
              style={{
                width: "300px",
                height: "60px",
                padding: "10px",
              }}
            />
          </a>
        </div>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="#" className="d-block">
                <b>Training Management System</b>
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-th" />
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item has-treeview menu-open">
                <a className="nav-link ">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Trainees
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/trainees/active" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Active Staffs</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trainees/exited" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Exited Staffs</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item has-treeview menu-open">
                <a className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Trainings
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  {/*} <li className="nav-item">
                    <Link to="/trainings/courses" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Courses</p>
                    </Link>
                  </li> */}

                  <li className="nav-item">
                    <Link to="/trainings/schedule" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Training Schedule</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/trainingrecords" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Training Records</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview menu-open">
                <a className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p>
                    Reports
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/internal/report" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Internal Training</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/internal/training/cost" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Internal Training Cost</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/external/training/cost" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>External Training Cost</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/instructors" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Instructors</p>
                </Link>
              </li>
              <li className="nav-item">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Training Request</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default NavBar;
