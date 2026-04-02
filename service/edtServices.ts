import api from "./api";

export const edtAPI = {
  getBySemaine: (semaine: string) => {
    return api.get(`/edt/${semaine}`)
  },
  generate: (semaine: string) => {
    return api.post(`/edt/generate/${semaine}`)
  },
  publish: (semaine: string) => {
    return api.put(`/edt/${semaine}/publish`)
  },
  getByClasse: (classeId: string, semaine: string) => {
    return api.get(`/edt/classe/${classeId}/${semaine}`)
  },
  getByProfesseur: (profId: string, semaine: string) => {
    return api.get(`/edt/professeur/${profId}/${semaine}`)
  },
  deleteBySemaine: (semaine: string) => {
    return api.delete(`/edt/${semaine}`)
  },
};