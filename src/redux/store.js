
import { createStore } from "redux";

const defaultState = {cateNow:{}}
const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        console.log("in reducer...")
        return {...state,cateNow:action.payload};
      default: 
        return state;
    }
  };
  

export default createStore(rootReducer);