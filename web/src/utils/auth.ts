import { User } from 'src/contexts/Auth';
import Cookies from 'universal-cookie';
import axios from 'axios';
import urls from './urls';

const cookies = new Cookies(null, { path: '/' });

export async function getUser(authToken: string): Promise<User | null> {
  if (!authToken) return null;
  console.log(`authToken = ${authToken}`);

  const res = await axios({
    url: '/user',
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    baseURL: urls.apiUrl,
  });

  const user: User = res.data;

  return user;
}

export function logoutUser() {
  cookies.remove('auth-token');
}

export async function continueAuth(email: string) {
  await axios({
    url: '/auth/continue',
    method: 'post',
    baseURL: urls.apiUrl,
    data: {
      email,
    },
  });
}

export async function verifyAuth(email: string, code: string) {
  const res = await axios({
    url: '/auth/verify',
    baseURL: urls.apiUrl,
    method: 'post',
    data: {
      email,
      code,
    },
  });
  console.log(`res.data = ${res.data}`);
  const {
    token,
  }: {
    token: string;
  } = res.data;
  cookies.set('auth-token', token);
}

export async function upsertUser(firstName: string, lastName?: string) {
  const authToken = cookies.get('auth-token');
  if (!authToken) return;
  await axios({
    method: 'POST',
    baseURL: urls.apiUrl,
    url: '/user/upsert',
    data: {
      firstName,
      lastName,
    },
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
