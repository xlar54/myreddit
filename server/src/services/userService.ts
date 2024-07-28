import bcrypt from 'bcrypt';
import pool from '../config/database';
import { User, NewUser } from '../models/userModel';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const saltRounds = 10;

export const getUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM users');
  return rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

export const validateLogin = async (username: string, password: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query<User[] & RowDataPacket[]>('SELECT id, name, email, password FROM users WHERE name = ?', [username]);
    if (rows.length) {
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
    }
    return null;
  } catch (err) {
    console.error('Error validating login:', err);
    throw new Error('Login validation failed');
  }
};

export const createUser = async (user: NewUser): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  const [result] = await pool.query<ResultSetHeader>
    ('INSERT INTO users (name, password, email, posts, comments, last_login) VALUES (?, ?, ?, ?, ?, ?)',
     [user.name, hashedPassword, user.email, user.posts, user.comments, user.last_login]);
  return { id: result.insertId, ...user, password: hashedPassword };
};

export const updateUser = async (id: number, user: Partial<NewUser>): Promise<void> => {
  await pool.query('UPDATE Users SET ? WHERE id = ?', [user, id]);
};

export const deleteUser = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM Users WHERE id = ?', [id]);
};