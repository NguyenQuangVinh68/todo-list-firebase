import "./App.css";
import { BiTrash } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { useEffect, useState } from "react";
import { db } from "./firebase_config";
import { addDoc, getDocs, deleteDoc, collection, serverTimestamp, doc, getDoc, orderBy, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
  }, [])


  async function getTodos() {
    const snapshot = await getDocs(collection(db, "todos"), orderBy('timestamp', "desc"))

    setTodos(snapshot.docs.map(doc => ({
      id: doc.id,
      todo: doc.data().todo,
      inprogress: doc.data().inprogress,
      timestamp: doc.data().timestamp
    })))


  }

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collection(db, "todos"), {
      inprogress: true,
      todo: todo,
      timestamp: serverTimestamp()
    });
    setTodo("");
    getTodos()
  };

  const handleUpdate = async (id, inprogress) => {

    if (inprogress) {
      Swal.fire({
        title: 'You have completed',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }

    await updateDoc(doc(db, "todos", id), { inprogress: !inprogress })
    getTodos()
  };

  const handleDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, 'todos', id))
        getTodos()
      }
    })


  };

  const ListTodo = ({ todo, id, inprogress }) => {
    return (
      <li className="bg-success py-3 px-4 rounded-3 text-white d-flex align-items-center justify-content-between my-3 ">
        <div>
          <p className="m-0" style={{ textDecorationLine: inprogress ? "none" : "line-through" }}>{todo}</p>
          <span style={{ fontSize: "10px" }}>
            {inprogress ? "In Progress " : "Done "}
          </span>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="edit-me btn btn-light  btn-sm mr-1"
            id="delete"
            onClick={() => handleUpdate(id, inprogress)}
          >
            {inprogress ? "Done" : "UnDone"}
          </button>
          <button
            className="edit-me btn btn-light  btn-sm mr-1"
            id="delete"
            onClick={() => handleDelete(id)}
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
              <form onSubmit={handleSubmit}>
                <button className="btn btn-success " type="submit" id="add">
                  Add
                </button>
              </form>
            </div>
          </div>
          <ul className="mt-3 w-100 px-4 " style={{ maxHeight: "330px", overflowY: "scroll" }}>
            {todos.map((item, index) => {
              return <ListTodo key={index} todo={item.todo} id={item.id} inprogress={item.inprogress} />;
            })}
          </ul>
          {todos.length < 1 ? null : (
            <p className="text-center" >{`You have ${todos.length} todos`}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
