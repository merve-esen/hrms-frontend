import axios from 'axios';

export default class EmployerUpdateService {

  getAll() {
    return axios.get("http://localhost:8080/api/employerUpdates/getall");
  }

  getById(id) {
    return axios.get(`http://localhost:8080/api/employerUpdates/getbyid?id=${id}`);
  }

  getByEmployerIdAndDeletedFalse(employerId) {
    return axios.get(`http://localhost:8080/api/employerUpdates/getbyemployeridanddeletedfalse?employerId=${employerId}`);
  }

  add(employerUpdates) {
    return axios.post("http://localhost:8080/api/employerUpdates/add", employerUpdates);
  }

  update(employerUpdates) {
    return axios.post("http://localhost:8080/api/employerUpdates/update", employerUpdates);
  }

  confirm(employeeId, employerUpdateId) {
    return axios.get(`http://localhost:8080/api/employerUpdates/confirm?employeeId=${employeeId}&employerUpdateId=${employerUpdateId}`);
  }

  reject(employeeId, employerUpdateId) {
    return axios.get(`http://localhost:8080/api/employerUpdates/reject?employeeId=${employeeId}&employerUpdateId=${employerUpdateId}`);
  }
}