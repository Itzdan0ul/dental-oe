import DatabaseConnection from '../DatabaseConnection';

export const createSystemUser = async (user: User): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const { encrypt } = await import('../../utils/encryption');

    const { username, password } = user;
  
    const encryptedPassword: string = await encrypt(password);

    const payload: User = {
      ...user,
      username,
      password: encryptedPassword,
    };

    const query: string = `INSERT INTO user (username, password)
                           VALUES (@username, @password);`;

    connection.executeNonQuery(query, payload);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};
