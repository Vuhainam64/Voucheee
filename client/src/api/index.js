export const baseURL =
  // "http://127.0.0.1:5001/get-feedback-a0119/us-central1/app";
  "https://us-central1-get-feedback-a0119.cloudfunctions.net/app";

//Role
export {
  createDefaultRole,
  getRoleWithRoleID,
  getAllRolesAPI,
  getUserRole,
  updateRole,
}
from "./role";

//notify
export {
  getNotifications
}
from "./notify";