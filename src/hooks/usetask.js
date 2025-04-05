
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";

export function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      return;
    }

    const q = query(collection(db, "tasks"), where("projectId", "==", projectId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [projectId]);

  const addTask = async (task) => {
    if (!task.projectId) return;
    await addDoc(collection(db, "tasks"), task);
  };

  const updateTask = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, task);
  };
  

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}
export default useTasks;
