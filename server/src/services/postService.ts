
import pool from '../config/database';
import { Post, NewPost } from '../models/postModel';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getPosts = async (): Promise<Post[]> => {
  const [rows] = await pool.query<Post[] & RowDataPacket[]>('SELECT * FROM posts');
  return rows;
};

export const getPostById = async (id: number): Promise<Post | null> => {
  const [rows] = await pool.query<Post[] & RowDataPacket[]>('SELECT * FROM posts WHERE id = ?', [id]);
  return rows.length ? rows[0] : null;
};

export const createPost = async (post: NewPost): Promise<Post> => {

  const [result] = await pool.query<ResultSetHeader>
    ('INSERT INTO posts (title, link, text, created_by, created_dtm) VALUES (?, ?, ?, ?, ?)',
     [post.title, post.link, post.text, post.created_dtm]);
  return { id: result.insertId, ...post };
};

export const updatePost = async (id: number, post: Partial<NewPost>): Promise<void> => {
  await pool.query('UPDATE Posts SET ? WHERE id = ?', [post, id]);
};

export const deletePost = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM Posts WHERE id = ?', [id]);
};