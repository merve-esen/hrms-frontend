import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import JobAdvertisementService from "../../services/jobAdvertisementService";

export default function LatestJobs() {
  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getAll()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  return (
    <div style={{ marginTop: "3em" }}>
      <h1>Latest Jobs</h1>
      <Card.Group style={{ marginTop: "3em" }}>
        {jobAdvertisements.map((jobAdvertisement) => (
          <Card fluid color="yellow" key={jobAdvertisement.id} header={jobAdvertisement.jobDescription} />
        ))}
      </Card.Group>
    </div>
  );
}
