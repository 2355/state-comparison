import { atom } from "jotai";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

let idCounter = 1;

// Todo の配列
export const todosAtom = atom<Todo[]>([]);

// Todo を追加する atom
export const addTodoAtom = atom(
  null,
  (get, set, text: string) => {
    const todos = get(todosAtom);
    set(todosAtom, [
      ...todos,
      { id: idCounter++, text, done: false },
    ]);
  }
);

// Todo の完了状態を切り替える atom
export const toggleTodoAtom = atom(
  null,
  (get, set, id: number) => {
    const todos = get(todosAtom);
    set(
      todosAtom,
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }
);
