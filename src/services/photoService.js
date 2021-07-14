import axios from "axios";

export default class PhotoService {
  getAll() {
    return axios.get("http://localhost:8080/api/resumes/getall");
  }
}