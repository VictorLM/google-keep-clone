"use client";

import { useEffect, useRef, useState } from "react";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";

import NavBar from "@/app/_components/navbar";
import SideBar from "@/app/_components/sidebar";
import Loader from "@/app/_components/loader";
import NoteModal from "@/app/_components/note-modal";
import NewNoteForm from "@/app/_components/new-note-form";

import { getNotes, updateNote } from "@/app/_api/api";
import { Note } from "@/app/_interfaces/note";

export default function Home() {
  //
  const [loading, setLoading] = useState<Boolean>(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  //
  const modalButtonRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const data = await getNotes();
    setNotes(data || []);
    setLoading(false);
  }

  async function onSortEnd(oldIndex: number, newIndex: number) {
    // set loader to true
    setLoading(true);
    // update local array
    setNotes((array) => arrayMoveImmutable(array, oldIndex, newIndex));
    // find new Note index
    let newNoteIndex = 1;
    const movedNote = { ...notes[oldIndex] };
    if (newIndex === 0) {
      newNoteIndex = notes[0].index - 0.00001;
    } else {
      const aboveIndex = newIndex === 0 ? 0 : notes[newIndex - 1].index;
      newNoteIndex = aboveIndex + 0.00001;
    }
    movedNote.index = newNoteIndex;
    // send update to API
    await updateNote(movedNote.id, movedNote);
    // set loader to false
    setLoading(false);
  }

  // listen to note selection/click/selectedNote change
  useEffect(() => {
    if (modalButtonRef?.current) {
      // @ts-ignore
      modalButtonRef.current.click(); // open NoteModal
    }
  }, [selectedNote]);

  return (
    <main className="">
      <NavBar />
      <div className="container-xxl px-4 px-lg-5 mt-nav">
        <div className="row">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9">
            {loading ? (
              <div className="d-flex justify-content-center p-5 w-100">
                <Loader size={4} />
              </div>
            ) : !notes || !notes.length ? (
              <>
                <NewNoteForm firstIndex={1} getUpdatedNotes={getData} />
                <h4 className="text-muted fst-italic fw-light text-center p-5">
                  Nenhuma anotação registrada!
                </h4>
              </>
            ) : (
              <>
                <NewNoteForm
                  firstIndex={notes[0].index - 0.00001}
                  getUpdatedNotes={getData}
                />
                <SortableList
                  onSortEnd={onSortEnd}
                  className="row"
                  draggedItemClassName="dragged"
                >
                  {notes.map((note) => (
                    <SortableItem key={note.id}>
                      <div
                        className="col-4 p-2"
                        onClick={() => setSelectedNote(note)}
                      >
                        <div className="note border rounded p-3">
                          <h5>
                            {note.title.length > 100
                              ? note.title.substring(0, 100) + "..."
                              : note.title}
                          </h5>
                          <p className="small">
                            {note.description.length > 255
                              ? note.description.substring(0, 255) + "..."
                              : note.description}
                          </p>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </SortableList>

                <button
                  ref={modalButtonRef}
                  data-bs-toggle="modal"
                  data-bs-target="#noteModal"
                  className="d-none"
                ></button>
              </>
            )}
          </div>
        </div>
      </div>
      {selectedNote && (
        <NoteModal note={selectedNote} getUpdatedNotes={getData} />
      )}
    </main>
  );
}
