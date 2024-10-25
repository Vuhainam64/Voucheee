import {
  combineReducers
} from "redux";
import userReducer from "./userReducer";
import roleReducer from "./roleReducer";
import allNotifyReducer from "./allNotifyReducer";
import locationReducer from "./locationReducer";
import cartReducer from "./cartReducer";

const myReducer = combineReducers({
  user: userReducer,
  role: roleReducer,
  allNotify: allNotifyReducer,
  location: locationReducer,
  cart: cartReducer,
});

export default myReducer;