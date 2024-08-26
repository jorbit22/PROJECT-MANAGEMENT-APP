export interface Project {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string; // Format: 'YYYY-MM-DD'
  projectId: string; //
}
