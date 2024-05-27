import { error } from "console";
import { Note, UpdateNote } from "../_interfaces/note";

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

export async function updateNote(
  id: number,
  updatedNote: UpdateNote
): Promise<void> {
  const data = await fetch(`${url}/notes/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });
}
