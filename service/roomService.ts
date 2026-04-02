import api from "./api";

interface roomInfos {
  code?: string;
  capacity?: Number;
  type?: string;
  statut?: string;
  reservedBy?: user;
}

interface user {
  role: string;
  firstName: string;
  lastName: string;
}

const roomService = {
  getAll: () => {
    return api.get('/salles');
  },
  getById: (id: string) => {
    return api.get(`/salles/${id}`)
  },
  create: (data: roomInfos) => {
    return api.post('/salles', data)
  },
  update: (id: string, data: roomInfos) => {
    return api.put(`/salles/${id}`, data)
  },
  delete: (id: string) => {
    return api.delete(`/salles/${id}`)
  },
  getSalleDispo: (jour: string, heure: string) => {
    return api.get(`/salles/disponibles/${jour}/${heure}`)
  },
  reserve: (id: string) =>{
    return api.patch(`/salles/${id}/reserve`)
  },
  libere: (id: string) =>{
    return api.patch(`/salles/${id}/libre`)
  },
};

export default roomService;
