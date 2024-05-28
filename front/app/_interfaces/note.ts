export type UpdateNote = {
  title: string;
  description: string;
  index: number;
};

export type Note = UpdateNote & {
  id: number;
  pinnedAt: string | null;
  archivedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
