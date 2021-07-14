import axios from "axios";

export default class ProgrammingTechnologySkillService {
  add(programmingTechnologySkill) {
    return axios.post("http://localhost:8080/api/languageSkills/add", programmingTechnologySkill)
  }

  delete(programmingTechnologySkillId) {
    return axios.delete(`http://localhost:8080/api/languageSkills/delete?programmingTechnologySkillId=${programmingTechnologySkillId}`)
  }

  getAllByResumeId(resumeId) {
    return axios.get(`http://localhost:8080/api/languageSkills/getAllByResumeId?resumeId=${resumeId}`)
  }
}