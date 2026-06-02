import React from 'react';
import Spinner from './Spinner.jsx';
import TodoForm from './TodoForm.jsx';
// BEGIN (write your solution here)
import {useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation} from "../services/tasksApi";
// END

const TodoBox = () => {
  // BEGIN (write your solution here)
    const {data: tasks = [], error, isLoading, refetch} = useGetTasksQuery();

    const [
        addTask,
        {error: addTaskError, isLoading: isAddingTask},
    ] = useAddTaskMutation();

    const [
        removeTask,
        {error: removeTaskError, isLoading: isRemovingTask},
    ] = useRemoveTaskMutation();
  // END

  const handleDeleteTask = (event, id) => {
    event.preventDefault();
    // BEGIN (write your solution here)
    removeTask(id);
    // END
  };

  const handleSubmitForm = (event, newTaskText) => {
    event.preventDefault();
    // BEGIN (write your solution here)
    addTask(newTaskText);
    // END
  };

  const renderTodo = () => (
    <TodoForm
      submitHandler={handleSubmitForm}
    />
  );

  // BEGIN (write your solution here)
    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error loading tasks</div>;
    }
  // END

  return (
    <div>
      <div className="mb-3">
        {renderTodo()}
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="row">
            <div className="col-1">
              {task.id}
            </div>
            <div className="col">
              <a href="" className="todo-task" onClick={(event) => handleDeleteTask(event, task.id)}>{task.text}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoBox;
