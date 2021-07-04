import axios from "axios";

export default class ResumeService {
  getAll() {
    return axios.get("http://localhost:8080/api/resumes/getall");
  }

  getByCandidateId(id) {
    return axios.get(
      "http://localhost:8080/api/resumes/getAllByCandidateId?candidateId=" + id
    );
  }

  update(resume) {
    return axios.post("http://localhost:8080/api/resumes/update", resume);
  }
}
