"use client";

import { useEffect, useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";

import NavBar from "@/app/_components/navbar";
import SideBar from "@/app/_components/sidebar";
import Loader from "./_components/loader";

import { getNotes, updateNote } from "@/app/_api/api";
import { Note } from "./_interfaces/note";

export default function Home() {
  //
  const [loading, setLoading] = useState<Boolean>(true);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const data = await getNotes();
    setNotes(data || []);
    setLoading(false);
  }

  const onSortEnd = async (oldIndex: number, newIndex: number) => {
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
  };

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
              <Loader />
            ) : !notes || !notes.length ? (
              <h4 className="text-muted fst-italic fw-light text-center p-5">
                Nenhuma anotação registrada!
              </h4>
            ) : (
              <SortableList
                onSortEnd={onSortEnd}
                className="row"
                draggedItemClassName="dragged"
              >
                {notes.map((note) => (
                  <SortableItem key={note.id}>
                    <div className="col-4 p-2">
                      <div className="note border rounded p-3">
                        <h5>{note.title}</h5>
                        <p className="small">{note.description}</p>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </SortableList>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
