export type TaskKind = "in-progress" | "done" | "fix";

export type Task = {
  kind: TaskKind;
  content: string;
  /** Mise en avant « à retenir » du mois. 1 à 2 par mois, jamais plus de 3. */
  keep?: boolean;
};

export type LogTasks = {
  month: string;
  year: number;
  order: number;
  tasks: Task[];
};
