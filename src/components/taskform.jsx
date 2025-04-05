import React, { useState } from "react";

export default function TaskForm({ onSave }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({ title, completed: false }); 
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mb-3 w-100">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-success">Ajouter</button>
    </form>
  );
}