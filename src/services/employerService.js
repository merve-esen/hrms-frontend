import axios from 'axios';

export default class EmployerService {

  getAll() {
    return axios.get("http://localhost:8080/api/employers/getall");
  }

  getById(id) {
    return axios.get(`http://localhost:8080/api/employers/getbyid?id=${id}`);
  }

  getByConfirmedIsTrue() {
    return axios.get("http://localhost:8080/api/employers/getbyconfirmedistrue");
  }

  getByConfirmedIsFalse() {
    return axios.get("http://localhost:8080/api/employers/getbyconfirmedisfalse");
  }

  getByConfirmedIsNull() {
    return axios.get("http://localhost:8080/api/employers/getbyconfirmedisnull");
  }

  add(employer) {
    return axios.post("http://localhost:8080/api/employers/add", employer);
  }

  update(employer) {
    return axios.post("http://localhost:8080/api/employers/update", employer);
  }

  confirm(employerId, employeeId) {
    return axios.get(`http://localhost:8080/api/employers/confirm?employerId=${employerId}&employeeId=${employeeId}`);
  }

  reject(employerId, employeeId) {
    return axios.get(`http://localhost:8080/api/employers/reject?employerId=${employerId}&employeeId=${employeeId}`);
  }
}