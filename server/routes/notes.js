import express from 'express';
import mongoose from 'mongoose';
import Note from '../models/note.model.js';

const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deleting a note
router.delete('/:id', async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);
    if (result == null) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
    console.log("Deleting note with ID:", req.params.id);
    res.json({ message: 'Deleted Note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;