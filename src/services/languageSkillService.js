import axios from "axios";

export default class LanguageSkillService {
  add(languageSkill) {
    return axios.post("http://localhost:8080/api/languageSkills/add", languageSkill)
  }

  delete(languageSkillId) {
    return axios.delete(`http://localhost:8080/api/languageSkills/delete?languageSkillId=${languageSkillId}`)
  }

  getAllByResumeId(resumeId) {
    return axios.get(`http://localhost:8080/api/languageSkills/getAllByResumeId?resumeId=${resumeId}`)
  }
}