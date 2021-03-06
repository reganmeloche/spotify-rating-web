import axios from 'axios';

export const SAVE_RATING = 'save_rating';
export const FETCH_RATINGS = 'fetch_ratings';
export const DELETE_RATING = 'delete_rating';

export function saveRating(ratingObj, callback) {
  const newRating = {
    albumName: ratingObj.name,
    artist: ratingObj.artist,
    listenDate: ratingObj.listenDate,
    rating: ratingObj.rating,
    comments: ratingObj.comments,
    faveSongs: ratingObj.faveSongs,
  };

  const request = axios.post(`/api/rating`, newRating)
    .then((res) => callback(null, res.data))
    .catch((err) => callback(err));

  return {
    type: SAVE_RATING,
    payload: request,
  };
}

export function fetchRatings() {
  const request = axios({
    method:'get',
    url:'/api/rating'
  });
  
  return {
    type: FETCH_RATINGS,
    payload: request,
  };
}

export async function deleteRating(ratingId, callback) {
  const request = await axios.delete(`/api/rating/${ratingId}`);
  callback();
  return {
    type: DELETE_RATING,
    payload: request,
  };
}