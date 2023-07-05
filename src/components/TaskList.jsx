import TaskShow from "./TaskShow";

//Görev listesindeki görevleri ekrana aktarma
function TaskList({ tasks, onDelete, onCheck, onEdit }) {
    return (
        <div>
            {tasks.map((task, index) => {
                return (
                    <TaskShow
                        key={index}
                        task={task}
                        onDelete={onDelete}
                        onCheck={onCheck}
                        onEdit={onEdit}
                    />
                );
            })}
        </div>
    );
}

export default TaskList;
