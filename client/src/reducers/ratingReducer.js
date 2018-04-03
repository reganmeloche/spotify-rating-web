import { 
  FETCH_RATINGS
} from '../actions/ratings';

export default function(state = [], action) {
  let result = state;
  switch (action.type) {
    case FETCH_RATINGS:
      result = [];
      if (action.payload && action.payload.data) {
        result =  action.payload.data;
      }
      break;
  
    
    default:
      break;
  }
  return result;
}
