import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { useTodo } from "../context";

function TodoItem({ todo }) {
    const [isTodoEditable,setIsTodoEditable] = useState(false);
    const [todoMsg,setTodoMsg] = useState(todo.todo);
    const {editTodo,deleteTodo,toggleTodo} = useTodo();

    const updateTodo=()=>{
     editTodo(todo.id,{...todo,todo:todoMsg})
     setIsTodoEditable(false)
    }

    const toggleCompleted = ()=>{
        toggleTodo(todo.id)
    }
  return (
    <div
      className={`flex border border-black/10 text-gray-400 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 ${
        todo.completed ? "bg-[#7e7e7e] text-[#cfcfcf]" : "bg-[#393a34]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-[#393a34] rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through bg-[#7e7e7e]" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button className={`${todo.completed && 'text-[#cfcfcf]'}`}
          onClick={() => {
            if (todo.completed) {
              return;
            }
            if (isTodoEditable) {
              updateTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? (
            <CiSaveDown2 className={`inline-flex text-3xl justify-center items-center  disabled:opacity-50 cursor-pointer`} />
          ) : (
            <CiEdit className="inline-flex text-3xl justify-center items-center  disabled:opacity-50 cursor-pointer " />
          )}
        </button>
        <button className={`${todo.completed && 'text-[#2d2d2d]'}`}>
        <MdDelete
          onClick={() => deleteTodo(todo.id)}
          className="inline-flex text-3xl justify-center items-center  disabled:opacity-50 cursor-pointer"
          />
          </button>
    </div>
  );
}

export default TodoItem;
