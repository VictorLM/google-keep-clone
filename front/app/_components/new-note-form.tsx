import { useState } from "react";

import Loader from "@/app/_components/loader";
import { createNote } from "@/app/_api/api";

type Props = {
  firstIndex: number;
  getUpdatedNotes(): Promise<void>;
};

const NewNoteForm = ({ firstIndex, getUpdatedNotes }: Props) => {
  //
  const [loading, setLoading] = useState<Boolean>(false);
  const [formSelected, setFormSelected] = useState<Boolean>(false);
  const [submitted, setSubmitted] = useState<Boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit() {
    setSubmitted(true);

    if (title && description) {
      create();
    }
  }

  async function create() {
    setLoading(true);
    const newNote = { title, description, index: firstIndex };
    await createNote(newNote);
    getUpdatedNotes();
    setLoading(false);
  }

  return (
    <div className="d-flex justify-content-center m-4 w-100">
      {!formSelected && (
        <div className="shadow rounded w-75">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Criar uma nova anotação..."
            onClick={() => {
              setFormSelected(true);
              setSubmitted(false);
            }}
          />
        </div>
      )}
      {formSelected && (
        <div className="shadow border rounded w-75 p-4">
          <div className="mb-2">
            <input
              autoFocus
              type="text"
              className={
                submitted && !title
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              placeholder="Título da anotação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {submitted && !title && (
              <div className="invalid-feedback">
                Preencha o título da anotação.
              </div>
            )}
          </div>

          <div className="mb-3">
            <textarea
              className={
                submitted && !description
                  ? "form-control form-control-lg is-invalid"
                  : "form-control form-control-lg"
              }
              placeholder="Escreva sua anotação aqui..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {submitted && !description && (
              <div className="invalid-feedback">
                Preencha a descrição da anotação.
              </div>
            )}
          </div>

          {loading ? (
            <div className="d-flex justify-content-center p-0 w-100">
              <Loader size={2} />
            </div>
          ) : (
            <div className="d-flex justify-content-end gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setFormSelected(false)}
              >
                <i className="bi bi-x-lg me-05"></i>
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => submit()}
              >
                <i className="bi bi-floppy me-1"></i>
                Salvar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewNoteForm;
