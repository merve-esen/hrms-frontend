import axios from "axios";

export default class FavoriteJobAdvertisementService {
  getAll() {
    return axios.get(
      "http://localhost:8080/api/favoriteJobAdvertisements/getall"
    );
  }

  getByCandidateId(candidateId) {
    return axios.get(
      `http://localhost:8080/api/favoriteJobAdvertisements/getbycandidateid?candidateId=${candidateId}`
    );
  }

  add({ jobAdvertisementId, candidateId }) {
    return axios.post(
      "http://localhost:8080/api/favoriteJobAdvertisements/add",
      {
        jobAdvertisement: { id: jobAdvertisementId },
        candidate: { id: candidateId },
      }
    );
  }

  update({ id, jobAdvertisementId, candidateId }) {
    return axios.post(
      "http://localhost:8080/api/favoriteJobAdvertisements/update",
      {
        id,
        jobAdvertisement: { id: jobAdvertisementId },
        candidate: { id: candidateId },
      }
    );
  }

  delete({ jobAdvertisementId, candidateId }) {
    return axios.post(
      "https://localhost:8080/api/favoriteJobAdvertisements/delete",
      {
        jobAdvertisement: { id: jobAdvertisementId },
        candidate: { id: candidateId },
      }
    );
  }
}
