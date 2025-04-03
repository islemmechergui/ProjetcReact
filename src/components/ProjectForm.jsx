import React, { useState } from "react";

export default function ProjectForm({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: title, description, dueDate });
    setTitle(""); // Réinitialiser les champs après soumission
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Titre</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Annuler
        </button>
        <button type="submit" className="btn btn-dark">
        sauvegarder
        </button>
      </div>
    </form>
  );
}
