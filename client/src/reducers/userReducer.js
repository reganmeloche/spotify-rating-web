import { 
  FETCH_USER,
  LOGOUT 
} from '../actions/auth';

export default function(state = null, action) {
  let result = state;
  switch (action.type) {
    case FETCH_USER:
      result = false;
      if (action.payload && action.payload.data) {
        result =  action.payload.data;
      }
      break;
    
    case LOGOUT:
      result = false;
      break;
    
    default:
      break;
  }
  return result;
}
