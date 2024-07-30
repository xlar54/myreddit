
import { Request, Response } from 'express';
import { 
  getPosts as getDBPosts, 
  getPostById as getDBPostById,
  createPost as createDBPost, 
  updatePost as updateDBPost, 
  deletePost as deleteDBPost } from '../services/postService';


export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const users = await getDBPosts();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const user = await getDBPostById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const createPost = async (req: Request, res: Response) => {

  const { title, link, text, created_by, created_dtm } = req.body;

  try {
    const user = await createDBPost(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    await updateDBPost(Number(req.params.id), req.body);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await deleteDBPost(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};