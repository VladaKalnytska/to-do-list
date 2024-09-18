import React, { useState } from "react";

function ToDoList() {
    
    // const [tasks, setTasks] = useState([{text: "new Task1", isCompleted: false},{text: "new Task2", isCompleted: false}, {text: "new Task3", isCompleted: false}]);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all")

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedText, setEditedText] = useState("");

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.isCompleted;
        if (filter === "incomplete") return !task.isCompleted;
        return true;
    })

    function getNoTasksMessage() {
        switch (filter) {
            case "completed":
                return "No completed tasks to display";
            case "incomplete":
                return "No incomplete tasks to display. Well done!"; 
            case "all":
            default:
                return "No tasks to display. Click \"Add\" to make a new task :)";
        }
    }

    function handleKeyPress(event) {
        if (event.key == "Enter") {
            event.preventDefault();
            addTask();
        }
    }

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, isCompleted: false }]);
            setNewTask('')
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index)
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleCompleteTask(index) {
        const updatedTasks = tasks.map((task, i) => {
            return i === index ? {...task, isCompleted: !task.isCompleted} : task
        })
        setTasks(updatedTasks)
    }

    function handleFilterChange(event) {
        setFilter(event.target.value)
    }


    function startEditing(index) {
        setEditingIndex(index);
        setEditedText(tasks[index].text);
    }

    function cancelEditing() {
        setEditingIndex(null);
        setEditedText("");
    }

    function saveEdit(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, text: editedText };
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditedText("");
    }


    return (
        <div className = "to-do-list">
            <section className="title-background-image section-title">
                <h1 className="title">To-Do-List</h1>
            </section>
            <div className="input-container">
                <input
                    id="myInputNewTask"
                    type = "text"
                    placeholder = "Enter a task..."
                    value = { newTask }
                    onChange = { handleInputChange }
                    onKeyDown={handleKeyPress}/> 
                <button id = "myBtn" className="add-button" onClick={ addTask }>
                    ＋   
                </button>  
                <div className="filter-select">
                    <select id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="all">All tasks</option>
                        <option value="completed">Completed tasks</option>
                        <option value="incomplete">Incomplete tasks</option>
                    </select>
                </div>             
            </div>

            <ol>
                {
                    filteredTasks.length === 0 ? (
                        <p className="no-tasks">{getNoTasksMessage()}</p>
                    ) : filteredTasks.map((task, index) => 
                        <li 
                            key = {index} 
                            className = {task.isCompleted ? "completed-task" : ""}
                        >
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => toggleCompleteTask(index)}
                                className="my-checkbox"
                            />
                            {editingIndex === index ? (
                                <div className="edit-task-container">
                                    <input
                                        id="myInputEditTask"
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <button className="save-button" onClick={() => saveEdit(index)}>✅</button>
                                    <button className="cancel-button" onClick={cancelEditing}>❌</button>
                                </div>
                            ) : (
                                <span className="text">{task.text}</span>
                            )}
                            <div className="optional-button">
                                <button className="edit-button" onClick={() => startEditing(index)}>
                                    ✏️
                                </button>
                                <button className="delete-button" onClick={() => deleteTask(index)}>
                                  Delete
                                </button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>
                                  ⬆
                                </button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>
                                  ⬇
                                </button>
                            </div>
                        </li>
                    )
                }
            </ol>
        </div>
    )
}

export default ToDoList;