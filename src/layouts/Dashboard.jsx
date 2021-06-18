import React from "react";
import Home from "../pages/Home/Home";
import CandidateList from "../pages/CandidateList";
import EmployerList from "../pages/EmployerList";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import JobPositionList from "../pages/JobPositionList";
import { Route } from "react-router";
import JobAdvertisementDetail from "../pages/JobAdvertisementDetail";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={Home} />
      <Route exact path="/candidates" component={CandidateList} />
      <Route exact path="/employers/" component={EmployerList} />
      <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
      <Route
        exact
        path="/jobAdvertisementDetail"
        component={JobAdvertisementDetail}
      />
      <Route exact path="/jobPositions" component={JobPositionList} />
    </div>
  );
}
