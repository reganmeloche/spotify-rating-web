import { 
  FETCH_ALBUMS
} from '../actions/albums';

export default function(state = [], action) {
  let result = state;
  switch (action.type) {
    case FETCH_ALBUMS:
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
