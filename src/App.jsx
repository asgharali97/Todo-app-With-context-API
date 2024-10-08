import { useEffect, useState } from "react";
import {TodoContextProvider} from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev)=> [{id:Date.now(),...todo},...prev])
  }

  const editTodo = (id,todo) => {
      setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? todo : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((Todo)=> Todo.id !== id))
}

const toggleTodo = (id) => {
  setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, 
    completed: !prevTodo.completed } : prevTodo))
}


useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

  if (todos && todos.length > 0) {
    setTodos(todos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])

  return (
    <>
    <TodoContextProvider value={{todos,addTodo,deleteTodo,editTodo,toggleTodo}}>
      <div className="bg-[#1E201E] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-white text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
    </>
  );
}

export default App;
