"use client";

import AddTodoForm from "@/components/Todo/AddTodoForm";
import TodoList from "@/components/Todo/TodoList";
import { useTodoStore } from "@/stores/zustand/todoStore";

export default function ZustandTodoPage() {
  const todos = useTodoStore((s) => s.todos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Zustand Todo</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}
