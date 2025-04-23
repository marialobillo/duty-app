export interface Duty {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: Date;
}
export interface DutyCreate {
  title: string;
  description?: string;
  completed?: boolean;
}