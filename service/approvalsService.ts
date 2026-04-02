import api from "./api";

interface ApprovalCode {
  code: String;
}
const approvalsService = {
  getAll: () => {
    return api.get(`/approvals`);
  },
  approve: (id: string, code: ApprovalCode) => {
    return api.patch(`/approvals/${id}/approve`, code);
  },
  reject: (id: string) => {
    return api.patch(`/approvals/${id}/reject`);
  }
};

export default approvalsService;
