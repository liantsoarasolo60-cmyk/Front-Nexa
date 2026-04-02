import api from "./api";

interface userData {
  title: string;
  content: string;
  subject: string;
  teacher: string;
  targetClasses?: string;
  publishedAt?: Date;
}

const userService = {
  // GET tous les utilisateurs
  getAll: () => {
    return api.get(`/user`);
  },

  // GET un utilisateur
  getById: (id: String) => {
    return api.get(`/user/${id}`);
  },

  // PUT mettre à jour
  update: (id: String, userData :userData) => {
    return api.put(`/user/${id}`, userData);
  },

  // DELETE supprimer
  delete: (id: string) => {
    return api.delete(`/user/${id}`);
  },
};

export default userService;
