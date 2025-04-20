import React, { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [showToast, setShowToast] = useState(false);  
  
  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    
    onUpdate({ ...task, completed: !task.completed  });
  };
 
  const handleDelete = () => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette tâche ?");
    if (confirmed) {
      setShowToast(true);
  
      
      setTimeout(() => {
        onDelete(task.id);
      }, 3000);
    }
  };

  return (
    <>
      {showToast && (
  <div style={toastStyle}>
    Tache supprimee avec succes  (dans 3 secondes)
  </div>
)}



    <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2 bg-light w-100">
      {isEditing ? (
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="form-control me-2"
        />
      ) : (
        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.title}
        </span>
      )}

      <div className="d-flex gap-2">
        {isEditing ? (
          <>
            <button className="btn btn-success btn-sm " onClick={handleSave}>Enregistrer</button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Annuler</button>
          </>
        ) : (
          <>
            <button className="btn btn-warning btn-sm" onClick={() => setIsEditing(true)}>Modifier</button>

            {task.completed ? (
              <button className="btn btn-success btn-sm" disabled>
                Tâche complétée
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleToggleComplete}>
                Compléter
              </button>
            )}
   <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const toastStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "8px",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
  zIndex: 1000,
  animation: "fadeInOut 3s ease-in-out"
};


