"use client";

import { useAtom, useSetAtom } from "jotai";
import { itemsAtom, addItemAtom, removeItemAtom } from "@/stores/jotai/cartAtoms";
import CartList from "@/components/Cart/CartList";
import CartSummary from "@/components/Cart/CartSummary";

export default function JotaiCartPage() {
  const [items] = useAtom(itemsAtom);
  const addItem = useSetAtom(addItemAtom);
  const removeItem = useSetAtom(removeItemAtom);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Jotai Cart</h1>
      <CartList items={items} onAdd={addItem} onRemove={removeItem} />
      <CartSummary items={items} />
    </div>
  );
}
