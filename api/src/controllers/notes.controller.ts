import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { Op } from "sequelize";

import { CreateAndUpdateNoteDTO } from "../models/note/dto/note.dto";
import Note from "../models/note/note";

export async function createNote(req: Request, res: Response) {
  try {
    // if not request body, return error
    if (!req.body) {
      return res.status(400).send({ messages: ["Missing request body!"] });
    }
    // validating request body
    const reqBody = new CreateAndUpdateNoteDTO();

    reqBody.title = req.body.title;
    reqBody.description = req.body.description;
    reqBody.index = req.body.index;

    validateOrReject(reqBody).catch((errors) => {
      return res.status(400).send({
        messages: errors.flatMap((error: any) =>
          Object.values(error.constraints)
        ),
      });
    });

    // store new Note into DB
    // @ts-ignore
    const newNote = await Note.create(reqBody);

    // return created Note
    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to create note."] });
  }
}

export async function getNotes(req: Request, res: Response) {
  try {
    const notes = await Note.findAll({
      where: { archivedAt: null, deletedAt: null },
      order: [["index", "ASC"]],
    });
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getArchivedNotes(req: Request, res: Response) {
  try {
    const notes = await Note.findAll({
      where: {
        archivedAt: {
          [Op.not]: null,
        },
      },
    });
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getDeletedNotes(req: Request, res: Response) {
  try {
    const notes = await Note.findAll({
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
    });
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getNoteByID(req: Request, res: Response) {
  try {
    const note = await findNoteByID(req, res);

    if (note === null) return;

    res.json(note);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function updateNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // validating request body
    const reqBody = new CreateAndUpdateNoteDTO();

    reqBody.title = req.body.title;
    reqBody.description = req.body.description;
    reqBody.index = req.body.index;

    validateOrReject(reqBody).catch((errors) => {
      return res.status(400).send({
        messages: errors.flatMap((error: any) =>
          Object.values(error.constraints)
        ),
      });
    });

    // update Note fields with income request body
    note.title = req.body.title;
    note.description = req.body.description;
    note.index = req.body.index;

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to update note."] });
  }
}

export async function archiveNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // update Note archivedAt field
    note.archivedAt = new Date();

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to archive note."] });
  }
}

export async function unarchiveNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // update Note archivedAt field
    note.archivedAt = null;

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to unarchive note."] });
  }
}

export async function deleteNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // update Note deletedAt field
    note.deletedAt = new Date();

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to delete note."] });
  }
}

export async function undeleteNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // update Note deletedAt field
    note.deletedAt = null;

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to undelete note."] });
  }
}

export async function pinNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // update Note pinnedAt field
    note.pinnedAt = new Date();

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to pin note."] });
  }
}

export async function unpinNoteByID(req: Request, res: Response) {
  try {
    // find Note in DB
    const note = await findNoteByID(req, res);

    if (note === null) return;

    // update Note pinnedAt field
    note.pinnedAt = null;

    // update Note on DB
    await note.save();
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to unpin note."] });
  }
}

// Private

async function findNoteByID(req: Request, res: Response): Promise<Note | null> {
  try {
    // if not request id, return error
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(400).send({ messages: ["Missing request ID!"] });
      return null;
    }
    // find Note in DB
    const note = await Note.findByPk(Number(req.params.id));
    // id not found, return error
    if (note === null) {
      res
        .status(404)
        .send({ messages: [`Note with ID ${req.params.id} not found!`] });
      return null;
    }
    //
    return note;
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
    return null;
  }
}
