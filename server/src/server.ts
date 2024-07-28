import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
//const port = process.env.PORT || 3001;
const port = 3001;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});