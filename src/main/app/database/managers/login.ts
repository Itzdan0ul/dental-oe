import { compareHash } from '../../utils/encryption';
import DatabaseConnection from '../DatabaseConnection';

export const login = async (user: User): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT password FROM user WHERE username = @username;`;

    const { username, password } = user;

    const userFromDb: Array<User> = connection.executeQuery(query, { username });

    return compareHash(password, userFromDb[0].password);
  } catch (error: unknown) {
    throw error;
  }
};
