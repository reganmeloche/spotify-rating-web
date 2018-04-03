import { 
  RATING_FROM_ALBUM
} from '../actions/albums';

export default function(state = null, action) {
  let result = state;
  switch (action.type) {
    case RATING_FROM_ALBUM:
      const data = action.payload;
      let faveSongs = [];
      for (let i = 0; i < Math.min(5, data.tracks.length); i++) {
        faveSongs.push(data.tracks[i].name);
      }
      result = {
        name: data.name,
        artist: data.artists[0],
        faveSongs,
      };
    
    default:
      break;
  }
  return result;
}
