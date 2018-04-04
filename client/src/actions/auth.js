import axios from 'axios';

export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';

export function fetchUser() {
  console.log('FETCHING USER...');
  const request = axios({
    method: 'get',
    url: `/api/user`,
    withCredentials: true,
  });
  return {
    type: FETCH_USER,
    payload: request,
  }
}

export async function logout(callback) {
  const request = await axios.get(`api/logout`);
  callback();
  return {
    type: LOGOUT,
    payload: request,
  }
}