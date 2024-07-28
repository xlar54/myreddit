import request from 'supertest';
import express, { Request, Response } from 'express';

const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

describe('GET /', () => {
  it('should return Hello, World!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});

export default app;