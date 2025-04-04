import TaskItem from "./taskitem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>Aucune tâche disponible.</p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
