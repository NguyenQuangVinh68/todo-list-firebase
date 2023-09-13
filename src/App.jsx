import "./App.css";
import { BiTrash } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  const handleEdit = (index) => {
    setIsUpdate(true);
    setTodo(todos[index]);
  };

  const handleUpdate = (todo) => {
    setTodos([...todos, todo]);
    setIsUpdate(false);
    setTodo("");
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((item) => item != todos[index]);
    setTodos(newTodos);
  };

  const ListTodo = ({ todo, index }) => {
    return (
      <li className="bg-success py-3 px-4 rounded-3 text-white d-flex align-items-center justify-content-between mt-3 ">
        <p className="m-0">{todo}</p>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="delete-me  btn btn-light  btn-sm"
            id="complate"
            onClick={() => handleEdit(index)}
          >
            <GrEdit />
          </button>
          <button
            className="edit-me btn btn-light  btn-sm mr-1"
            id="delete"
            onClick={() => handleDelete(index)}
          >
            <BiTrash />
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="App bg-success " style={{ height: "100vh" }}>
      <div className="container pt-5 " style={{ width: 700, margin: "0 auto" }}>
        <div className="bg-light p-5">
          <h2 className="text-center ">To do list</h2>
          <div className="row p-4">
            <div className="col" id="newTask">
              <input
                autoComplete="off"
                className="form-control w-100"
                type="text"
                placeholder="Enter your task"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
              />
            </div>
            <div className="col-auto" />
            <div className="col-auto ">
              {isUpdate ? (
                <button
                  className="btn btn-success "
                  type="button"
                  onClick={() => handleUpdate(todo)}
                >
                  Update
                </button>
              ) : (
                <form onSubmit={handleSubmit}>
                  <button className="btn btn-success " type="submit" id="add">
                    Add
                  </button>
                </form>
              )}
            </div>
          </div>
          <ul className="mt-3 w-100 px-4 " style={{ cursor: "pointer" }}>
            {todos.map((item, index) => {
              return <ListTodo key={index} todo={item} index={index} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;