import DatabaseConnection from '../DatabaseConnection';

export const getMedicalFiles = async (expedientId: number): Promise<Array<MedicalFile>> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT id, name, path, created_at AS createdAt FROM medical_file WHERE expedient_id = @expedientId;`;

    const users: Array<MedicalFile> = connection.executeQuery(query, { expedientId });

    return users;
  } catch (error: unknown) {
    throw error;
  }
};

export const createMedicalFile = async (medicalFile: MedicalFile): Promise<void> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `INSERT INTO medical_file (name, path, expedient_id) VALUES (@name, @path, @expedientId);`;

    connection.executeNonQuery(query, medicalFile);
  } catch (error: unknown) {
    throw error;
  }
};
