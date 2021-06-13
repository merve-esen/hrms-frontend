import axios from "axios";

export default class CandiateService {
  getAll() {
    return axios.get("http://localhost:8080/api/candidates/getall");
  }

  add({
    birthYear,
    confirmPassword,
    email,
    firstName,
    identityNumber,
    lastName,
    password,
  }) {
    return axios.post("http://localhost:8080/api/candidates/add", {
      birthYear,
      confirmPassword,
      email,
      firstName,
      identityNumber,
      lastName,
      password,
    });
  }
}
