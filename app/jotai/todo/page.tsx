"use client";

import { useAtom, useSetAtom } from "jotai";
import { todosAtom, addTodoAtom, toggleTodoAtom } from "@/stores/jotai/todoAtoms";
import AddTodoForm from "@/components/Todo/AddTodoForm";
import TodoList from "@/components/Todo/TodoList";

export default function JotaiTodoPage() {
  const [todos] = useAtom(todosAtom);
  const addTodo = useSetAtom(addTodoAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Jotai Todo</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}
