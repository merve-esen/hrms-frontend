import axios from "axios";

export default class ResumeService {
  getAll() {
    return axios.get("http://localhost:8080/api/resumes/getall");
  }

  getByCandidateId(id) {
    return axios.get(`http://localhost:8080/api/resumes/getByCandidateId?candidateId=${id}`);
  }

  update(resume) {
    return axios.post("http://localhost:8080/api/resumes/update", resume);
  }

  updateGithubLink(resumeId, githubLink) {
    return axios.put(`http://localhost:8080/api/resumes/updateGithubLink?resumeId=${resumeId}&githubLink=${githubLink}`)
  }

  updateLinkedinLink(resumeId, linkedinLink) {
    return axios.put(`http://localhost:8080/api/resumes/updateLinkedinLink?resumeId=${resumeId}&linkedinLink=${linkedinLink}`)
  }

  updateObjective(resumeId, objective) {
    return axios.put(`http://localhost:8080/api/resumes/updateObjective?resumeId=${resumeId}&objective=${objective}`)
  }

  deleteGithubLink(resumeId) {
    return axios.delete(`http://localhost:8080/api/resumes/deleteGithubLink?resumeId=${resumeId}`)
  }

  deleteLinkedinLink(resumeId) {
    return axios.delete(`http://localhost:8080/api/resumes/deleteLinkedinLink?resumeId=${resumeId}`)
  }
}
