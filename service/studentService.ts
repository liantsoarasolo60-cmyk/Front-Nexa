import api from "./api";

const studentService = {
  getAll: () => {
    return api.get(`/students`, );
  },
  getClassemate: () =>{
    return api.get(`/classemate`);
  }
};

export default studentService;
