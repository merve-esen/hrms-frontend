import React from "react";
import LatestJobs from "./LatestJobs";
import SearchJobs from './SearchJobs';

export default function Home() {
  return (
    <div>
      <SearchJobs />
      <LatestJobs />
    </div>
  );
}
