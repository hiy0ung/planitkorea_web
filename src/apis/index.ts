export const FRONT_DOMAIN = process.env.REACT_APP_FRONT_DOMAIN ?? 'http://localhost:3000';
export const BASE_URL = process.env.REACT_APP_API_DOMAIN ?? 'http://localhost:4040';
export const API_BASE_URL = `${BASE_URL}/api/v1`;

export const SIGN_UP_SNS_API = `${API_BASE_URL}/auth/sns-sign-in/`
export const SIGN_IN_SNS_API = `${API_BASE_URL}/auth/sns-sign-in/`