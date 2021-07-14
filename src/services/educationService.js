import axios from "axios";

export default class EducationService {
    add(education){
        return axios.post("http://localhost:8080/api/educations/add",education)
    }

    delete(educationId) {
        return axios.delete(`http://localhost:8080/api/educations/delete?educationId=${educationId}`)
      }
    
    getAllByResumeId(resumeId){
        return axios.get(`http://localhost:8080/api/educations/getAllByResumeId?resumeId=${resumeId}`)
    }

    getAllByResumeIdOrderByEndYearDesc(resumeId){
        return axios.get(`http://localhost:8080/api/educations/getAllByResumeIdOrderByEndYearDesc?resumeId=${resumeId}`)
    }
}
