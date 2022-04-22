import { combineReducers } from "redux";
import { ShoppingReducer } from "./shoppingReducer";

const reducer = combineReducers({
  shopping: ShoppingReducer,
});

export default reducer;
