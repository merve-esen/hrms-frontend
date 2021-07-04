import axios from "axios";

export default class WorkplaceService {
  getAll() {
    return axios.get("http://localhost:8080/api/workplaces/getall");
  }

  add(workplace) {
    return axios.post("http://localhost:8080/api/workplaces/add", workplace);
  }

  update(workplace) {
    return axios.post("http://localhost:8080/api/workplaces/update", workplace);
  }
}
