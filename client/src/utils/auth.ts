import { jwtDecode,  JwtPayload } from 'jwt-decode';

class AuthService {
  navigate: (path: string) => void;

  constructor() {
    this.navigate = (path: string) => {
      window.location.assign(path);
    };
  }

  setNavigateCallback(callback: (path: string) => void) {
    this.navigate = callback;
  }

  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    
    if (!decoded.exp) {
      return false;
    }
    return decoded.exp < currentTime;
  }

  getToken(): string {
    // TODO: return the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
    return token;
  }

  login(idToken : string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    this.navigate('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    this.navigate('/login');
  }
}

export default new AuthService();
