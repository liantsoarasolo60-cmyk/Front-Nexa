import api from './api';

// ==================== INTERFACES (types) ==================== 
interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister {
  username?: string;
  email: string;
  password: string;
}

interface UpdateProfile {
  username?: string;
  email?: string;
}

interface UpdatePassword {
  oldPassword?: string;
  newPassword: string;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  createdAt?: Date;

}

// ==================== SERVICE TYPÉ ====================
const authService = {
  login: (userLogin: UserLogin) => {
    return api.post('/auth/login', userLogin);
  },

  register: (userData: UserRegister) => {
    return api.post('/auth/register', userData);
  },

  me: () => {
    return api.get('/auth/me');
  },

  update: (newInfo: UpdateProfile) => {
    return api.patch('/auth/updateProfile', newInfo);
  },

  updatePassword: (newPass: UpdatePassword) => {
    return api.patch('/auth/updatePassword', newPass);
  },

  logout: () => {
    return api.patch('/auth/logout');
  },
};

export default authService;