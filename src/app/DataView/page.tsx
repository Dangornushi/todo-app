"use client";
import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import NextLink from "next/link";

export default function Home() {
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
    <div>
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
              {todo.contents}
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
      <NextLink
        href="/"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
      >
        戻る
      </NextLink>
    </div>
  );
}
