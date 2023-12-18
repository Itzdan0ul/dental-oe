import DatabaseConnection from '../DatabaseConnection';

export const getExpedients = async (): Promise<Array<Expedient>> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT
                            id,
                            number,
                            treatment_id,
                            created_at AS createdAt,
                            updated_at AS updatedAt
                            FROM expedient;`;

    const expedients: Array<Expedient> = connection.executeQuery(query);

    return expedients;
  } catch (error: unknown) {
    throw error;
  }
};

export const createExpedient = async (expedient: Expedient): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `INSERT INTO expedient
                            (number, treatment_id)
                            VALUES
                            (@number, @treatmentId);`;

    connection.executeNonQuery(query, expedient);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateExpedient = async (expedient: Expedient): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `UPDATE expedient
                            SET
                            number = @number,
                            treatment_id = @treatmentId
                            WHERE id = @id;`;

    connection.executeNonQuery(query, expedient);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteExpedient = async (id: number): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `DELETE FROM expedient
                            WHERE id = @id;`;

    connection.executeNonQuery(query);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};
