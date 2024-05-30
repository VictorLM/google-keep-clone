import { UpdateNote } from "@/app/_interfaces/note";

const url = process.env.API_URL || "http://localhost:8000";

export async function getNotes(search?: string): Promise<any> {
  const parsedURL = search ? `${url}/notes?search=${search}` : `${url}/notes`;

  const data = await fetch(parsedURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
}

export async function getPinnedNotes(search?: string): Promise<any> {
  const parsedURL = search
    ? `${url}/notes/pinned?search=${search}`
    : `${url}/notes/pinned`;

  const data = await fetch(parsedURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
}

export async function getArchivedNotes(search?: string): Promise<any> {
  const parsedURL = search
    ? `${url}/notes/archived?search=${search}`
    : `${url}/notes/archived`;

  const data = await fetch(parsedURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
}

export async function getDeletedNotes(search?: string): Promise<any> {
  const parsedURL = search
    ? `${url}/notes/deleted?search=${search}`
    : `${url}/notes/deleted`;

  const data = await fetch(parsedURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
}

export async function createNote(updatedNote: UpdateNote): Promise<any> {
  const response = await fetch(`${url}/notes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  }).then((res) => res.json());

  return response;
}

export async function updateNote(
  id: number,
  updatedNote: UpdateNote
): Promise<any> {
  const response = await fetch(`${url}/notes/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  }).then((res) => res.json());

  return response;
}

export async function pinNote(id: number): Promise<any> {
  const response = await fetch(`${url}/notes/${id}/pin`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}

export async function unpinNote(id: number): Promise<any> {
  const response = await fetch(`${url}/notes/${id}/unpin`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}

export async function archiveNote(id: number): Promise<any> {
  const response = await fetch(`${url}/notes/${id}/archive`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}

export async function unarchiveNote(id: number): Promise<any> {
  const response = await fetch(`${url}/notes/${id}/unarchive`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}

export async function deleteNote(id: number): Promise<any> {
  const response = await fetch(`${url}/notes/${id}/delete`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}

export async function undeleteNote(id: number): Promise<any> {
  const response = await fetch(`${url}/notes/${id}/undelete`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response;
}
