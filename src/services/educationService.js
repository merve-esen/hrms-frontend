import axios from "axios";

export default class EducationService {
    add(education){
        return axios.post("https://localhost:8080/api/educations/add",education)
    }
    
    delete(education){
        return axios.delete("https://localhost:8080/api/educations/delete", education)
    }
    
    getByResumeId(cvId){
        return axios.get(`https://localhost:8080/api/educations/getByCvId?id=${cvId}`)
    }
}
