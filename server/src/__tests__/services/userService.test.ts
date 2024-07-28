import pool from '../../config/database';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/userService';
import { User, NewUser } from '../../models/userModel';

// Mock the database pool
jest.mock('../../config/database', () => ({
  query: jest.fn()
}));

describe('UserService', () => {
  const mockUser: User = { id: 1, name: 'John Doe', password: "freddy12", email: 'john@example.com',posts:0, comments:0,last_login: new Date("1/1/2024")  };
  const newUser: NewUser = { name: 'Jane Doe', password: "freddy12", email: 'jane@example.com', posts:0, comments:0, last_login: new Date("1/1/2024") };
 
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUsers should return a list of users', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce([[mockUser]]);
    const users = await getUsers();
    expect(users).toEqual([mockUser]);
  });

  test('getUserById should return a user by id', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce([[mockUser]]);
    const user = await getUserById(1);
    expect(user).toEqual(mockUser);
  });

  test.skip('createUser should insert a new user and return it', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce([{ insertId: 2 }]);
    const user = await createUser(newUser);
    expect(user).toEqual({ id: 2, ...newUser });
  });

  test('updateUser should update the user information', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce([{}]);
    await expect(updateUser(1, newUser)).resolves.toBeUndefined();
  });

  test('deleteUser should delete the user by id', async () => {
    (pool.query as jest.Mock).mockResolvedValueOnce([{}]);
    await expect(deleteUser(1)).resolves.toBeUndefined();
  });
});