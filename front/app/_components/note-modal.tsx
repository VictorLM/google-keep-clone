import { useEffect, useState } from "react";

import { EditText, EditTextarea } from "react-edit-text";
import { Note } from "@/app/_interfaces/note";
import DateFormatter from "@/app/_components/date-formatter";
import "react-edit-text/dist/index.css";

import Loader from "@/app/_components/loader";
import {
  archiveNote,
  deleteNote,
  pinNote,
  unpinNote,
  updateNote,
} from "@/app/_api/api";

type Props = {
  note: Note;
  getUpdatedNotes(): Promise<void>;
};

const NoteModal = ({ note, getUpdatedNotes }: Props) => {
  //
  const [loading, setLoading] = useState<Boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(note?.title || "");
    setDescription(note?.description || "");
  }, [note]);

  async function update() {
    setLoading(true);
    const updatedNote = { ...note, title, description };
    await updateNote(note.id, updatedNote);
    setLoading(false);
    getUpdatedNotes();
  }

  async function pin() {
    setLoading(true);
    note.pinnedAt = new Date().toISOString().split("T")[0];
    await pinNote(note.id);
    setLoading(false);
    getUpdatedNotes();
  }

  async function unpin() {
    setLoading(true);
    note.pinnedAt = null;
    await unpinNote(note.id);
    setLoading(false);
    getUpdatedNotes();
  }

  async function archive() {
    setLoading(true);
    note.archivedAt = new Date().toISOString().split("T")[0];
    await archiveNote(note.id);
    setLoading(false);
    getUpdatedNotes();
  }

  async function unarchive() {
    setLoading(true);
    note.archivedAt = null;
    await unpinNote(note.id);
    setLoading(false);
    getUpdatedNotes();
  }

  async function remove() {
    setLoading(true);
    note.deletedAt = new Date().toISOString().split("T")[0];
    await deleteNote(note.id);
    setLoading(false);
    getUpdatedNotes();
  }

  async function undelete() {
    setLoading(true);
    note.deletedAt = null;
    await unpinNote(note.id);
    setLoading(false);
    getUpdatedNotes();
  }

  return (
    <div
      className="modal fade"
      id="noteModal"
      aria-labelledby="noteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header py-2">
            <h1 className="modal-title fs-5" id="noteModalLabel">
              <EditText
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onSave={() => update()}
              />
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body pb-1">
            <EditTextarea
              value={description}
              rows="auto"
              onChange={(e) => setDescription(e.target.value)}
              onSave={() => update()}
            />
            <div className="text-end">
              <span className="smaller text-muted fw-light fst-italic">
                Última atualização:{" "}
              </span>
              <DateFormatter dateString={note.updatedAt} />
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            {loading ? (
              <div className="d-flex justify-content-center p-0 w-100">
                <Loader size={1.5} />
              </div>
            ) : (
              <>
                <div>
                  {/* pin / unpin */}
                  {note.pinnedAt ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => unpin()}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Desfixar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => pin()}
                    >
                      <i className="bi bi-pin me-1"></i>
                      Fixar
                    </button>
                  )}
                  {/* archive / unarchive */}
                  {note.archivedAt ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => unarchive()}
                    >
                      <i className="bi bi-box-arrow-up me-1"></i>
                      Desarquivar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => archive()}
                    >
                      <i className="bi bi-archive me-1"></i>
                      Arquivar
                    </button>
                  )}
                  {/* delete / undelete */}
                  {note.deletedAt ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      onClick={() => undelete()}
                    >
                      <i className="bi bi-arrow-counterclockwise me-1"></i>
                      Restaurar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => remove()}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Excluir
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
