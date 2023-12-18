import DatabaseConnection from '../DatabaseConnection';

export const getPatients = async (): Promise<Array<Patient>> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT 
                            id, 
                            name, 
                            age, 
                            phone, 
                            created_at AS createdAt, 
                            updated_at AS updated_at FROM patient;`;

    const patient: Array<Patient> = connection.executeQuery(query);

    return patient;
  } catch (error: unknown) {
    throw error;
  }
};

export const createPatient = async (patient: Patient): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `INSERT INTO patient (name, age, phone) VALUES (@name, @age, @phone);`;

    connection.executeNonQuery(query, patient);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const updatePatient = async (patient: Patient): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `UPDATE patient SET name = @name, age = @age, phone = @phone WHERE id = @id;`;

    connection.executeNonQuery(query, patient);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const deletePatient = async (id: number): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `DELETE FROM patient WHERE id = @id;`;

    connection.executeNonQuery(query, { id });

    return true;
  } catch (error: unknown) {
    throw error;
  }
};
