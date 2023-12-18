interface Treatment {
  id: number;
  type: string;
  cost: number;
  payment: number;
  status: string;
  patientId: number;
  createdAt: Date;
  updatedAt: Date | null;
}
