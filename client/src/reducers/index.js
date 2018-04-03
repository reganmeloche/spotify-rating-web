import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Register
import userReducer from './userReducer';
import albumsReducer from './albumsReducer';
import ratingReducer from './ratingReducer';
import readyValuesReducer from './readyValuesReducer';

export default combineReducers({
  user: userReducer,
  albums: albumsReducer,
  ratings: ratingReducer,
  readyValues: readyValuesReducer,
  form: formReducer,
});
