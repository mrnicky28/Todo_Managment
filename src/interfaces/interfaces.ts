export interface User{
  email: string,
  password: string,
  returnSecureToken?: boolean,
}

export interface Todo {
  id?: number,
  title: string,
  body: string,
}

export interface Enviroment {
  apiKey: string,
  production: boolean,
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string,
}
