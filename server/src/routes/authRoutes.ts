import { Router, Request, Response } from 'express';
import { validateLogin } from '../services/userService';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await validateLogin(username, password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
      } else {
        res.status(500).json({ message: 'Error logging in', error: 'Unknown error' });
      }
  }
});

export default router;