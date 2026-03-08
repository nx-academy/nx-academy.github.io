type Task = {
  kind: "in-progress" | "done" | "fix";
  content: string;
};

export type LogTasks = {
  month: string;
  tasks: Task[];
};
