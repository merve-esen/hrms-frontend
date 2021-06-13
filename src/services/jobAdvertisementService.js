import axios from "axios";

export default class JobAdvertisementService {
  getAll() {
    return axios.get("http://localhost:8080/api/jobAdvertisements/getall");
  }

  add({
    applicationDeadline,
    city: { cityId },
    jobDescription,
    employer: { employerId },
    jobPosition: { jobPositionId },
    minimumSalary,
    maximumSalary,
    numberOfOpenPositions,
  }) {
    return axios.post("http://localhost:8080/api/jobAdvertisements/add", {
      applicationDeadline,
      city: { id: cityId },
      jobDescription,
      employer: { id: employerId },
      jobPosition: { id: jobPositionId },
      minimumSalary,
      maximumSalary,
      numberOfOpenPositions,
    });
  }

  update({
    id,
    applicationDeadline,
    city: { cityId },
    jobDescription,
    employer: { employerId },
    jobPosition: { jobPositionId },
    minimumSalary,
    maximumSalary,
    numberOfOpenPositions,
  }) {
    return axios.post("http://localhost:8080/api/jobAdvertisements/update", {
      id,
      applicationDeadline,
      city: { id: cityId },
      jobDescription,
      employer: { id: employerId },
      jobPosition: { id: jobPositionId },
      minimumSalary,
      maximumSalary,
      numberOfOpenPositions,
    });
  }
}
