"use client";

import { useEffect, useRef, useState } from "react";
import { Masonry } from "react-masonry";
import { toast } from "react-toastify";

import NavBar from "@/app/_components/navbar";
import SideBar from "@/app/_components/sidebar";
import Loader from "@/app/_components/loader";
import NoteModal from "@/app/_components/note-modal";

import { getDeletedNotes } from "@/app/_api/api";
import { Note } from "@/app/_interfaces/note";

export default function Notes() {
  //
  const [loading, setLoading] = useState<Boolean>(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  //
  const modalButtonRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData(search?: string) {
    setLoading(true);

    try {
      const response = await getDeletedNotes(search);

      if (response?.messages?.length) {
        response.messages.forEach((message: string) => {
          toast.error(message);
        });
      }

      setNotes(response || []);
    } catch (error) {
      toast.error("Erro ao processar dados da página!");
    }

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
                <h4 className="text-muted fst-italic fw-light text-center p-5">
                  Nenhuma anotação excluída encontrada!
                </h4>
              </>
            ) : (
              <>
                <div className="ms-3 mt-4">
                  <span className="fw-medium text-muted small">EXCLUÍDAS</span>
                </div>
                {/* Archived notes */}

                <Masonry>
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2"
                      onClick={() => setSelectedNote(note)}
                      style={{
                        width: "33.333%",
                      }}
                    >
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
                    </div>
                  ))}
                </Masonry>

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
