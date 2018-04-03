import axios from 'axios';

export const FETCH_ALBUMS = 'fetch_albums';
export const RATING_FROM_ALBUM = 'rating_from_album';

export function fetchAlbums() {
  const request = axios.get(`/api/albums`);
  return {
    type: FETCH_ALBUMS,
    payload: request,
  }
}

export function ratingFromAlbum(data) {
  console.log('ACTION', data);
  return {
    type: RATING_FROM_ALBUM,
    payload: data,
  };
}
