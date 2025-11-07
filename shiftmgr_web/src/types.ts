export type Location = { id: number; name: string };

export type Shift = {
  id: number;
  user: { id: number; email: string; role: string };
  location: { id: number; name: string };
  starts_at: string;
  ends_at: string;
  notes?: string;
};
