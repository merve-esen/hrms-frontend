import axios from 'axios';

export default class EmployerUpdateService {

  getAll() {
    return axios.get("http://localhost:8080/api/employerUpdates/getall");
  }

  getById(id) {
    return axios.get(`http://localhost:8080/api/employerUpdates/getbyid?id=${id}`);
  }

  getByDeletedFalse() {
    return axios.get("http://localhost:8080/api/employerUpdates/getbydeletedfalse");
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

  confirm(employerUpdateId, employeeId) {
    return axios.get(`http://localhost:8080/api/employerUpdates/confirm?employerUpdateId=${employerUpdateId}&employeeId=${employeeId}`);
  }

  reject(employerUpdateId, employeeId) {
    return axios.get(`http://localhost:8080/api/employerUpdates/reject?employerUpdateId=${employerUpdateId}&employeeId=${employeeId}`);
  }
}