import axios from "axios";

export default class WorkExperienceService {
  getAll() {
    return axios.get("http://localhost:8080/api/workExperiences/getall");
  }

  getAllByResumeId(resumeId) {
    return axios.get(`http://localhost:8080/api/workExperiences/getAllByResumeId?resumeId=${resumeId}`);
  }

  getAllByResumeIdOrderByEndYearDesc(resumeId) {
    return axios.get(`http://localhost:8080/api/workExperiences/getAllByResumeIdOrderByEndYearDesc?resumeId=${resumeId}`);
  }

  add(workExperience) {
    return axios.post("http://localhost:8080/api/workExperiences/add", workExperience);
  }

  delete(workExperienceId) {
    return axios.delete(`http://localhost:8080/api/workExperiences/delete?workExperienceId=${workExperienceId}`)
  }
}
