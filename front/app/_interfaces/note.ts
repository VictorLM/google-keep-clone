export type UpdateNote = {
  title: string;
  description: string;
  index: number;
};

export type Note = UpdateNote & {
  id: number;
  pinnedAt: Date | null;
  archivedAt: Date | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
