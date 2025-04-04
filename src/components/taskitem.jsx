import React from "react";
import { FaTrash } from "react-icons/fa6";
import { GrCompliance } from "react-icons/gr";


export default function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <li className="task-item">
      <span className={task.completed ? "done" : ""}>{task.name}</span>
      <div>
        <button className="btn-complete" onClick={() => onUpdate(task.id, { completed: !task.completed })}>
        <GrCompliance /> {task.completed ? "❌ Annuler":"Compléter"}
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          <FaTrash /> supprimer
        </button>
      </div>
    </li>
  );
}



