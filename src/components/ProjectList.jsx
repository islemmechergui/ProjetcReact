import React from "react";

export default function ProjectList({ projects, onSelectProject, onDeleteProject, selectedProjectId }) {
  return (
    <div className="list-group">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            project.id === selectedProjectId ? "active" : "list-group-item-light"
          }`}
          onClick={() => onSelectProject(project)}
          style={{ cursor: "pointer" }}
        >
          {project.name}
          <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); onDeleteProject(project.id); }}>
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
