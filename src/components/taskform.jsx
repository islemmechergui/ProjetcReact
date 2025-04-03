import React, { useState } from "react";

export default function TaskForm({ onSave, onCancel }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, completed: false });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        className="input-task"
        placeholder="Nouvelle tâche..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" className="btn-add">Ajouter</button>
      <button type="button" className="btn-cancel" onClick={onCancel}>Annuler</button>
    </form>
  );
}

