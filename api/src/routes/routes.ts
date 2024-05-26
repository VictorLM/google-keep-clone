import express from "express";
import {
  archiveNoteByID,
  createNote,
  deleteNoteByID,
  getArchivedNotes,
  getDeletedNotes,
  getNoteByID,
  getNotes,
  pinNoteByID,
  unarchiveNoteByID,
  undeleteNoteByID,
  unpinNoteByID,
  updateNoteByID,
} from "../controllers/notes.controller";

const router = express.Router();

// Create new Note
router.post("/", createNote);

// Get all Notes - Note deleted or archived
router.get("/", getNotes);

// Get all archived Notes
router.get("/archived", getArchivedNotes);

// Get all deleted Notes
router.get("/deleted", getDeletedNotes);

// Get Note by ID
router.get("/:id", getNoteByID);

// Update Note by ID
router.put("/:id", updateNoteByID);

// Archive Note by ID
router.put("/:id/archive", archiveNoteByID);

// Unarchive Note by ID
router.put("/:id/unarchive", unarchiveNoteByID);

// Delete Note by ID
router.put("/:id/delete", deleteNoteByID);

// Undelete Note by ID
router.put("/:id/undelete", undeleteNoteByID);

// Pin Note by ID
router.put("/:id/pin", pinNoteByID);

// Unpin Note by ID
router.put("/:id/unpin", unpinNoteByID);

export default router;
