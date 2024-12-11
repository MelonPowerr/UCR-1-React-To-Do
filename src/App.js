import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, isEditing: false }]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleEditTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add memo</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            {task.isEditing ? (
              <div>
                <input
                  type="text"
                  defaultValue={task.text}
                  onBlur={(e) => updateTask(task.id, e.target.value)}
                  autoFocus
                />
                <button onClick={() => toggleEditTask(task.id)}>Ok</button>
              </div>
            ) : (
              <div>
                <span>{task.text}</span>
                <button onClick={() => toggleEditTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
