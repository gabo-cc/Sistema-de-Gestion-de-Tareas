export type Priority = "baja" | "media" | "alta";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}
