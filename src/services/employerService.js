import axios from 'axios';

export default class EmployerService {

  getAll() {
    return axios.get("http://localhost:8080/api/employers/getall");
  }

  add(employer) {
    return axios.post("http://localhost:8080/api/employers/add", employer);
  }

  update(employer) {
    return axios.post("http://localhost:8080/api/employers/update", employer);
  }
}