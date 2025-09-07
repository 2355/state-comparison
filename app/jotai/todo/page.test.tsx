import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoPage from "./page";
import { todosAtom } from "@/stores/jotai/todoAtoms";
import { Provider, createStore } from "jotai";

describe("Jotai TodoPage", () => {
  it("新しいTodoを追加できる", async () => {
    render(<TodoPage />);
    const input = screen.getByPlaceholderText("Add a todo...");
    const button = screen.getByText("Add");

    await userEvent.type(input, "牛乳を買う");
    await userEvent.click(button);

    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
  });

  it("Todoを削除できる (事前に state をセット)", async () => {
    const store = createStore();
    store.set(todosAtom, [{ id: 1, text: "散歩する", done: false }]);

    render(
      <Provider store={store}>
        <TodoPage />
      </Provider>
    );

    const todo1 = screen.getByText("散歩する");
    
    await userEvent.click(todo1);

    expect(todo1).toHaveClass(/done/);
  });
});
