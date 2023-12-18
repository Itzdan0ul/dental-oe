interface Appointment {
  id: number;
  date: Date;
  hour: string;
  description: string | null;
  patientId: number;
  createdAt: Date;
  updatedAt: Date | null;
}
