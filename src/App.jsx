import React, { useState, useEffect } from "react";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import { db } from './firebaseConfig.jsx'; // Import Firestore
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Charger les projets depuis Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  const addProject = async (project) => {
    try {
      await addDoc(collection(db, "projects"), project);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Error deleting project: ", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* Sidebar avec fond noir */}
        <div className="col-md-3 bg-dark text-white p-4 d-flex flex-column">
          <h4 className="mb-3 text-center">Vos projets</h4>
          <button className="btn btn-light mb-3" onClick={() => setShowForm(true)}>
            + Ajouter un projet
          </button>
          <ProjectList
            projects={projects}
            onSelectProject={setSelectedProject}
            onDeleteProject={deleteProject}
            selectedProjectId={selectedProject?.id}
          />
        </div>

        
        <div className="col-md-9 p-4 d-flex flex-column align-items-center justify-content-center">
          <div className="mb-3">
            {selectedProject ? (
              <h3 className="text-primary">{selectedProject.name}</h3>
            ) : (
              <h3 className="text-muted">Aucun projet sélectionné</h3>
            )}
          </div>

          {showForm ? (
            <ProjectForm onSave={addProject} onCancel={() => setShowForm(false)} />
          ) : (
            <div className="text-center">
              <button className="btn btn-dark" onClick={() => setShowForm(true)}>
              créer un nouveau projet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
