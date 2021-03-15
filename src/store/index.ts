import { combineReducers } from "redux";
import { bingoReducer } from "store/bingo";
import { turnReducer } from "store/turn";

const rootReducer = combineReducers({ bingoReducer, turnReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
