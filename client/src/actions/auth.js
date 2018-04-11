import axios from 'axios';

export const FETCH_USER = 'fetch_user';
export const LOGOUT = 'logout';

export function fetchUser() {
  const request = axios({
    method: 'get',
    url: `/auth/user`,
  });
  return {
    type: FETCH_USER,
    payload: request,
  }
}

export async function logout(callback) {
  const request = await axios.get(`auth/logout`);
  callback();
  return {
    type: LOGOUT,
    payload: request,
  }
}