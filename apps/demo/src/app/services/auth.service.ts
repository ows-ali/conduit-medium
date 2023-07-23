import { LoginCredentials } from '../models/login-credentials.model';
import { RegisterCredentials } from '../models/register-credentials.model';
import { User } from '../models/user.model';
import { getHeaders } from '../utils/headers.util';
export async function login(credentials: LoginCredentials) {
  return fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ user: credentials }),
  });
}
export async function register(credentials: RegisterCredentials) {
  return fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ user: credentials }),
  });
}
export async function getCurrentUser(): Promise<User> {
  return fetch('http://localhost:3000/api/user', {
    method: 'GET',
    headers: getHeaders(),
  })
    .then(res => res.json())
    .then(res => res.user);
}

export async function updateUser(user: unknown) {
  return fetch('http://localhost:3000/api/user', {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ user }),
  });
}
