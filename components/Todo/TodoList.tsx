"use client";

import styles from "./TodoList.module.css";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
};

export default function TodoList({ todos, onToggle }: Props) {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => onToggle(todo.id)}
          className={`${styles.item} ${todo.done ? styles.done : ""}`}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
