import express from "express";
import {
  archiveNoteByID,
  createNote,
  deleteNoteByID,
  getArchivedNotes,
  getDeletedNotes,
  getNoteByID,
  getNotes,
  getPinnedNotes,
  pinNoteByID,
  unarchiveNoteByID,
  undeleteNoteByID,
  unpinNoteByID,
  updateNoteByID,
} from "../controllers/notes.controller";

const router = express.Router();

// Create new Note
router.post("/", createNote);

// Get all Notes - Note deleted, archived or pinned
router.get("/", getNotes);

// Get all pinned Notes
router.get("/pinned", getPinnedNotes);

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
