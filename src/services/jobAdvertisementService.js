import axios from "axios";

export default class JobAdvertisementService {
  getAll() {
    return axios.get("http://localhost:8080/api/jobAdvertisements/getall");
  }

  getByIsActiveTrue() {
    return axios.get("http://localhost:8080/api/jobAdvertisements/getbyisactivetrue");
  }

  add({
    applicationDeadline,
    cityId,
    jobDescription,
    employerId,
    jobPositionId,
    minimumSalary,
    maximumSalary,
    numberOfOpenPositions,
    workTimeId,
    workplaceId
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
      workTime: { id: workTimeId },
      workplace: { id: workplaceId }
    });
  }

  update({
    id,
    applicationDeadline,
    cityId,
    jobDescription,
    employerId,
    jobPositionId,
    minimumSalary,
    maximumSalary,
    numberOfOpenPositions,
    workTimeId,
    workplaceId
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
      workTime: { id: workTimeId },
      workplace: { id: workplaceId }
    });
  }

  close(jobAdvertisementId) {
    return axios.get(`http://localhost:8080/api/jobAdvertisements/close?jobAdvertisementId=${jobAdvertisementId}`);
  }

  publish(jobAdvertisementId) {
    return axios.get(`http://localhost:8080/api/jobAdvertisements/publish?jobAdvertisementId=${jobAdvertisementId}`);
  }

  confirm(jobAdvertisementId, employeeId) {
    return axios.get(`http://localhost:8080/api/jobAdvertisements/confirm?jobAdvertisementId=${jobAdvertisementId}&?employeeId=${employeeId}`);
  }

  reject(jobAdvertisementId, employeeId) {
    return axios.get(`http://localhost:8080/api/jobAdvertisements/reject?jobAdvertisementId=${jobAdvertisementId}&?employeeId=${employeeId}`);
  }

}
