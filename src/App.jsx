import React, { useState, useEffect } from "react";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import { db } from './firebaseConfig.jsx';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useTasks } from "./hooks/usetask.js"; 
import TaskList from "./components/tasklist.jsx"; 
import TaskForm from "./components/taskform.jsx"; 

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
      console.error("Erreur lors de l'ajout du projet :", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  const { tasks, addTask, updateTask, deleteTask } = useTasks(selectedProject?.id);

  return (
    <div className="container-fluid">
      <div className="row vh-100">
      
        {/* Sidebar des projets */}
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

        {/* Contenu principal */}
        <div className="col-md-9 p-4 d-flex flex-column align-items-center justify-content-center">
          
          {/* Message d'accueil et bouton de création de projet */}
          {!selectedProject && !showForm && (
            <div className="text-center">
              <h3 className="text-muted">Sélectionnez un projet ou démarrez-en un nouveau.</h3>
              <button className="btn btn-dark mt-3" onClick={() => setShowForm(true)}>
                Créer un nouveau projet
              </button>
            </div>
          )}

          {/* Affichage du formulaire d'ajout/modification de projet */}
          {showForm && (
            <ProjectForm onSave={addProject} onCancel={() => setShowForm(false)} />
          )}

          {/* Affichage des détails du projet sélectionné */}
          {selectedProject && !showForm && (
            <div className="project-details text-center">
              <h3 className="text-primary">{selectedProject.name}</h3>
              <p className="text-muted">Créé le {selectedProject.date || "Non spécifié"}</p>
              <p><strong>Description :</strong> {selectedProject.description || "Aucune description"}</p>

              {/* Section des tâches */}
              <div className="task-section mt-4">
                <TaskForm 
                  onSave={(task) => addTask({ ...task, projectId: selectedProject.id })} 
                  onCancel={() => {}} 
                />
                <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
