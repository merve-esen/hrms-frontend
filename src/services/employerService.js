import axios from 'axios';

export default class EmployerService {

  getAll() {
    return axios.get("http://localhost:8080/api/employers/getall");
  }

  add({ companyName, email, password, phoneNumber, webSite }) {
    return axios.post("http://localhost:8080/api/employers/add", {
      companyName,
      email,
      password,
      phoneNumber,
      webSite
    });
  }
}