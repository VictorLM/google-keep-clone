"use client";

import { useEffect, useRef, useState } from "react";
import { Masonry } from "react-masonry";
import { toast } from "react-toastify";
import { arrayMoveImmutable } from "array-move";
import SortableList, { SortableItem } from "react-easy-sort";

import NavBar from "@/app/_components/navbar";
import SideBar from "@/app/_components/sidebar";
import Loader from "@/app/_components/loader";
import NoteModal from "@/app/_components/note-modal";
import NewNoteForm from "@/app/_components/new-note-form";

import { getNotes, getPinnedNotes, updateNote } from "@/app/_api/api";
import { Note } from "@/app/_interfaces/note";

export default function Notes() {
  //
  const [loading, setLoading] = useState<Boolean>(true);
  const [pinnedNotes, setPinnedNotes] = useState<Note[]>([]);
  const [otherNotes, setOtherNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  //
  const modalButtonRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData(search?: string) {
    setLoading(true);

    try {
      const responsePinnedNotes = await getPinnedNotes(search);
      const responseOtherNotes = await getNotes(search);

      if (responsePinnedNotes?.messages?.length) {
        responsePinnedNotes.messages.forEach((message: string) => {
          toast.error(message);
        });
      }

      if (responseOtherNotes?.messages?.length) {
        responseOtherNotes.messages.forEach((message: string) => {
          toast.error(message);
        });
      }

      setPinnedNotes(responsePinnedNotes || []);
      setOtherNotes(responseOtherNotes || []);
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }

    setLoading(false);
  }

  async function onSortPinnedNotesEnd(oldIndex: number, newIndex: number) {
    // update local array
    setPinnedNotes((array) => arrayMoveImmutable(array, oldIndex, newIndex));
    // to store new Note index
    let newNoteIndex = 1;
    // get sorted note
    const sortedNote: Note = { ...pinnedNotes[oldIndex] };
    // find new Index
    if (newIndex === 0) {
      //
      newNoteIndex = pinnedNotes[0].index - 0.00001;
      //
    } else if (newIndex + 1 === pinnedNotes.length) {
      //
      newNoteIndex = pinnedNotes[pinnedNotes.length - 1].index + 0.00001;
      //
    } else if (oldIndex === 0) {
      //
      newNoteIndex = pinnedNotes[newIndex].index + 0.00001;
      //
    } else if (oldIndex + 1 === pinnedNotes.length) {
      //
      newNoteIndex = pinnedNotes[newIndex].index - 0.00001;
      //
    } else {
      const aboveIndex = pinnedNotes[newIndex - 1].index;
      const bellowIndex = pinnedNotes[newIndex].index;
      //
      newNoteIndex = (aboveIndex + bellowIndex) / 2;
    }
    //
    sortedNote.index = newNoteIndex;
    //
    try {
      // send update to API
      const response = await updateNote(sortedNote.id, sortedNote);
      // if API errors
      if (response?.messages?.length) {
        response.messages.forEach((message: string) => {
          toast.error(message);
        });
      }
      // if error on request
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }
  }

  async function onSortOtherNotesEnd(oldIndex: number, newIndex: number) {
    // update local array
    setOtherNotes((array) => arrayMoveImmutable(array, oldIndex, newIndex));
    // to store new Note index
    let newNoteIndex = 1;
    // get sorted note
    const sortedNote: Note = { ...otherNotes[oldIndex] };
    // find new Index
    if (newIndex === 0) {
      //
      newNoteIndex = otherNotes[0].index - 0.00001;
      //
    } else if (newIndex + 1 === otherNotes.length) {
      //
      newNoteIndex = otherNotes[otherNotes.length - 1].index + 0.00001;
      //
    } else if (oldIndex === 0) {
      //
      newNoteIndex = otherNotes[newIndex].index + 0.00001;
      //
    } else if (oldIndex + 1 === otherNotes.length) {
      //
      newNoteIndex = otherNotes[newIndex].index - 0.00001;
      //
    } else {
      const aboveIndex = otherNotes[newIndex - 1].index;
      const bellowIndex = otherNotes[newIndex].index;
      //
      newNoteIndex = (aboveIndex + bellowIndex) / 2;
    }
    //
    sortedNote.index = newNoteIndex;
    //
    try {
      // send update to API
      const response = await updateNote(sortedNote.id, sortedNote);
      // if API errors
      if (response?.messages?.length) {
        response.messages.forEach((message: string) => {
          toast.error(message);
        });
      }
      // if error on request
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }
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
            ) : (!pinnedNotes || !pinnedNotes.length) &&
              (!otherNotes || !otherNotes.length) ? (
              <>
                <NewNoteForm firstIndex={1} getUpdatedNotes={getData} />
                <h4 className="text-muted fst-italic fw-light text-center p-5">
                  Nenhuma anotação registrada!
                </h4>
              </>
            ) : (
              <>
                <NewNoteForm
                  firstIndex={otherNotes[0]?.index}
                  getUpdatedNotes={getData}
                />

                <div className="ms-3 mt-4">
                  <span className="fw-medium text-muted small">FIXADAS</span>
                </div>
                {/* Pinned notes */}

                {!pinnedNotes.length ? (
                  <h5 className="text-muted fst-italic fw-light text-center p-2">
                    Nenhuma anotação fixada!
                  </h5>
                ) : (
                  <SortableList
                    onSortEnd={onSortPinnedNotesEnd}
                    draggedItemClassName="dragged"
                  >
                    <Masonry>
                      {pinnedNotes.map((note) => (
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

                {!otherNotes.length ? (
                  <h5 className="text-muted fst-italic fw-light text-center p-2">
                    Nenhuma anotação encontrada!
                  </h5>
                ) : (
                  <SortableList
                    onSortEnd={onSortOtherNotesEnd}
                    draggedItemClassName="dragged"
                  >
                    <Masonry>
                      {otherNotes.map((note) => (
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
