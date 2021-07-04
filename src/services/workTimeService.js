import axios from "axios";

export default class WorkTimeService {
  getAll() {
    return axios.get("http://localhost:8080/api/workTimes/getall");
  }

  add(workTime) {
    return axios.post("http://localhost:8080/api/workTimes/add", workTime);
  }

  update(workTime) {
    return axios.post("http://localhost:8080/api/workTimes/update", workTime);
  }
}
