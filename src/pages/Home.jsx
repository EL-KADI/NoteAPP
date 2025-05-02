import { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import NoteCard from "../components/notes/NoteCard.jsx";
import NoteForm from "../components/notes/NoteForm.jsx";
import { getNotes, createNote, deleteNote } from "../utils/api.js";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes || []);
      setError(null);
    } catch (err) {
      setError("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (values) => {
    try {
      await createNote(values);
      await fetchNotes();
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);

      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <p className="text-gray-600 mt-1">
            {notes.length === 0
              ? "Start by creating your first note"
              : `You have ${notes.length} note${notes.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FiSearch />
            </span>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={toggleForm}
            className="btn btn-primary flex items-center justify-center"
          >
            <FiPlus className="mr-2" />
            {showForm ? "Hide Form" : "Add Note"}
          </button>
        </div>
      </div>

      {showForm && <NoteForm onAddNote={handleAddNote} getNote={fetchNotes} />}

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
              getNote={fetchNotes}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          {searchTerm ? (
            <>
              <h3 className="text-xl font-medium text-gray-700">
                No matching notes found
              </h3>
              <p className="text-gray-500 mt-2">Try a different search term</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium text-gray-700">
                You don't have any notes yet
              </h3>
              <p className="text-gray-500 mt-2">
                Click the "Add Note" button to create your first note
              </p>
              <button
                onClick={toggleForm}
                className="btn btn-primary mt-4 flex justify-center items-center gap-2 mx-auto"
              >
                <FiPlus className="text-center" />
                Add Your First Note
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
