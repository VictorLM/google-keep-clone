"use client";

import { useEffect, useRef, useState } from "react";
import { Masonry } from "react-masonry";
import { toast } from "react-toastify";
import SortableList, { SortableItem } from "react-easy-sort";

import NavBar from "@/app/_components/navbar";
import SideBar from "@/app/_components/sidebar";
import Loader from "@/app/_components/loader";
import NoteModal from "@/app/_components/note-modal";
import NewNoteForm from "@/app/_components/new-note-form";

import { getNotes, updateNote } from "@/app/_api/api";
import { Note } from "@/app/_interfaces/note";

export default function Notes() {
  //
  const [loading, setLoading] = useState<Boolean>(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  //
  const modalButtonRef = useRef(null);

  useEffect(() => {
    getData("", true);
  }, []);

  async function getData(search?: string, showLoader?: boolean) {
    if (showLoader) setLoading(true);

    try {
      const response = await getNotes(search);

      if (response?.messages?.length) {
        response.messages.forEach((message: string) => {
          toast.error(message);
        });
      }

      setNotes(response || []);
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }

    if (showLoader) setLoading(false);
  }

  async function onSortEnd(oldIndex: number, newIndex: number) {
    // find new Note index
    let newNoteIndex = 1;
    const movedNote: Note = {
      ...notes.filter((note) => !note.pinnedAt)[oldIndex],
    };
    //
    if (newIndex === 0) {
      newNoteIndex = notes.filter((note) => !note.pinnedAt)[0].index - 0.00001;
    } else {
      const aboveIndex =
        newIndex === 0
          ? 0
          : notes.filter((note) => !note.pinnedAt)[newIndex - 1].index;
      //
      const bellowIndex =
        newIndex + 1 >= notes.filter((note) => note.pinnedAt).length
          ? notes.filter((note) => !note.pinnedAt)[
              notes.filter((note) => !note.pinnedAt).length - 1
            ].index
          : notes.filter((note) => !note.pinnedAt)[newIndex + 1].index;
      //
      newNoteIndex = (aboveIndex + bellowIndex) / 2;
    }
    movedNote.index = newNoteIndex;
    // send update to API

    try {
      const response = await updateNote(movedNote.id, movedNote);

      if (response?.messages?.length) {
        response.messages.forEach((message: string) => {
          toast.error(message);
        });
      }
      //
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }

    // update notes
    getData();
  }

  async function onSortEndPinned(oldIndex: number, newIndex: number) {
    // filter only pinned notes
    const pinnedNotesOnly = notes.filter((note) => note.pinnedAt);
    // to store new Note index
    let newNoteIndex = 1;
    // get sorted note
    const sortedNote: Note = { ...pinnedNotesOnly[oldIndex] };
    //
    if (newIndex === 0) {
      //
      newNoteIndex = pinnedNotesOnly[0].index - 0.00001;
      //
    } else if (newIndex + 1 === pinnedNotesOnly.length) {
      //
      newNoteIndex =
        pinnedNotesOnly[pinnedNotesOnly.length - 1].index + 0.00001;
      //
    } else if (oldIndex === 0) {
      //
      newNoteIndex = pinnedNotesOnly[newIndex].index + 0.00001;
      //
    } else if (oldIndex + 1 === pinnedNotesOnly.length) {
      //
      newNoteIndex = pinnedNotesOnly[newIndex].index - 0.00001;
      //
    } else {
      const aboveIndex = pinnedNotesOnly[newIndex - 1].index;
      const bellowIndex = pinnedNotesOnly[newIndex].index;
      //
      newNoteIndex = (aboveIndex + bellowIndex) / 2;
    }
    sortedNote.index = newNoteIndex;

    // send update to API
    try {
      const response = await updateNote(sortedNote.id, sortedNote);

      if (response?.messages?.length) {
        response.messages.forEach((message: string) => {
          toast.error(message);
        });
      }
      //
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }

    // update notes
    getData();
  }

  // listen to note selection/click/selectedNote change
  useEffect(() => {
    if (modalButtonRef?.current) {
      // @ts-ignore
      modalButtonRef.current.click(); // open NoteModal
    }
  }, [selectedNote]);

  return (
    <main className="pb-4">
      <NavBar getUpdatedNotes={getData} />
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
                  firstIndex={notes[0].index}
                  getUpdatedNotes={getData}
                />

                <div className="ms-3 mt-4">
                  <span className="fw-medium text-muted small">FIXADAS</span>
                </div>
                {/* Pinned notes */}

                {!notes.filter((note) => note.pinnedAt).length ? (
                  <h5 className="text-muted fst-italic fw-light text-center p-2">
                    Nenhuma anotação fixada!
                  </h5>
                ) : (
                  <SortableList
                    onSortEnd={onSortEndPinned}
                    draggedItemClassName="dragged"
                  >
                    <Masonry>
                      {notes
                        .filter((note) => note.pinnedAt)
                        .map((note) => (
                          <div
                            key={note.id}
                            className="p-2"
                            onClick={() => setSelectedNote(note)}
                            style={{
                              width: "33.333%",
                            }}
                          >
                            <SortableItem>
                              <div className="note shadow border rounded p-3">
                                <h5>
                                  {note.title.length > 50
                                    ? note.title.substring(0, 50) + "..."
                                    : note.title}
                                </h5>
                                <p className="small mb-0">
                                  {note.description.length > 255
                                    ? note.description.substring(0, 255) + "..."
                                    : note.description}
                                </p>
                              </div>
                            </SortableItem>
                          </div>
                        ))}
                    </Masonry>
                  </SortableList>
                )}

                <div className="ms-3 mt-4">
                  <span className="fw-medium text-muted small">OUTRAS</span>
                </div>

                {!notes.filter((note) => !note.pinnedAt).length ? (
                  <h5 className="text-muted fst-italic fw-light text-center p-2">
                    Nenhuma anotação fixada encontrada!
                  </h5>
                ) : (
                  <SortableList
                    onSortEnd={onSortEnd}
                    draggedItemClassName="dragged"
                  >
                    <Masonry>
                      {notes
                        .filter((note) => !note.pinnedAt)
                        .map((note) => (
                          <div
                            key={note.id}
                            className="p-2"
                            onClick={() => setSelectedNote(note)}
                            style={{
                              width: "33.333%",
                            }}
                          >
                            <SortableItem>
                              <div className="note shadow border rounded p-3">
                                <h5>
                                  {note.title.length > 50
                                    ? note.title.substring(0, 50) + "..."
                                    : note.title}
                                </h5>
                                <p className="small mb-0">
                                  {note.description.length > 255
                                    ? note.description.substring(0, 255) + "..."
                                    : note.description}
                                </p>
                              </div>
                            </SortableItem>
                          </div>
                        ))}
                    </Masonry>
                  </SortableList>
                )}

                {/* Hidden */}
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
