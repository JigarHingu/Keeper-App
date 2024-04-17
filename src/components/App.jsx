import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios'; // Import Axios

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from backend when component mounts
    fetchNotes();
  }, []);

  // Function to fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes'); // Make GET request to backend route
      setNotes(response.data); // Update notes state with fetched data
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  function addNote(newNote) {
    // Add note locally
    setNotes(prevNotes => [...prevNotes, newNote]);
    // Send POST request to backend to add note
    axios.post('http://localhost:5000/notes', newNote)
      .then(response => {
        console.log('Note added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  }

  function deleteNote(id) {
    const noteId = notes[id]._id;
    // Remove note locally
    setNotes(prevNotes => prevNotes.filter((noteItem, index) => index !== id));
    // Send DELETE request to backend to delete note
    axios.delete(`http://localhost:5000/notes/${noteId}`)
      .then(response => {
        console.log('Note deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  }

  function editNote(id, editedNote) {
    // Update the note in the state array
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        if (index === id) {
          return editedNote; // Replace the note with the edited note
        }
        return noteItem;
      });
    });

    // Send PUT request to backend to update the note
    axios.put(`http://localhost:5000/notes/${notes[id]._id}`, editedNote)
      .then(response => {
        console.log('Note updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  }
  
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
