import axios from "axios";

export default class JobPositionService {
  getAll() {
    return axios.get("http://localhost:8080/api/jobPositions/getall");
  }

  add({ name }) {
    return axios.post("http://localhost:8080/api/jobPositions/add", {
      name,
    });
  }
}
