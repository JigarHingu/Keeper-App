import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Note(props) {
  const [isEditing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    props.onEdit(props.id, editedNote);
    setEditing(false);
  }

  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={editedNote.title}
          />
          <textarea
            name="content"
            onChange={handleChange}
            value={editedNote.content}
            rows="3"
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEdit}>
            <EditIcon />
          </button>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </>
      )}
    </div>
  );
}

export default Note;
