interface Tool {
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  createdAt: Date;
  updatedAt: Date | null;
}
