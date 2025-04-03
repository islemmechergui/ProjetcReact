import TaskItem from "./taskitem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <p>Aucune tâche disponible.</p>;

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}

