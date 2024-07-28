import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { 
  getUsers as getDBUsers, 
  getUserById as getDBUserById,
  createUser as createDBUser, 
  updateUser as updateDBUser, 
  deleteUser as deleteDBUser } from '../services/userService';


const saltRounds = 10;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getDBUsers();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getDBUserById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const createUser = async (req: Request, res: Response) => {

  const { name, email, password, posts, comments, last_login } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await createDBUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await updateDBUser(Number(req.params.id), req.body);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteDBUser(Number(req.params.id));
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};