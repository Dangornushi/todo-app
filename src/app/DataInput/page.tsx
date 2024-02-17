"use client";
import { Todo } from "@prisma/client";
import { useState } from "react";
import NextLink from "next/link";

export default function Home() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [inputTitle, setInputTitle] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="flex ">
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
              body: JSON.stringify({ title: inputTitle, contents: inputValue }),
            }
          );
          try {
            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
            setInputValue(null);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 rounded text-black w-full"
          value={inputTitle || ""}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Titleを入力してください"
        />
        <input
          type="text"
          className="border border-gray-400 px-4 py-2 rounded text-black w-full"
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Todoを入力してください"
        />
        <div className="float-right">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-2">
            追加
          </button>
          <NextLink
            href="/"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mx-2"
          >
            戻る
          </NextLink>
        </div>
      </form>
    </div>
  );
}
