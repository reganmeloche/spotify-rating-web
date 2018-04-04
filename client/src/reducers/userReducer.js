import { 
  FETCH_USER,
  LOGOUT 
} from '../actions/auth';

export default function(state = null, action) {
  let result = state;
  switch (action.type) {
    case FETCH_USER:
      result = false;
      console.log('FETCHED USER...', action.payload);
      if (action.payload && action.payload.data && action.payload.data.user) {
        result =  action.payload.data.user;
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
