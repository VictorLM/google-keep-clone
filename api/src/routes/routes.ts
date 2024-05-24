import express, { Request, Response } from "express";
import { CreateNoteDTO } from "../models/note/dto/create-note.dto";
import { validateOrReject } from "class-validator";
import Note from "../models/note/note";

const router = express.Router();

// Post Method
router.post("/", async (req: Request, res: Response) => {
  try {
    // if not request body, return error
    if (!req.body) {
      return res.status(400).send({ messages: ["Missing request body!"] });
    }
    // validating request body
    const reqBody = new CreateNoteDTO();

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

    // store new note into DB
    // @ts-ignore
    const newNote = await Note.create(reqBody);

    // return created note
    res.json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messages: ["Failed to create note."] });
  }
});

// Get all Method
router.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ messages: [error.message] });
  }
});

// Get by ID Method
router.get("/:id", async (req: Request, res: Response) => {
  //   try {
  //     const data = await Model.findById(req.params.id);
  //     res.json(data);
  //   } catch (error: any) {
  //     res.status(500).json({ messages: [error.message] });
  //   }
});

// Update by ID Method
router.put("/:id", async (req: Request, res: Response) => {
  //   try {
  //     const id = req.params.id;
  //     const updatedData = req.body;
  //     const options = { new: true };
  //     const result = await Model.findByIdAndUpdate(id, updatedData, options);
  //     res.send(result);
  //   } catch (error: any) {
  //     res.status(500).json({ messages: [error.message] });
  //   }
});

// Delete by ID Method
router.delete("/:id", async (req: Request, res: Response) => {
  //   try {
  //     const id = req.params.id;
  //     const data = await Model.findByIdAndDelete(id);
  //     res.send(`Document with ${data?.name} has been deleted..`);
  //   } catch (error: any) {
  //     res.status(400).json({ messages: [error.message] });
  //   }
});

export default router;
