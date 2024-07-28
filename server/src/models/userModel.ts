export interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    posts: number;
    comments: number;
    last_login: Date;
  }
  
  export interface NewUser {
    name: string;
    password: string;
    email: string;
    posts: number;
    comments: number;
    last_login: Date;
  }