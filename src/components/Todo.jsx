import { useReducer, useState } from "react";
import { initialState } from "../data/data";
import { todoReducer } from "../reducers/todoReducer";

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const [editInput, setEditInput] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch({ type: "Add", title: newTodo });
      setNewTodo("");
    }
  };

  const handleEditSave = (id) => {
    if (editInput.trim() !== "") {
      dispatch({ type: "Save_Edit", id, newTitle: editInput });
      setEditInput("");
    }
  };

  const handleEditStart = (id, currentTitle) => {
    dispatch({ type: "Edit", id });
    setEditInput(currentTitle);
  };

  return (
    <div className="flex w-full h-[80vh] justify-center items-center flex-col">
      <div className="container max-w-[500px] mx-auto p-2 bg-gray-900 text-gray-100 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-white my-6">
          Todo List
        </h1>
        <div className="flex justify-center px-4 my-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo"
            className="flex-grow px-4 py-2 bg-gray-800 text-gray-100 rounded-md outline-none focus:bg-gray-700"
          />
          <button
            onClick={handleAddTodo}
            className="ml-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-800 mb-2 mx-4 p-2 rounded-md border border-gray-700"
            >
              {todo.isEditing ? (
                <div className="flex items-center flex-grow">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    placeholder="Edit todo"
                    className="flex-grow px-2 py-2 bg-gray-700 text-gray-100 rounded-md outline-none mr-2"
                  />
                  <button
                    onClick={() => handleEditSave(todo.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <label className="relative flex items-center cursor-pointer flex-grow">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch({ type: "Toggle", id: todo.id })}
                      className="appearance-none min-h-5 min-w-5 bg-gray-800 border-2 border-gray-600 rounded-sm checked:bg-green-500 focus:outline-none"
                    />
                    <span className="ml-2"> {todo.title} </span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      disabled={!todo.completed}
                      onClick={() => dispatch({ type: "Delete", id: todo.id })}
                      className={`px-4 py-2 rounded-md transition ${
                        todo.completed
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditStart(todo.id, todo.title)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
