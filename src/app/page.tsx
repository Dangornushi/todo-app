"use client";
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodo = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`);
      const todos = await response.json();
      setTodos(todos);
    };
    getTodo();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo</h1>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={async () => {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ completed: todo.completed }),
                  }
                );
                const updateTodo = await response.json();
                setTodos(
                  todos.map((todo) => {
                    if (todo.id === updateTodo.id) {
                      return updateTodo;
                    } else {
                      return todo;
                    }
                  })
                );
              }}
              className="mr-2"
            />
            <p className={`text-black ${todo.completed ? "line-through" : ""}`}>
              {todo.title}
            </p>
          </div>
          <button
            onClick={async (e) => {
              e.preventDefault();
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${todo.id}`,
                {
                  method: "DELETE",
                }
              );
              const deleteTodo = await response.json();
              setTodos(todos.filter((todo) => todo.id !== deleteTodo.id));
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            削除
          </button>
        </div>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!inputValue) alert("入力してください");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/todo`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title: inputValue }),
            }
          );
          const newTodo = await response.json();

          setTodos([...todos, newTodo]);
          setInputValue(null);
        }}
        className="flex items-center mt-4"
      >
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 mr-2 rounded text-black"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Todoを入力してください"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          追加
        </button>
      </form>
    </div>
  );
}
