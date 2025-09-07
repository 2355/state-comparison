import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCartStore } from "@/stores/zustand/cartStore";
import CartPage from "./page";

describe("Zustand CartPage", () => {
  beforeEach(() => {
    // state の初期状態をセット
    useCartStore.setState({
      items: [
        { id: 1, name: "Apple", price: 100, quantity: 1 },
        { id: 2, name: "Banana", price: 50, quantity: 2 },
      ],
    });
  });

  it("合計金額が表示されていること", async () => {
    render(<CartPage />);

    expect(screen.getByText("Total: $200")).toBeInTheDocument();
  });

  it("+ を押すと、商品が追加されること", async () => {
    render(<CartPage />);
    const addButtons = screen.getAllByRole("button", { name: "+" });

    await userEvent.click(addButtons[0]);
    await userEvent.click(addButtons[1]);

    expect(screen.getByText("Apple ($100) x 2")).toBeInTheDocument();
    expect(screen.getByText("Banana ($50) x 3")).toBeInTheDocument();
    expect(screen.getByText("Total: $350")).toBeInTheDocument();
  });

  it("- を押すと、商品が削除されること", async () => {
    render(<CartPage />);
    const removeButtons = screen.getAllByRole("button", { name: "-" });

    await userEvent.click(removeButtons[0]);
    await userEvent.click(removeButtons[1]);

    expect(screen.getByText("Apple ($100) x 0")).toBeInTheDocument();
    expect(screen.getByText("Banana ($50) x 1")).toBeInTheDocument();
    expect(screen.getByText("Total: $50")).toBeInTheDocument();
  });

  it("商品数がマイナスにならないこと", async () => {
    render(<CartPage />);
    const removeButtons = screen.getAllByRole("button", { name: "-" });

    await userEvent.click(removeButtons[0]);
    await userEvent.click(removeButtons[0]);
    await userEvent.click(removeButtons[0]);
    await userEvent.click(removeButtons[1]);
    await userEvent.click(removeButtons[1]);
    await userEvent.click(removeButtons[1]);

    expect(screen.getByText("Apple ($100) x 0")).toBeInTheDocument();
    expect(screen.getByText("Banana ($50) x 0")).toBeInTheDocument();
    expect(screen.getByText("Total: $0")).toBeInTheDocument();
  });
});
