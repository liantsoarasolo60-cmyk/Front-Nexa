import api from "./api";

type attachments = {
  name: String;
  url: String;
  type: String;
  size: Number;
  uploadedAt: Date;
}
interface courseInfo {
  title: string;
  content: string;
  subject: string;
  teacher: string;
  targetClasses?: string;
  attachments?: attachments;
  publishedAt?: Date;
}
interface newData {
  title?: string;
  content?: string;
  subject?: string;
  teacher?: string;
  targetClasses?: string;
  attachments?: attachments;
  publishedAt?: Date;
}

const courseService = {
  getMyCourses: () => {
    return api.get(`/courses`,);
  },
  getById: (id: String) => {
    return api.get(`/courses/${id}`);
  },
  create: (courseInfo: courseInfo) => {
    return api.post(`/courses`, courseInfo);
  },
  updateCourse: (id: String, newData: newData) => {
    return api.patch(`/courses/${id}`, newData);
  },
  delete: (id: String) => {
    return api.delete(`/courses/${id}`);
  },
  addFile: (id: String, fichier: File):Promise<attachments> => {
    const formData = new FormData();
    formData.append('file', fichier);
    return api.post(`/courses/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default courseService;
