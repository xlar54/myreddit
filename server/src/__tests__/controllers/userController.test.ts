import { Request, Response } from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../../controllers/userController';
import * as userService from '../../services/userService';

jest.mock('../../services/userService');

describe('UserController', () => {
  const mockUser = { id: 1, name: 'John Doe', password:"freddy12", email: 'john@example.com' };

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should return a list of users', async () => {
    (userService.getUsers as jest.Mock).mockResolvedValueOnce([mockUser]);
    await getAllUsers(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith([mockUser]);
  });

  test('getUser should return a user by id', async () => {
    req.params = { id: '1' };
    (userService.getUserById as jest.Mock).mockResolvedValueOnce(mockUser);
    await getUser(req as Request, res as Response);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test.skip('createUser should create and return a new user', async () => {
    req.body = { name: 'Jane Doe', password: "freddy12", email: 'jane@example.com', 
      posts:0, comments:0, last_login:"1/1/2024" };
    (userService.createUser as jest.Mock).mockResolvedValueOnce({ id: 2, ...req.body });
    await createUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 2, ...req.body });
  });

  test('updateUser should update the user information', async () => {
    req.params = { id: '1' };
    req.body = { name: 'Jane Doe', password: "freddy12", email: 'jane@example.com', posts:0, comments:0,last_login:"1/1/2024" };
    await updateUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  test('deleteUser should delete the user by id', async () => {
    req.params = { id: '1' };
    await deleteUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });
});
