import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";
import allNotifyReducer from "./allNotifyReducer";
import locationReducer from "./locationReducer";

const myReducer = combineReducers({
  user: userReducer,
  role: roleReducer,
  allNotify: allNotifyReducer,
  location: locationReducer,
});

export default myReducer;