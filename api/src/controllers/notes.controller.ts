import { Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { Op } from "sequelize";

import {
  CreateAndUpdateNoteDTO,
  SearchNoteDTO,
} from "../models/note/dto/note.dto";
import Note from "../models/note/note";

export async function createNote(req: Request, res: Response) {
  // if not request body, return error
  if (!req.body) {
    return res.status(400).send({ messages: ["Missing request body!"] });
  }
  // validating request body
  const reqBody = new CreateAndUpdateNoteDTO();

  reqBody.title = req.body.title;
  reqBody.description = req.body.description;
  reqBody.index = req.body.index;

  try {
    await validateOrReject(reqBody);
  } catch (errors: any) {
    return res.status(400).send({
      messages: errors.flatMap((error: any) =>
        Object.values(error.constraints)
      ),
    });
  }

  try {
    // store new Note into DB
    // @ts-ignore
    const newNote = await Note.create(reqBody);

    // return created Note
    return res.status(201).json(newNote).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to create note."] });
  }
}

export async function getNotes(req: Request, res: Response) {
  const reqQuery = new SearchNoteDTO();

  // find for search term
  if (req.query.search) {
    // validating request body
    reqQuery.search = req.query.search as string;
    try {
      await validateOrReject(reqQuery);
    } catch (errors: any) {
      return res.status(400).send({
        messages: errors.flatMap((error: any) =>
          Object.values(error.constraints)
        ),
      });
    }
  }

  try {
    let notes: Note[] = [];

    if (reqQuery.search) {
      notes = await Note.findAll({
        where: {
          archivedAt: null,
          deletedAt: null,
          pinnedAt: null,
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
          ],
        },
        order: [["index", "ASC"]],
      });
    } else {
      notes = await Note.findAll({
        where: { archivedAt: null, deletedAt: null, pinnedAt: null },
        order: [["index", "ASC"]],
      });
    }

    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getPinnedNotes(req: Request, res: Response) {
  const reqQuery = new SearchNoteDTO();

  // find for search term
  if (req.query.search) {
    // validating request body
    reqQuery.search = req.query.search as string;
    try {
      await validateOrReject(reqQuery);
    } catch (errors: any) {
      return res.status(400).send({
        messages: errors.flatMap((error: any) =>
          Object.values(error.constraints)
        ),
      });
    }
  }

  try {
    let notes: Note[] = [];

    if (reqQuery.search) {
      notes = await Note.findAll({
        where: {
          archivedAt: null,
          deletedAt: null,
          pinnedAt: {
            [Op.not]: null,
          },
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
          ],
        },
        order: [
          ["index", "ASC"],
          ["pinnedAt", "DESC"],
        ],
      });
    } else {
      notes = await Note.findAll({
        where: {
          archivedAt: null,
          deletedAt: null,
          pinnedAt: {
            [Op.not]: null,
          },
        },
        order: [
          ["index", "ASC"],
          ["pinnedAt", "DESC"],
        ],
      });
    }

    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getArchivedNotes(req: Request, res: Response) {
  const reqQuery = new SearchNoteDTO();

  // find for search term
  if (req.query.search) {
    // validating request body
    reqQuery.search = req.query.search as string;

    try {
      await validateOrReject(reqQuery);
    } catch (errors: any) {
      return res.status(400).send({
        messages: errors.flatMap((error: any) =>
          Object.values(error.constraints)
        ),
      });
    }
  }

  try {
    let notes: Note[] = [];

    if (reqQuery.search) {
      notes = await Note.findAll({
        where: {
          archivedAt: {
            [Op.not]: null,
          },
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
          ],
        },
        order: [["archivedAt", "DESC"]],
      });
    } else {
      notes = await Note.findAll({
        where: {
          archivedAt: {
            [Op.not]: null,
          },
        },
        order: [["archivedAt", "DESC"]],
      });
    }

    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getDeletedNotes(req: Request, res: Response) {
  const reqQuery = new SearchNoteDTO();

  // find for search term
  if (req.query.search) {
    // validating request body
    reqQuery.search = req.query.search as string;

    try {
      await validateOrReject(reqQuery);
    } catch (errors: any) {
      return res.status(400).send({
        messages: errors.flatMap((error: any) =>
          Object.values(error.constraints)
        ),
      });
    }
  }

  try {
    let notes: Note[] = [];

    if (reqQuery.search) {
      notes = await Note.findAll({
        where: {
          deletedAt: {
            [Op.not]: null,
          },
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${reqQuery.search}%`,
              },
            },
          ],
        },
        order: [["deletedAt", "DESC"]],
      });
    } else {
      notes = await Note.findAll({
        where: {
          deletedAt: {
            [Op.not]: null,
          },
        },
        order: [["deletedAt", "DESC"]],
      });
    }

    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
}

export async function getNoteByID(req: Request, res: Response) {
  const note = await findNoteByID(req, res);
  if (note === null) return;
  res.json(note);
}

export async function updateNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // validating request body
  const reqBody = new CreateAndUpdateNoteDTO();

  reqBody.title = req.body.title;
  reqBody.description = req.body.description;
  reqBody.index = req.body.index;

  try {
    await validateOrReject(reqBody);
  } catch (errors: any) {
    return res.status(400).send({
      messages: errors.flatMap((error: any) =>
        Object.values(error.constraints)
      ),
    });
  }

  // update Note fields with income request body
  note.title = req.body.title;
  note.description = req.body.description;
  note.index = req.body.index;

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to update note."] });
  }
}

export async function archiveNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // update Note archivedAt field
  note.archivedAt = new Date();

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to archive note."] });
  }
}

export async function unarchiveNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // update Note archivedAt field
  note.archivedAt = null;

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to unarchive note."] });
  }
}

export async function deleteNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // update Note deletedAt field
  note.deletedAt = new Date();

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to delete note."] });
  }
}

export async function undeleteNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // update Note deletedAt field
  note.deletedAt = null;

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to undelete note."] });
  }
}

export async function pinNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // update Note pinnedAt field
  note.pinnedAt = new Date();

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to pin note."] });
  }
}

export async function unpinNoteByID(req: Request, res: Response) {
  // find Note in DB
  const note = await findNoteByID(req, res);

  if (note === null) return;

  // update Note pinnedAt field
  note.pinnedAt = null;

  try {
    // update Note on DB
    await note.save();
    return res.status(200).json({}).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to unpin note."] });
  }
}

// Private

async function findNoteByID(req: Request, res: Response): Promise<Note | null> {
  // if not request id, return error
  if (!req.params.id || isNaN(Number(req.params.id))) {
    res.status(400).send({ messages: ["Missing request ID!"] });
    return null;
  }

  try {
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
