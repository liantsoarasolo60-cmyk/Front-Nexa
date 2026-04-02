import api from "./api";
import type { Classe } from "../types/classe";

const classeService = {
  getAll: () => {
    return api.get(`/classes`);
  },
  getById: (id: string) => {
    return api.get(`/classes/${id}`);
  },
  add: (classeInfo: Classe) => {
    return api.post(`/classes`, { code: classeInfo }, { headers: { 'Content-Type': 'application/json' } });
  },
  update: (id: string, data: Classe) => {
    return api.put(`/classes/${id}`, data);
  },
  addCours: (id: string, data: Classe) => {
    return api.post(`/classes/${id}/cours`,data);
  },
  delete: (id: string) => {
    return api.delete(`/classes/${id}`);
  },
};

export default classeService;
