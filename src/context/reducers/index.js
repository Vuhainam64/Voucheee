import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import allUserReducer from "./allUserReducer";
import roleReducer from "./roleReducer";
import allCookiesReducer from "./allCookiesReducer";
import orderDetailsReducer from "./orderDetailsReducer";

const myReducer = combineReducers({
  user: userReducer,
  role: roleReducer,
  auth: authReducer,
  allUsers: allUserReducer,
  allCookies: allCookiesReducer,
  orderDetails: orderDetailsReducer
});

export default myReducer;