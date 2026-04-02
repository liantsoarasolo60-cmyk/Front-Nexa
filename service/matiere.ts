import api from "./api";
export interface Matiere {
  _id: string;
  code: String;
  name: String;
}

const matiereService = {
  getAll: () => {
    return api.get(`/subject`,);
  },
  getById: (id: string) => {
    return api.get(`/subject/${id}`);
  },
  createMatiere: (data: Matiere) => {
    return api.post('/subject', data);
  },
  updateMatiere: (id: string, data: Matiere) =>{
    return api.patch(`/subject/${id}`, data);
  },
  deleteMatiere: (id: string) =>{
    return api.patch(`/subject/${id}`);
  },
};

export default matiereService;