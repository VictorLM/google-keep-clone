import { Note, UpdateNote } from "@/app/_interfaces/note";

const url = process.env.API_URL || "http://localhost:8000";

export async function getNotes(): Promise<Note[]> {
  const data = await fetch(`${url}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
}

export async function createNote(updatedNote: UpdateNote): Promise<void> {
  await fetch(`${url}/notes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });
}

export async function updateNote(
  id: number,
  updatedNote: UpdateNote
): Promise<void> {
  await fetch(`${url}/notes/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });
}

export async function pinNote(id: number): Promise<void> {
  await fetch(`${url}/notes/${id}/pin`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function unpinNote(id: number): Promise<void> {
  await fetch(`${url}/notes/${id}/unpin`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function archiveNote(id: number): Promise<void> {
  await fetch(`${url}/notes/${id}/archive`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function unarchiveNote(id: number): Promise<void> {
  await fetch(`${url}/notes/${id}/unarchive`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function deleteNote(id: number): Promise<void> {
  await fetch(`${url}/notes/${id}/delete`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function undeleteNote(id: number): Promise<void> {
  await fetch(`${url}/notes/${id}/undelete`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
