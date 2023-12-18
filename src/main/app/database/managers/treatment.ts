import DatabaseConnection from '../DatabaseConnection';

export const getTreatments = async (): Promise<Array<Treatment>> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT 
                            treatment.id, 
                            type, 
                            cost, 
                            payment,
                            status,
                            patient.name AS patientName,
                            treatment.created_at AS createdAt, 
                            treatment.updated_at AS updated_at 
                          FROM treatment
                          JOIN patient ON patient.id = treatment.patient_id;`;

    const treatments: Array<Treatment> = connection.executeQuery(query);

    return treatments;
  } catch (error: unknown) {
    throw error;
  }
};

export const createTreatment = async (treatment: Treatment): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `INSERT INTO treatment (type, cost, payment, patient_id) VALUES (@type, @cost, @payment, @patientId);`;

    connection.executeNonQuery(query, treatment);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateTreatment = async (treatment: Treatment): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `UPDATE treatment SET type = @type, cost = @cost, payment = @payment, status = @status WHERE id = @id;`;

    connection.executeNonQuery(query, treatment);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteTreatment = async (id: number): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `DELETE FROM treatment WHERE id = @id;`;

    connection.executeNonQuery(query, { id });

    return true;
  } catch (error: unknown) {
    throw error;
  }
};
