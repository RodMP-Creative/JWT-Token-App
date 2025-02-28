import { UserLogin } from "../interfaces/UserLogin";
import Auth from '../utils/auth';

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  // throw an error if the request fails
  if (!response.ok) {
    throw new Error('Failed to login');
  }

  // parse the response body as JSON
  const data = await response.json();
  Auth.login(data.token);
  return data;
}

export { login };
