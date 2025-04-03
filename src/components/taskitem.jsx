import React from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <li className="task-item">
      <span className={task.completed ? "done" : ""}>{task.name}</span>
      <div>
        <button className="btn-complete" onClick={() => onUpdate(task.id, { completed: !task.completed })}>
          {task.completed ? "Annuler" : "Compléter"}
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>Supprimer</button>
      </div>
    </li>
  );
}

