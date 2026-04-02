import api from "./api";
import type { user } from "../types/user";
const teacherService = {
  getAll: () => {
    return api.get('/professeurs')
  },
  getById: (id: String) => {
    return api.get(`/professeurs/${id}`)
  },
  delete: (id: String) => {
    return api.delete(`/professeurs/${id}`)
  },
  submitDisponibilites: ( data: user) => {
    return api.post(`/professeurs/disponibilites`, data)
  },
};

export default teacherService;