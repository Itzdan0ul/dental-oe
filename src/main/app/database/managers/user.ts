import DatabaseConnection from '../DatabaseConnection';

export const getUsers = async (): Promise<Array<User>> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT id, username, password FROM user;`;

    const users: Array<User> = connection.executeQuery(query);

    return users;
  } catch (error: unknown) {
    throw error;
  }
};
