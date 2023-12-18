import DatabaseConnection from '../DatabaseConnection';

export const getAppointments = async (): Promise<Array<Appointment>> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `SELECT 
                            appointment.id, 
                            appointment.date, 
                            appointment.time, 
                            appointment.status, 
                            patient.name AS patientName,
                            appointment.created_at AS createdAt, 
                            appointment.updated_at AS updated_at 
                          FROM appointment
                          JOIN patient ON patient.id = appointment.patient_id;`;

    const appointments: Array<Appointment> = connection.executeQuery(query);

    return appointments;
  } catch (error: unknown) {
    throw error;
  }
};

export const createAppointment = async (appointment: Appointment): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `INSERT INTO appointment (date, time, status, patient_id) VALUES (@date, @time, @status, @patientId);`;

    connection.executeNonQuery(query, appointment);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const updateAppointment = async (appointment: Appointment): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `UPDATE appointment SET date = @date, time = @time, status = @status WHERE id = @id;`;

    connection.executeNonQuery(query, appointment);

    return true;
  } catch (error: unknown) {
    throw error;
  }
};

export const deleteAppointment = async (id: number): Promise<boolean> => {
  try {
    const connection: DatabaseConnection = new DatabaseConnection();

    const query: string = `DELETE FROM appointment WHERE id = @id;`;

    connection.executeNonQuery(query, { id });

    return true;
  } catch (error: unknown) {
    throw error;
  }
};
