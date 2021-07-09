import React from "react";
import Home from "../pages/Home/Home";
import CandidateList from "../pages/CandidateList";
import EmployerList from "../pages/EmployerList";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import JobPositionList from "../pages/JobPositionList";
import { Route } from "react-router";
import JobAdvertisementDetail from "../pages/JobAdvertisementDetail";
import { ToastContainer } from "react-toastify";
import EmployerDashboard from "./EmployerDashboard";
import AdminDashboard from "./AdminDashboard";
import CandidateDashboard from "./CandidateDashboard";
import JobAdvertisementAdd from "./../pages/JobAdvertisementAdd";
import EmployerJobAdvertisementList from "../pages/EmployerJobAdvertisementList";
import AdminJobAdvertisementList from "../pages/AdminJobAdvertisementList";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={Home} />

      <Route exact path="/admin/" component={AdminDashboard} />
      <Route exact path="/admin/jobAdvertisements" component={AdminJobAdvertisementList} /> 

      <Route exact path="/employer/" component={EmployerDashboard} />
      <Route exact path="/employer/jobAdvertisements" component={EmployerJobAdvertisementList} /> 

      <Route exact path="/candidate/" component={CandidateDashboard} />
      
      <Route exact path="/candidates" component={CandidateList} />
      <Route exact path="/employers/" component={EmployerList} />
      <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
      <Route exact path="/jobAdvertisementDetail/:id" component={JobAdvertisementDetail} />
      <Route exact path="/jobAdvertisement/add" component={JobAdvertisementAdd} />
      <Route exact path="/jobPositions" component={JobPositionList} />     

    </div>
  );
}
