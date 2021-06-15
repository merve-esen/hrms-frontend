import React from 'react'
import Home from '../pages/Home/Home';
import CandidateList from '../pages/CandidateList';
import EmployerList from '../pages/EmployerList';
import JobAdvertisementList from '../pages/JobAdvertisementList';
import JobPositionList from '../pages/JobPositionList';
import { Route } from "react-router";

export default function Dashboard() {
    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/candidates" component={CandidateList} />
            <Route path="/employers/" component={EmployerList} />
            <Route path="/jobAdvertisements" component={JobAdvertisementList} />
            <Route path="/jobPositions" component={JobPositionList} />
        </div>
    )
}
